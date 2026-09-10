/* Beylood — homepage hero interactive seed-particle background.
   External file (CSP-safe: script-src 'self'). */
(function () {
  var hero = document.querySelector('.hero');
  var stage = hero && hero.querySelector('.byl-stage');
  if (!stage) return;
  var cv = stage.querySelector('.byl-seeds'), ctx = cv.getContext('2d'), W, H, dpr, ps = [];
  var sun = stage.querySelector('.byl-sun');
  var COLORS = [[74, 168, 255], [67, 214, 155], [242, 193, 78]];
  var tx, ty;
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
    sun.style.background = 'radial-gradient(420px 420px at ' + (tx / hero.clientWidth * 100).toFixed(1) + '% ' + (ty / hero.clientHeight * 100).toFixed(1) + '%, rgba(74,168,255,.26), transparent 60%)';
  });
  hero.addEventListener('mouseleave', function () { tx = null; ty = null; });
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = hero.clientWidth * dpr; H = cv.height = hero.clientHeight * dpr;
    cv.style.width = hero.clientWidth + 'px'; cv.style.height = hero.clientHeight + 'px';
    var n = Math.round(hero.clientWidth / 16); n = Math.max(40, Math.min(90, n)); ps = [];
    for (var i = 0; i < n; i++) {
      ps.push({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 2 + 1) * dpr,
        vx: (Math.random() - .5) * 0.15 * dpr, vy: (-Math.random() * 0.32 - 0.06) * dpr,
        c: COLORS[i % COLORS.length], a: Math.random() * 0.5 + 0.3, sw: Math.random() * 6.28 });
    }
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    var has = (tx != null), mxp = tx * dpr, myp = ty * dpr, R = 150 * dpr;
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (has) { var dx = p.x - mxp, dy = p.y - myp, d = Math.hypot(dx, dy); if (d < R && d > 0) { var f = (R - d) / R * 2.2; p.x += dx / d * f; p.y += dy / d * f; } }
      p.sw += 0.02; p.x += p.vx + Math.sin(p.sw) * 0.25 * dpr; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      ctx.beginPath(); ctx.fillStyle = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + p.a + ')';
      ctx.shadowColor = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',.9)'; ctx.shadowBlur = 8 * dpr;
      ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    ctx.shadowBlur = 0; requestAnimationFrame(frame);
  }
  resize(); addEventListener('resize', resize); frame();
})();
