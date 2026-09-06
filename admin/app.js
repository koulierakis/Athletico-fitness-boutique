const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const state = {
  heroTitle: 'Η εμπειρία Athletico.',
  heroText: 'Premium personal training, EMS και wellness εμπειρία στο κέντρο των Τρικάλων.',
  ctaText: 'Κλείσε ραντεβού',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 54,
  fontWeight: 400,
  textAlign: 'left',
  imagePosition: 50,
  heroImage: null,
};

const viewportMap = {
  mobile: '390 × 844',
  tablet: '768 × 1024',
  laptop: '1280 × 800',
  desktop: '1440 × 900',
};

function applyPreview() {
  $('#previewTitle').textContent = state.heroTitle;
  $('#previewText').textContent = state.heroText;
  $('#previewCta').textContent = state.ctaText;
  $('#previewTitle').style.fontFamily = state.fontFamily;
  $('#previewTitle').style.fontSize = `${state.fontSize}px`;
  $('#previewTitle').style.fontWeight = state.fontWeight;
  $('.hero-content').style.textAlign = state.textAlign;
  $('.hero-content').style.alignItems = state.textAlign === 'center' ? 'center' : (state.textAlign === 'right' ? 'flex-end' : 'flex-start');
  $('#heroImage').style.backgroundPosition = `${state.imagePosition}% center`;
  if (state.heroImage) $('#heroImage').style.backgroundImage = `url(${state.heroImage})`;
  $('#fontSizeValue').textContent = `${state.fontSize}px`;
}

function bindText(id, key) {
  $(id).addEventListener('input', (e) => {
    state[key] = e.target.value;
    applyPreview();
  });
}

bindText('#heroTitle', 'heroTitle');
bindText('#heroText', 'heroText');
bindText('#ctaText', 'ctaText');

$('#fontFamily').addEventListener('change', e => { state.fontFamily = e.target.value; applyPreview(); });
$('#fontSize').addEventListener('input', e => { state.fontSize = Number(e.target.value); applyPreview(); });
$('#fontWeight').addEventListener('change', e => { state.fontWeight = e.target.value; applyPreview(); });
$('#textAlign').addEventListener('change', e => { state.textAlign = e.target.value; applyPreview(); });
$('#imagePosition').addEventListener('input', e => { state.imagePosition = Number(e.target.value); applyPreview(); });

$$('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  $$('.nav-item').forEach(x => x.classList.remove('active'));
  $$('.panel').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  $(`#panel-${btn.dataset.panel}`).classList.add('active');
}));

$$('.device').forEach(btn => btn.addEventListener('click', () => {
  $$('.device').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const frame = $('#deviceFrame');
  frame.className = `device-frame ${btn.dataset.device}`;
  $('#viewportLabel').textContent = viewportMap[btn.dataset.device];
}));

$('#heroImageInput').addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) {
    $('#imageMeta').textContent = 'Μη υποστηριζόμενος τύπος. Χρησιμοποίησε JPG, PNG ή WebP.';
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    $('#imageMeta').textContent = 'Η φωτογραφία είναι πάνω από 8MB. Χρειάζεται συμπίεση πριν τη δημοσίευση.';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.heroImage = reader.result;
      const mp = ((img.width * img.height) / 1_000_000).toFixed(1);
      const ratio = (img.width / img.height).toFixed(2);
      $('#imageMeta').textContent = `${img.width}×${img.height} • ${mp}MP • αναλογία ${ratio} • ${(file.size/1024/1024).toFixed(2)}MB`;
      applyPreview();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

$('#saveDraft').addEventListener('click', () => {
  const draft = { ...state, savedAt: new Date().toISOString() };
  try {
    localStorage.setItem('athletico-admin-draft', JSON.stringify(draft));
    $('#saveDraft').textContent = 'Αποθηκεύτηκε';
    setTimeout(() => $('#saveDraft').textContent = 'Αποθήκευση draft', 1400);
  } catch {
    alert('Το draft δεν αποθηκεύτηκε. Η φωτογραφία μπορεί να είναι πολύ μεγάλη για τοπική αποθήκευση.');
  }
});

(function restoreDraft(){
  try {
    const raw = localStorage.getItem('athletico-admin-draft');
    if (!raw) return;
    Object.assign(state, JSON.parse(raw));
    $('#heroTitle').value = state.heroTitle;
    $('#heroText').value = state.heroText;
    $('#ctaText').value = state.ctaText;
    $('#fontFamily').value = state.fontFamily;
    $('#fontSize').value = state.fontSize;
    $('#fontWeight').value = state.fontWeight;
    $('#textAlign').value = state.textAlign;
    $('#imagePosition').value = state.imagePosition;
  } catch {}
  applyPreview();
})();

applyPreview();