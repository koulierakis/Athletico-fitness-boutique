(()=>{
  'use strict';
  const PIN_SESSION='athleticoAdminPinSession';
  const STORAGE_KEY='athleticoVisualAdminV3';
  const saveBtn=document.getElementById('save');
  const statusEl=document.getElementById('status');
  const iframeEl=document.getElementById('preview');

  function normalize(remote){
    if(!remote||typeof remote!=='object')return null;
    return {pages:remote.pages&&typeof remote.pages==='object'?remote.pages:{},design:remote.design&&typeof remote.design==='object'?remote.design:{}};
  }

  async function loadOnline(){
    try{
      statusEl.textContent='Φόρτωση online ρυθμίσεων…';
      const r=await fetch(`/api/admin-settings?t=${Date.now()}`,{cache:'no-store'});
      const data=await r.json();
      const remote=normalize(data?.state);
      if(!data?.ok||!remote)throw new Error('load_failed');
      state={
        ...state,
        ...remote,
        pages:{...(state.pages||{}),...(remote.pages||{})},
        design:{...(state.design||{}),...(remote.design||{})}
      };
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
      if(iframeEl?.contentWindow)iframeEl.contentWindow.location.reload();
      statusEl.textContent='Online ρυθμίσεις συγχρονίστηκαν';
    }catch{
      statusEl.textContent='Χρήση τοπικών ρυθμίσεων · online συγχρονισμός μη διαθέσιμος';
    }
  }

  async function publishOnline(){
    const pin=sessionStorage.getItem(PIN_SESSION)||'';
    if(!pin){
      statusEl.textContent='Χρειάζεται νέα είσοδος στο Admin πριν από online αποθήκευση.';
      return;
    }
    saveBtn.disabled=true;
    const oldText=saveBtn.textContent;
    saveBtn.textContent='ΑΠΟΘΗΚΕΥΣΗ…';
    statusEl.textContent='Αποθήκευση online…';
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
      const r=await fetch('/api/admin-settings',{
        method:'POST',
        headers:{'Content-Type':'application/json','X-Athletico-Admin-Pin':pin},
        body:JSON.stringify({state})
      });
      const data=await r.json().catch(()=>({}));
      if(!r.ok||!data.ok){
        if(data.error==='ATHLETICO_ADMIN_PIN_NOT_CONFIGURED')throw new Error('PIN_NOT_CONFIGURED');
        if(data.error==='GITHUB_ADMIN_TOKEN_NOT_CONFIGURED')throw new Error('TOKEN_NOT_CONFIGURED');
        if(r.status===401)throw new Error('BAD_PIN');
        throw new Error(data.error||'SAVE_FAILED');
      }
      statusEl.textContent='Αποθηκεύτηκε ONLINE · οι αλλαγές είναι μόνιμες';
    }catch(e){
      const code=e?.message||'';
      if(code==='PIN_NOT_CONFIGURED')statusEl.textContent='Λείπει ATHLETICO_ADMIN_PIN από το Vercel.';
      else if(code==='TOKEN_NOT_CONFIGURED')statusEl.textContent='Λείπει GITHUB_ADMIN_TOKEN από το Vercel.';
      else if(code==='BAD_PIN')statusEl.textContent='Το PIN του Admin δεν συμφωνεί με το ATHLETICO_ADMIN_PIN στο Vercel.';
      else statusEl.textContent='Η online αποθήκευση απέτυχε · οι αλλαγές έμειναν προσωρινά στον browser.';
    }finally{
      saveBtn.disabled=false;
      saveBtn.textContent=oldText;
    }
  }

  if(saveBtn)saveBtn.onclick=publishOnline;
  window.addEventListener('load',()=>setTimeout(loadOnline,250),{once:true});
})();
