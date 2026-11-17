(() => {
  const root = document.documentElement;
  let stored = null;
  try {
    stored = localStorage.getItem("kh-theme");
  } catch {}
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.dataset.theme = stored === "dark" || stored === "light" ? stored : system;
})();
