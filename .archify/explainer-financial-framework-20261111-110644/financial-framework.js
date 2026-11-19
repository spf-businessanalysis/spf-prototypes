(() => {
  const sections = [...document.querySelectorAll("main > section[data-title]")];
  const tocTargets = [document.getElementById("toc"), document.getElementById("mobileToc")].filter(Boolean);

  const makeItem = (section, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.innerHTML = `<span class="toc-no">${index + 1}</span><span>${section.dataset.title}</span>`;
    item.append(link);
    return item;
  };

  tocTargets.forEach((toc) => sections.forEach((section, index) => toc.append(makeItem(section, index))));

  const navLinks = [...document.querySelectorAll(".side-nav a")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-20% 0px -65%", threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
  }

  const progress = document.getElementById("readingProgress");
  const updateProgress = () => {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
    progress.style.width = `${ratio * 100}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();
