(() => {
  function applyBg(url){
    if(!url){
      document.body.classList.remove("custom-bg");
      document.body.style.backgroundImage = "";
      return;
    }
    document.body.classList.add("custom-bg");
    document.body.style.backgroundImage = `url(${url})`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("bg-url");
    if(!input) return;

    // load saved
    const saved = localStorage.getItem("ZYNX_BG");
    if(saved){
      input.value = saved;
      applyBg(saved);
    }

    input.addEventListener("change", () => {
      const url = input.value.trim();
      localStorage.setItem("ZYNX_BG", url);
      applyBg(url);
    });
  });
})();
