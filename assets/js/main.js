document.querySelectorAll('.hero .enter').forEach(function (el, i) {
  setTimeout(function () { el.classList.add('in'); }, 150 + i * 180);
});

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var style = document.createElement('style');
  style.textContent =
    '#page-fade{position:fixed;inset:0;z-index:2147483647;background:#000;opacity:1;transition:opacity 0.38s ease;pointer-events:none;}' +
    '#page-fade.done{opacity:0;}' +
    '#page-fade.lock{pointer-events:auto;}';
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'page-fade';
  document.body.appendChild(overlay);

  function reveal() {
    overlay.classList.add('done');
  }

  overlay.addEventListener('transitionend', function () {
    if (overlay.classList.contains('done')) overlay.style.display = 'none';
  });

  if (reduceMotion) {
    overlay.style.display = 'none';
    return;
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(reveal);
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest('a');
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href) return;

    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    if (url.pathname === location.pathname) return;

    e.preventDefault();
    overlay.style.display = 'block';
    overlay.classList.remove('done');
    overlay.classList.add('lock');
    setTimeout(function () { location.href = url.href; }, 380);
  });
})();