import{computed,reactive}from'vue';import{makeId,sanitizeNickname}from'./utils'
export const player=reactive({id:localStorage.getItem('flagstreak_player_id')||'',nickname:localStorage.getItem('flagstreak_nickname')||'',best:Number(localStorage.getItem('flagstreak_best')||0)})
export const hasPlayer=computed(()=>!!player.id&&!!player.nickname)
export function savePlayer(value:string){const name=sanitizeNickname(value);if(!name)return false;player.id||=makeId();player.nickname=name;localStorage.setItem('flagstreak_player_id',player.id);localStorage.setItem('flagstreak_nickname',name);return true}
export function saveBest(score:number){if(score<=player.best)return false;player.best=score;localStorage.setItem('flagstreak_best',String(score));return true}
export const prefs=reactive({sound:localStorage.getItem('flagstreak_sound')!=='false',vibration:localStorage.getItem('flagstreak_vibration')!=='false'})
export function setPref(key:'sound'|'vibration',v:boolean){prefs[key]=v;localStorage.setItem(`flagstreak_${key}`,String(v))}
