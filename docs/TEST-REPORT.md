# OSWebsite v1.0.0 verification notes

## Automated checks

Command: `npm test`

- 7 static checks: entrypoint, five themes, five devices, 11 registered apps, safe URLs, HTML escaping, truthful demo data, expected handlers.
- 4 JS runtime smoke checks using Node VM: standalone demo boot, all 11 app views render without exception, all five OS shell views render without exception, unsafe JSON links are rejected.

Result at packaging: **11 / 11 passed**.

## Not yet verified

- No successful real-browser screenshot or click-through run was obtained in the current execution environment: Chromium repeatedly failed to start a rendering session.
- Therefore visual parity, cross-browser behavior, drag interactions, and mobile touch feel have **not** been certified.
- Before a production launch, run manual Chrome / Safari / Firefox checks and add browser E2E + accessibility scans.

## Known limitations

- GitHub repository creation / hosting is not part of this ZIP or demo.
- No live collaboration, user database, auth, AI model, or traffic analytics backend.
- Brand edits in the Studio persist only locally; update `src/config.js` for global deployment.
- OS shells are visual simulations rather than genuine OS emulators.
