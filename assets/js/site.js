(()=>{
  const currentScript=document.currentScript;
  const awardPreview=location.pathname.includes('/work/athletico-awards-rebuild-v2/');
  const CMS_KEY='athleticoCMS_v2';
  const legacyKey='athleticoCMS_v1';

  if(currentScript?.src){
    [
      ['premium-fixes','../css/premium-fixes.css'],
      ['services-bento','../css/services-bento.css'],
      ['hero-sharp','../css/hero-sharp-v1.css'],
      ['award-direction','../css/award-direction-v1.css?v=20260907-4'],
      ['award-experience','../css/award-experience-v1.css?v=20260907-4']
    ].forEach(([key,path])=>{
      if(document.querySelector(`link[data-${key}]`))return;
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href=new URL(path,currentScript.src).href;
      link.dataset[key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]='true';
      document.head.appendChild(link);
    });
  }

  const readCMS=()=>{
    if(awardPreview)return {};
    try{return JSON.parse(localStorage.getItem(CMS_KEY)||localStorage.getItem(legacyKey)||'{}')}catch{return {}}
  };
  const cms=readCMS();
  const content=cms.content||{};
  const images=cms.images||{};
  const design=cms.design||{};
  const typography=cms.typography||{};
  const imageEdits=cms.imageEdits||{};

  document.querySelectorAll('[data-content-key]').forEach(node=>{
    const key=node.dataset.contentKey;
    if(content[key]!==undefined){
      if(String(content[key]).includes('<br>'))node.innerHTML=content[key];
      else node.textContent=content[key];
    }
    const t=typography[key];
    if(!t)return;
    if(t.fontFamily)node.style.fontFamily=t.fontFamily;
    if(t.fontSize)node.style.fontSize=t.fontSize+'px';
    if(t.fontWeight)node.style.fontWeight=t.fontWeight;
    if(t.letterSpacing!==undefined)node.style.letterSpacing=t.letterSpacing+'px';
    if(t.lineHeight)node.style.lineHeight=t.lineHeight;
    if(t.color)node.style.color=t.color;
    if(t.textAlign)node.style.textAlign=t.textAlign;
    if(t.textTransform)node.style.textTransform=t.textTransform;
  });

  const applyImg=(node,key)=>{
    const value=images[key];
    if(value)node.src=value;
    const e=imageEdits[key];
    if(!e)return;
    node.style.filter=`brightness(${e.brightness??100}%) contrast(${e.contrast??100}%) saturate(${e.saturation??100}%) hue-rotate(${e.hue??0}deg) grayscale(${e.grayscale??0}%)`;
    node.style.opacity=(e.opacity??100)/100;
    node.style.transform=`scale(${(e.zoom??100)/100})`;
    node.style.objectPosition=`${e.x??50}% ${e.y??50}%`;
    if(e.radius!==undefined)node.style.borderRadius=e.radius+'px';
  };
  document.querySelectorAll('[data-image-key]').forEach(node=>applyImg(node,node.dataset.imageKey));

  if(design.heroTitleSize)document.documentElement.style.setProperty('--hero-title-size',`${design.heroTitleSize}px`);
  if(design.cardRadius)document.documentElement.style.setProperty('--card-radius',`${design.cardRadius}px`);
  if(design.heroFrameRadius)document.documentElement.style.setProperty('--hero-frame-radius',`${design.heroFrameRadius}px`);
  if(design.contentMaxWidth)document.documentElement.style.setProperty('--content-max-width',`${design.contentMaxWidth}px`);

  const parts=location.pathname.split('/').filter(Boolean);
  const file=(parts[parts.length-1]||'index.html').toLowerCase();
  const page=parts.includes('services')&&file!=='services.html'?`services/${file}`:file;
  const generic=(cms.generic||{})[page]||{};
  Object.entries(generic).forEach(([selector,o])=>{
    let node;try{node=document.querySelector(selector)}catch{return}
    if(!node)return;
    if(o.text!==undefined){if(o.html)node.innerHTML=o.text;else node.textContent=o.text}
    if(o.src&&node.tagName==='IMG')node.src=o.src;
    if(o.style)Object.entries(o.style).forEach(([prop,val])=>node.style.setProperty(prop.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),val,'important'));
  });

  /* Keep every legacy page inside the same wellness identity without rewriting real facts. */
  document.querySelectorAll('.brand').forEach(n=>n.textContent='ATHLETICO · WELLNESS CENTER');
  document.querySelectorAll('.site-footer h3').forEach(n=>n.textContent='ATHLETICO · WELLNESS CENTER');
  document.querySelectorAll('.nav-link strong').forEach(n=>{if(n.textContent.trim()==='ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ')n.textContent='ΕΜΠΕΙΡΙΕΣ'});
  document.querySelectorAll('.footer-links a').forEach(n=>{if(n.textContent.trim()==='Οι υπηρεσίες μας')n.textContent='Εμπειρίες'});

  const trigger=document.querySelector('[data-menu-trigger]');
  const overlay=document.querySelector('[data-menu]');
  const close=document.querySelector('[data-menu-close]');
  const nav=overlay?.querySelector('nav');
  if(nav&&!nav.querySelector('.admin-nav-link')){
    const adminLink=document.createElement('a');
    adminLink.className='nav-link admin-nav-link';
    adminLink.href=currentScript?.src?new URL('../../admin/',currentScript.src).href:'../admin/';
    adminLink.innerHTML='<span>06</span><strong>ADMIN</strong>';
    adminLink.style.marginTop='14px';adminLink.style.opacity='.56';
    nav.appendChild(adminLink);
  }

  const focusable='a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let previousFocus=null;
  const openMenu=()=>{if(!overlay)return;previousFocus=document.activeElement;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');trigger?.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');overlay.querySelector(focusable)?.focus()};
  const closeMenu=()=>{if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');trigger?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');previousFocus?.focus()};
  trigger?.setAttribute('aria-expanded','false');trigger?.addEventListener('click',openMenu);close?.addEventListener('click',closeMenu);
  overlay?.addEventListener('click',e=>{if(e.target===overlay)closeMenu()});
  document.addEventListener('keydown',e=>{if(!overlay?.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();closeMenu();return}if(e.key!=='Tab')return;const items=[...overlay.querySelectorAll(focusable)];if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
  overlay?.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',closeMenu));
  document.querySelectorAll('[data-year]').forEach(node=>node.textContent=new Date().getFullYear());

  const isHome=file==='index.html'||file==='';
  if(isHome){
    const philosophy=document.querySelector('#philosophy');
    if(philosophy&&!document.querySelector('.award-manifesto')){
      const manifesto=document.createElement('section');manifesto.className='award-manifesto';
      manifesto.innerHTML='<div class="award-manifesto-inner"><div class="award-manifesto-kicker">ATHLETICO MANIFESTO</div><div class="award-manifesto-copy"><h2>Δεν ακολουθούμε έναν ρυθμό.<br><em>Βρίσκουμε τον δικό σου.</em></h2><p>Από το 2000, το Athletico εξελίσσει μια προσωπική αντίληψη για την ευεξία: λιγότερος θόρυβος, περισσότερη ουσία. Ένας χώρος όπου η κίνηση, η φροντίδα και η ανθρώπινη παρουσία συνδέονται σε μια εμπειρία που προσαρμόζεται σε εσένα.</p><div class="award-manifesto-signature">TRIKALA · WELLNESS CENTER · SINCE 2000</div></div></div>';
      philosophy.after(manifesto);
    }
    const teamSection=[...document.querySelectorAll('.section')].find(s=>s.querySelector('.kicker')?.textContent.trim()==='Η ομάδα');
    if(teamSection&&!teamSection.querySelector('.home-team-editorial')){
      const grid=teamSection.querySelector('.team-grid');
      if(grid){grid.className='home-team-editorial';grid.innerHTML='<a class="home-team-person" href="team.html"><img src="assets/images/giannis-profile-new2.png?v=20260907-1" alt="Γιάννης Κουλιεράκης"><div class="home-team-copy"><span class="home-team-index">01 · PERSONAL PRESENCE</span><h3>Γιάννης Κουλιεράκης</h3><p>Πτυχιούχος ΤΕΦΑΑ · Pilates Reformer Instructor</p><span class="btn ghost">ΓΝΩΡΙΣΕ ΤΗΝ ΟΜΑΔΑ</span></div></a><a class="home-team-person" href="team.html"><img src="assets/images/sofia-profile-new.png?v=20260907-1" alt="Σοφία Πολύζου"><div class="home-team-copy"><span class="home-team-index">02 · PERSONAL PRESENCE</span><h3>Σοφία Πολύζου</h3><p>Πτυχιούχος ΤΕΦΑΑ · Personal & Mini Group Instructor</p><span class="btn ghost">ΓΝΩΡΙΣΕ ΤΗΝ ΟΜΑΔΑ</span></div></a>'}
    }
  }

  if(!document.querySelector('.award-side-mark')){const mark=document.createElement('div');mark.className='award-side-mark';mark.textContent='ATHLETICO · PERSONAL WELLNESS · TRIKALA';document.body.appendChild(mark)}
  if(!document.querySelector('.award-page-transition')){
    const transition=document.createElement('div');transition.className='award-page-transition';transition.setAttribute('aria-hidden','true');document.body.appendChild(transition);
    document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href')||'';if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||a.target==='_blank'||href.startsWith('http'))return;a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();transition.classList.add('is-active');setTimeout(()=>{location.href=a.href},410)})});
  }

  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?Math.min(100,Math.max(0,scrollY/max*100)):0;document.documentElement.style.setProperty('--scroll-progress',pct+'%');document.querySelector('.site-header')?.classList.toggle('is-scrolled',scrollY>30)};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
})();