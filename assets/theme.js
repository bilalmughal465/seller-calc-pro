/* SellerCalc color mode: light only (V49 Navy+Gold). Persists via localStorage. */
(function () {
  var KEY = 'sellercalc-theme';
  function current() {
    return 'light';
  }
  function apply(mode) {
    document.documentElement.setAttribute('data-theme', 'light');
    try { localStorage.setItem(KEY, 'light'); } catch (e) {}
  }
  document.documentElement.setAttribute('data-theme', current());
  document.addEventListener('DOMContentLoaded', function () {
    apply(current());
  });
})();
