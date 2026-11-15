// Funciones de las páginas de bibliografía: materias, índice por décadas, búsqueda y filtro de textos disponibles.
// No es necesario modificar este archivo para agregar publicaciones.
(function () {
  var biblio = document.querySelector('.biblio');
  if (!biblio) return;
  var lista = biblio.querySelector('.lista');
  var years = Array.prototype.slice.call(lista.querySelectorAll('h2'));
  var es = document.documentElement.lang === 'es';
  var items = Array.prototype.slice.call(lista.querySelectorAll('li'));

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }

  // Materias: texto final entre llaves, p. ej. {Derecho individual, Fundamentos}
  var catalogo = (window.MATERIAS || []);
  var presentes = {};
  items.forEach(function (li) {
    var m = li.innerHTML.match(/\s*\{([^{}]+)\}\s*$/);
    var tags = [];
    if (m) {
      li.innerHTML = li.innerHTML.slice(0, m.index);
      tags = m[1].split(',').map(norm).filter(Boolean);
    }
    li.setAttribute('data-materias', '|' + tags.join('|') + '|');
    if (tags.length) {
      var et = document.createElement('span');
      et.className = 'etiquetas';
      et.textContent = tags.map(function (t) {
        var c = catalogo.filter(function (x) { return norm(x.es) === t; })[0];
        return c ? (es ? c.es : (c.en || c.es)) : t;
      }).join(' · ');
      li.appendChild(et);
    }
    tags.forEach(function (t) { presentes[t] = true; });
  });

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

  // Botones de materias (solo las que aparecen en esta página)
  var materiaActual = '';
  var navMat = biblio.querySelector('.materias');
  var disponibles = catalogo.filter(function (c) { return presentes[norm(c.es)]; });
  if (navMat && disponibles.length) {
    var html = '<span class="materias-titulo">' + navMat.getAttribute('data-titulo') + '</span>' +
      '<button type="button" data-m="" aria-pressed="true">' + navMat.getAttribute('data-todas') + '</button>';
    disponibles.forEach(function (c) {
      html += '<button type="button" data-m="' + norm(c.es) + '" aria-pressed="false">' + (es ? c.es : (c.en || c.es)) + '</button>';
    });
    navMat.innerHTML = html;
    navMat.hidden = false;
    navMat.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      materiaActual = b.getAttribute('data-m');
      Array.prototype.forEach.call(navMat.querySelectorAll('button'), function (x) {
        x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
      });
      aplicar();
    });
  }

  // Búsqueda y filtros combinados
  var input = biblio.querySelector('.filtro');
  var solo = biblio.querySelector('.solo-texto');
  var vacio = biblio.querySelector('.sin-resultados');
  if (!items.some(function (li) { return li.querySelector('a'); })) {
    solo.closest('label').hidden = true;
  }
  function aplicar() {
    var q = norm(input.value);
    var n = 0;
    items.forEach(function (li) {
      var ok = (!q || norm(li.textContent).indexOf(q) !== -1) &&
               (!solo.checked || li.querySelector('a')) &&
               (!materiaActual || li.getAttribute('data-materias').indexOf('|' + materiaActual + '|') !== -1);
      li.hidden = !ok;
      if (ok) n++;
    });
    years.forEach(function (h) {
      var ul = h.nextElementSibling;
      var visible = ul && Array.prototype.some.call(ul.children, function (li) { return !li.hidden; });
      h.hidden = !visible;
      if (ul) ul.hidden = !visible;
    });
    var filtrando = !!(q || solo.checked || materiaActual);
    Array.prototype.forEach.call(lista.querySelectorAll('.separador-decada'), function (s) { s.hidden = filtrando; });
    nav.hidden = filtrando;
    vacio.hidden = n > 0;
  }
  input.addEventListener('input', aplicar);
  solo.addEventListener('change', aplicar);
})();
