(function(){
  var plantUmlRenderTasks = [];
  var urlParams = new URLSearchParams(window.location.search);
  var isExportMode = urlParams.has('exportPdf');

  function getImmediateHeading(section) {
    var child = section.firstElementChild;
    while (child) {
      if (child.tagName === 'H2') return child;
      child = child.nextElementSibling;
    }
    return null;
  }

  function getImmediateBody(section) {
    var child = section.firstElementChild;
    while (child) {
      if (child.classList && child.classList.contains('section-body')) return child;
      child = child.nextElementSibling;
    }
    return null;
  }

  function setSectionExpanded(section, expanded) {
    var heading = getImmediateHeading(section);
    section.classList.toggle('is-collapsed', !expanded);
    if (heading) heading.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function ensureSectionStructure(section) {
    var heading = getImmediateHeading(section);
    if (!heading) return;

    var body = getImmediateBody(section);
    if (!body) {
      body = document.createElement('div');
      body.className = 'section-body';

      var node = heading.nextSibling;
      while (node) {
        var next = node.nextSibling;
        body.appendChild(node);
        node = next;
      }
      section.appendChild(body);
    }

    if (!heading.classList.contains('section-toggle-ready')) {
      heading.classList.add('section-toggle-ready');
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');

      heading.addEventListener('click', function() {
        setSectionExpanded(section, section.classList.contains('is-collapsed'));
      });

      heading.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSectionExpanded(section, section.classList.contains('is-collapsed'));
        }
      });
    }
  }

  function initCollapsibleSections() {
    var sections = Array.from(document.querySelectorAll('main > section'));
    sections.forEach(ensureSectionStructure);

    sections.forEach(function(section) {
      setSectionExpanded(section, isExportMode || section.id === 'executive-summary');
    });

    function setAllSectionsExpanded(expanded) {
      sections.forEach(function(section) { setSectionExpanded(section, expanded); });
    }

    function expandFromHash(hash) {
      if (!hash || hash.length < 2) return;
      var id = decodeURIComponent(hash.slice(1));
      var target = document.getElementById(id);
      if (!target) return;
      var section = target.closest('section');
      if (section) setSectionExpanded(section, true);
    }

    document.querySelectorAll('nav a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function() {
        expandFromHash(link.getAttribute('href'));
      });
    });

    var expandAllBtn = document.getElementById('expand-all-sections');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', function() {
        setAllSectionsExpanded(true);
      });
    }

    var collapseAllBtn = document.getElementById('collapse-all-sections');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', function() {
        setAllSectionsExpanded(false);
      });
    }

    window.addEventListener('beforeprint', function() {
      setAllSectionsExpanded(true);
    });

    window.addEventListener('hashchange', function() {
      expandFromHash(window.location.hash);
    });

    expandFromHash(window.location.hash);

    return {
      sections: sections,
      setAllSectionsExpanded: setAllSectionsExpanded
    };
  }

  function encodePlantUML(src) {
    var bytes = new TextEncoder().encode(src);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return '~h' + hex;
  }

  function getType(src) {
    return /^@startjson|^@startyaml/i.test(src.trim()) ? 'JSON/YAML' :
           /^@startgantt/i.test(src.trim()) ? 'Gantt' :
           /@startuml/i.test(src) && /->|-->/.test(src) && /start\b/.test(src) ? 'Activity' :
           /@startuml/i.test(src) && /->|-->/.test(src) ? 'Sequence' :
           'PlantUML';
  }

  function containsArabic(src) {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(src);
  }

  async function renderDiagram(pre) {
    var src = pre.textContent.trim();
    var encoded = encodePlantUML(src);
    var preferPng = containsArabic(src);
    var format = preferPng ? 'png' : 'svg';
    var fallbackFormat = preferPng ? 'svg' : 'png';
    var imgUrl = 'https://www.plantuml.com/plantuml/' + format + '/' + encoded;
    var fallbackUrl = 'https://www.plantuml.com/plantuml/' + fallbackFormat + '/' + encoded;
    var type = getType(src);

    /* Get title from preceding h3 */
    var titleEl = pre.previousElementSibling;
    var title = (titleEl && titleEl.matches('h3')) ? titleEl.textContent.trim() : 'مخطط';

    /* Build panel */
    var panel = document.createElement('div');
    panel.className = 'pu-panel';

    var toolbar = document.createElement('div');
    toolbar.className = 'pu-toolbar';
    toolbar.innerHTML =
      '<div class="pu-toolbar-left">'
      + '<span class="pu-type-badge">' + type + '</span>'
      + '<span class="pu-toolbar-title">' + title + '</span>'
      + '</div>'
      + '<button class="pu-btn pu-toggle-btn" title="عرض / إخفاء الكود المصدري">{ } الكود</button>';

    var diagramDiv = document.createElement('div');
    diagramDiv.className = 'pu-diagram';
    diagramDiv.innerHTML = '<div class="pu-loader">⏳ جاري تحميل المخطط…</div>';

    var sourceDiv = document.createElement('div');
    sourceDiv.className = 'pu-source';
    var codePre = document.createElement('pre');
    codePre.textContent = src;
    sourceDiv.appendChild(codePre);

    panel.appendChild(toolbar);
    panel.appendChild(diagramDiv);
    panel.appendChild(sourceDiv);

    /* Load image */
    var img = new Image();
    var imageLoaded = new Promise(function(resolve) {
      var triedFallback = false;

      img.onload = function() {
        diagramDiv.innerHTML = '';
        diagramDiv.appendChild(img);
        resolve();
      };
      img.onerror = function() {
        if (!triedFallback) {
          triedFallback = true;
          img.src = fallbackUrl;
          return;
        }
        diagramDiv.innerHTML =
          '<div class="pu-error">تعذّر تحميل المخطط.'
          + ' <a href="' + imgUrl + '" target="_blank">افتح في متصفح جديد</a>'
          + '</div>';
        resolve();
      };
    });
    img.src = imgUrl;
    img.alt = title;

    /* Toggle source */
    toolbar.querySelector('.pu-toggle-btn').addEventListener('click', function() {
      var open = sourceDiv.classList.toggle('open');
      this.textContent = open ? '{ } إخفاء' : '{ } الكود';
    });

    /* Replace pre with panel */
    pre.parentNode.replaceChild(panel, pre);

    await imageLoaded;
  }

  function initExportButton(sectionApi) {
    var exportBtn = document.getElementById('export-pdf');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', async function() {
      exportBtn.disabled = true;
      var originalText = exportBtn.textContent;
      exportBtn.textContent = 'Preparing...';

      try {
        sectionApi.setAllSectionsExpanded(true);
        await Promise.allSettled(plantUmlRenderTasks);
        await new Promise(function(resolve) { window.setTimeout(resolve, 600); });
        window.print();
      } finally {
        exportBtn.disabled = false;
        exportBtn.textContent = originalText;
      }
    });
  }

  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('img');
      btn.className = 'back-to-top';
      btn.src = 'top-arrow.png';
      btn.alt = 'العودة إلى الأعلى';
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('title', 'العودة إلى الأعلى');
      document.body.appendChild(btn);
    }

    function syncVisibility() {
      btn.classList.toggle('is-visible', window.scrollY > 250);
    }

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    window.addEventListener('scroll', syncVisibility, { passive: true });
    syncVisibility();
  }

  /* ===== وضع العرض المبسط ===== */
  var SIMPLE_KEY = 'spf-brd-simplified';
  var REF_PAREN = /\s*\((?:FR|NFR|BR|US|KPI|DLG)-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\s*[،,\/]\s*(?:(?:FR|NFR|BR|US|KPI|DLG)-)?[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)*\.?\)/g;
  var REF_TAIL = /\s*[—–]\s*(?:FR|NFR|BR|US|KPI|DLG)-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*(?:\s*[،,\/]\s*(?:(?:FR|NFR|BR|US|KPI|DLG)-)?[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)*\s*$/;

  function markInlineRefs(root) {
    var skip = { PRE: 1, CODE: 1, SCRIPT: 1, STYLE: 1 };
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        while (p && p !== root) {
          if (skip[p.tagName] || (p.classList && p.classList.contains('tech-ref'))) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var targets = [];
    var node;
    while ((node = walker.nextNode())) {
      REF_PAREN.lastIndex = 0;
      if (REF_PAREN.test(node.nodeValue) || REF_TAIL.test(node.nodeValue)) targets.push(node);
    }

    targets.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var frag = document.createDocumentFragment();
      var last = 0;
      var m;

      REF_PAREN.lastIndex = 0;
      while ((m = REF_PAREN.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = 'tech-ref';
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }

      var rest = text.slice(last);
      var tail = rest.match(REF_TAIL);
      if (tail) {
        if (tail.index > 0) frag.appendChild(document.createTextNode(rest.slice(0, tail.index)));
        var tailSpan = document.createElement('span');
        tailSpan.className = 'tech-ref';
        tailSpan.textContent = tail[0];
        frag.appendChild(tailSpan);
      } else if (rest) {
        frag.appendChild(document.createTextNode(rest));
      }

      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function markRefColumns(scope) {
    if (!scope) return;
    Array.from(scope.querySelectorAll('table')).forEach(function (table) {
      var headRow = table.querySelector('thead tr');
      if (!headRow) return;
      var heads = Array.from(headRow.children);
      var idx = heads.findIndex(function (th) { return th.textContent.trim() === 'المرجع'; });
      if (idx < 0) return;
      heads[idx].classList.add('tech-col');
      Array.from(table.querySelectorAll('tbody tr')).forEach(function (tr) {
        var cell = tr.children[idx];
        if (cell) cell.classList.add('tech-col');
      });
    });
  }

  function initSimplifiedMode() {
    var main = document.querySelector('main');
    if (main) {
      markInlineRefs(main);
      markRefColumns(document.getElementById('kpis'));
    }

    /* إخفاء عناصر الفهرس التي تشير إلى الأقسام التقنية */
    document.querySelectorAll('nav .toc-list a[href^="#"]').forEach(function (link) {
      var target = document.getElementById(decodeURIComponent(link.getAttribute('href').slice(1)));
      if (target && target.getAttribute('data-audience') === 'tech') {
        var li = link.closest('li');
        if (li) li.classList.add('tech-only');
      }
    });

    var btn = document.getElementById('toggle-simplified');
    if (!btn) return;

    function apply(on) {
      document.body.classList.toggle('simplified', on);
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'العرض الكامل' : 'العرض المبسط';
      try { localStorage.setItem(SIMPLE_KEY, on ? '1' : '0'); } catch (e) {}
    }

    var saved = '0';
    try { saved = localStorage.getItem(SIMPLE_KEY) || '0'; } catch (e) {}
    apply(saved === '1' && !isExportMode);

    btn.addEventListener('click', function () {
      apply(!document.body.classList.contains('simplified'));
    });
  }

  /* Run after DOM ready */
  function init() {
    var sectionApi = initCollapsibleSections();
    initBackToTop();
    initSimplifiedMode();

    var pres = Array.from(document.querySelectorAll('pre'));
    pres.filter(function(p){ return p.textContent.includes('@startuml'); })
        .forEach(function(pre) {
          var task = renderDiagram(pre);
          plantUmlRenderTasks.push(task);
        });

    initExportButton(sectionApi);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
