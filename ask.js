/* ============================================================
   Beylood — Ask chatbot (100% free, no paid APIs)
   ------------------------------------------------------------
   - Uses local knowledge base (chatbot-knowledge.js)
   - Searches Beylood articles by keyword + scoring
   - Suggests related articles
   - Supports Somali, English, Arabic, Swahili
   - Saves chat history to Firestore for signed-in users
   - Bumps admin counters for the dashboard
   - NO external API. NO API key. Zero cost.
   ============================================================ */
import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, collection, addDoc, setDoc, getDocs,
  query, orderBy, limit, serverTimestamp, increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

(function () {
  'use strict';

  var MAX_PROMPT_CHARS = 2000;
  var MAX_TITLE_LEN    = 80;

  // -----------------------------------------------------------
  // DOM
  // -----------------------------------------------------------
  var winEl       = document.getElementById('aiChatWindow');
  var formEl      = document.getElementById('aiChatForm');
  var inEl        = document.getElementById('aiChatInput');
  var sendEl      = document.getElementById('aiChatSend');
  var newChatBtn  = document.getElementById('aiNewChatBtn');
  var historyBtn  = document.getElementById('aiHistoryBtn');
  var historyPnl  = document.getElementById('aiHistoryPanel');
  var historyList = document.getElementById('aiHistoryList');
  var historyEmpty= document.getElementById('aiHistoryEmpty');
  var historyClose= document.getElementById('aiHistoryClose');
  var authStatusEl= document.getElementById('aiAuthStatus');

  if (!winEl || !formEl || !inEl || !sendEl) return;
  if (!window.BeyloodKnowledge) {
    console.error('BeyloodKnowledge not loaded — make sure chatbot-knowledge.js loads before ask.js');
    return;
  }

  // -----------------------------------------------------------
  // State
  // -----------------------------------------------------------
  var currentUser   = null;
  var currentChatId = null;
  var inFlight      = false;
  var lastSlug      = null; // conversation context: last matched article

  // -----------------------------------------------------------
  // Safe DOM helpers
  // -----------------------------------------------------------
  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function sanitizeUrl(u) {
    try {
      var url = new URL(u, location.href);
      if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') return url.href;
    } catch (e) {}
    return '#';
  }

  // -----------------------------------------------------------
  // Markdown render (paragraphs, **bold**, `code`, [link](url), lists)
  // Uses textContent for any user-supplied text — no innerHTML.
  // -----------------------------------------------------------
  function renderMarkdown(text) {
    var wrap = document.createElement('div');
    var blocks = String(text).split(/\n{2,}/);
    blocks.forEach(function (block) {
      block = block.trim();
      if (!block) return;
      var lines = block.split('\n');
      var allList = lines.every(function (l) { return /^(?:[-*•] |\d+\.\s)/.test(l.trim()); });
      if (allList && lines.length > 0) {
        var ordered = /^\d+\.\s/.test(lines[0].trim());
        var list = document.createElement(ordered ? 'ol' : 'ul');
        lines.forEach(function (line) {
          var item = line.replace(/^(?:[-*•] |\d+\.\s)/, '').trim();
          var li = document.createElement('li');
          applyInline(li, item);
          list.appendChild(li);
        });
        wrap.appendChild(list);
      } else {
        var p = document.createElement('p');
        lines.forEach(function (part, idx) {
          applyInline(p, part);
          if (idx < lines.length - 1) p.appendChild(document.createElement('br'));
        });
        wrap.appendChild(p);
      }
    });
    return wrap;
  }

  function applyInline(target, text) {
    var rx = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
    var last = 0, m;
    while ((m = rx.exec(text)) !== null) {
      if (m.index > last) target.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[2] !== undefined) {
        var b = document.createElement('strong'); b.textContent = m[2]; target.appendChild(b);
      } else if (m[3] !== undefined) {
        var c = document.createElement('code'); c.textContent = m[3]; target.appendChild(c);
      } else if (m[4] !== undefined && m[5] !== undefined) {
        var a = document.createElement('a');
        a.textContent = m[4];
        a.href = sanitizeUrl(m[5]);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        target.appendChild(a);
      }
      last = rx.lastIndex;
    }
    if (last < text.length) target.appendChild(document.createTextNode(text.slice(last)));
  }

  // -----------------------------------------------------------
  // Build a wa.me link that pre-fills WhatsApp with the answer
  // Strips markdown to a clean plain text for sharing.
  // -----------------------------------------------------------
  function buildWhatsAppLink(text) {
    // Remove markdown decorations for readability in WhatsApp
    var clean = String(text || '')
      .replace(/\*\*(.+?)\*\*/g, '*$1*')   // **bold** -> *bold* (WhatsApp uses *)
      .replace(/`([^`]+)`/g, '$1')          // strip inline code backticks
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1: $2') // [text](url) -> text: url
      .replace(/^[-•] /gm, '• ')            // normalize bullets
      .trim();
    var footer = '\n\n— Beylood AI · https://beylood.com/ask.html';
    var msg = clean + footer;
    // WhatsApp message length limit ~65k; we cap to 1500 for nicer sharing
    if (msg.length > 1500) msg = msg.slice(0, 1490) + '…' + footer;
    return 'https://wa.me/?text=' + encodeURIComponent(msg);
  }

  // -----------------------------------------------------------
  // Message bubbles + copy button
  // -----------------------------------------------------------
  var BOT_AVATAR_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1.2" fill="currentColor"/><circle cx="9" cy="13" r="1" fill="currentColor"/><circle cx="15" cy="13" r="1" fill="currentColor"/><path d="M9 17h6"/></svg>';

  // Build the Copy + WhatsApp action toolbar for a bot answer.
  function buildActions(text) {
    var actions = el('div', 'ai-msg-actions');
    var copyBtn = el('button', 'ai-msg-copy');
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Koobi</span>';
    copyBtn.setAttribute('aria-label', 'Copy answer');
    copyBtn.addEventListener('click', function () { copyToClipboard(text, copyBtn); });
    actions.appendChild(copyBtn);

    var waBtn = el('a', 'ai-msg-whatsapp');
    waBtn.href = buildWhatsAppLink(text);
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg><span>WhatsApp</span>';
    waBtn.setAttribute('aria-label', 'Share via WhatsApp');
    actions.appendChild(waBtn);
    return actions;
  }

  // Follow-up suggestion chips under a bot answer (clicking asks the question).
  function buildSuggestions(suggestions) {
    if (!suggestions || !suggestions.length) return null;
    var wrap = el('div', 'ai-followups');
    suggestions.forEach(function (q) {
      var chip = el('button', 'ai-followup');
      chip.type = 'button';
      chip.textContent = q;
      chip.addEventListener('click', function () {
        if (inFlight) return;
        inEl.value = q;
        autoGrow();
        formEl.requestSubmit();
      });
      wrap.appendChild(chip);
    });
    return wrap;
  }

  // Fill a bot body with formatted answer + actions + follow-up chips.
  function decorateBot(body, text, suggestions) {
    body.appendChild(renderMarkdown(text));
    body.appendChild(buildActions(text));
    var sg = buildSuggestions(suggestions);
    if (sg) body.appendChild(sg);
  }

  function addMessage(role, text, suggestions) {
    var bubble = el('div', 'ai-msg ' + (role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'));
    var avatar = el('div', 'ai-msg-avatar');
    avatar.setAttribute('aria-hidden', 'true');
    if (role === 'user') {
      avatar.textContent = '🙋';
    } else {
      avatar.innerHTML = BOT_AVATAR_SVG;
    }
    var body = el('div', 'ai-msg-body');
    if (role === 'user') {
      body.appendChild(el('p', null, text));
    } else {
      decorateBot(body, text, suggestions);
    }
    bubble.appendChild(avatar);
    bubble.appendChild(body);
    winEl.appendChild(bubble);
    winEl.scrollTop = winEl.scrollHeight;
    return body;
  }

  // Strip markdown to a plain preview used during the typewriter stream.
  function stripMarkdown(text) {
    return String(text || '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      .replace(/^[-*•]\s/gm, '• ')
      .replace(/^📖\s*/gm, '');
  }

  // Type the answer out word-by-word (real-assistant feel), then render it
  // fully formatted with actions + follow-up chips. Resolves when done.
  function streamBot(text, suggestions) {
    return new Promise(function (resolve) {
      var bubble = el('div', 'ai-msg ai-msg-bot');
      var avatar = el('div', 'ai-msg-avatar');
      avatar.setAttribute('aria-hidden', 'true');
      avatar.innerHTML = BOT_AVATAR_SVG;
      var body = el('div', 'ai-msg-body');
      var stream = el('div', 'ai-stream is-streaming');
      body.appendChild(stream);
      bubble.appendChild(avatar);
      bubble.appendChild(body);
      winEl.appendChild(bubble);

      var words = stripMarkdown(text).split(/(\s+)/);
      var i = 0;
      var per = Math.max(8, Math.min(26, Math.round(900 / Math.max(1, words.length))));

      function step() {
        if (i >= words.length) {
          body.removeChild(stream);
          decorateBot(body, text, suggestions);
          winEl.scrollTop = winEl.scrollHeight;
          resolve();
          return;
        }
        stream.appendChild(document.createTextNode(words[i++]));
        winEl.scrollTop = winEl.scrollHeight;
        setTimeout(step, per);
      }
      step();
    });
  }

  function addTyping() {
    var bubble = el('div', 'ai-msg ai-msg-bot ai-msg-typing');
    var avatar = el('div', 'ai-msg-avatar');
    avatar.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4"/></svg>';
    var body = el('div', 'ai-msg-body');
    body.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div>';
    bubble.appendChild(avatar);
    bubble.appendChild(body);
    winEl.appendChild(bubble);
    winEl.scrollTop = winEl.scrollHeight;
    return bubble;
  }

  async function copyToClipboard(text, btn) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      btn.classList.add('is-copied');
      var label = btn.querySelector('span');
      var prev = label ? label.textContent : '';
      if (label) label.textContent = '✓ La koobiyay';
      setTimeout(function () {
        btn.classList.remove('is-copied');
        if (label) label.textContent = prev || 'Koobi';
      }, 1600);
    } catch (e) { console.warn('Copy failed', e); }
  }

  // -----------------------------------------------------------
  // Answer engine — local search, no API
  // -----------------------------------------------------------
  function answer(userText) {
    var lang = document.documentElement.lang || window.BeyloodKnowledge.detectLang(userText);
    // Pass conversation context so short follow-ups resolve to the last topic.
    var res = window.BeyloodKnowledge.search(userText, lang, lastSlug);

    if (res.type === 'empty') {
      return { reply: 'Fadlan qor su\'aal cad.', lang: lang, suggestions: null };
    }
    if (res.type === 'greeting' || res.type === 'thanks' || res.type === 'no_match') {
      // Greeting/thanks/no-match don't change topic context.
      return { reply: res.response, lang: lang, suggestions: null };
    }
    // type === 'match' — remember topic for the next turn.
    lastSlug = res.topSlug || lastSlug;
    return {
      reply: window.BeyloodKnowledge.format(res.results, lang),
      lang: lang,
      suggestions: res.suggestions || null
    };
  }

  // -----------------------------------------------------------
  // Firestore persistence (signed-in users only)
  // -----------------------------------------------------------
  async function persistMessages(pair) {
    if (!currentUser || !pair) return;
    try {
      if (!currentChatId) {
        var title = (pair.user || '').slice(0, MAX_TITLE_LEN);
        var chatRef = await addDoc(collection(db, 'users', currentUser.uid, 'chats'), {
          title: title,
          createdAt: serverTimestamp(),
          lastMessageAt: serverTimestamp(),
          messageCount: 0
        });
        currentChatId = chatRef.id;
      }
      var msgs = collection(db, 'users', currentUser.uid, 'chats', currentChatId, 'messages');
      await addDoc(msgs, { role: 'user',      content: pair.user,      createdAt: serverTimestamp() });
      await addDoc(msgs, { role: 'assistant', content: pair.assistant, createdAt: serverTimestamp() });
      await setDoc(doc(db, 'users', currentUser.uid, 'chats', currentChatId), {
        lastMessageAt: serverTimestamp(),
        messageCount: increment(2)
      }, { merge: true });
      await setDoc(doc(db, 'stats', 'aiStats'), {
        totalMessages: increment(2),
        lastActivityAt: serverTimestamp()
      }, { merge: true });
    } catch (e) { console.warn('persistMessages skipped:', e); }
  }

  async function recordNewChat() {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, 'stats', 'aiStats'), {
        totalChats: increment(1),
        lastActivityAt: serverTimestamp()
      }, { merge: true });
      var dayKey = new Date().toISOString().slice(0, 10);
      await setDoc(doc(db, 'stats', 'aiDaily-' + dayKey), {
        date: dayKey,
        chats: increment(1)
      }, { merge: true });
    } catch (e) { console.warn('recordNewChat skipped:', e); }
  }

  // -----------------------------------------------------------
  // History side panel
  // -----------------------------------------------------------
  async function loadHistoryList() {
    if (!currentUser || !historyList) return;
    historyList.innerHTML = '';
    try {
      var q = query(
        collection(db, 'users', currentUser.uid, 'chats'),
        orderBy('lastMessageAt', 'desc'),
        limit(30)
      );
      var snap = await getDocs(q);
      if (snap.empty) { if (historyEmpty) historyEmpty.hidden = false; return; }
      if (historyEmpty) historyEmpty.hidden = true;
      snap.forEach(function (d) {
        var data = d.data() || {};
        var li = el('li', 'ai-history-item');
        li.tabIndex = 0;
        li.appendChild(el('span', null, data.title || 'Wadahadal'));
        li.appendChild(el('small', null, formatTimestamp(data.lastMessageAt)));
        li.addEventListener('click', function () { loadConversation(d.id); });
        li.addEventListener('keydown', function (e) { if (e.key === 'Enter') loadConversation(d.id); });
        historyList.appendChild(li);
      });
    } catch (e) { console.warn('History load failed', e); }
  }

  async function loadConversation(chatId) {
    if (!currentUser) return;
    try {
      var q = query(
        collection(db, 'users', currentUser.uid, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc'),
        limit(100)
      );
      var snap = await getDocs(q);
      winEl.innerHTML = '';
      lastSlug = null;
      snap.forEach(function (d) {
        var data = d.data() || {};
        if (data.role === 'user' || data.role === 'assistant') {
          addMessage(data.role === 'user' ? 'user' : 'bot', data.content || '');
        }
      });
      currentChatId = chatId;
      historyPnl.hidden = true;
      historyBtn && historyBtn.setAttribute('aria-expanded', 'false');
    } catch (e) { console.warn('Load conversation failed', e); }
  }

  function formatTimestamp(ts) {
    if (!ts) return '';
    var d = ts.toDate ? ts.toDate() : new Date(ts);
    if (!d || isNaN(d.getTime())) return '';
    return d.toLocaleDateString() + ' • ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // -----------------------------------------------------------
  // New chat
  // -----------------------------------------------------------
  function newChat() {
    winEl.innerHTML = '';
    currentChatId = null;
    lastSlug = null;
    addMessage('bot',
      '**Soo dhawow Beylood!** 🌱\n\n' +
      'Anigu waxaan ahay caawiyahaaga AI ee beeraha, xoolaha, iyo cudurrada dalagga. Su\'aal kasta i waydii.\n\n' +
      '**Tusaalooyin:**\n' +
      '- Sidee loo beero galleyda?\n' +
      '- Maxaa daawo u ah whiteflies-ka?\n' +
      '- Sidee loo sameeyo compost?\n\n' +
      'Maxaa ku caawin karaa maanta?'
    );
  }

  // -----------------------------------------------------------
  // Form handlers
  // -----------------------------------------------------------
  function autoGrow() {
    inEl.style.height = 'auto';
    inEl.style.height = Math.min(inEl.scrollHeight, 160) + 'px';
  }

  inEl.addEventListener('input', autoGrow);
  inEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formEl.requestSubmit();
    }
  });

  formEl.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (inFlight) return;
    var text = (inEl.value || '').trim();
    if (!text) return;
    if (text.length > MAX_PROMPT_CHARS) text = text.slice(0, MAX_PROMPT_CHARS);
    inFlight = true;
    sendEl.disabled = true;
    inEl.value = '';
    autoGrow();
    addMessage('user', text);
    var typing = addTyping();
    try {
      var wasNewChat = (currentUser && !currentChatId);
      var res = answer(text);
      // Variable "thinking" pause proportional to answer length (feels composed).
      var thinkMs = Math.max(450, Math.min(1300, 380 + res.reply.length * 1.1));
      await new Promise(function (r) { setTimeout(r, thinkMs); });
      typing.remove();
      // Type the answer out like a real assistant, then finalize formatting.
      await streamBot(res.reply, res.suggestions);
      if (currentUser) {
        await persistMessages({ user: text, assistant: res.reply });
        if (wasNewChat) await recordNewChat();
      }
    } catch (err) {
      typing.remove();
      console.warn('Answer failed', err);
      addMessage('bot', 'Khalad ayaa dhacay. Fadlan isku day mar kale.');
    } finally {
      inFlight = false;
      sendEl.disabled = false;
      inEl.focus();
    }
  });

  // Suggested chips
  document.querySelectorAll('.ai-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
      inEl.value = prompt;
      autoGrow();
      formEl.requestSubmit();
    });
  });

  // Toolbar
  newChatBtn && newChatBtn.addEventListener('click', newChat);
  historyBtn && historyBtn.addEventListener('click', function () {
    if (historyPnl.hidden) {
      historyPnl.hidden = false;
      historyBtn.setAttribute('aria-expanded', 'true');
      loadHistoryList();
    } else {
      historyPnl.hidden = true;
      historyBtn.setAttribute('aria-expanded', 'false');
    }
  });
  historyClose && historyClose.addEventListener('click', function () {
    historyPnl.hidden = true;
    historyBtn && historyBtn.setAttribute('aria-expanded', 'false');
  });

  // -----------------------------------------------------------
  // Auth wiring (chat works without auth; history needs auth)
  // -----------------------------------------------------------
  onAuthStateChanged(auth, function (user) {
    currentUser = user || null;
    if (user) {
      if (historyBtn) historyBtn.hidden = false;
      if (authStatusEl) {
        authStatusEl.classList.add('is-signed-in');
        authStatusEl.textContent = '✓ Wadahadalladaada wuxuu kaydsanyahay';
      }
    } else {
      if (historyBtn) historyBtn.hidden = true;
      if (authStatusEl) {
        authStatusEl.classList.remove('is-signed-in');
        authStatusEl.innerHTML = '<a href="signin.html" style="color:inherit;text-decoration:underline">Soo gal si aad u keydiso wadahadalka</a>';
      }
    }
  });

})();
