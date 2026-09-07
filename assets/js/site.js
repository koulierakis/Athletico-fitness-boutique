(()=>{const CMS_KEY='athleticoCMS_v2';const legacyKey='athleticoCMS_v1';const currentScript=document.currentScript;if(currentScript?.src){[['premium-fixes','../css/premium-fixes.css'],['services-bento','../css/services-bento.css'],['hero-sharp','../css/hero-sharp-v1.css']].forEach(([key,path])=>{if(document.querySelector(`link[data-${key}]`))return;const link=document.createElement('link');link.rel='stylesheet';link.href=new URL(path,currentScript.src).href;link.dataset[key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]='true';document.head.appendChild(link)})}const readCMS=()=>{try{return JSON.parse(localStorage.getItem(CMS_KEY)||localStorage.getItem(legacyKey)||'{}')}catch{return {}}};const cms=readCMS();const content=cms.content||{};const images=cms.images||{};const design=cms.design||{};const typography=cms.typography||{};const imageEdits=cms.imageEdits||{};document.querySelectorAll('[data-content-key]').forEach(node=>{const key=node.dataset.contentKey;if(content[key]!==undefined){if(String(content[key]).includes('<br>'))node.innerHTML=content[key];else node.textContent=content[key]}const t=typography[key];if(t){if(t.fontFamily)node.style.fontFamily=t.fontFamily;if(t.fontSize)node.style.fontSize=t.fontSize+'px';if(t.fontWeight)node.style.fontWeight=t.fontWeight;if(t.letterSpacing!==undefined)node.style.letterSpacing=t.letterSpacing+'px';if(t.lineHeight)node.style.lineHeight=t.lineHeight;if(t.color)node.style.color=t.color;if(t.textAlign)node.style.textAlign=t.textAlign;if(t.textTransform)node.style.textTransform=t.textTransform}});const applyImg=(node,key)=>{const value=images[key];if(value)node.src=value;const e=imageEdits[key];if(e){node.style.filter=`brightness(${e.brightness??100}%) contrast(${e.contrast??100}%) saturate(${e.saturation??100}%) hue-rotate(${e.hue??0}deg) grayscale(${e.grayscale??0}%)`;node.style.opacity=(e.opacity??100)/100;node.style.transform=`scale(${(e.zoom??100)/100})`;node.style.objectPosition=`${e.x??50}% ${e.y??50}%`;if(e.radius!==undefined)node.style.borderRadius=e.radius+'px';if(e.shadow!==undefined)node.style.boxShadow=`0 24px ${Math.max(20,e.shadow)}px rgba(0,0,0,${Math.min(.7,(e.shadow||0)/100)})`}};document.querySelectorAll('[data-image-key]').forEach(node=>applyImg(node,node.dataset.imageKey));document.querySelectorAll('[data-image-bg-key]').forEach(node=>{const value=images[node.dataset.imageBgKey];if(value)node.style.backgroundImage=`url("${value.replace(/"/g,'&quot;')}")`});if(design.heroTitleSize)document.documentElement.style.setProperty('--hero-title-size',`${design.heroTitleSize}px`);if(design.cardRadius)document.documentElement.style.setProperty('--card-radius',`${design.cardRadius}px`);if(design.heroFrameRadius)document.documentElement.style.setProperty('--hero-frame-radius',`${design.heroFrameRadius}px`);if(design.contentMaxWidth)document.documentElement.style.setProperty('--content-max-width',`${design.contentMaxWidth}px`);const parts=location.pathname.split('/').filter(Boolean);const file=(parts[parts.length-1]||'index.html').toLowerCase();const page=parts.includes('services')&&file!=='services.html'?`services/${file}`:file;const generic=(cms.generic||{})[page]||{};Object.entries(generic).forEach(([selector,o])=>{let node;try{node=document.querySelector(selector)}catch{return}if(!node)return;if(o.text!==undefined){if(o.html)node.innerHTML=o.text;else node.textContent=o.text}if(o.src&&node.tagName==='IMG')node.src=o.src;if(o.style)Object.entries(o.style).forEach(([prop,val])=>{const cssProp=prop.replace(/[A-Z]/g,m=>'-'+m.toLowerCase());node.style.setProperty(cssProp,val,'important')})});const trigger=document.querySelector('[data-menu-trigger]');const overlay=document.querySelector('[data-menu]');const close=document.querySelector('[data-menu-close]');const nav=overlay?.querySelector('nav');if(nav&&!nav.querySelector('.admin-nav-link')){const adminLink=document.createElement('a');adminLink.className='nav-link admin-nav-link';adminLink.href=currentScript?.src?new URL('../../admin/',currentScript.src).href:'../admin/';adminLink.innerHTML='<span>06</span><strong>ADMIN</strong>';adminLink.style.marginTop='14px';adminLink.style.opacity='.72';adminLink.style.fontSize='.72em';adminLink.style.letterSpacing='.16em';const strong=adminLink.querySelector('strong');if(strong){strong.style.fontSize='.78em';strong.style.fontWeight='500'}const num=adminLink.querySelector('span');if(num){num.style.fontSize='.76em';num.style.opacity='.62'}nav.appendChild(adminLink)}const focusable='a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';let previousFocus=null;const openMenu=()=>{if(!overlay)return;previousFocus=document.activeElement;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');trigger?.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');overlay.querySelector(focusable)?.focus()};const closeMenu=()=>{if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');trigger?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');previousFocus?.focus()};trigger?.setAttribute('aria-expanded','false');trigger?.addEventListener('click',openMenu);close?.addEventListener('click',closeMenu);overlay?.addEventListener('click',e=>{if(e.target===overlay)closeMenu()});document.addEventListener('keydown',e=>{if(!overlay?.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();closeMenu();return}if(e.key!=='Tab')return;const items=[...overlay.querySelectorAll(focusable)].filter(item=>!item.hasAttribute('hidden'));if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});overlay?.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',closeMenu));document.querySelectorAll('[data-year]').forEach(node=>node.textContent=new Date().getFullYear())})();

