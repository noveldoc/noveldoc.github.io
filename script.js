(() => {
  const config = window.NDR_SITE_CONFIG || {};
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  navToggle?.addEventListener("click", () => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
  });

  nav?.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });

  const tabs = [...document.querySelectorAll("[data-shot]")];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  function selectShot(name) {
    tabs.forEach((tab, index) => {
      const selected = tab.dataset.shot === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (panels[index]) panels[index].hidden = !selected;
    });
  }

  if (tabs.length) selectShot(tabs[0].dataset.shot);
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectShot(tab.dataset.shot));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      selectShot(tabs[next].dataset.shot);
    });
  });

  document.querySelectorAll("[data-support-email]").forEach((link) => {
    if (!config.supportEmail) return;
    link.textContent = config.supportEmail;
    link.href = `mailto:${config.supportEmail}`;
  });

  document.querySelectorAll("[data-store-link]").forEach((link) => {
    if (!config.chromeWebStoreUrl) {
      link.addEventListener("click", (event) => event.preventDefault());
      return;
    }
    link.href = config.chromeWebStoreUrl;
    link.removeAttribute("aria-disabled");
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
})();
