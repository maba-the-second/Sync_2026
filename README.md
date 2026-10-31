# SYNC ’26 — Futuristic Competition Platform
### Dharmaraja College ICT Society — Official Event Hub

An award-grade, highly immersive cinematic web application built for the **SYNC ’26** ICT event organized by the **Information and Communication Technology Society of Dharmaraja College**.

Designed with a cybernetic aesthetic inspired by dark glassmorphism, neon-ice green lighting, procedural WebGL 3D meshes, coordinate telemetry, responsive registration workflows, and an interactive AI assistant.

---

## 1. Non-Negotiable Architecture & Technologies

- **Frontend Core**: Semantic HTML5, Modern CSS3 (Dark Glassmorphism, Neon Edge Lighting, Polygonal Facets).
- **Scripting**: Vanilla JavaScript (ES6+ modular architecture).
- **3D Graphics & Mesh**: Three.js WebGL procedural wireframe torus knot & reactive particle field.
- **Cinematics & Motion**: GSAP 3.12, ScrollTrigger, and smooth procedural timelines.
- **Audio Experience**: Procedural Web Audio API atmospheric cyber drone synth & user-controlled mute/unmute toggle.
- **Serverless Integration**: Google Apps Script (`google-apps-script/Code.gs`) saving registrations to Google Sheets with automated Confirmation IDs.
- **AI Assistant**: Intelligent floating cyber drone assistant with grounded local rule engine and server-side Gemini AI integration.

---

## 2. Project Folder Structure

```
├── index.html                   # Master single-page application entry point
├── css/
│   └── style.css                # Futuristic design system, glassmorphism, neon glows
├── js/
│   ├── config.js                # Central non-secret frontend configuration
│   ├── competitions.js          # All 8 competition datasets, cards & detail modals
│   ├── registration.js          # Multi-step adaptive forms, validation & backend bridge
│   ├── leaderboard.js           # Tournament rankings, filters, podium & empty state
│   ├── chatbot.js               # Floating AI assistant with grounded knowledge base
│   ├── animations.js            # Three.js 3D scene, cursor orb, audio engine & GSAP
│   └── main.js                  # Application coordinator & navigation handlers
├── assets/
│   ├── logo.png                 # Official SYNC ’26 logo ("In Sync With The Future")
│   ├── gaming_logo.png          # Official metallic ASPECT gaming logo
│   ├── quiz_logo.svg            # Inter-School Quiz competition badge
│   ├── up_logo.svg              # Upper-right Dharmaraja College crest emblem
│   ├── hero_temple.png          # Cinematic cybernetic sanctuary visual
│   ├── robot_drone.svg          # Cybernetic AI assistant avatar
│   └── leaderboard_visual.svg   # Tournament podium vector artwork
├── google-apps-script/
│   └── Code.gs                  # Production Google Apps Script backend source
├── tests/
│   └── competitionsLogic.test.ts # Node.js pure logic unit tests
├── src/utils/
│   └── competitionsLogic.ts     # Pure validation, grade eligibility & FAQ resolver
└── README.md                    # Complete setup, deployment & organizer manual
```

---

## 3. Official Competition Lineup (8 Categories)

1. **Algorithm**: Competitive online algorithmic programming on HackerRank. 5 problems, 100 points each (500 pts total), 4-hour window. Languages: C++, Python, Java, JavaScript. Grades 6–13.
2. **Web Development**: Build Bob's digital command center for all school events (announcements, calendars, ticketing, live updates). Any framework allowed. Hosted live on GitHub Pages/Netlify/Vercel with public GitHub repository. Grades 6–13.
3. **Photo Manipulation**: Theme: *"The Future-Tech Realm: A Digital Frontier"*. Adobe Photoshop only. Process screenshots required. RAR archive (`Photo_SchoolName_YourName.rar`) uploaded via public Google Drive link. Grades 6–13.
4. **Poster Design**: Theme: *"Happening Now: A Futuristic Call to SYNC '26"*. Photoshop/Illustrator. Working editable file (`.psd`/`.ai`) + final PNG/JPG (`Poster_SchoolName_YourName.rar`). Best submission featured on main event day. Grades 6–13.
5. **Logo Design**: Futuristic tech-inspired logo. Full-color + simplified monochrome versions + short concept design note. Archive named `Logo_SchoolName_YourName.rar`. Grades 6–13.
6. **UI/UX Design**: Theme: *"Beyond the Screen: Envisioning Interactive Futures"*. Figma, Adobe XD, or Sketch. Minimum 1 primary interface screen + 2-3 screen wireframe flow + max 200-word concept note PDF. Archive named `UIUX_SchoolName_YourName.rar`. Grades 6–13.
7. **Inter-School Quiz**: Premier team competition. **Strictly Grades 10–13**. Teams of up to 5 members from the same school (max 2 teams per school). Round 1 (Online Preliminary) + Round 2 (Online Semifinal) in Zoom breakout rooms, leading to the Grand Physical Final at the SYNC ’26 main event.
8. **ASPECT — Gaming Competition**: Call of Duty 3 esports showdown. Grades 6–13. Tournament bracket announcements communicated via the official WhatsApp channels.

