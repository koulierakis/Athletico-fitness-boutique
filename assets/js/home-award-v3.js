(()=>{
  const file=(location.pathname.split('/').filter(Boolean).pop()||'index.html').toLowerCase();
  if(file!=='index.html'&&file!=='')return;

  document.body.classList.add('home-award-v3');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cinematic full-screen hero. Uses the cinematic reception image as poster/fallback until hero-bg.mp4 is present. */
  const hero=document.querySelector('.hero.luxury-split');
  if(hero){
    hero.className='athletico-video-hero';
    hero.innerHTML=`
      <div class="athletico-video-layer" aria-hidden="true">
        <video class="athletico-hero-video" autoplay muted loop playsinline preload="metadata" poster="assets/images/reception-cinematic-v2.jpg?v=20260908-4">
          <source src="assets/videos/hero-bg.mp4" type="video/mp4">
        </video>
        <div class="athletico-hero-overlay"></div>
        <div class="athletico-hero-vignette"></div>
      </div>
      <div class="athletico-hero-content">
        <div class="athletico-hero-kicker">ATHLETICO · WELLNESS CENTER · TRIKALA</div>
        <h1 class="athletico-hero-title" data-reveal-title>Η ευεξία στην πιο προσωπική εκδοχή της.</h1>
        <p class="athletico-hero-subtitle">Κίνηση με σκοπό, φροντίδα χωρίς συμβιβασμούς.</p>
        <a href="contact.html#visit" class="athletico-hero-cta">ΠΡΟΓΡΑΜΜΑΤΙΣΕ ΕΠΙΣΚΕΨΗ</a>
      </div>
      <div class="athletico-hero-footnote">PERSONAL WELLNESS AT ATHLETICO</div>`;

    const style=document.createElement('style');
    style.id='athletico-cinematic-hero-styles';
    style.textContent=`
      .athletico-video-hero{position:relative;width:100%;min-height:100svh;height:100vh;display:grid;place-items:center;overflow:hidden;background:#050607;isolation:isolate}
      .athletico-video-layer,.athletico-hero-overlay,.athletico-hero-vignette{position:absolute;inset:0}
      .athletico-video-layer{z-index:-2;background:#050607}
      .athletico-hero-video{width:100%;height:100%;object-fit:cover;object-position:center 52%;filter:saturate(.72) contrast(1.08) brightness(.72);transform:scale(1.015)}
      .athletico-hero-overlay{background:linear-gradient(180deg,rgba(2,4,6,.70) 0%,rgba(3,5,7,.54) 42%,rgba(1,2,3,.88) 100%);z-index:1}
      .athletico-hero-vignette{z-index:2;background:radial-gradient(circle at 50% 42%,transparent 0 28%,rgba(0,0,0,.17) 58%,rgba(0,0,0,.62) 100%);box-shadow:inset 0 -22vh 30vh rgba(0,0,0,.35)}
      .athletico-hero-content{position:relative;z-index:3;text-align:center;width:min(1080px,calc(100% - 48px));margin-inline:auto;padding-top:3vh}
      .athletico-hero-kicker{font-family:'Montserrat',sans-serif;font-size:clamp(.64rem,.62vw,.78rem);font-weight:500;letter-spacing:.28em;color:rgba(255,255,255,.68);margin-bottom:clamp(22px,4vh,42px);opacity:0;transform:translateY(10px);animation:athleticoFadeUp .8s ease .1s forwards}
      .athletico-hero-title{font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;font-size:clamp(3.15rem,6.7vw,7.4rem);font-weight:400;line-height:.91;letter-spacing:-.035em;color:#fff;margin:0 auto;max-width:1050px;text-wrap:balance;text-shadow:0 4px 32px rgba(0,0,0,.28)}
      .athletico-hero-title .letter{display:inline-block;opacity:0;transform:translateY(28px);filter:blur(6px);animation:athleticoRevealLetter .78s cubic-bezier(.2,.72,.2,1) forwards;will-change:transform,opacity,filter}
      .athletico-hero-title .space{display:inline-block;width:.24em}
      .athletico-hero-subtitle{font-family:'Montserrat',sans-serif;font-size:clamp(.74rem,1vw,.98rem);font-weight:400;line-height:1.5;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.72);margin:clamp(28px,4.5vh,46px) 0 clamp(26px,4vh,40px);opacity:0;transform:translateY(12px);animation:athleticoFadeUp .9s cubic-bezier(.2,.72,.2,1) 1.35s forwards}
      .athletico-hero-cta{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:0 34px;border:1px solid rgba(255,255,255,.72);background:rgba(255,255,255,.015);color:#fff;text-decoration:none;font-family:'Montserrat',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.16em;transition:transform .4s cubic-bezier(.25,1,.5,1),background-color .4s,color .4s,box-shadow .4s,border-color .4s;opacity:0;transform:translateY(12px);animation:athleticoFadeUp .9s cubic-bezier(.2,.72,.2,1) 1.55s forwards;backdrop-filter:blur(5px)}
      .athletico-hero-cta:hover,.athletico-hero-cta:focus-visible{background:#fff;color:#08090a;border-color:#fff;box-shadow:0 0 28px rgba(255,255,255,.18),0 12px 36px rgba(0,0,0,.22);transform:translateY(-3px)}
      .athletico-hero-footnote{position:absolute;z-index:3;left:clamp(24px,4vw,64px);bottom:clamp(22px,3.6vh,42px);font-family:'Montserrat',sans-serif;font-size:.63rem;letter-spacing:.22em;color:rgba(255,255,255,.5);writing-mode:horizontal-tb}
      @keyframes athleticoRevealLetter{to{opacity:1;transform:translateY(0);filter:blur(0)}}
      @keyframes athleticoFadeUp{to{opacity:1;transform:translateY(0)}}
      @media(max-width:768px){.athletico-video-hero{min-height:100svh;height:100svh}.athletico-hero-content{width:min(100% - 34px,680px);padding-top:1vh}.athletico-hero-kicker{letter-spacing:.2em;margin-bottom:26px}.athletico-hero-title{font-size:clamp(2.9rem,13vw,5.25rem);line-height:.94;letter-spacing:-.03em}.athletico-hero-subtitle{font-size:.7rem;letter-spacing:.12em;max-width:30ch;margin-inline:auto;margin-top:28px}.athletico-hero-cta{min-height:50px;padding:0 24px;font-size:.66rem;letter-spacing:.14em}.athletico-hero-footnote{left:50%;transform:translateX(-50%);width:max-content;font-size:.55rem;letter-spacing:.16em}.athletico-hero-video{object-position:center center}}
      @media(max-width:420px){.athletico-hero-content{width:calc(100% - 28px)}.athletico-hero-title{font-size:clamp(2.55rem,12.6vw,4rem)}.athletico-hero-kicker{font-size:.57rem}.athletico-hero-cta{width:min(100%,310px)}}
      @media(prefers-reduced-motion:reduce){.athletico-hero-kicker,.athletico-hero-subtitle,.athletico-hero-cta,.athletico-hero-title .letter{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}.athletico-hero-video{transform:none}}
    `;
    document.head.appendChild(style);

    const title=hero.querySelector('[data-reveal-title]');
    if(title){
      const text=title.textContent||'';
      title.setAttribute('aria-label',text);
      title.textContent='';
      [...text].forEach((letter,index)=>{
        const span=document.createElement('span');
        if(letter===' '){span.className='space';span.innerHTML='&nbsp;'}
        else{span.className='letter';span.textContent=letter;span.style.animationDelay=`${0.18+index*.032}s`}
        span.setAttribute('aria-hidden','true');
        title.appendChild(span);
      });
    }

    const video=hero.querySelector('.athletico-hero-video');
    video?.addEventListener('error',()=>hero.classList.add('video-fallback'));
  }

  /* Philosophy becomes a manifesto chapter. */
  const philosophy=document.querySelector('#philosophy');
  if(philosophy){
    const container=philosophy.querySelector('.container');
    if(container)container.innerHTML=`
      <div>
        <div class="kicker">THE ATHLETICO PHILOSOPHY</div>
        <h2 data-content-key="philosophyTitle">Δεν δημιουργήσαμε έναν ακόμη χώρο άσκησης.<br>Δημιουργήσαμε έναν διαφορετικό τρόπο να φροντίζεις τον εαυτό σου.</h2>
      </div>
      <div class="concept-copy">
        <p class="concept-lead">Η ευεξία δεν είναι ίδια για όλους.</p>
        <p>Έχει τον δικό σας ρυθμό.<br>Τις δικές σας ανάγκες.<br>Τη δική σας ιστορία.</p>
        <p>Στο Athletico, κάθε εμπειρία ξεκινά από εσάς.</p>
        <p>Συνδυάζουμε γνώση, εξατομικευμένη καθοδήγηση και σύγχρονες μεθόδους σε ένα περιβάλλον σχεδιασμένο γύρω από την ιδιωτικότητα, την ηρεμία και την προσωπική φροντίδα.</p>
        <p>Δεν αναζητούμε την υπερβολή.</p>
        <p>Αναζητούμε εκείνη τη λεπτή ισορροπία όπου το σώμα δυναμώνει, το μυαλό αποφορτίζεται και η φροντίδα μετατρέπεται σε τρόπο ζωής.</p>
        <div class="concept-signature">ATHLETICO — WELLNESS, MADE PERSONAL.</div>
      </div>`;
  }

  const manifesto=document.querySelector('.award-manifesto');
  if(manifesto){
    const kicker=manifesto.querySelector('.award-manifesto-kicker');
    const heading=manifesto.querySelector('h2');
    const paragraph=manifesto.querySelector('p');
    const signature=manifesto.querySelector('.award-manifesto-signature');
    if(kicker)kicker.textContent='THE ART OF PERSONAL WELLNESS';
    if(heading)heading.innerHTML='Η φροντίδα δεν είναι μια στιγμή.<br><em>Είναι ένας τρόπος ζωής.</em>';
    if(paragraph)paragraph.textContent='Στη σωστή καθοδήγηση. Στον χρόνο που αφιερώνετε στον εαυτό σας. Στην ηρεμία ενός χώρου που σέβεται τον προσωπικό σας ρυθμό. Κάθε σώμα είναι διαφορετικό. Κάθε εμπειρία πρέπει να είναι προσωπική.';
    if(signature)signature.textContent='ATHLETICO · ΚΙΝΗΣΗ ΜΕ ΣΚΟΠΟ · ΦΡΟΝΤΙΔΑ ΜΕ ΣΥΝΕΠΕΙΑ';
  }

  /* Seven Signature Experiences — transform existing real images into an editorial index. */
  const services=document.querySelector('.luxury-services#experiences');
  const experienceData=[
    {ritual:'PERSONAL PERFORMANCE',title:'Δύναμη, σχεδιασμένη γύρω από εσάς.',copy:'Εξατομικευμένο πρόγραμμα, προσωπική καθοδήγηση και σταθερή προσαρμογή στον δικό σας στόχο.'},
    {ritual:'CIRCUIT BALANCE',title:'Ρυθμός. Ισορροπία. Ροή.',copy:'Μια ολοκληρωμένη εμπειρία κίνησης με έμφαση στην αντοχή, τον συντονισμό και τη συμμετοχή όλου του σώματος.'},
    {ritual:'CORE ENERGY',title:'Η δύναμη ξεκινά από το κέντρο.',copy:'Έλεγχος, σταθερότητα και ποιοτική κίνηση με προσοχή στον κορμό και στη συνολική λειτουργία του σώματος.'},
    {ritual:'PILATES HARMONY',title:'Εκεί όπου η κίνηση γίνεται αρμονία.',copy:'Ακρίβεια, αναπνοή και συνειδητή κίνηση σε μια συνεδρία προσαρμοσμένη στο επίπεδο και στις ανάγκες σας.'},
    {ritual:'VACU MOVE',title:'Ελεγχόμενη αερόβια κίνηση.',copy:'Μια σύγχρονη εμπειρία αερόβιας κίνησης σε ελεγχόμενο περιβάλλον, ενταγμένη σε ένα προσωπικό πρόγραμμα ευεξίας.'},
    {ritual:'WIRELESS EMS · AQ8',title:'Τεχνολογία με προσωπική καθοδήγηση.',copy:'Wireless EMS με ελευθερία κίνησης και προσαρμογή της συνεδρίας στις ανάγκες και στον ρυθμό του κάθε ανθρώπου.'},
    {ritual:'SOLARIUM',title:'Μια προσωπική στιγμή φωτός.',copy:'Ένας ιδιωτικός χώρος για λίγα λεπτά προσωπικού χρόνου, με έμφαση στην άνεση και την ιδιωτικότητα.'}
  ];
  if(services){
    const sectionTitle=services.querySelector('.section-title');
    if(sectionTitle)sectionTitle.innerHTML=`<span>SEVEN ATHLETICO EXPERIENCES</span><div class="experience-intro"><h2>Επτά διαδρομές.<br>Ένας προορισμός: εσείς.</h2><p>Επτά διαφορετικές εμπειρίες ευεξίας, καθεμία με διαφορετικό χαρακτήρα και όλες με την ίδια αρχή: προσωπική φροντίδα, καθοδήγηση και συνέπεια.</p></div>`;
    services.querySelectorAll('.bento-item').forEach((item,index)=>{
      const data=experienceData[index];
      if(!data)return;
      const content=item.querySelector('.bento-content');
      const number=content?.querySelector('.bento-number')?.textContent||String(index+1).padStart(2,'0');
      const name=content?.querySelector('h3')?.textContent||'';
      if(content)content.innerHTML=`<span class="bento-number">${number}</span><span class="ritual">${data.ritual}</span><h3>${name}</h3><div class="experience-title">${data.title}</div><p>${data.copy}</p><span class="experience-open">ΔΕΙΤΕ ΤΗΝ ΕΜΠΕΙΡΙΑ →</span>`;
    });
  }

  /* Final requested flow: remove legacy parallax + Why block between experiences and heritage. */
  document.querySelector('.luxury-parallax')?.classList.add('legacy-why-section');
  const whyTitle=document.querySelector('[data-content-key="whyTitle"]');
  whyTitle?.closest('.section')?.classList.add('legacy-why-section');

  /* Team — Sofia must be left, Giannis right. */
  const team=document.querySelector('.home-team-editorial');
  if(team){
    const container=team.querySelector('.container');
    const grid=team.querySelector('.team-grid');
    if(container&&grid){
      const existingKicker=container.querySelector(':scope > .kicker');
      const existingHeading=container.querySelector(':scope > h2');
      const intro=document.createElement('div');
      intro.className='team-intro';
      intro.innerHTML=`<div class="kicker">THE PEOPLE BEHIND ATHLETICO</div><div class="team-intro-copy"><h2>Οι άνθρωποι πίσω<br>από την εμπειρία.</h2><p>Οι μέθοδοι εξελίσσονται. Η προσωπική φροντίδα παραμένει ανθρώπινη.</p><p>Στο Athletico, η καθοδήγηση ξεκινά από την παρατήρηση, την επικοινωνία και την κατανόηση των αναγκών του κάθε ανθρώπου.</p><div class="team-brand-line">PERSONAL GUIDANCE.<br>HUMAN PRESENCE.</div></div>`;
      existingKicker?.remove();existingHeading?.remove();
      grid.before(intro);
      const cards=[...grid.querySelectorAll('.profile-card')];
      const sofia=cards.find(card=>/Σοφία/i.test(card.textContent)||/sofia/i.test(card.querySelector('img')?.src||''));
      const giannis=cards.find(card=>/Γιάννης/i.test(card.textContent)||/giannis/i.test(card.querySelector('img')?.src||''));
      if(sofia&&giannis){grid.innerHTML='';grid.append(sofia,giannis)}
      grid.querySelectorAll('.profile-card').forEach(card=>{
        const h3=card.querySelector('h3');
        const p=card.querySelector('p');
        const isSofia=/Σοφία/i.test(h3?.textContent||'');
        if(p)p.textContent=isSofia?'Movement · Personal Guidance':'Personal Training · Performance';
        if(h3){const index=document.createElement('div');index.className='editorial-index';index.textContent=isSofia?'01 · PERSONAL GUIDANCE':'02 · PERFORMANCE';card.querySelector('.profile-photo')?.after(index)}
      });
    }
  }

  /* Personal invitation before contact/footer. */
  if(!document.querySelector('.private-invitation')){
    const invitation=document.createElement('section');
    invitation.className='private-invitation';
    invitation.innerHTML=`<div class="private-invitation-inner"><div class="kicker">PERSONAL INVITATION</div><div class="private-invitation-copy"><h2>Ο χρόνος σας.<br>Το σώμα σας.<br><span>Η εμπειρία σας.</span></h2><a class="btn" href="contact.html#visit">ΠΡΟΓΡΑΜΜΑΤΙΣΤΕ ΜΙΑ ΕΠΙΣΚΕΨΗ →</a></div></div>`;
    const footer=document.querySelector('.site-footer');
    if(footer)footer.before(invitation);else document.querySelector('main')?.append(invitation);
  }

  /* Soft reveal and subtle image drift. */
  const revealTargets=[...document.querySelectorAll('#philosophy .concept-copy>* ,.luxury-services .section-title>* ,.bento-item,.team-intro-copy>* ,.private-invitation>*')];
  revealTargets.forEach(el=>el.classList.add('home-v3-reveal'));
  if(reduced){revealTargets.forEach(el=>el.classList.add('is-visible'));return}

  if('IntersectionObserver'in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');entry.target.classList.toggle('is-active',entry.target.classList.contains('bento-item'));io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7%'});
    revealTargets.forEach(el=>io.observe(el));
  }else revealTargets.forEach(el=>el.classList.add('is-visible'));

  let ticking=false;
  const drift=()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      document.querySelectorAll('.bento-item').forEach((item,index)=>{
        const r=item.getBoundingClientRect();
        if(r.bottom<0||r.top>innerHeight)return;
        const normalized=(r.top+r.height/2-innerHeight/2)/innerHeight;
        item.style.setProperty('--experience-drift',`${Math.max(-14,Math.min(14,-normalized*(7+(index%3)*2)))}px`);
      });
      ticking=false;
    });
  };
  addEventListener('scroll',drift,{passive:true});drift();
})();