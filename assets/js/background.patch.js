console.log("BACKGROUND PATCH LOADED");

(() => {

  function applyBg(val){
    if(!val){
      document.body.style.background = "";
      return;
    }

    // Nese eshte gradient
    if(val.startsWith("linear-gradient") || val.startsWith("radial-gradient")){
      document.body.style.background = val;
    } 
    // Nese eshte foto
    else {
      document.body.style.background = `url("${val}") center / cover no-repeat`;
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
