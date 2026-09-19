(function () {
  let lang = (function () { try { return localStorage.getItem('lcad_lang'); } catch (e) { return null; } })() || navigator.language || 'en';
  lang = lang.indexOf('ja') === 0 ? 'ja' : 'en';
  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('section[data-lang]').forEach(function (s) { s.classList.toggle('active', s.dataset.lang === lang); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.dataset.lang; try { localStorage.setItem('lcad_lang', lang); } catch (e) {} apply(); });
  });
  apply();
})();
