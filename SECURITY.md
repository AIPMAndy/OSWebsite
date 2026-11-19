# Security policy

OSWebsite is a static front-end template. It does not execute operating-system commands, provide AI services, collect real visitor analytics, or authenticate users.

Do not store secrets, API keys, passwords, or sensitive personal information in `src/config.js` or localStorage.

When reporting a vulnerability, avoid publishing exploit instructions for live deployments. Create a private security advisory in the host repository if available, otherwise contact the repository owner through an established private channel.

The simulated terminal accepts only the documented in-browser commands. User-generated content should be escaped and external URLs protocol-checked before display or navigation.
