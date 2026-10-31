/**
 * =========================================================================
 * SYNC ’26 / BTUI’26 — Central Configuration File
 * Dharmaraja College ICT Society
 * =========================================================================
 * Note: Do NOT place secret API keys or private credentials in this client file.
 * All secrets (e.g. Gemini API keys, Google Service Accounts) are maintained
 * server-side in Google Apps Script Script Properties or server environment.
 */

window.SYNC_CONFIG = {
  // Brand & Event Meta
  eventName: "SYNC ’26",
  eventSubtitle: "BTUI’26 — Beyond The Digital Frontier",
  organization: "Dharmaraja College ICT Society",
  year: "2026",

  // Visual Assets
  assets: {
    // Official primary event logo
    logo: "assets/logo.png",
    // Official ASPECT Gaming competition logo
    gamingLogo: "assets/gaming_logo.png",
    // Inter-School Quiz competition emblem / logo
    quizLogo: "assets/quiz_logo.svg",
    // Upper-right header emblem (up logo)
    upLogo: "assets/up_logo.svg",
    // Cinematic background / temple reference visual
    heroArtwork: "assets/hero_temple.png",
    // Leaderboard tournament stage visual
    leaderboardArtwork: "assets/leaderboard_visual.svg",
    // Cyber Robot / sculpture interactive sprite
    robotArtwork: "assets/robot_drone.svg"
  },

  // Audio Configuration (Web Audio synth built-in + optional external track)
  audio: {
    // Optional external background music URL (leave null to use procedural atmospheric synth)
    bgmUrl: null,
    // Enable procedural cyber synth background drone
    enableProceduralAudio: true,
    // Default volume (0.0 to 1.0)
    defaultVolume: 0.25,
    // Sound effects volume
    sfxVolume: 0.3
  },

  // Communication & Official Social Links
  contact: {
    email: "drck.ictsociety@gmail.com",
    organizers: [
      {
        name: "MUDITHA BRO",
        role: "Event Coordinator",
        phone: "+94 70 264 5851",
        phoneRaw: "+94702645851"
      },
      {
        name: "NETHUN THE EDITOR",
        role: "Chief Editor & Technical Lead",
        phone: "+94 71 490 6145",
        phoneRaw: "+94714906145"
      }
    ],
    // Direct WhatsApp contact link specified in official requirements
    whatsappDirectLink: "https://wa.link/05138r",
    // Official participant WhatsApp community group
    whatsappGroupLink: "https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg",
    // Social media links (organizers can insert custom handles here)
    socials: {
      instagram: "https://instagram.com/dharmaraja_ict_society",
      facebook: "https://facebook.com/dhamarajaicts",
      whatsappChannel: "https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg"
    }
  },

  // Backend Integration Endpoints (Google Apps Script Web App)
  // When empty or during local dev, a robust mock client bridge persists to localStorage & simulated sheet
  backend: {
    // Paste deployed Google Apps Script Web App URL here:
    // e.g. "https://script.google.com/macros/s/AKfycbx.../exec"
    appsScriptUrl: "",
    // Endpoint for retrieving published leaderboard
    leaderboardEndpoint: "",
    // Fallback simulated network delay in ms for realistic feedback
    simulatedLatencyMs: 800
  }
};
