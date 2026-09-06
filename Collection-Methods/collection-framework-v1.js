"use strict";

// Collection framework v1.

const select = (selector, root) => (root || document).querySelector(selector);
const selectAll = (selector, root) => Array.from((root || document).querySelectorAll(selector));

function statusBadge(key) {
  const item = STATUS_LABELS[key] || STATUS_LABELS.review;
  return "<span class=\"status " + item[1] + "\">" + item[0] + "</span>";
}

function renderCards() {
  select("#principles").innerHTML = PRINCIPLES.map(function (item, index) {
    return "<article class=\"principle-card\"><span class=\"card-number\">" + (index + 1) + "</span><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");

  select("#headlineMetrics").innerHTML = HEADLINE_METRICS.map(function (item) {
    return "<article class=\"metric-card\"><span>" + item[1] + "</span><strong>" + item[0] + "</strong><p>" + item[2] + "</p></article>";
  }).join("");
}

function renderShareFigure() {
  const data = CONTRIBUTION_SHARES;
  const rows = data.rows.map(function (row) {
    return "<div class=\"share-row\"><span class=\"share-name\">" + row[0] + "</span>" +
      "<span class=\"share-track\"><i style=\"width:" + (row[1] / data.max * 100) + "%\"></i></span>" +
      "<strong class=\"share-value\">" + row[2] + "</strong>" +
      "<span class=\"share-base\">" + row[3] + "</span></div>";
  }).join("");
  select("#shareFigure").innerHTML = "<p class=\"share-title\">" + data.title + "</p>" + rows;
}

function renderCurrentMethods() {
  select("#currentMethods").innerHTML = CURRENT_METHODS.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td>" + statusBadge(item[1]) + "</td><td>" + item[2] + "</td></tr>";
  }).join("");
}

function outcomeRow(data) {
  const totalWidth = data.values.reduce(function (sum, item) { return sum + item[1]; }, 0);
  const segments = data.values.map(function (item) {
    const width = item[1] / totalWidth * 100;
    const label = item[1] >= 7 ? item[1] + "%" : "";
    return "<div class=\"outcome-segment\" style=\"width:" + width + "%\" title=\"" + item[0] + ": " + item[1] + UI_TEXT.percentageSeparator + item[2] + " " + UI_TEXT.invoiceUnit + "\">" + label + "</div>";
  }).join("");
  const legend = data.values.map(function (item) {
    return "<span>" + item[0] + "<b>" + item[1] + "% · " + item[2] + "</b></span>";
  }).join("");
  const paid = data.values.slice(0, 3).reduce(function (s, item) { return s + item[1]; }, 0);
  const unpaid = totalWidth - paid;
  return "<div class=\"outcome-summary\"><strong>" + data.name + "</strong><span>" + data.total + "</span></div>" +
    "<div class=\"outcome-bar\" role=\"img\" aria-label=\"" + UI_TEXT.outcomeAriaPrefix + data.name + "\">" + segments + "</div>" +
    "<div class=\"outcome-groups\"><span style=\"width:" + (paid / totalWidth * 100) + "%\">" + UI_TEXT.groupPaid + "</span>" +
    "<span style=\"width:" + (unpaid / totalWidth * 100) + "%\">" + UI_TEXT.groupUnpaid + "</span></div>" +
    "<div class=\"outcome-legend\">" + legend + "</div>";
}

function renderOutcome() {
  select("#outcomeChart").innerHTML = Object.keys(OUTCOMES).map(function (key) {
    return outcomeRow(OUTCOMES[key]);
  }).join("");
}

function renderJourney() {
  select("#requiredJourney").innerHTML = REQUIRED_JOURNEY.map(function (item, index) {
    return processStep(item, index);
  }).join("");

  select("#caseRoutes").innerHTML = CASE_ROUTES.map(function (item) {
    return "<article class=\"case-card\"><div><span class=\"case-branch\">" + UI_TEXT.branchFrom + "</span>" +
      "<span class=\"case-icon\">" + item[0] + "</span><h4>" + item[1] + "</h4><p>" + item[2] + "</p>" +
      "<span class=\"route\">" + item[3] + "</span></div></article>";
  }).join("");
}

function processStep(item, index) {
  return "<article class=\"process-step\"><span class=\"step-number\">" + (index + 1) + "</span><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
}

function workflowPhase(item, index) {
  const steps = item.items.map(function (step) {
    return "<li>" + step + "</li>";
  }).join("");
  return "<article class=\"workflow-phase\"><div class=\"workflow-heading\"><span>" + (index + 1) + "</span><h4>" + item.title + "</h4></div><p>" + item.summary + "</p><ul>" + steps + "</ul></article>";
}