/* Award direction layer */
(()=>{
  const script=document.currentScript;
  if(script?.src&&!document.querySelector('link[data-award-direction]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=new URL('../css/award-direction-v1.css?v=20260907-1',script.src).href;
    link.dataset.awardDirection='true';
    document.head.appendChild(link);
  }

  const path=location.pathname.toLowerCase();
  const isHome=path.endsWith('/')||path.endsWith('/index.html')||path==='/index.html';

  /* Brand language: Athletico is a Wellness Center, not a gym. */
  document.querySelectorAll('.nav-link strong').forEach(el=>{
    if(el.textContent.trim()==='ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ') el.textContent='ΕΜΠΕΙΡΙΕΣ';
  });
  document.querySelectorAll('.luxury-hero-kicker').forEach(el=>{el.textContent='PERSONAL WELLNESS · SINCE 2000'});
  document.querySelectorAll('.luxury-hero-caption').forEach(el=>{el.textContent='ATHLETICO · WELLNESS CENTER · TRIKALA'});
  document.querySelectorAll('.site-footer h3').forEach(el=>{el.textContent='ATHLETICO · WELLNESS CENTER'});

  if(isHome){
    const philosophy=document.querySelector('#philosophy');
    if(philosophy){
      const title=philosophy.querySelector('h2');
      const lead=philosophy.querySelector('.lead');
      const muted=philosophy.querySelector('.muted');
      if(title) title.textContent='Η ευεξία δεν είναι πρόγραμμα. Είναι προσωπική φροντίδα.';
      if(lead) lead.textContent='Κάθε άνθρωπος έχει τον δικό του ρυθμό.';
      if(muted) muted.textContent='Στο Athletico η κίνηση προσαρμόζεται στον άνθρωπο — με γνώση, συνέπεια και προσοχή στη λεπτομέρεια.';

      if(!document.querySelector('.award-manifesto')){
        const manifesto=document.createElement('section');
        manifesto.className='award-manifesto';
        manifesto.innerHTML=`<div class="award-manifesto-inner">
          <div class="award-manifesto-kicker">26 ΧΡΟΝΙΑ ΠΡΟΣΩΠΙΚΗΣ ΦΡΟΝΤΙΔΑΣ</div>
          <div class="award-manifesto-copy">
            <h2>Δεν πιστεύουμε στην κίνηση χωρίς σκοπό. <em>Πιστεύουμε στον δικό σου ρυθμό.</em></h2>
            <p>Από το 2000, το Athletico εξελίσσεται με μία σταθερή αρχή: η πραγματική ευεξία ξεκινά όταν η καθοδήγηση γίνεται προσωπική. Όχι μαζικά. Όχι βιαστικά. Με παρουσία, συνέπεια και φροντίδα.</p>
            <div class="award-manifesto-signature">ATHLETICO · TRIKALA · SINCE 2000</div>
          </div>
        </div>`;
        philosophy.insertAdjacentElement('afterend',manifesto);
      }
    }

    document.querySelectorAll('.timeline article').forEach(article=>{
      const year=article.querySelector('.year')?.textContent.trim();
      const p=article.querySelector('p');
      if(year==='2000'&&p) p.textContent='Το Athletico ξεκινά στο κέντρο των Τρικάλων με επίκεντρο την ποιότητα ζωής, την προσωπική καθοδήγηση και την κίνηση με σκοπό.';
      if(year==='2020'&&p) p.textContent='Ο χώρος ανανεώνεται και η εμπειρία γίνεται ακόμη πιο προσωπική: άνεση, μικρές ομάδες και σύγχρονες υπηρεσίες ευεξίας.';
      if(year==='ΣΗΜΕΡΑ'&&p) p.textContent='Σήμερα λειτουργεί ως ολοκληρωμένο Wellness Center, συνδυάζοντας εμπειρία δεκαετιών με σύγχρονες επιλογές προσωπικής φροντίδας.';
    });

    document.querySelectorAll('.luxury-services .section-title span').forEach(el=>{el.textContent='ATHLETICO EXPERIENCES'});
    const servicesTitle=document.querySelector('.luxury-services .section-title h2');
    if(servicesTitle) servicesTitle.textContent='Επτά εμπειρίες. Ένας προσωπικός ρυθμός.';
  }

  /* Page-specific editorial copy without altering factual credentials/reviews. */
  if(path.endsWith('/services.html')){
    const kicker=document.querySelector('.page-hero .kicker');
    if(kicker) kicker.textContent='ATHLETICO EXPERIENCES';
    const title=document.querySelector('.page-hero h1');
    if(title) title.textContent='Εμπειρίες ευεξίας.';
    const intro=document.querySelector('.page-hero p');
    if(intro) intro.textContent='Επτά διαφορετικές διαδρομές προσωπικής φροντίδας, σχεδιασμένες για να συναντούν τον δικό σου ρυθμό.';
  }
  if(path.endsWith('/team.html')){
    const title=document.querySelector('.page-hero h1');
    if(title) title.textContent='Η φροντίδα έχει πρόσωπο.';
  }
  if(path.endsWith('/reviews.html')){
    const title=document.querySelector('.page-hero h1');
    if(title) title.textContent='Όσα μένουν μετά την εμπειρία.';
    const intro=document.querySelector('.page-hero p');
    if(intro) intro.textContent='Πραγματικές εμπειρίες ανθρώπων που γνωρίζουν το Athletico από κοντά.';
  }
  if(path.endsWith('/contact.html')){
    const title=document.querySelector('.page-hero h1');
    if(title) title.textContent='Η εμπειρία ξεκινά από εδώ.';
    const intro=document.querySelector('.page-hero p');
    if(intro) intro.textContent='Γνώρισε τον χώρο, συζήτησε μαζί μας τι χρειάζεσαι και ανακάλυψε ποια εμπειρία ταιριάζει στον δικό σου ρυθμό.';
  }

  /* Progressive reveal */
  const revealTargets=[...document.querySelectorAll('.section .container>*,.luxury-services .section-title,.bento-item,.timeline article,.profile-card,.review-card,.award-manifesto-inner,.detail-copy>*')];
  revealTargets.forEach((el,i)=>{
    el.classList.add('award-reveal');
    if(i%3===1) el.classList.add('award-reveal-delay');
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    revealTargets.forEach(el=>observer.observe(el));
  }else revealTargets.forEach(el=>el.classList.add('is-visible'));

  /* Header + scroll progress */
  const header=document.querySelector('.site-header');
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    const progress=max>0?Math.min(100,(scrollY/max)*100):0;
    document.documentElement.style.setProperty('--scroll-progress',progress+'%');
    header?.classList.toggle('is-scrolled',scrollY>24);
  };
  updateScroll();
  addEventListener('scroll',updateScroll,{passive:true});

  /* Fine cursor only where a precise pointer exists. */
  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const cursor=document.createElement('div');
    cursor.className='award-cursor';
    document.body.appendChild(cursor);
    addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
    document.querySelectorAll('a,button,.bento-item').forEach(el=>{
      el.addEventListener('pointerenter',()=>cursor.classList.add('is-active'));
      el.addEventListener('pointerleave',()=>cursor.classList.remove('is-active'));
    });
  }
})();
