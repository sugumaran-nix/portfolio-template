/**
 * petals.js — floating petal particle system v2
 */
(function () {
  const canvas = document.getElementById('petal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [
    'rgba(255,183,197,0.50)',
    'rgba(201,184,240,0.45)',
    'rgba(255,214,176,0.45)',
    'rgba(255,228,236,0.55)',
    'rgba(237,232,252,0.50)',
  ];

  let W, H, petals = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  class Petal {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x      = Math.random() * W;
      this.y      = init ? Math.random() * H : -20;
      this.size   = 5 + Math.random() * 9;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.speedY = 0.35 + Math.random() * 0.65;
      this.speedX = (Math.random() - 0.5) * 0.55;
      this.angle  = Math.random() * Math.PI * 2;
      this.rotSpd = (Math.random() - 0.5) * 0.035;
      this.swing  = Math.random() * Math.PI * 2;
      this.swingR = 0.35 + Math.random() * 0.55;
      this.type   = Math.random() < 0.5 ? 'petal' : 'circle';
    }

    update() {
      this.swing  += 0.022;
      this.x      += this.speedX + Math.sin(this.swing) * this.swingR;
      this.y      += this.speedY;
      this.angle  += this.rotSpd;
      if (this.y > H + 25 || this.x < -30 || this.x > W + 30) this.reset();
    }

    draw() {
      const alpha = isDark() ? 0.6 : 1;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;

      if (this.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.55, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Petal bezier
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo( s * 0.8, -s * 0.55,  s * 0.8,  s * 0.55, 0,  s);
        ctx.bezierCurveTo(-s * 0.8,  s * 0.55, -s * 0.8, -s * 0.55, 0, -s);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function init() {
    resize();
    petals = Array.from({ length: 26 }, () => new Petal());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  loop();
})();
