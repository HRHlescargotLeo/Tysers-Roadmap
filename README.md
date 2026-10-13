# Tysers reimagined: Umbraco prototype

A clickable model of tysers.com rebuilt on Umbraco, using the rebuild and migration to make the improvements from ClerksWell's phase 1 review. Content is migrated from the live site wherever it exists; new content is shown as `[bracketed placeholders]`.

Version 1 · 13 October 2026 · greyscale (structure and content). A designed version in the Tysers look follows by adding `src/css/theme.css` only.

## View it

Live: https://hrhlescargotleo.github.io/Tysers-Roadmap/

Locally: open `docs/index.html` in a browser.

## Publish on GitHub Pages

Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/docs`. `docs/.nojekyll` is included so Pages serves the files as they are.

## Build

```
node build-includes.js && node validate.js
```

`src/` is the source. The build resolves `<!-- @@include -->` partials and `~/` paths into `docs/`. `validate.js` checks tag balance, inline handlers and internal links.

## Structure

- `src/index.html` – the contents page and five journeys to try
- `src/pages/` – one file per page template
- `src/modules/library.html` – every reusable block, with its working Umbraco block name
- `src/js/data.js` – specialties, people, offices, insights and claims routes (stand-ins for Umbraco content trees)
- `src/js/app.js` – prototype behaviour; `src/js/wireframe.js` – shared menus, accordions, tabs, modals
- `requirements/requirements.md` – R-numbered requirements mapped to the phase 1 ideas (I01–I44)

## Notes for reviewers

- The dark bar at the top is the prototype navigator, not part of the proposed site. Its Notes switch (off by default) shows what we're proposing and why on every page.
- Names, roles, offices and phone numbers are as published on tysers.com in October 2026. Numbers we believe are wrong are marked "to confirm".
- P&I club figures are invented sample data; the club names are real.
- This repository and its Pages site are public.