---

## 4. How to Run the Website

### Local Testing
The website is completely static-compatible and runs instantly:
- Run `npm run dev` to start the local development server at `http://localhost:3000`.
- Alternatively, serve via any standard static HTTP server:
  ```bash
  python3 -m http.server 3000
  # or
  npx serve .
  ```
- Or deploy directly to static hosts such as **GitHub Pages**, **Netlify**, or **Vercel** simply by uploading the project repository.

### Deploying to GitHub Pages
This repository is pre-configured for **GitHub Pages** (`https://<username>.github.io/Sync_2026/`) using either method below:

1. **Method A — Deploy from a Branch (Fastest)**:
   - On GitHub, go to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
   - A `.nojekyll` file and relative asset paths (`./assets/...`, `./css/...`, `./js/...`) are already configured so the site deploys immediately.

2. **Method B — GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
   - On GitHub, go to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - Every push to `main` (or manual trigger in the **Actions** tab) automatically bundles `index.html`, `assets/`, `css/`, `js/`, and `.nojekyll` and publishes to GitHub Pages.

### Running Pure Logic Unit Tests
Core business logic, grade eligibility limits, Sri Lankan mobile number validation, and confirmation ID generators are covered by deterministic tests using Node's test runner:
```bash
npx --yes tsx --test tests/competitionsLogic.test.ts
```

---

## 5. Google Sheets & Apps Script Setup Guide

To connect live registration data directly into your committee's Google Drive:

1. **Create the Spreadsheet**:
   - Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
   - Name it `SYNC 26 Official Registrations`.
   - Rename the first sheet tab to `Registrations`.

2. **Paste Backend Code**:
   - In the spreadsheet menu, go to **Extensions > Apps Script**.
   - Delete any placeholder code and replace it entirely with the contents of `google-apps-script/Code.gs`.

3. **(Optional) Enable Gemini AI for the Chatbot**:
   - In the Apps Script editor, open **Project Settings** (gear icon) > **Script Properties**.
   - Click **Add script property**:
     - **Property**: `GEMINI_API_KEY`
     - **Value**: `Your_Gemini_API_Key_Here`
   - *Security Note*: The API key is stored securely on Google servers and is NEVER exposed to the frontend browser!

4. **Deploy as Web App**:
   - Click **Deploy > New deployment**.
   - Choose type: **Web app**.
   - Description: `SYNC 26 API v1`.
   - **Execute as**: `Me (your-email@gmail.com)`.
   - **Who has access**: `Anyone`.
   - Click **Deploy** and authorize permissions.

5. **Connect to Frontend**:
   - Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`).
   - Open `js/config.js` and paste it into:
     ```javascript
     backend: {
       appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
       ...
     }
     ```
   - When the URL is configured, registrations will automatically write to your Google Sheet in real-time. If left blank, the application will automatically fall back to browser local storage so testing never breaks.

---

## 6. Official Contact & Coordinator Information

- **Muditha Koralegedara** (Coordinator): `+94 70 264 5851`
- **Nethun the Editor** (Chief Editor & Technical Lead): `+94 71 490 6145`
- **Society Email**: `drck.ictsociety@gmail.com`
- **Direct WhatsApp Coordinator Link**: [https://wa.link/05138r](https://wa.link/05138r)
- **Official Participant WhatsApp Community**: [https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg](https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg)
- **Instagram**: [https://instagram.com/dharmaraja_ict_society](https://instagram.com/dharmaraja_ict_society)
- **Facebook**: [https://facebook.com/dhamarajaicts](https://facebook.com/dhamarajaicts)
