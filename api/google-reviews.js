export default async function handler(req,res){
  const key=process.env.GOOGLE_PLACES_API_KEY;
  const placeId='ChIJFZL8h9QeWRMRqfUtw2YM0Ac';
  if(!key){return res.status(503).json({ok:false,error:'GOOGLE_PLACES_API_KEY_NOT_CONFIGURED'});}
  try{
    const url=`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const r=await fetch(url,{headers:{'X-Goog-Api-Key':key,'X-Goog-FieldMask':'displayName,rating,userRatingCount,reviews,googleMapsUri'}});
    if(!r.ok){return res.status(r.status).json({ok:false,error:'GOOGLE_PLACES_REQUEST_FAILED'});}
    const data=await r.json();
    const reviews=(data.reviews||[]).map(x=>({
      name:x.authorAttribution?.displayName||'Google user',
      photo:x.authorAttribution?.photoUri||'',
      profile:x.authorAttribution?.uri||'',
      rating:x.rating||0,
      text:x.text?.text||x.originalText?.text||'',
      relativeTime:x.relativePublishTimeDescription||'',
      publishTime:x.publishTime||'',
      googleMapsUri:x.googleMapsUri||data.googleMapsUri||''
    })).filter(x=>x.text);
    res.setHeader('Cache-Control','s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json({ok:true,name:data.displayName?.text||'Athletico Fitness Boutique',rating:data.rating||null,userRatingCount:data.userRatingCount||0,reviews,googleMapsUri:data.googleMapsUri||''});
  }catch(e){return res.status(500).json({ok:false,error:'GOOGLE_PLACES_UNAVAILABLE'});}
}
