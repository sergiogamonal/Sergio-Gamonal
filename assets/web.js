// Funciones de las páginas de bibliografía: índice por décadas, búsqueda y filtro de textos disponibles.
// No es necesario modificar este archivo para agregar publicaciones.
(function () {
  var biblio = document.querySelector('.biblio');
  if (!biblio) return;
  var lista = biblio.querySelector('.lista');
  var years = Array.prototype.slice.call(lista.querySelectorAll('h2'));
  var es = document.documentElement.lang === 'es';

  // Marcar enlaces a PDF / texto completo como botones
  Array.prototype.forEach.call(lista.querySelectorAll('li a'), function (a) {
    var label = a.textContent.trim().toLowerCase();
    if (/^(pdf|texto completo|acceso libre|acceso abierto|full text|open access|doi)\b/.test(label)) {
      a.classList.add('enlace-texto');
    }
    if (/^https?:/.test(a.getAttribute('href') || '')) { a.target = '_blank'; a.rel = 'noopener'; }
  });

  // Índice por décadas y separadores
  var decadas = [];
  years.forEach(function (h) {
    var y = parseInt(h.textContent, 10);
    if (isNaN(y)) return;
    h.id = 'y' + y;
    var d = Math.floor(y / 10) * 10;
    if (decadas.indexOf(d) === -1) {
      decadas.push(d);
      h.setAttribute('data-decada', d);
      if (decadas.length > 1) {
        var sep = document.createElement('p');
        sep.className = 'separador-decada';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '* * *';
        h.parentNode.insertBefore(sep, h);
      }
      h.id = 'd' + d;
    }
  });
  var nav = biblio.querySelector('.decadas');
  if (decadas.length > 1) {
    nav.innerHTML = decadas.map(function (d) {
      return '<a href="#d' + d + '">' + (es ? 'Década de ' : '') + d + (es ? '' : 's') + '</a>';
    }).join('<span class="sep">|</span>');
  }

  // Búsqueda y filtro
  var input = biblio.querySelector('.filtro');
  var solo = biblio.querySelector('.solo-texto');
  var vacio = biblio.querySelector('.sin-resultados');
  var items = Array.prototype.slice.call(lista.querySelectorAll('li'));
  if (!items.some(function (li) { return li.querySelector('a'); })) {
    solo.closest('label').hidden = true;
  }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function aplicar() {
    var q = norm(input.value.trim());
    var n = 0;
    items.forEach(function (li) {
      var ok = (!q || norm(li.textContent).indexOf(q) !== -1) && (!solo.checked || li.querySelector('a'));
      li.hidden = !ok;
      if (ok) n++;
    });
    years.forEach(function (h) {
      var ul = h.nextElementSibling;
      var visible = ul && Array.prototype.some.call(ul.children, function (li) { return !li.hidden; });
      h.hidden = !visible;
      if (ul) ul.hidden = !visible;
    });
    Array.prototype.forEach.call(lista.querySelectorAll('.separador-decada'), function (s) {
      s.hidden = !!(q || solo.checked);
    });
    nav.hidden = !!(q || solo.checked);
    vacio.hidden = n > 0;
  }
  input.addEventListener('input', aplicar);
  solo.addEventListener('change', aplicar);
})();
