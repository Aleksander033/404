(() => {
  "use strict";

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(() => {
    const active = document.getElementById("theme-cell-fill-active");
    const other  = document.getElementById("theme-cell-fill-other");
    if (!active || !other) return;

    // defaults
    const DEFAULT_ACTIVE = "#55d6ff";
    const DEFAULT_OTHER  = "#7cffb2";

    // load saved
    try {
      active.value = localStorage.getItem("ZynX:cellActive") || active.value || DEFAULT_ACTIVE;
      other.value  = localStorage.getItem("ZynX:cellOther")  || other.value  || DEFAULT_OTHER;
    } catch (e) {}

    // expose globally (renderer mund ta lexojë)
    window.__ZYNX_THEME__ = window.__ZYNX_THEME__ || {};
    window.__ZYNX_THEME__.cellActive = active.value;
    window.__ZYNX_THEME__.cellOther  = other.value;

    function saveAndSet() {
      window.__ZYNX_THEME__.cellActive = active.value;
      window.__ZYNX_THEME__.cellOther  = other.value;

      try {
        localStorage.setItem("ZynX:cellActive", active.value);
        localStorage.setItem("ZynX:cellOther", other.value);
      } catch (e) {}
    }

    active.addEventListener("input", saveAndSet);
    other.addEventListener("input", saveAndSet);
  });
})();
