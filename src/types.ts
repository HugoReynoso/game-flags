export type Locale='it'|'en'|'es'; export type GameMode='classic'|'timeAttack'|'forehead'|'daily'; export type GameStatus='idle'|'countdown'|'playing'|'correct'|'wrong'|'paused'|'gameOver';
export interface Country{code:string;names:Record<Locale,string>;continent:string;flagAsset:string} export interface Question{country:Country;answers:Country[]}
