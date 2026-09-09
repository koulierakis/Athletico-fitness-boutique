(() => {
  'use strict';

  const isDesktop = window.matchMedia('(min-width: 1025px) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = document.createElement('style');
  style.id = 'athletico-luxury-interactions-style';
  style.textContent = `
    @media (min-width:1025px) and (pointer:fine){
      body, a, button, .grid-item, .exp-card, .hotspot, .luxury-menu-item, .team-link, .menu-toggle{cursor:none!important}
      .custom-cursor-dot,.custom-cursor-circle{display:block}
    }
    .custom-cursor-dot,.custom-cursor-circle{display:none;position:fixed;left:0;top:0;transform:translate(-50%,-50%);pointer-events:none}
    .custom-cursor-dot{width:6px;height:6px;background:#d4af37;border-radius:50%;z-index:10000;transition:width .3s,height .3s,background-color .3s}
    .custom-cursor-circle{width:40px;height:40px;border:1px solid rgba(212,175,55,.4);border-radius:50%;z-index:9999;transition:width .3s,height .3s,background-color .3s,border-color .3s}
    .custom-cursor-circle::after{content:'';font-family:'Cormorant Garamond',serif;font-size:.65rem;font-style:italic;text-transform:uppercase;letter-spacing:1px;color:#050505;position:absolute;top:54%;left:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity .3s ease;white-space:nowrap}
    body.cursor-hover-active .custom-cursor-dot{width:4px;height:4px;background:#050505}
    body.cursor-hover-active .custom-cursor-circle{width:70px;height:70px;background:#d4af37;border-color:#d4af37}
    body.cursor-hover-active .custom-cursor-circle::after{content:'Explore';opacity:1}
    .fluid-canvas{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:.25}
    @media (max-width:1024px),(prefers-reduced-motion:reduce){.custom-cursor-dot,.custom-cursor-circle{display:none!important}.fluid-canvas{opacity:.12}}
  `;
  document.head.appendChild(style);

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  dot.id = 'customCursorDot';
  const circle = document.createElement('div');
  circle.className = 'custom-cursor-circle';
  circle.id = 'customCursorCircle';
  const canvas = document.createElement('canvas');
  canvas.className = 'fluid-canvas';
  canvas.id = 'fluidCanvas';
  document.body.append(dot, circle, canvas);

  if (isDesktop && !reduceMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }, { passive: true });

    const animateCursor = () => {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      circle.style.left = `${circleX}px`;
      circle.style.top = `${circleY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveSelector = 'a, button, .grid-item, .exp-card, .hotspot, .luxury-menu-item, .team-link, .menu-toggle';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) document.body.classList.add('cursor-hover-active');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector) && !e.relatedTarget?.closest?.(interactiveSelector)) document.body.classList.remove('cursor-hover-active');
    });
  }

  if (reduceMotion) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  let width = 0;
  let height = 0;
  let dpr = 1;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class FluidParticle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 100;
      this.size = Math.random() * 80 + 40;
      this.speedY = -(Math.random() * 0.4 + 0.2);
      this.alpha = Math.random() * 0.3 + 0.1;
      this.waveSpeed = Math.random() * 0.02 + 0.005;
      this.angle = Math.random() * Math.PI;
    }
    update() {
      this.y += this.speedY;
      this.angle += this.waveSpeed;
      this.x += Math.sin(this.angle) * 0.2;
      if (this.y < -this.size) this.reset();
    }
    draw() {
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, `rgba(212,175,55,${this.alpha * 0.15})`);
      grad.addColorStop(0.3, `rgba(34,34,34,${this.alpha * 0.05})`);
      grad.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 25 }, () => new FluidParticle());
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => { particle.update(); particle.draw(); });
    requestAnimationFrame(render);
  };
  render();
})();
