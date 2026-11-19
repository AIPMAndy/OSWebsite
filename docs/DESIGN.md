# OSWebsite Design System

## Design principles

1. OS metaphors must improve navigation, not hide content behind gimmicks.
2. The site is the content; desktop and phone are interchangeable shells.
3. Five themes should have distinct visual character, not just recolored buttons.
4. Built-in apps should have functional interactions and honest boundaries.
5. The web page should load without trackers, accounts or build steps.

## Design inventory

| Layer | Components |
| --- | --- |
| Studio | 3-column layout, theme swatches, device toolbar, inspector, content form, export/import |
| OS Core | Wallpaper, translucent menu bar, widgets, desktop app icons, Dock, window controls, drag, focus |
| Mobile | Notch/dynamic island, mobile status bar, widgets, app grid, dock, full-screen apps |
| Applications | Identity, Projects, Finder, Gallery, Notes, Kanban, Terminal, Browser, Analytics, Contact, Settings |

## Color architecture

Use CSS variables on `.device-shell`: `--os-wallpaper`, `--os-text`, `--os-muted`, `--os-accent`, `--os-glass`, `--os-window-bg`, `--os-window-text`, `--os-window-border`.

Theme switches in `body[data-theme]` replace this palette without branching app content.

## Accessibility

- Semantic buttons, meaningful navigation labels, visible focus ring, responsive breakpoints.
- Respects `prefers-reduced-motion`.
- Need subsequent formal testing with axe, VoiceOver and keyboard focus traps before accessibility conformance claims.

## Differentiation from reference

Reference: device-detected redirect between desktop and phone HTML documents, personal portfolio content coupled into a specific site.

OSWebsite: a separate creator studio, unified data, live theme/device toggles, more app families, local workflows, accessible escape hatches, no unpublished backend requirement.
