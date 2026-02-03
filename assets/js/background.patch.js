console.log("BACKGROUND PATCH LOADED");

(() => {

function applyBg(val){
  const targets = [
    document.getElementById("menu-display"),
    document.getElementById("settings-display"),
    document.getElementById("gallery-display"),
  ].filter(Boolean);

  if (targets.length === 0) return;

  if(!val){
    targets.forEach(el => {
      el.style.backgroundImage = "";
      // rikthe overlay default (nëse do)
      if (el.id === "menu-display") el.style.backgroundColor = "rgba(0,0,0,0.3)";
      if (el.id !== "menu-display") el.style.backgroundColor = "rgba(0,0,0,0.5)";
    });
    return;
  }

  // Gradient
  if(val.startsWith("linear-gradient") || val.startsWith("radial-gradient")){
    targets.forEach(el => {
      el.style.backgroundImage = "";
      el.style.background = val; // gradient si background direkt
    });
    return;
  }

  // Image URL
  targets.forEach(el => {
    el.style.background = ""; // pastro gradient nëse kishte
    el.style.backgroundImage = `url("${val}")`;
  });
}



  document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("bg-url");
    if(!input){
      console.log("bg-url input not found");
      return;
    }

    const saved = localStorage.getItem("ZYNX_BG");
    if(saved){
      input.value = saved;
      applyBg(saved);
    }

    input.addEventListener("input", () => {
      const v = input.value.trim();
      localStorage.setItem("ZYNX_BG", v);
      applyBg(v);
    });

  });

})();
