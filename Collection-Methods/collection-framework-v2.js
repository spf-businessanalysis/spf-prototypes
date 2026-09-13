"use strict";
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const entries = $$("main section[data-title], main details.appendix[data-title]");
  const links = entries.map(el => `<li class="${el.tagName === "DETAILS" ? "is-appendix" : ""}"><a href="#${el.id}"><span>${el.dataset.number}</span><span>${el.dataset.title}</span></a></li>`).join("");
  $("#toc").innerHTML = links;
  $("#mobileToc").innerHTML = links;
  $("#mobileToc").addEventListener("click", () => { $(".mobile-toc").open = false; });

  function openTarget(hash) {
    const el = hash && document.getElementById(hash.slice(1));
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  $$("a[href^='#']").forEach(a => a.addEventListener("click", () => openTarget(a.getAttribute("href"))));
  window.addEventListener("hashchange", () => openTarget(location.hash));
  openTarget(location.hash);
  $$("details.appendix").forEach(d => d.addEventListener("toggle", () => { $(".toggle", d).textContent = d.open ? "اضغط للإخفاء" : "اضغط للعرض"; }));

  const navLinks = new Map($$(".side-nav a").map(link => [link.getAttribute("href").slice(1), link]));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(items => {
      items.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks.get(entry.target.id)?.classList.add("active");
      });
    }, { rootMargin: "-82px 0px -68% 0px" });
    entries.forEach(el => observer.observe(el));
  }
  window.addEventListener("scroll", () => {
    const root = document.documentElement;
    const available = root.scrollHeight - root.clientHeight;
    $("#readingProgress").style.width = `${available > 0 ? root.scrollTop / available * 100 : 0}%`;
  }, { passive: true });
})();
