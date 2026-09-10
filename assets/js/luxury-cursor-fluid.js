(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 1025px) and (pointer: fine)').matches;

  const style = document.createElement('style');
  style.id = 'athletico-award-system';
  style.textContent = `
    :root{--ath-black:#050505;--ath-panel:rgba(8,8,8,.94);--ath-gold:#d4af37;--ath-text:#f4f4f1;--ath-muted:#9a9a96;--ath-line:rgba(255,255,255,.09);--ath-ease:cubic-bezier(.16,1,.3,1)}
    html{scroll-behavior:smooth}body{background:var(--ath-black);text-rendering:optimizeLegibility}a,button,[role="button"]{-webkit-tap-highlight-color:transparent}
    a:focus-visible,button:focus-visible,[role="button"]:focus-visible{outline:1px solid var(--ath-gold);outline-offset:5px}
    .menu-panel,.services-menu-panel,.contact-menu-panel{background:var(--ath-panel)!important;border:1px solid var(--ath-line)!important;backdrop-filter:blur(22px)!important;box-shadow:0 28px 80px rgba(0,0,0,.48)!important}
    .menu-panel a,.services-menu-panel a,.contact-menu-nav a{transition:color .28s var(--ath-ease),transform .28s var(--ath-ease),padding-left .28s var(--ath-ease)!important}
    .menu-panel a:hover,.services-menu-panel a:hover,.contact-menu-nav a:hover{color:var(--ath-gold)!important}.hero-copy,.team-strip p,.experiences-hero p,.profile-text-block .description{color:var(--ath-muted)!important}
    .athletico-page-wipe{position:fixed;inset:0;z-index:20000;pointer-events:none;opacity:0;background:var(--ath-black);transition:opacity .34s var(--ath-ease)}.athletico-page-wipe::after{content:'';position:absolute;left:0;top:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--ath-gold),transparent);transform:scaleX(0);transform-origin:left;transition:transform .34s var(--ath-ease)}.athletico-page-wipe.is-active{opacity:.96}.athletico-page-wipe.is-active::after{transform:scaleX(1)}
    @media(min-width:1025px) and (pointer:fine){body,a,button,[role="button"],.grid-item,.exp-card,.hotspot,.luxury-menu-item,.team-link,.menu-toggle{cursor:none!important}.custom-cursor-dot,.custom-cursor-circle{display:block}}
    .custom-cursor-dot,.custom-cursor-circle{display:none;position:fixed;left:0;top:0;transform:translate(-50%,-50%);pointer-events:none}.custom-cursor-dot{width:6px;height:6px;background:var(--ath-gold);border-radius:50%;z-index:10000;transition:width .3s,height .3s,background-color .3s}.custom-cursor-circle{width:40px;height:40px;border:1px solid rgba(212,175,55,.4);border-radius:50%;z-index:9999;transition:width .3s,height .3s,background-color .3s,border-color .3s}.custom-cursor-circle::after{content:'';font-family:'Cormorant Garamond',serif;font-size:.62rem;font-style:italic;text-transform:uppercase;letter-spacing:.08em;color:var(--ath-black);position:absolute;top:53%;left:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity .3s ease;white-space:nowrap}body.cursor-hover-active .custom-cursor-dot{width:4px;height:4px;background:var(--ath-black)}body.cursor-hover-active .custom-cursor-circle{width:68px;height:68px;background:var(--ath-gold);border-color:var(--ath-gold)}body.cursor-hover-active .custom-cursor-circle::after{content:'Explore';opacity:1}
    .fluid-canvas{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:.17}.hotspot.is-open .hotspot-tooltip,.hotspot:focus-visible .hotspot-tooltip{opacity:1!important;transform:translateX(-50%) translateY(0)!important;pointer-events:auto!important}
    @media(max-width:1024px){.custom-cursor-dot,.custom-cursor-circle{display:none!important}.fluid-canvas{opacity:.08}.hotspot{min-width:28px!important;min-height:28px!important}.hotspot-tooltip{max-width:min(280px,78vw)!important}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.custom-cursor-dot,.custom-cursor-circle,.fluid-canvas{display:none!important}.athletico-page-wipe{display:none!important}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `;
  document.head.appendChild(style);

  const canonicalNav = ['index.html','experiences.html','services.html','team.html','contact.html'];
  document.querySelectorAll('.menu-panel nav,.services-menu-panel nav,.contact-menu-nav').forEach((nav) => {
    const links = [...nav.children].filter((el) => el.tagName === 'A');
    const special = links.filter((a) => a.classList.contains('home-return') || a.classList.contains('contact-menu-back'));
    const admin = links.filter((a) => a.classList.contains('admin-entry'));
    const regular = links.filter((a) => !special.includes(a) && !admin.includes(a));
    const ordered = canonicalNav.map((href) => regular.find((a) => (a.getAttribute('href') || '').endsWith(href))).filter(Boolean);
    regular.filter((a) => !ordered.includes(a)).forEach((a) => ordered.push(a));
    special.forEach((a) => nav.appendChild(a));
    ordered.forEach((a) => nav.appendChild(a));
    [...nav.children].filter((el) => !links.includes(el)).forEach((el) => nav.appendChild(el));
    admin.forEach((a) => nav.appendChild(a));
  });

  const wipe = document.createElement('div');
  wipe.className = 'athletico-page-wipe';
  wipe.setAttribute('aria-hidden','true');
  document.body.appendChild(wipe);
  document.addEventListener('click',(e)=>{if(reduceMotion||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const link=e.target.closest('a[href]');if(!link||link.target==='_blank'||link.hasAttribute('download'))return;const href=link.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))return;let url;try{url=new URL(link.href,location.href)}catch{return}if(url.origin!==location.origin||url.href===location.href)return;e.preventDefault();wipe.classList.add('is-active');setTimeout(()=>{location.href=url.href},300)});

  document.querySelectorAll('.hotspot').forEach((hotspot,index)=>{const tooltip=hotspot.querySelector('.hotspot-tooltip');const title=tooltip?.querySelector('h4')?.textContent?.trim()||`Πληροφορία ${index+1}`;hotspot.setAttribute('role','button');if(!hotspot.hasAttribute('tabindex'))hotspot.setAttribute('tabindex','0');hotspot.setAttribute('aria-label',title);hotspot.setAttribute('aria-expanded','false');const toggle=()=>{const open=!hotspot.classList.contains('is-open');document.querySelectorAll('.hotspot.is-open').forEach((el)=>{if(el!==hotspot){el.classList.remove('is-open');el.setAttribute('aria-expanded','false')}});hotspot.classList.toggle('is-open',open);hotspot.setAttribute('aria-expanded',String(open))};hotspot.addEventListener('click',(e)=>{e.stopPropagation();toggle()});hotspot.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}if(e.key==='Escape'){hotspot.classList.remove('is-open');hotspot.setAttribute('aria-expanded','false')}})});
  document.addEventListener('click',()=>document.querySelectorAll('.hotspot.is-open').forEach((el)=>{el.classList.remove('is-open');el.setAttribute('aria-expanded','false')}));

  const dot=document.createElement('div');dot.className='custom-cursor-dot';dot.id='customCursorDot';const circle=document.createElement('div');circle.className='custom-cursor-circle';circle.id='customCursorCircle';const canvas=document.createElement('canvas');canvas.className='fluid-canvas';canvas.id='fluidCanvas';document.body.append(dot,circle,canvas);
  if(isDesktop&&!reduceMotion){let mouseX=innerWidth/2,mouseY=innerHeight/2,circleX=mouseX,circleY=mouseY;addEventListener('mousemove',(e)=>{mouseX=e.clientX;mouseY=e.clientY;dot.style.left=`${mouseX}px`;dot.style.top=`${mouseY}px`},{passive:true});const animateCursor=()=>{circleX+=(mouseX-circleX)*.15;circleY+=(mouseY-circleY)*.15;circle.style.left=`${circleX}px`;circle.style.top=`${circleY}px`;requestAnimationFrame(animateCursor)};animateCursor();const selector='a,button,[role="button"],.grid-item,.exp-card,.hotspot,.luxury-menu-item,.team-link,.menu-toggle';document.addEventListener('mouseover',(e)=>{if(e.target.closest(selector))document.body.classList.add('cursor-hover-active')});document.addEventListener('mouseout',(e)=>{if(e.target.closest(selector)&&!e.relatedTarget?.closest?.(selector))document.body.classList.remove('cursor-hover-active')})}
  if(reduceMotion)return;const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;let width=0,height=0,dpr=1;const resize=()=>{width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0)};resize();addEventListener('resize',resize,{passive:true});class FluidParticle{constructor(){this.reset(true)}reset(initial=false){this.x=Math.random()*width;this.y=initial?Math.random()*height:height+Math.random()*100;this.size=Math.random()*74+36;this.speedY=-(Math.random()*.32+.14);this.alpha=Math.random()*.22+.07;this.waveSpeed=Math.random()*.014+.004;this.angle=Math.random()*Math.PI}update(){this.y+=this.speedY;this.angle+=this.waveSpeed;this.x+=Math.sin(this.angle)*.16;if(this.y<-this.size)this.reset()}draw(){const g=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);g.addColorStop(0,`rgba(212,175,55,${this.alpha*.12})`);g.addColorStop(.32,`rgba(34,34,34,${this.alpha*.045})`);g.addColorStop(1,'rgba(5,5,5,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill()}}const particles=Array.from({length:18},()=>new FluidParticle());const render=()=>{ctx.clearRect(0,0,width,height);particles.forEach(p=>{p.update();p.draw()});requestAnimationFrame(render)};render();
})();