import{computed,reactive}from'vue';import{makeId,sanitizeNickname}from'./utils'
export interface LocalPlayer{id:string;nickname:string;best:number;timeAttackBest:number}
const storageKey='flagstreak_players';
function loadPlayers():LocalPlayer[]{try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved)&&saved.length)return saved.map(p=>({id:String(p.id),nickname:sanitizeNickname(String(p.nickname)),best:Number(p.best)||0,timeAttackBest:Number(p.timeAttackBest)||0})).filter(p=>p.id&&p.nickname)}catch{}const id=localStorage.getItem('flagstreak_player_id')||'',nickname=sanitizeNickname(localStorage.getItem('flagstreak_nickname')||'');return id&&nickname?[{id,nickname,best:Number(localStorage.getItem('flagstreak_best')||0),timeAttackBest:Number(localStorage.getItem('flagstreak_best_timeAttack')||0)}]:[]}
export const players=reactive<LocalPlayer[]>(loadPlayers());
const activeId=localStorage.getItem('flagstreak_active_player')||localStorage.getItem('flagstreak_player_id')||players[0]?.id||'';
const initial=players.find(p=>p.id===activeId)||players[0]||{id:'',nickname:'',best:0,timeAttackBest:0};
export const player=reactive<LocalPlayer>({...initial});
export const hasPlayer=computed(()=>!!player.id&&!!player.nickname);
function persist(){localStorage.setItem(storageKey,JSON.stringify(players));localStorage.setItem('flagstreak_active_player',player.id);localStorage.setItem('flagstreak_player_id',player.id);localStorage.setItem('flagstreak_nickname',player.nickname);localStorage.setItem('flagstreak_best',String(player.best));localStorage.setItem('flagstreak_best_timeAttack',String(player.timeAttackBest))}
export function savePlayer(value:string){const name=sanitizeNickname(value);if(!name||players.some(p=>p.nickname.toLocaleLowerCase()===name.toLocaleLowerCase()))return false;const created={id:makeId(),nickname:name,best:0,timeAttackBest:0};players.push(created);Object.assign(player,created);persist();return true}
export function selectPlayer(id:string){const selected=players.find(p=>p.id===id);if(!selected)return false;Object.assign(player,selected);persist();return true}
export function saveBest(score:number){if(score<=player.best)return false;player.best=score;const stored=players.find(p=>p.id===player.id);if(stored)stored.best=score;persist();return true}
export function saveTimeAttackBest(score:number){if(score<=player.timeAttackBest)return false;player.timeAttackBest=score;const stored=players.find(p=>p.id===player.id);if(stored)stored.timeAttackBest=score;persist();return true}
if(players.length)persist();
export const prefs=reactive({sound:localStorage.getItem('flagstreak_sound')!=='false',vibration:localStorage.getItem('flagstreak_vibration')!=='false'})
export function setPref(key:'sound'|'vibration',v:boolean){prefs[key]=v;localStorage.setItem(`flagstreak_${key}`,String(v))}
