(function () {
  // Pages carry a <section data-lang> per language they are written in:
  // terms/privacy ja + en (ja/en buttons), start/about every UI language
  // (a menu in the sign-in screen's order, tools/i18n/translate_pages.mjs).
  // The choice is the sign-in screen's and the app's (localStorage lcad_lang).
  var NAMES = [
    ['ja', '日本語'], ['en', 'English'], ['hy', 'Հայերեն'], ['da', 'Dansk'], ['de', 'Deutsch'], ['es', 'Español'],
    ['fi', 'Suomi'], ['fr', 'Français'], ['it', 'Italiano'], ['ko', '한국어'], ['no', 'Norsk'], ['pl', 'Polski'],
    ['pb', 'Português BR'], ['pt', 'Português'], ['ro', 'Română'], ['ru', 'Русский'], ['tr', 'Türkçe'],
    ['uk', 'Українська'], ['zh', '中文繁體'], ['zh-cn', '中文简体'],
  ];
  var HTML_LANG = { 'zh': 'zh-Hant', 'zh-cn': 'zh-Hans', 'pb': 'pt-BR', 'pt': 'pt-PT', 'no': 'nb' };
  var sections = document.querySelectorAll('section[data-lang]');
  var avail = [];
  sections.forEach(function (s) { avail.push(s.dataset.lang); });
  function has(c) { return avail.indexOf(c) >= 0; }
  // Same mapping as the sign-in screen (js/loader/loader.js).
  var saved = (function () { try { return localStorage.getItem('lcad_lang'); } catch (e) { return null; } })();
  if (saved === 'am') saved = 'hy';
  var tag = (navigator.language || 'en').toLowerCase();
  var nav = /^zh-(cn|sg|hans)/.test(tag) ? 'zh-cn' : tag === 'pt-br' ? 'pb' : /^n[bn]\b/.test(tag) ? 'no' : tag.slice(0, 2);
  var lang = saved && has(saved) ? saved : has(nav) ? nav : 'en';
  var box = document.querySelector('.lang');
  var select = null;
  if (box && avail.length > 2) {
    box.innerHTML = '';
    select = document.createElement('select');
    select.setAttribute('aria-label', 'Language');
    NAMES.forEach(function (n) {
      if (!has(n[0])) return;
      var o = document.createElement('option');
      o.value = n[0]; o.textContent = n[1];
      select.appendChild(o);
    });
    select.addEventListener('change', function () { pick(select.value); });
    box.appendChild(select);
  }
  function apply() {
    document.documentElement.lang = HTML_LANG[lang] || lang;
    sections.forEach(function (s) { s.classList.toggle('active', s.dataset.lang === lang); });
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
    if (select) select.value = lang;
  }
  function pick(c) { lang = c; try { localStorage.setItem('lcad_lang', lang); } catch (e) {} apply(); }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { pick(b.dataset.lang); });
  });
  apply();
})();
