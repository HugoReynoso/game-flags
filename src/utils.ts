export const shuffle=<T>(items:readonly T[],random=Math.random):T[]=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
export const makeId=()=>crypto.randomUUID?.()??`${Date.now()}-${Math.random().toString(36).slice(2)}`
export const sanitizeNickname=(v:string)=>v.replace(/[<>]/g,'').replace(/\s+/g,' ').trim().slice(0,18)
export async function shareText(text:string){if(navigator.share)await navigator.share({text,url:location.origin});else{await navigator.clipboard.writeText(`${text}\n${location.origin}`);return true}return false}
