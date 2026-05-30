/* ============================================
   Beylood — Admin Dashboard logic
   --------------------------------------------
   • Gates access to the page (signed-in + admin)
   • Reads /users for live stats
   • Renders KPI cards, charts, and a recent-users table
   • Chart.js is loaded from CDN by admin.html
   ============================================ */

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc,
  collection, getDocs, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db, configReady } from "./firebase-init.js";

/* ---------- Tiny safe helpers ---------- */
function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function safePhotoURL(url) {
  return (typeof url === 'string' && /^https:\/\//i.test(url)) ? url : '';
}
function initials(name, email) {
  const src = (name && name.trim()) || (email ? email.split('@')[0] : '') || 'U';
  const parts = src.trim().split(/\s+/);
  return ((parts[0] && parts[0][0]) || 'U').toUpperCase() +
         ((parts[1] && parts[1][0]) || '').toUpperCase();
}
function tsToDate(ts) {
  // Firestore Timestamp → Date, or null if missing
  if (!ts) return null;
  if (typeof ts.toDate === 'function') return ts.toDate();
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000);
  return null;
}
function formatDate(d) {
  if (!d) return '—';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatRelative(d) {
  if (!d) return '—';
  const diff = Math.round((Date.now() - d.getTime()) / 1000);
  if (diff < 60)     return diff + 's ago';
  if (diff < 3600)   return Math.round(diff / 60) + 'm ago';
  if (diff < 86400)  return Math.round(diff / 3600) + 'h ago';
  if (diff < 2592000) return Math.round(diff / 86400) + 'd ago';
  return formatDate(d);
}

/* ---------- Article + category counts (static from site index) ---------- */
const SITE_TOTALS = {
  articles: 50,          // updated when new articles are added
  categories: 6,
  languages: 4
};

/* ---------- DOM refs ---------- */
const gate = document.getElementById('adminGate');
const main = document.getElementById('adminMain');
const gateMsg = document.getElementById('adminGateMsg');
const gateTitle = document.getElementById('adminGateTitle');
const signInBtn = document.getElementById('adminSignInBtn');

function showGate({ title, message, showSignIn }) {
  gate.hidden = false;
  main.hidden = true;
  if (gateTitle) gateTitle.textContent = title || 'Restricted area';
  if (gateMsg)   gateMsg.textContent = message || 'This page is reserved for Beylood administrators.';
  if (signInBtn) signInBtn.hidden = !showSignIn;
}
function showDashboard() {
  gate.hidden = true;
  main.hidden = false;
}

/* ---------- Auth + admin gate ---------- */
if (!configReady()) {
  showGate({ title: 'Firebase not configured', message: 'Set your Firebase config in firebase-init.js to continue.', showSignIn: false });
} else {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      showGate({ title: 'Sign in required', message: 'Please sign in with an admin account to view the dashboard.', showSignIn: true });
      return;
    }
    // Is the signed-in user an admin? (i.e. /admins/{uid} exists)
    try {
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!adminDoc.exists()) {
        showGate({
          title: 'Admin access required',
          message: 'Your UID (' + user.uid + ') is not in the admins collection. Add a document at /admins/' + user.uid + ' in Firestore.',
          showSignIn: false
        });
        return;
      }
    } catch (err) {
      console.warn('Admin check failed:', err);
      let detail = err && err.message ? err.message : 'unknown error';
      if (err && err.code === 'permission-denied') {
        detail = 'Permission denied. Publish the new firestore.rules in Firebase Console → Firestore → Rules.';
      }
      showGate({
        title: 'Access check failed',
        message: detail,
        showSignIn: false
      });
      return;
    }
    showDashboard();
    loadDashboard().catch((e) => {
      console.warn('Dashboard load failed:', e);
      const body = document.getElementById('recentUsersBody');
      if (body) {
        const code = (e && e.code) ? e.code : '';
        let msg = (e && e.message) ? e.message : 'Failed to load.';
        if (code === 'permission-denied') {
          msg = 'Permission denied reading /users. Publish the new firestore.rules and confirm /admins/' + (auth.currentUser && auth.currentUser.uid) + ' exists.';
        }
        body.innerHTML = '<tr><td colspan="5" class="admin-table__empty" style="color:#ef4444;">' +
          msg.replace(/</g, '&lt;') + '</td></tr>';
      }
    });
  });
}

