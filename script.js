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
  const panels = {
    workspace: document.querySelector("#shot-workspace"),
    settings: document.querySelector("#shot-settings")
  };

  function selectShot(name) {
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.shot === name)));
    Object.entries(panels).forEach(([key, panel]) => { if (panel) panel.hidden = key !== name; });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectShot(tab.dataset.shot));
    tab.addEventListener("keydown", (event) => {
      if (![/ArrowLeft/, /ArrowRight/].some((pattern) => pattern.test(event.key))) return;
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
