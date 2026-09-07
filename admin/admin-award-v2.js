/* Athletico award rebuild admin map — keeps the visual editor aligned with the live editorial structure. */
const hasSavedAwardCms=Boolean(localStorage.getItem(KEY)||localStorage.getItem(LEGACY));
if(!hasSavedAwardCms){
  state.design.heroFrameRadius=0;
  state.design.cardRadius=0;
  state.design.contentMaxWidth=1380;
}
sectionMap['index.html']=[
  ['header','Κεφαλίδα / Menu'],
  ['.hero','Hero · reception & τίτλος'],
  ['#philosophy','Τι είναι το Athletico'],
  ['.award-manifesto','Manifesto / φιλοσοφία'],
  ['.luxury-services','Seven Athletico Experiences'],
  ['.luxury-parallax','Η εμπειρία Athletico'],
  ['.why-list','Why Athletico'],
  ['.heritage-editorial','Heritage · 2000 → 2026'],
  ['.home-team-editorial','Ομάδα · editorial portraits'],
  ['.home-reviews','Google Reviews'],
  ['.home-contact-editorial','Προσωπική επίσκεψη'],
  ['.site-footer','Footer']
];
sectionMap['services.html']=[
  ['header','Κεφαλίδα / Menu'],
  ['.page-hero','Τίτλος σελίδας'],
  ['.luxury-services','Seven Athletico Experiences'],
  ['.site-footer','Footer']
];
pages.filter(p=>p[0].startsWith('services/')).forEach(p=>sectionMap[p[0]]=[
  ['header','Κεφαλίδα'],
  ['.detail-hero','Hero εμπειρίας · τίτλος & φωτογραφία'],
  ['main .section','Αναλυτικό κείμενο'],
  ['.award-experience-nav','Προηγούμενη / επόμενη εμπειρία']
]);
if(!hasSavedAwardCms){
  const heroRadius=document.querySelector('[data-global="heroFrameRadius"]');
  const cardRadius=document.querySelector('[data-global="cardRadius"]');
  const contentWidth=document.querySelector('[data-global="contentMaxWidth"]');
  if(heroRadius)heroRadius.value='0';
  if(cardRadius)cardRadius.value='0';
  if(contentWidth)contentWidth.value='1380';
}
pagesUI();