/* ---------- Load users + render everything ---------- */
async function loadDashboard() {
  // Static counters
  setText('kpiArticles', SITE_TOTALS.articles + '+');

  // Pull all users (admin role required by rules).
  const usersSnap = await getDocs(collection(db, 'users'));
  const users = [];
  usersSnap.forEach((d) => {
    const data = d.data() || {};
    users.push({
      uid: d.id,
      name: data.name || '',
      email: data.email || '',
      photoURL: safePhotoURL(data.photoURL),
      provider: data.provider || 'password',
      createdAt: tsToDate(data.createdAt),
      lastLogin: tsToDate(data.lastLogin)
    });
  });

  // ---- KPI numbers ----
  const now = new Date();
  const startToday = new Date(now); startToday.setHours(0,0,0,0);
  const startWeek  = new Date(now); startWeek.setDate(startWeek.getDate() - 7);
  const startMonth = new Date(now); startMonth.setDate(startMonth.getDate() - 30);

  const usersTotal = users.length;
  const usersToday = users.filter((u) => u.createdAt && u.createdAt >= startToday).length;
  const usersWeek  = users.filter((u) => u.createdAt && u.createdAt >= startWeek).length;
  const activeMonth = users.filter((u) => u.lastLogin && u.lastLogin >= startMonth).length;

  setText('kpiUsers',     usersTotal);
  setText('kpiUsersToday', '+' + usersToday);
  setText('kpiUsersWeek',  '+' + usersWeek);
  setText('kpiActive',     activeMonth);

  // Visitors: we don't have a server-side GA mirror yet, so we keep the
  // KPI as a friendly placeholder and point admins to GA directly.
  setText('kpiVisitors', 'GA');
  setText('kpiVisitorsHint', 'See full visitor stats in Google Analytics');

  setText('adminLastUpdated', 'Updated ' + formatRelative(now));

  // ---- Recent users table ----
  renderRecentUsers(users);

  // ---- Charts ----
  // Chart.js loads with `defer`. Wait until it's available.
  await waitForChartJS();
  renderCharts(users);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
}

/* ---------- Recent users ---------- */
function renderRecentUsers(users) {
  const body = document.getElementById('recentUsersBody');
  const count = document.getElementById('recentUsersCount');
  if (!body) return;
  const sorted = users
    .filter((u) => u.createdAt)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 10);

  if (count) count.textContent = sorted.length + ' shown · ' + users.length + ' total';

  if (!sorted.length) {
    body.innerHTML = '<tr><td colspan="5" class="admin-table__empty">No users yet.</td></tr>';
    return;
  }

  body.innerHTML = sorted.map((u) => {
    const avatar = u.photoURL
      ? '<img src="' + escapeHTML(u.photoURL) + '" alt="" referrerpolicy="no-referrer" />'
      : escapeHTML(initials(u.name, u.email));
    const methodClass = u.provider === 'password' ? 'admin-method is-password' : 'admin-method';
    return '' +
      '<tr>' +
        '<td>' +
          '<div class="admin-table__user">' +
            '<span class="admin-table__avatar">' + avatar + '</span>' +
            '<span>' + escapeHTML(u.name || '—') + '</span>' +
          '</div>' +
        '</td>' +
        '<td>' + escapeHTML(u.email || '—') + '</td>' +
        '<td><span class="' + methodClass + '">' + escapeHTML(u.provider) + '</span></td>' +
        '<td>' + escapeHTML(formatDate(u.createdAt)) + '</td>' +
        '<td>' + escapeHTML(formatRelative(u.lastLogin)) + '</td>' +
      '</tr>';
  }).join('');
}

