/* Beylood — crop calendar: highlight the current month column + set the "this month" badge.
   External file (CSP-safe: script-src 'self'). No inline script needed. */
(function () {
  var ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var m = new Date().getMonth();               // 0 = Jan ... 11 = Dec
  var col = m + 1;                             // grid child index (0 = crop name, 1..12 = months)

  var badge = document.getElementById('calNowMonth');
  if (badge) badge.textContent = ABBR[m];

  // Highlight the month header cell.
  var months = document.querySelector('.cal-months');
  if (months && months.children[col]) months.children[col].classList.add('is-now');

  // Highlight the current-month cell in every crop row.
  var rows = document.querySelectorAll('.cal-croprow');
  for (var i = 0; i < rows.length; i++) {
    var cell = rows[i].children[col];
    if (cell) cell.classList.add('is-now');
  }
})();