function renderMethods() {
  select("#targetMethods").innerHTML = TARGET_METHODS.map(function (item) {
    return "<article class=\"method-card\"><span class=\"method-icon\">" + item[0] + "</span><h4>" + item[1] + "</h4><p>" + item[2] + "</p>" + statusBadge(item[3]) + "</article>";
  }).join("");

  select("#directDebitFlow").innerHTML = DIRECT_DEBIT_FLOW.map(function (item, index) {
    return processStep(item, index);
  }).join("");

  select("#benchmarks").innerHTML = BENCHMARKS.map(function (item) {
    return "<article class=\"benchmark-card\"><span class=\"country\">" + item.country + "</span><h4>" + item.title + "</h4><p>" + item.detail + "</p><p><strong>" + item.use + "</strong></p><a href=\"" + item.source + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + UI_TEXT.officialSource + "</a></article>";
  }).join("");
}

function renderTreatments() {
  select("#financialTreatments").innerHTML = FINANCIAL_TREATMENTS.map(function (item) {
    return "<article class=\"treatment-card\"><div class=\"card-top\"><h4>" + item[0] + "</h4>" + statusBadge(item[2]) + "</div><p>" + item[1] + "</p><span class=\"condition\">" + item[3] + "</span></article>";
  }).join("");

  select("#customPlanWorkflow").innerHTML = CUSTOM_PLAN_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  select("#classificationRules").innerHTML = CLASSIFICATION_RULES.map(function (item) {
    return "<details class=\"rule-item\"><summary><strong>" + item.group + "</strong><span>" + item.when + "</span></summary>" +
      "<div class=\"rule-body\"><p><span>" + UI_TEXT.ruleSystem + "</span>" + item.system + "</p>" +
      "<p><span>" + UI_TEXT.ruleStaff + "</span>" + item.staff + "</p></div></details>";
  }).join("");

  const band = RESTRICTION_STEPS.map(function (item, index) {
    return "<i style=\"flex:" + item.weight + " 1 0\" data-tone=\"" + (index + 1) + "\"></i>";
  }).join("");
  const ticks = RESTRICTION_STEPS.map(function (item) {
    return "<i style=\"flex:" + item.weight + " 1 0\">" + (item.tick ? "<b>" + item.tick + "</b>" : "") + "</i>";
  }).join("");
  const labels = RESTRICTION_STEPS.map(function (item, index) {
    return "<button class=\"restriction-step\" type=\"button\" style=\"flex:" + item.weight + " 1 0\" data-restriction=\"" + index +
      "\" data-tone=\"" + (index + 1) + "\" aria-pressed=\"" + (index === 0) + "\"><strong>" + item.title + "</strong><span>" + item.period + "</span></button>";
  }).join("");
  select("#restrictionLadder").innerHTML =
    "<div class=\"timeline-band\" role=\"img\" aria-label=\"" + UI_TEXT.restrictionAxis + "\">" + band + "</div>" +
    "<div class=\"timeline-ticks\" aria-hidden=\"true\">" + ticks + "</div>" +
    "<div class=\"timeline-axis-note\">" + UI_TEXT.restrictionAxis + "</div>" +
    "<div class=\"timeline-labels\">" + labels + "</div>";

  select("#setoffWorkflow").innerHTML = SETOFF_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  select("#appealWorkflow").innerHTML = APPEAL_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  showRestriction(0);
}

function showRestriction(index) {
  const item = RESTRICTION_STEPS[index];
  select("#restrictionDetail").innerHTML =
    "<h4>" + item.title + "</h4><dl>" +
    "<dt>" + UI_TEXT.restrictionAction + "</dt><dd>" + item.action + "</dd>" +
    "<dt>" + UI_TEXT.restrictionScope + "</dt><dd>" + item.scope + "</dd>" +
    "<dt>" + UI_TEXT.restrictionReference + "</dt><dd>" + item.reference + "</dd>" +
    "</dl>";
}

function renderGovernance() {
  select("#rolesTable").innerHTML = ROLES.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td>" + item[1] + "</td><td>" + item[2] + "</td></tr>";
  }).join("");

  select("#kpis").innerHTML = KPIS.map(function (item) {
    return "<article class=\"kpi-card\"><strong>" + item[0] + "</strong><span class=\"measure\">" + item[1] + "</span></article>";
  }).join("");

  select("#implementationWaves").innerHTML = WAVES.map(function (item) {
    const list = item.items.map(function (entry) { return "<li>" + entry + "</li>"; }).join("");
    return "<article class=\"wave-card\"><span class=\"wave-number\">" + item.number + "</span><h4>" + item.title + "</h4><ul>" + list + "</ul></article>";
  }).join("");

  // select("#decisions").innerHTML = DECISIONS.map(function (item) {
  //   return "<li><strong>" + item[0] + "</strong><p>" + item[1] + "</p></li>";
  // }).join("");
}