/* ---------- Charts ---------- */
function waitForChartJS() {
  return new Promise((resolve) => {
    if (window.Chart) return resolve();
    const t = setInterval(() => {
      if (window.Chart) { clearInterval(t); resolve(); }
    }, 100);
    setTimeout(() => { clearInterval(t); resolve(); }, 5000);
  });
}

function renderCharts(users) {
  if (!window.Chart) return; // Chart.js failed to load

  const styles = getComputedStyle(document.documentElement);
  const text = styles.getPropertyValue('--admin-text').trim() || '#0f172a';
  const border = styles.getPropertyValue('--admin-border').trim() || '#e5e7eb';

  Chart.defaults.color = text;
  Chart.defaults.borderColor = border;
  Chart.defaults.font.family = 'Poppins, system-ui, sans-serif';

  const navy = '#0F3F7E';
  const green = '#3BA935';

  // ---- Daily visitors: bucket sign-ins by day (proxy for activity) ----
  const daily = bucketByDay(users.map((u) => u.lastLogin).filter(Boolean), 30);
  renderLine('chartDaily', daily.labels, daily.values, 'Active users', navy);

  // ---- Cumulative user growth ----
  const growth = cumulativeGrowth(users.map((u) => u.createdAt).filter(Boolean), 30);
  renderLine('chartGrowth', growth.labels, growth.values, 'Total users', green);

  // ---- Weekly visitors (last 12 weeks) ----
  const weekly = bucketByWeek(users.map((u) => u.lastLogin).filter(Boolean), 12);
  renderBar('chartWeekly', weekly.labels, weekly.values, 'Active users', navy);

  // ---- Sign-in method donut ----
  const counts = users.reduce((acc, u) => {
    const key = (u.provider || 'password') === 'google' ? 'Google' : 'Email/Password';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  renderDoughnut('chartMethods', Object.keys(counts), Object.values(counts), [navy, green]);
}

function bucketByDay(dates, days) {
  const out = []; const labels = [];
  const today = new Date(); today.setHours(0,0,0,0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    out.push(0);
  }
  dates.forEach((d) => {
    const idx = Math.floor((today - d) / 86400000);
    const slot = days - 1 - idx;
    if (slot >= 0 && slot < days) out[slot]++;
  });
  return { labels, values: out };
}

function bucketByWeek(dates, weeks) {
  const out = []; const labels = [];
  const today = new Date(); today.setHours(0,0,0,0);
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i * 7);
    labels.push('W' + isoWeek(d));
    out.push(0);
  }
  dates.forEach((d) => {
    const idx = Math.floor((today - d) / (86400000 * 7));
    const slot = weeks - 1 - idx;
    if (slot >= 0 && slot < weeks) out[slot]++;
  });
  return { labels, values: out };
}
function isoWeek(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
}

function cumulativeGrowth(createdDates, days) {
  const sorted = createdDates.slice().sort((a, b) => a - b);
  const labels = []; const values = [];
  const today = new Date(); today.setHours(0,0,0,0);
  let runningTotal = 0;
  let idx = 0;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    while (idx < sorted.length && sorted[idx] <= d) { runningTotal++; idx++; }
    labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    values.push(runningTotal);
  }
  return { labels, values };
}

function renderLine(id, labels, data, label, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{
      label, data, borderColor: color, backgroundColor: color + '22',
      tension: 0.35, fill: true, pointRadius: 0, borderWidth: 2
    }]},
    options: lineOptions()
  });
}
function renderBar(id, labels, data, label, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label, data, backgroundColor: color, borderRadius: 6 }] },
    options: lineOptions()
  });
}
function renderDoughnut(id, labels, data, colors) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } }
    }
  });
}
function lineOptions() {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };
}
