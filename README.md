Asset Playground - GitHub Pages Static Demo

Overview
- A minimal, production-ready static site (no back-end) to demonstrate asset management in a GitHub Pages context.
- All data is stored client-side in localStorage to illustrate persistence without a server.
- The site exposes several assets that can be previewed and downloaded directly from the browser.

What’s included (in this package)
- index.html: Homepage that links to all assets and explains what they are.
- styles.css: Mobile-first responsive styling.
- script.js: Vanilla JavaScript handling file storage in localStorage, previews, downloads, and attachments processing.
- README.md: This document explains how to use and customize the site.

Assets and Behavior
- ashravan.txt: Brandon Sanderson-inspired short story (300-400 words) about Ashravan after Shai restores him (built into localStorage by default).
- dilemma.json: Autonomous vehicle moral dilemma scenario in JSON format.
- about.md: A three-word description prompt.
- pelican.svg: An SVG illustration embedded in the assets (pelican on a bicycle).
- restaurant.json: Kolkata restaurant suggestion with geo coordinates.
- prediction.json: Forecast for the Fed Funds rate in December 2025.
- uid.txt: Placeholder attachment content to satisfy the demo (should be replaced with the real UID if you have one).
- LAPSED: LICENSE content is not included as a separate file in this static bundle; the MIT license text can be included in your project if you publish a LICENSE file separately.

How to run locally
1) Open index.html in your web browser (no server required).
2) Use the Asset cards to Preview or Download assets.
3) Use the Attachments section to upload CSV or image files for client-side processing.

Data persistence
- All data is stored in the browser’s localStorage under the key asset_playground_files.
- Clearing browser storage will reset the defaults.

Architectural notes
- index.html provides a semantic, accessible structure with a modal for previews and an inline log for downloads.
- styles.css implements a responsive grid that adapts from single-column on mobile to multi-column layouts on larger screens.
- script.js encapsulates all logic in an IIFE for scope isolation and uses a default redirection of content via localStorage.

License
- This project is distributed under the MIT License. See the LICENSE text file in a full repository for explicit terms. If you publish this site, include a LICENSE file with the full MIT terms.

Usage and customization tips
- To customize content, edit the DEFAULT_FILES object in script.js and reload index.html.
- To publish to GitHub Pages, create a repository, push these files, and choose the root or /docs path as your Pages source.

Notes
- This is a client-side demonstration and should not be used for storing sensitive data.
- The assets are designed to illustrate how static sites can embed and manage content entirely in the browser.
