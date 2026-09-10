const OWNER='koulierakis';
const REPO='Athletico-fitness-boutique';
const BRANCH='main';
const SETTINGS_PATH='data/admin-settings.json';
const GH_API=`https://api.github.com/repos/${OWNER}/${REPO}/contents/${SETTINGS_PATH}`;

function githubHeaders(token){
  const h={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'athletico-admin'};
  if(token) h.Authorization=`Bearer ${token}`;
  return h;
}

function safeState(value){
  if(!value||typeof value!=='object'||Array.isArray(value)) return null;
  const pages=value.pages&&typeof value.pages==='object'&&!Array.isArray(value.pages)?value.pages:{};
  const design=value.design&&typeof value.design==='object'&&!Array.isArray(value.design)?value.design:{};
  return {pages,design};
}

async function readSettings(token){
  const r=await fetch(`${GH_API}?ref=${encodeURIComponent(BRANCH)}&ts=${Date.now()}`,{headers:githubHeaders(token),cache:'no-store'});
  if(r.status===404) return {state:{pages:{},design:{accent:'#d4af37',contentWidth:1300}},sha:null};
  if(!r.ok) throw new Error(`github_read_${r.status}`);
  const data=await r.json();
  const text=Buffer.from(data.content||'','base64').toString('utf8');
  const parsed=safeState(JSON.parse(text));
  if(!parsed) throw new Error('invalid_settings');
  return {state:parsed,sha:data.sha||null};
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  if(req.method==='GET'){
    try{
      const {state}=await readSettings(process.env.GITHUB_ADMIN_TOKEN||'');
      return res.status(200).json({ok:true,state});
    }catch(e){
      return res.status(200).json({ok:true,state:{pages:{},design:{accent:'#d4af37',contentWidth:1300}},fallback:true});
    }
  }
  if(req.method!=='POST') return res.status(405).json({ok:false,error:'METHOD_NOT_ALLOWED'});

  const configuredPin=String(process.env.ATHLETICO_ADMIN_PIN||'');
  const suppliedPin=String(req.headers['x-athletico-admin-pin']||'');
  if(!configuredPin) return res.status(503).json({ok:false,error:'ATHLETICO_ADMIN_PIN_NOT_CONFIGURED'});
  if(!suppliedPin||suppliedPin!==configuredPin) return res.status(401).json({ok:false,error:'UNAUTHORIZED'});

  const token=process.env.GITHUB_ADMIN_TOKEN;
  if(!token) return res.status(503).json({ok:false,error:'GITHUB_ADMIN_TOKEN_NOT_CONFIGURED'});

  const state=safeState(req.body?.state);
  if(!state) return res.status(400).json({ok:false,error:'INVALID_STATE'});
  const payload=JSON.stringify(state,null,2)+'\n';
  if(Buffer.byteLength(payload,'utf8')>3_000_000) return res.status(413).json({ok:false,error:'STATE_TOO_LARGE'});

  try{
    const existing=await readSettings(token);
    const body={message:'chore(admin): publish visual settings',content:Buffer.from(payload,'utf8').toString('base64'),branch:BRANCH};
    if(existing.sha) body.sha=existing.sha;
    const r=await fetch(GH_API,{method:'PUT',headers:{...githubHeaders(token),'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data=await r.json().catch(()=>({}));
    if(!r.ok) return res.status(r.status).json({ok:false,error:'GITHUB_WRITE_FAILED'});
    return res.status(200).json({ok:true,commit:data.commit?.sha||null});
  }catch(e){
    return res.status(500).json({ok:false,error:'ONLINE_SAVE_FAILED'});
  }
}
