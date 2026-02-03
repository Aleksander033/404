(() => {
  "use strict";

  let bgVal = "";
  let img = null;

  function getNum(key, def, min, max){
    const v = parseFloat(localStorage.getItem(key));
    if (Number.isFinite(v)) return Math.min(max, Math.max(min, v));
    return def;
  }

  function load(){
    bgVal = (localStorage.getItem("ZYNX_BG") || "").trim();
    img = null;

    if (!bgVal) return;

    // Vetem URL fotoje (gradientin e leme te menu)
    if (!bgVal.startsWith("linear-gradient") && !bgVal.startsWith("radial-gradient")) {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.src = bgVal;
      img = im;
    }
  }

  load();

  // Kur e ndryshon background nga input, rifreskohet
  window.addEventListener("storage", (e) => {
    if (e.key === "ZYNX_BG" || e.key === "ZYNX_BG_OP" || e.key === "ZYNX_BG_DARK" || e.key === "ZYNX_BG_BLUR") load();
  });

  // Hook te clearRect: ne fillim te çdo frame, vizato sfondin "si duhet"
  const origClear = CanvasRenderingContext2D.prototype.clearRect;

  CanvasRenderingContext2D.prototype.clearRect = function(x,y,w,h){
    origClear.call(this, x,y,w,h);

    // vetëm te canvas kryesor (game-display zakonisht)
    const c = this.canvas;
    if (!c || c.id !== "game-display") return;

    // Vlera default (shumë "game-like")
    const OP   = getNum("ZYNX_BG_OP",   0.16, 0.00, 0.60); // sa duket foto
    const DARK = getNum("ZYNX_BG_DARK", 0.45, 0.00, 0.90); // sa e errëson sipër
    const BLUR = getNum("ZYNX_BG_BLUR", 1.5,  0.00, 6.00); // blur i lehtë

    if (!bgVal) {
      // background default
      this.save();
      this.setTransform(1,0,0,1,0,0);
      this.fillStyle = "#000";
      this.fillRect(0,0,c.width,c.height);
      this.restore();
      return;
    }

    this.save();
    // SCREEN SPACE (mos leviz me kamerën)
    this.setTransform(1,0,0,1,0,0);

    // 1) Foto e butë + blur
    if (img && img.complete && img.naturalWidth > 0) {
      this.globalAlpha = OP;
      this.filter = BLUR > 0 ? `blur(${BLUR}px)` : "none";
      this.drawImage(img, 0, 0, c.width, c.height);
      this.filter = "none";
      this.globalAlpha = 1;
    }

    // 2) Dark overlay (e bën si background “real”)
    this.globalAlpha = DARK;
    this.fillStyle = "#000";
    this.fillRect(0,0,c.width,c.height);
    this.globalAlpha = 1;

    // 3) Vignette (skajet më të errëta, si lojërat e tjera)
    const g = this.createRadialGradient(
      c.width * 0.5, c.height * 0.5, Math.min(c.width,c.height) * 0.20,
      c.width * 0.5, c.height * 0.5, Math.max(c.width,c.height) * 0.70
    );
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0.45)");
    this.fillStyle = g;
    this.fillRect(0,0,c.width,c.height);

    this.restore();
  };
})();
