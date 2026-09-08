(()=>{
  const section=document.querySelector('#philosophy');
  if(!section||document.querySelector('#bento-manifesto'))return;

  const bento=document.createElement('section');
  bento.className='bento-manifesto-section';
  bento.id='bento-manifesto';
  bento.innerHTML=`
    <div class="bento-container">
      <div class="bento-manifesto-grid">
        <article class="bento-manifesto-box box-large parallax-box" data-speed="1.05">
          <div class="bento-glow"></div>
          <div class="bento-manifesto-content">
            <span class="bento-kicker">Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ</span>
            <h3 class="bento-title-large">Δεν προσφέρουμε μαζική εκγύμναση. <span class="highlight-text">Σμιλεύουμε την προσωπική σας ευεξία</span> μέσα από την επιστήμη της κίνησης και την πολυτέλεια της ιδιωτικότητας.</h3>
          </div>
        </article>
        <article class="bento-manifesto-box box-medium parallax-box" data-speed="0.95">
          <div class="bento-glow"></div>
          <div class="bento-bg-image" role="img" aria-label="Η υποδοχή του Athletico Wellness Center"></div>
          <div class="bento-manifesto-content bottom-content">
            <h4 class="bento-title-small">Premium Υποδομές</h4>
            <p class="bento-desc">Ένας high-end boutique χώρος, σχεδιασμένος για να προσφέρει γαλήνη και απόλυτη συγκέντρωση.</p>
          </div>
        </article>
        <article class="bento-manifesto-box box-small parallax-box" data-speed="1.1">
          <div class="bento-glow"></div>
          <div class="bento-manifesto-content">
            <div class="bento-icon" aria-hidden="true">⚡</div>
            <h4 class="bento-title-small">Τεχνολογία Αιχμής</h4>
            <p class="bento-desc">Από το Wireless EMS AQ8 μέχρι το Vacu Move, επενδύουμε μόνο σε bio-tech εξοπλισμό κορυφαίου επιπέδου.</p>
          </div>
        </article>
        <article class="bento-manifesto-box box-small parallax-box" data-speed="0.9">
          <div class="bento-glow"></div>
          <div class="bento-manifesto-content">
            <div class="bento-icon" aria-hidden="true">🔒</div>
            <h4 class="bento-title-small">Απόλυτη Εχεμύθεια</h4>
            <p class="bento-desc">Οι συνεδρίες σας πραγματοποιούνται σε ένα προστατευμένο περιβάλλον με customized, private καθοδήγηση.</p>
          </div>
        </article>
      </div>
    </div>`;

  section.replaceWith(bento);

  const style=document.createElement('style');
  style.id='athletico-bento-manifesto-styles';
  style.textContent=`
    .bento-manifesto-section{position:relative;background:#000;width:100%;padding:clamp(88px,10vw,140px) 0;overflow:hidden}
    .bento-container{max-width:1400px;margin:0 auto;padding:0 4vw}
    .bento-manifesto-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(280px,auto);gap:30px}
    .bento-manifesto-box{position:relative;background:#0a0a0a;border:1px solid rgba(255,255,255,.05);padding:40px;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;transition:border-color .5s ease,box-shadow .6s ease;will-change:transform;isolation:isolate}
    .bento-manifesto-box.box-large{grid-column:span 2;grid-row:span 2;justify-content:center;background:#0d0d0d}
    .bento-manifesto-box.box-medium{grid-column:span 1;grid-row:span 2}
    .bento-manifesto-box.box-small{grid-column:span 1}
    .bento-bg-image{position:absolute;inset:0;background-image:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.72)),url('assets/images/reception-cinematic-v2.jpg?v=20260908-4');background-size:cover;background-position:center;filter:grayscale(1) brightness(.34);transition:filter .7s cubic-bezier(.25,1,.5,1),transform .7s cubic-bezier(.25,1,.5,1);z-index:0}
    .bento-glow{position:absolute;inset:-20%;background:radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(120,155,190,.12) 0%,rgba(20,35,50,.08) 24%,rgba(0,0,0,0) 62%);pointer-events:none;z-index:1;opacity:0;transition:opacity .45s ease}
    .bento-manifesto-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-start;transform:scale(1);transition:transform .5s cubic-bezier(.25,1,.5,1)}
    .bottom-content{justify-content:flex-end}
    .bento-kicker{font-family:'Inter',sans-serif;font-size:.78rem;color:#9a9a9a;letter-spacing:.2em;margin-bottom:20px;display:block}
    .bento-title-large{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3vw,3.2rem);color:#fff;font-weight:300;line-height:1.25;margin:0}
    .highlight-text{font-style:italic;color:#e5e5e5}
    .bento-title-small{font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:#fff;font-weight:400;margin:0 0 15px}
    .bento-desc{font-family:'Inter',sans-serif;font-size:.9rem;color:#8c8c8c;line-height:1.55;margin:0}
    .bento-icon{font-size:1.7rem;margin-bottom:20px;opacity:.72}
    .bento-manifesto-box:hover{border-color:rgba(170,200,230,.2);box-shadow:0 24px 80px rgba(10,20,30,.34),inset 0 0 70px rgba(60,90,120,.045)}
    .bento-manifesto-box:hover .bento-glow{opacity:1}
    .bento-manifesto-box:hover .bento-manifesto-content{transform:scale(1.012)}
    .bento-manifesto-box:hover .bento-bg-image{filter:grayscale(.78) brightness(.44) saturate(.68);transform:scale(1.025)}
    @media(max-width:991px){.bento-manifesto-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.bento-manifesto-box.box-large{grid-column:span 2}.bento-manifesto-box.box-medium{grid-column:span 2;min-height:50vh}.bento-manifesto-box.box-small{grid-column:span 1}}
    @media(max-width:768px){.bento-manifesto-section{padding:80px 0}.bento-container{padding:0 20px}.bento-manifesto-grid{grid-template-columns:1fr;gap:20px}.bento-manifesto-box.box-large,.bento-manifesto-box.box-medium,.bento-manifesto-box.box-small{grid-column:1;grid-row:auto}.bento-manifesto-box{padding:30px;min-height:240px;transform:none!important}.bento-manifesto-box.box-medium{min-height:40vh}.bento-manifesto-box .bento-glow{display:none}.bento-manifesto-box .bento-manifesto-content{transform:none!important}.bento-bg-image{filter:grayscale(.8) brightness(.4)}}
    @media(prefers-reduced-motion:reduce){.bento-manifesto-box,.bento-bg-image,.bento-manifesto-content{transition:none!important;transform:none!important}}
  `;
  document.head.appendChild(style);

  const boxes=[...bento.querySelectorAll('.bento-manifesto-box')];
  boxes.forEach(box=>box.addEventListener('pointermove',e=>{
    if(innerWidth<=768)return;
    const r=box.getBoundingClientRect();
    box.style.setProperty('--mouse-x',`${((e.clientX-r.left)/r.width)*100}%`);
    box.style.setProperty('--mouse-y',`${((e.clientY-r.top)/r.height)*100}%`);
  },{passive:true}));

  const parallax=[...bento.querySelectorAll('.parallax-box')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop=matchMedia('(min-width:769px)');
  let active=false,raf=0;
  const io='IntersectionObserver'in window?new IntersectionObserver(entries=>{active=entries.some(e=>e.isIntersecting);if(active)requestRender()},{rootMargin:'15% 0px'}):null;
  io?.observe(bento);active=!io;

  const render=()=>{
    raf=0;
    if(!active||!desktop.matches||reduced){parallax.forEach(box=>box.style.removeProperty('transform'));return}
    const center=innerHeight/2;
    parallax.forEach(box=>{
      const rect=box.getBoundingClientRect();
      const speed=parseFloat(box.dataset.speed||'1');
      const distance=(rect.top+rect.height/2-center)/innerHeight;
      const y=Math.max(-18,Math.min(18,distance*(speed-1)*-150));
      box.style.transform=`translate3d(0,${y}px,0)`;
    });
  };
  const requestRender=()=>{if(!raf)raf=requestAnimationFrame(render)};
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',requestRender,{passive:true});
  desktop.addEventListener?.('change',requestRender);
  render();
})();
