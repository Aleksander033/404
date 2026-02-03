console.log("BACKGROUND PATCH LOADED");

(() => {

function applyBg(val){
  const canvas = document.getElementById("game-display");
  const menu = document.getElementById("menu-display");

  if(!canvas) return;

  if(!val){
    canvas.style.background = "";
    if(menu) menu.style.backgroundImage = "";
    return;
  }

  if(val.startsWith("linear-gradient") || val.startsWith("radial-gradient")){
    canvas.style.background = val;
  } else {
    canvas.style.background = `url("${val}") center / cover no-repeat`;
  }
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
