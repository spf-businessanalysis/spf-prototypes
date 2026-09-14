"use strict";
(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const entries = $$("main section[data-title], main details.appendix[data-title]");
  const links = entries.map(entry => `
    <li class="${entry.tagName === "DETAILS" ? "is-appendix" : ""}">
      <a href="#${entry.id}"><span>${entry.dataset.number}</span><span>${entry.dataset.title}</span></a>
    </li>`).join("");

  $("#toc").innerHTML = links;
  $("#mobileToc").innerHTML = links;
  $("#mobileToc").addEventListener("click", () => { $(".mobile-toc").open = false; });

  function openTarget(hash) {
    const target = hash && document.getElementById(hash.slice(1));
    if (target?.tagName === "DETAILS") target.open = true;
  }

  $$("a[href^='#']").forEach(link => link.addEventListener("click", () => openTarget(link.getAttribute("href"))));
  window.addEventListener("hashchange", () => openTarget(location.hash));
  openTarget(location.hash);

  $$("details.appendix").forEach(details => {
    details.addEventListener("toggle", () => {
      const label = $(".toggle", details);
      if (label) label.textContent = details.open ? "اضغط للإخفاء" : "اضغط للعرض";
    });
  });

  function prepareRouter(rootSelector, buttonSelector, panelSelector, key) {
    const root = $(rootSelector);
    if (!root) return;
    const buttons = $$(buttonSelector, root);
    const panels = $$(panelSelector, root);

    buttons.forEach(button => {
      button.setAttribute("role", "tab");
      button.addEventListener("click", () => {
        const selected = button.dataset[key];
        buttons.forEach(item => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-selected", String(active));
        });
        panels.forEach(panel => { panel.hidden = panel.dataset[`${key}Panel`] !== selected; });
      });
    });
    panels.forEach(panel => panel.setAttribute("role", "tabpanel"));
  }

  prepareRouter("[data-case-router]", "[data-case]", "[data-case-panel]", "case");
  prepareRouter("[data-level-router]", "[data-level]", "[data-level-panel]", "level");

  const enablerCards = $$(".enabler");
  const stageGroups = [];

  $$(".stage-title").forEach(title => {
    const stage = title.dataset.stage || "team";
    const group = { stage, title, members: [], cards: [] };
    let node = title.nextElementSibling;

    while (node && !node.matches(".stage-title")) {
      node.dataset.enablerStage = stage;
      group.members.push(node);
      if (node.matches(".enabler-grid")) {
        $$(".enabler", node).forEach(card => {
          card.dataset.stage = stage;
          group.cards.push(card);
        });
      }
      node = node.nextElementSibling;
    }
    stageGroups.push(group);
  });

  enablerCards.forEach(card => {
    const stateTag = $(".tag[data-state]", card);
    card.dataset.status = stateTag?.dataset.state || "new";
    card.style.order = Number($(".enabler-number", card)?.textContent || 0);
  });

  let selectedStage = "1";
  let selectedStatus = "all";

  function applyEnablerFilters() {
    enablerCards.forEach(card => {
      const stageMatches = Boolean(selectedStage) && card.dataset.stage === selectedStage;
      const statusMatches = selectedStatus === "all" || card.dataset.status === selectedStatus;
      card.hidden = !(stageMatches && statusMatches);
      if (card.hidden) {
        card.classList.remove("expanded");
        card.setAttribute("aria-expanded", "false");
      }
    });

    stageGroups.forEach(group => {
      const hasVisibleCard = group.cards.some(card => !card.hidden);
      group.title.hidden = !hasVisibleCard;
      group.members.forEach(member => {
        if (member.matches(".enabler-grid")) {
          member.hidden = !hasVisibleCard;
        } else {
          member.hidden = !hasVisibleCard || selectedStage !== group.stage;
        }
      });
    });
    const emptyState = $("#enablerEmpty");
    if (emptyState) {
      const hasVisibleCard = enablerCards.some(card => !card.hidden);
      emptyState.hidden = hasVisibleCard;
      emptyState.textContent = selectedStage
        ? "لا توجد متطلبات تجمع بين المرحلة والحالة المحددتين."
        : "اختر إحدى المراحل أعلاه لعرض متطلبات تنفيذها.";
    }
  }

  function activateFilter(buttons, selectedButton) {
    buttons.forEach(button => {
      const active = button === selectedButton;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  const stageFilterButtons = $$("[data-stage-filter]");
  stageFilterButtons.forEach(button => button.addEventListener("click", () => {
    selectedStage = button.dataset.stageFilter;
    activateFilter(stageFilterButtons, button);
    applyEnablerFilters();
  }));

  const statusFilterButtons = $$("[data-status-filter]");
  statusFilterButtons.forEach(button => button.addEventListener("click", () => {
    selectedStatus = button.dataset.statusFilter;
    activateFilter(statusFilterButtons, button);
    applyEnablerFilters();
  }));

  function toggleEnabler(card) {
    if (document.body.dataset.view !== "session") return;
    const willExpand = !card.classList.contains("expanded");
    enablerCards.forEach(item => {
      item.classList.remove("expanded");
      item.setAttribute("aria-expanded", "false");
      item.setAttribute("aria-label", `عرض تفاصيل ${$("h4", item)?.textContent || "متطلب التنفيذ"}`);
    });
    if (willExpand) {
      card.classList.add("expanded");
      card.setAttribute("aria-expanded", "true");
      card.setAttribute("aria-label", `إخفاء تفاصيل ${$("h4", card)?.textContent || "متطلب التنفيذ"}`);
    }
  }

  function updateEnablerCardMode() {
    const interactive = document.body.dataset.view === "session";
    enablerCards.forEach(card => {
      if (interactive) {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `عرض تفاصيل ${$("h4", card)?.textContent || "متطلب التنفيذ"}`);
        card.setAttribute("aria-expanded", String(card.classList.contains("expanded")));
      } else {
        card.classList.remove("expanded");
        card.removeAttribute("tabindex");
        card.removeAttribute("role");
        card.removeAttribute("aria-label");
        card.removeAttribute("aria-expanded");
      }
    });
  }

  enablerCards.forEach(card => {
    card.addEventListener("click", () => toggleEnabler(card));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleEnabler(card);
      }
    });
  });

  const viewButtons = $$(".view-switch [data-view]");
  function setView(view) {
    document.body.dataset.view = view;
    viewButtons.forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $$("details.inline-details").forEach(details => { details.open = view === "detail"; });
    updateEnablerCardMode();
  }

  viewButtons.forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
  activateFilter(stageFilterButtons, stageFilterButtons.find(button => button.dataset.stageFilter === selectedStage));
  activateFilter(statusFilterButtons, statusFilterButtons.find(button => button.dataset.statusFilter === selectedStatus));
  setView(document.body.dataset.view || "session");
  applyEnablerFilters();

  const navLinks = new Map($$(".side-nav a").map(link => [link.getAttribute("href").slice(1), link]));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(items => {
      items.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks.get(entry.target.id)?.classList.add("active");
      });
    }, { rootMargin: "-82px 0px -68% 0px" });
    entries.forEach(entry => observer.observe(entry));
  }

  window.addEventListener("scroll", () => {
    const root = document.documentElement;
    const available = root.scrollHeight - root.clientHeight;
    $("#readingProgress").style.width = `${available > 0 ? root.scrollTop / available * 100 : 0}%`;
  }, { passive: true });
})();
