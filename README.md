<div align="center">

# 🌍 Flag Streak

### Quante bandiere del mondo riesci a riconoscere di fila?

[![Demo online](https://img.shields.io/badge/▶_GIOCA_ORA-36e5a8?style=for-the-badge&logoColor=08152f)](https://hugoreynoso.github.io/game-flags/)

**[Apri la demo →](https://hugoreynoso.github.io/game-flags/)**

Un gioco web mobile-first veloce, multilingua e installabile, costruito con Vue 3 e TypeScript.

</div>

## Il gioco

Flag Streak trasforma il riconoscimento delle bandiere in una sfida rapida pensata soprattutto per smartphone. Non richiede download né registrazione: scegli un nickname e inizi subito.

### 🎯 Classic

Riconosci la bandiera scegliendo tra quattro paesi. Hai 10 secondi per ogni domanda: una risposta sbagliata o il tempo scaduto terminano la serie.

### 📱 Sulla fronte / Forehead

Tieni il telefono sulla fronte mentre gli amici descrivono la bandiera. Inclina verso il basso per segnare una risposta corretta e verso l’alto per passare. La partita dura 60 secondi e include sempre i pulsanti touch come alternativa ai sensori.

## Funzionalità

- Esperienza mobile-first senza scroll durante la partita
- Italiano, English ed Español
- Nickname e record salvati localmente
- Dataset ISO locale con oltre 240 paesi e territori
- Timer, feedback sonori, vibrazione e animazioni leggere
- Sensori `DeviceOrientation` con permessi iOS, soglia e cooldown
- Condivisione tramite Web Share API o Clipboard
- Ranking globale opzionale con Supabase
- Autenticazione anonima, senza email o password
- Modalità offline con coda locale dei risultati
- PWA installabile su iPhone, Android e desktop
- Supporto tastiera, focus visibile e `prefers-reduced-motion`

## Stack

- Vue 3, TypeScript e Vite
- Composition API e Vue Router
- Supabase
- Vite PWA / Workbox
- Web Audio, Vibration e DeviceOrientation API
- CSS mobile-first senza librerie UI

## Avvio locale

Richiede Node.js 20 o successivo.

```bash
git clone https://github.com/HugoReynoso/game-flags.git
cd game-flags
npm install
npm run dev
```

Per provarlo da uno smartphone sulla stessa rete:

```bash
npm run dev -- --host
```

## Build

```bash
npm run build
npm run preview
```

La build viene generata nella cartella `dist`.

## Configurazione Supabase

Il gioco funziona anche senza Supabase. Per attivare ranking e sincronizzazione:

1. Crea un progetto su Supabase.
2. Esegui [`supabase/schema.sql`](supabase/schema.sql) nel SQL Editor.
3. Abilita **Authentication → Providers → Anonymous Sign-Ins**.
4. Copia `.env.example` in `.env`.
5. Inserisci le variabili pubbliche:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Non inserire mai una chiave `service_role` nel frontend o nel repository.

### Sicurezza ranking

Le policy RLS associano player e punteggi all’utente anonimo Supabase autenticato. Impediscono di modificare altri giocatori e limitano nickname, modalità e punteggi. Per una classifica competitiva, la validazione completa dovrà essere spostata in una Edge Function server-side.

## PWA e offline

La build genera manifest, service worker e cache degli asset. Dopo il primo caricamento Classic continua a funzionare offline; i punteggi vengono accodati localmente quando Supabase non è raggiungibile.

## DeviceMotion su iPhone

- I sensori funzionano solo in un contesto HTTPS.
- Safari richiede un’interazione esplicita prima del permesso.
- Il permesso viene richiesto premendo **INIZIA**.
- Alcuni browser integrati nelle app possono bloccare i sensori.
- I pulsanti **PASSA** e **CORRETTO** restano sempre disponibili.

## Deploy

GitHub Actions pubblica automaticamente ogni push su `main` su GitHub Pages.

| Provider | Build command | Output |
|---|---|---|
| GitHub Pages | automatico | `dist` |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| Cloudflare Pages | `npm run build` | `dist` |

Configura sul provider `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` per abilitare il ranking.

## Struttura essenziale

```text
src/
├── composables/       # Logica delle modalità
├── data/              # Dataset locale dei paesi
├── services/          # Supabase e ranking
├── views/             # Onboarding, home, giochi e impostazioni
├── audio.ts           # Effetti Web Audio
├── i18n.ts            # Traduzioni IT / EN / ES
├── stores.ts          # Player e preferenze locali
└── style.css          # Design responsive
supabase/schema.sql    # Database, funzioni e RLS
```

## Roadmap

- [x] Classic Mode
- [x] Forehead Mode con sensori e fallback touch
- [x] PWA e supporto offline
- [x] Ranking Supabase opzionale
- [ ] Time Attack
- [ ] Daily Challenge deterministica
- [ ] Bandiere SVG locali al posto delle emoji native
- [ ] Sincronizzazione automatica della coda offline
- [ ] Validazione anti-cheat server-side

## Licenza

Il progetto non include ancora una licenza open-source. Tutti i diritti sono riservati all’autore.

---

<div align="center">Creato con 💚 per chi ama geografia, bandiere e record impossibili.</div>
