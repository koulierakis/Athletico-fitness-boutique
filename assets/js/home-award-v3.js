(()=>{
  const file=(location.pathname.split('/').filter(Boolean).pop()||'index.html').toLowerCase();
  if(file!=='index.html'&&file!=='')return;

  document.body.classList.add('home-award-v3');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero copy — preserve the real reception image. */
  const hero=document.querySelector('.hero.luxury-split');
  if(hero){
    const kicker=hero.querySelector('.luxury-hero-kicker');
    const title=hero.querySelector('h1');
    const copy=hero.querySelector('.luxury-hero-copy>p');
    const actions=hero.querySelector('.luxury-hero-actions');
    const meta=hero.querySelector('.luxury-hero-meta');
    if(kicker)kicker.textContent='ATHLETICO · WELLNESS CENTER · TRIKALA';
    if(title)title.innerHTML='Η ευεξία,<span>σε προσωπική διάσταση.</span>';
    if(copy)copy.textContent='Ένας ιδιωτικός προορισμός ευεξίας, όπου η κίνηση, η φροντίδα και η τεχνολογία συναντούν μια βαθιά προσωπική προσέγγιση.';
    if(actions){
      actions.innerHTML='<a class="btn" href="#experiences">ΑΝΑΚΑΛΥΨΤΕ ΤΗΝ ΕΜΠΕΙΡΙΑ →</a>';
      const secondary=document.createElement('p');
      secondary.className='hero-secondary';
      secondary.textContent='Από το 2000. Με έναν σκοπό: να αισθάνεστε καλύτερα στο σώμα σας — και στη ζωή σας.';
      actions.before(secondary);
    }
    if(meta)meta.innerHTML='<span>ΚΙΝΗΣΗ ΜΕ ΣΚΟΠΟ.</span><span>ΦΡΟΝΤΙΔΑ ΜΕ ΣΥΝΕΠΕΙΑ.</span>';
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
    {ritual:'THE PRIVATE PERFORMANCE RITUAL',title:'Δύναμη, σχεδιασμένη αποκλειστικά για εσάς.',copy:'Εξατομικευμένη αρχιτεκτονική κίνησης. Προσωπική καθοδήγηση. Απόλυτη συγκέντρωση στον δικό σας στόχο.'},
    {ritual:'THE BALANCE RITUAL',title:'Ρυθμός. Ισορροπία. Ροή.',copy:'Μια ολοκληρωμένη εμπειρία κίνησης που ενεργοποιεί ολόκληρο το σώμα και επαναφέρει την αίσθηση ισορροπίας.'},
    {ritual:'THE ENERGY RITUAL',title:'Η δύναμη ξεκινά από το κέντρο.',copy:'Στοχευμένη ενεργοποίηση. Έλεγχος. Σταθερότητα. Μια εμπειρία που χτίζει το σώμα από μέσα προς τα έξω.'},
    {ritual:'THE ALIGNMENT RITUAL',title:'Εκεί όπου η κίνηση γίνεται αρμονία.',copy:'Ακρίβεια, αναπνοή και συνειδητή κίνηση σε μια εμπειρία που επαναφέρει το σώμα στη φυσική του ισορροπία.'},
    {ritual:'THE LIGHTNESS RITUAL',title:'Κίνηση που αφήνει το σώμα να αισθανθεί πιο ανάλαφρο.',copy:'Μια προηγμένη εμπειρία κίνησης σε ελεγχόμενο περιβάλλον, σχεδιασμένη να ενσωματώνεται στη δική σας προσωπική wellness routine.'},
    {ritual:'THE INTELLIGENT BODY RITUAL',title:'Τεχνολογία που ακολουθεί το σώμα. Όχι το αντίθετο.',copy:'Wireless EMS με εξατομικευμένη καθοδήγηση και απόλυτη ελευθερία κίνησης. Μια σύγχρονη προσέγγιση για ανθρώπους που εκτιμούν τον χρόνο τους.'},
    {ritual:'THE LIGHT RITUAL',title:'Μια προσωπική στιγμή φωτός.',copy:'Ένας ιδιωτικός χώρος αφιερωμένος σε λίγα λεπτά αποφόρτισης και προσωπικού χρόνου.'}
  ];
  if(services){
    const sectionTitle=services.querySelector('.section-title');
    if(sectionTitle)sectionTitle.innerHTML=`<span>SEVEN SIGNATURE EXPERIENCES</span><div class="experience-intro"><h2>Επτά διαδρομές.<br>Ένας προορισμός: εσείς.</h2><p>Επτά διαφορετικές εμπειρίες ευεξίας. Καθεμία σχεδιασμένη για μια διαφορετική ανάγκη. Όλες με την ίδια φιλοσοφία: προσωπική φροντίδα χωρίς συμβιβασμούς.</p></div>`;
    services.querySelectorAll('.bento-item').forEach((item,index)=>{
      const data=experienceData[index];
      if(!data)return;
      const content=item.querySelector('.bento-content');
      const number=content?.querySelector('.bento-number')?.textContent||String(index+1).padStart(2,'0');
      const name=content?.querySelector('h3')?.textContent||'';
      if(content)content.innerHTML=`<span class="bento-number">${number}</span><span class="ritual">${data.ritual}</span><h3>${name}</h3><div class="experience-title">${data.title}</div><p>${data.copy}</p><span class="experience-open">EXPLORE EXPERIENCE →</span>`;
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
      intro.innerHTML=`<div class="kicker">THE PEOPLE BEHIND ATHLETICO</div><div class="team-intro-copy"><h2>Οι άνθρωποι πίσω<br>από την εμπειρία.</h2><p>Η τεχνολογία εξελίσσεται. Οι μέθοδοι αλλάζουν.</p><p>Η πραγματική φροντίδα, όμως, παραμένει ανθρώπινη.</p><p>Στο Athletico, η καθοδήγηση ξεκινά από την παρατήρηση και την κατανόηση. Από ανθρώπους που γνωρίζουν πότε να σας ωθήσουν μπροστά — και πότε να σας αφήσουν να βρείτε τον δικό σας ρυθμό.</p><div class="team-brand-line">NOT INSTRUCTORS.<br>PARTNERS IN YOUR WELLBEING.</div></div>`;
      existingKicker?.remove();existingHeading?.remove();
      grid.before(intro);
      const cards=[...grid.querySelectorAll('.profile-card')];
      const sofia=cards.find(card=>/Σοφία/i.test(card.textContent)||/sofia/i.test(card.querySelector('img')?.src||''));
      const giannis=cards.find(card=>/Γιάννης/i.test(card.textContent)||/giannis/i.test(card.querySelector('img')?.src||''));
      if(sofia&&giannis){grid.innerHTML='';grid.append(sofia,giannis)}
      grid.querySelectorAll('.profile-card').forEach(card=>{
        const h3=card.querySelector('h3');
        const p=card.querySelector('p');
        if(p)p.textContent='Wellness Mentor · Athletico';
        if(h3){const index=document.createElement('div');index.className='editorial-index';index.textContent=/Σοφία/i.test(h3.textContent)?'01 · PERSONAL PRESENCE':'02 · PERSONAL PRESENCE';card.querySelector('.profile-photo')?.after(index)}
      });
    }
  }

  /* Private invitation before contact/footer. */
  if(!document.querySelector('.private-invitation')){
    const invitation=document.createElement('section');
    invitation.className='private-invitation';
    invitation.innerHTML=`<div class="private-invitation-inner"><div class="kicker">PRIVATE INVITATION</div><div class="private-invitation-copy"><h2>Your time.<br>Your body.<br><span>Your Athletico.</span></h2><a class="btn" href="contact.html#visit">BEGIN YOUR EXPERIENCE →</a></div></div>`;
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