function legalSupport(type) {
  if (type === "direct") {
    return "<span class=\"legal-support legal-direct\">" + UI_TEXT.legalDirect + "</span>";
  }
  if (type === "partial") {
    return "<span class=\"legal-support legal-partial\">" + UI_TEXT.legalPartial + "</span>";
  }
  return "<span class=\"legal-support legal-none\">" + UI_TEXT.legalNone + "</span>";
}

function renderLegalSummary() {
  const tally = { direct: 0, partial: 0, none: 0 };
  LEGAL_ITEMS.forEach(function (item) { tally[item[3]] += 1; });
  const marks = [
    ["direct", tally.direct, UI_TEXT.legalDirect],
    ["partial", tally.partial, UI_TEXT.legalPartial],
    ["none", tally.none, UI_TEXT.legalNone]
  ];
  select("#legalSummary").innerHTML =
    "<p class=\"legal-summary-title\">" + UI_TEXT.legalSummaryTitle + "</p>" +
    "<div class=\"legal-summary-marks\">" + marks.map(function (m) {
      return "<article data-legal=\"" + m[0] + "\"><strong>" + m[1] + "</strong><span>" + m[2] + "</span></article>";
    }).join("") + "</div>";
}

function renderAppendices() {
  select("#legalTable").innerHTML = LEGAL_ITEMS.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td><a href=\"" + item[2] + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + item[1] + "</a></td><td>" + legalSupport(item[3]) + "<p>" + item[4] + "</p></td><td>" + item[5] + "</td></tr>";
  }).join("");

  select("#riskList").innerHTML = RISKS.map(function (item) {
    return "<article class=\"risk-item\"><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");
}

function setupInteractions() {
  select("#restrictionLadder").addEventListener("click", function (event) {
    const button = event.target.closest("[data-restriction]");
    if (!button) {
      return;
    }
    selectAll("[data-restriction]").forEach(function (item) {
      item.setAttribute("aria-pressed", String(item === button));
    });
    showRestriction(Number(button.dataset.restriction));
  });

  // select("#expandAll").addEventListener("click", function (event) {
  //   const button = event.currentTarget;
  //   const shouldOpen = button.getAttribute("aria-pressed") !== "true";
  //   selectAll(".appendix-panel").forEach(function (panel) {
  //     panel.open = shouldOpen;
  //   });
  //   button.setAttribute("aria-pressed", String(shouldOpen));
  //   button.textContent = shouldOpen ? UI_TEXT.appendicesClose : UI_TEXT.appendicesOpen;
  // });

  // const themeButton = select("#themeBtn");

  // function setTheme(theme) {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   const dark = theme === "dark";
  //   themeButton.setAttribute("aria-pressed", String(dark));
  //   themeButton.textContent = dark ? UI_TEXT.themeLight : UI_TEXT.themeDark;
  // }

  // themeButton.addEventListener("click", function () {
  //   const current = document.documentElement.getAttribute("data-theme") || "light";
  //   const next = current === "dark" ? "light" : "dark";
  //   setTheme(next);
  //   try {
  //     localStorage.setItem("collection-theme", next);
  //   } catch (error) {
  //     return;
  //   }
  // });

  // try {
  //   const savedTheme = localStorage.getItem("collection-theme");
  //   if (savedTheme === "dark" || savedTheme === "light") {
  //     setTheme(savedTheme);
  //   }
  // } catch (error) {
  //   setTheme("light");
  // }
}

function setupNavigation() {
  const sections = selectAll("section[data-title]");
  const links = sections.map(function (section) {
    return "<li><a href=\"#" + section.id + "\"><span>" + section.dataset.number + "</span><span>" + section.dataset.title + "</span></a></li>";
  }).join("");

  select("#toc").innerHTML = links;
  select("#mobileToc").innerHTML = links;

  select("#mobileToc").addEventListener("click", function () {
    select(".mobile-toc").open = false;
  });

  const navLinks = new Map(selectAll(".side-nav a").map(function (link) {
    return [link.getAttribute("href").slice(1), link];
  }));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        navLinks.forEach(function (link) { link.classList.remove("active"); });
        const active = navLinks.get(entry.target.id);
        if (active) {
          active.classList.add("active");
        }
      });
    }, { rootMargin: "-82px 0px -68% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  window.addEventListener("scroll", function () {
    const root = document.documentElement;
    const available = root.scrollHeight - root.clientHeight;
    const progress = available > 0 ? root.scrollTop / available * 100 : 0;
    select("#readingProgress").style.width = progress + "%";
  }, { passive: true });
}

renderCards();
renderShareFigure();
renderCurrentMethods();
renderOutcome();
renderJourney();
renderMethods();
renderTreatments();
renderGovernance();
renderLegalSummary();
// renderAppendices();
setupInteractions();
setupNavigation();
