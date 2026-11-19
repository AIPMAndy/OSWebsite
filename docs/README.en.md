# OSWebsite — Your corner of the internet, reimagined.

An original, dependency-free interactive website OS for creators, developers, and teams.

## What works today

- Five visual themes: Nebula, Alpine, Atelier, Solstice, Circuit.
- Five emulated device shells: macOS, Windows, iPadOS, iOS, Android. These are web UI simulations, **not native OS emulators**.
- Creator Studio with a live preview; public visitor mode with `?mode=site`.
- Eleven app experiences: About, Projects, Files, Gallery, Notes, Kanban, Terminal, Browser, Demo Analytics, Contact, Settings.
- Desktop window management and a fullscreen app stack on phones.
- Local Notes and Tasks persistence, a safe simulated terminal, command palette, JSON import/export for branding.

The analytics screen uses clearly labeled **sample values**, not visitor traffic. There is no proprietary online service, backend sync, AI runtime, or live operating-system integration included in this version.

## Run

```bash
cd OSWebsite
python3 -m http.server 8000
# http://localhost:8000/ (Studio)
# http://localhost:8000/?mode=site (visitor mode)
```

Customize `src/config.js`, then deploy these static files to GitHub Pages, Netlify, Vercel, or any static host.

## Inspiration and licensing

Inspired by the open-source concept of [xiaozao-os](https://github.com/chuspeeism/xiaozao-os) (MIT). OSWebsite uses independently written code and original CSS-generated visuals, not reused code or imagery. Released under the MIT License.
