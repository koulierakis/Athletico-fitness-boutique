(()=>{
  'use strict';
  const TEXT_SELECTOR='h1,h2,h3,h4,h5,h6,p,li,a,button,label,span,strong,em,small';
  const SKIP_SELECTOR='script,style,noscript,svg,code,pre,input,textarea,select,option';

  function pageName(){
    const p=location.pathname.replace(/\/+$/,'').split('/').pop()||'index.html';
    return p.includes('.')?p:'index.html';
  }
  function isUsefulText(node){return node&&node.nodeType===Node.TEXT_NODE&&/\S/.test(node.nodeValue||'')}
  function splitSentences(text){const parts=text.match(/[^.!?;·]+(?:[.!?;·]+(?=\s|$)|$)|\s+/g);return parts&&parts.length?parts:[text]}
  function fragmentize(doc){
    let counter=0;
    [...doc.querySelectorAll(TEXT_SELECTOR)].forEach(el=>{
      if(el.closest(SKIP_SELECTOR)||el.dataset.adminFragmentized==='1')return;
      const nodes=[...el.childNodes].filter(isUsefulText);
      if(!nodes.length)return;
      nodes.forEach(node=>{
        const frag=doc.createDocumentFragment();
        splitSentences(node.nodeValue).forEach(part=>{
          if(!/\S/.test(part)){frag.appendChild(doc.createTextNode(part));return}
          counter++;
          const span=doc.createElement('span');
          span.dataset.adminFragment=`f${counter}`;
          span.dataset.contentKey=`admin-fragment-f${counter}`;
          span.textContent=part;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      });
      el.dataset.adminFragmentized='1';
    });
  }
  function kebab(k){return k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}
  function apply(state){
    if(!state||!state.pages)return;
    fragmentize(document);
    const ps=state.pages[pageName()]||{};
    Object.entries(ps.elements||{}).forEach(([sel,o])=>{
      let el=null;try{el=document.querySelector(sel)}catch{}
      if(!el)return;
      if(o.text!==undefined)el.textContent=o.text;
      if(o.html!==undefined)el.innerHTML=o.html;
      if(o.src&&el.tagName==='IMG')el.src=o.src;
      Object.entries(o.style||{}).forEach(([k,v])=>el.style.setProperty(kebab(k),v,'important'));
    });
    if(ps.page?.background)document.body.style.setProperty('background',ps.page.background,'important');
    if(ps.page?.color)document.body.style.setProperty('color',ps.page.color,'important');
    if(state.design?.accent)document.documentElement.style.setProperty('--admin-accent',state.design.accent);
    if(state.design?.contentWidth)document.documentElement.style.setProperty('--admin-content-width',`${state.design.contentWidth}px`);
  }
  async function load(){
    try{
      const r=await fetch(`/api/admin-settings?t=${Date.now()}`,{cache:'no-store'});
      const data=await r.json();
      if(data?.ok&&data.state)apply(data.state);
    }catch{}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(load,60),{once:true});
  else setTimeout(load,60);
})();
