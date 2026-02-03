(() => {
  let bgValue = "";
  let bgImg = null;

  function loadBgFromStorage() {
    bgValue = (localStorage.getItem("ZYNX_BG") || "").trim();
    if (!bgValue) { bgImg = null; return; }

    // nese eshte foto URL, pregatite Image
    if (!bgValue.startsWith("linear-gradient") && !bgValue.startsWith("radial-gradient")) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = bgValue;
      bgImg = img;
    } else {
      bgImg = null;
    }
  }

  // ekspozoje global qe ta perdorim ne render
  window.__ZYNX_BG_INGAME__ = {
    reload: loadBgFromStorage,
    draw(ctx, canvas) {
      if (!bgValue) return;

      // vizato ne screen-space (jo world-space)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (bgValue.startsWith("linear-gradient") || bgValue.startsWith("radial-gradient")) {
        // gradient i thjeshte vertikal (mund ta bejme edhe me 45deg)
        const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        // nese do gradient custom, do e leme nga input (me poshte te tregoj si)
        g.addColorStop(0, "#0f0f0f");
        g.addColorStop(1, "#1a2a4a");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        }
      }

      ctx.restore();
    }
  };

  // load menjëherë + çdo herë kur ndryshon localStorage
  loadBgFromStorage();
  window.addEventListener("storage", (e) => {
    if (e.key === "ZYNX_BG") loadBgFromStorage();
  });
})();
