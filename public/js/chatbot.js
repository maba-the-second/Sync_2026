/**
 * =========================================================================
 * SYNC ’26 — AI Assistant (Cyber Bot)
 * Dharmaraja College ICT Society
 * =========================================================================
 */

(function () {
  const KNOWLEDGE_BASE = [
    {
      keywords: ["hi", "hello", "hey", "start", "greetings"],
      answer: "Greetings! I'm the SYNC AI assistant. I can guide you through all 8 competition categories, grade eligibility rules, team guidelines for the Inter-School Quiz, registration steps, or connect you with the Dharmaraja College ICT Society organizing team."
    },
    {
      keywords: ["grade", "eligibility", "age", "class"],
      answer: "Grade Eligibility Overview:\n• Individual Competitions (Algorithm, Web Development, Photo Manipulation, Poster Design, Logo Design, UI/UX, ASPECT Gaming): Open to Grades 6–13.\n• Inter-School Quiz: Strictly restricted to Grades 10–13 only."
    },
    {
      keywords: ["quiz", "team", "members", "schools"],
      answer: "Inter-School Quiz Rules:\n• Team participation only (up to 5 members per team).\n• All members must be from the same school.\n• Strictly Grades 10–13.\n• Strict limit of maximum 2 teams per school.\n• Round 1 (Online Preliminary) & Round 2 (Online Semifinal) in Zoom Breakout Rooms, culminating in the Grand Physical Final at the main event!"
    },
    {
      keywords: ["algorithm", "algo", "hackerrank", "programming", "code"],
      answer: "Algorithm Competition:\n• Hosted on HackerRank with 5 problems (100 pts each, 500 pts total).\n• 4-hour window.\n• Allowed languages: C++, Python, Java, JavaScript.\n• Partial scoring on test cases. Tie-breaker based on earliest submission time.\n• Solutions are submitted directly on HackerRank."
    },
    {
      keywords: ["web", "webdev", "website", "bob", "command"],
      answer: "Web Development Competition:\n• Challenge: Build a digital command center for all school events (announcements, calendars, registrations, live updates).\n• Use any stack (HTML/CSS/JS, React, Vue, etc.).\n• Must be hosted live (e.g. GitHub Pages, Netlify, Vercel) with a public GitHub repo and a comprehensive README.md.\n• Adding a backend database or API earns bonus marks!"
    },
    {
      keywords: ["aspect", "game", "gaming", "cod", "call of duty"],
      answer: "ASPECT Gaming Competition:\n• Official tournament title: Call of Duty 3.\n• Open to Grades 6–13.\n• Tournament brackets, server lobbies, match rotations, and exact schedule will be officially announced through the SYNC '26 WhatsApp group!"
    },
    {
      keywords: ["photo", "photoshop", "photoman", "manipulation"],
      answer: "Photo Manipulation:\n• Theme: 'The Future-Tech Realm: A Digital Frontier'.\n• Exclusively created using Adobe Photoshop.\n• Must record/capture workflow screenshots.\n• Submission: RAR archive named 'Photo_SchoolName_YourName.rar' with all layers, textures, process screenshots, plus final PNG/JPG via Google Drive link."
    },
    {
      keywords: ["poster", "poster design"],
      answer: "Poster Design:\n• Theme: 'Happening Now: A Futuristic Call to SYNC '26'.\n• Tools: Photoshop, Illustrator, or professional design software.\n• Recommended size: A3 or A4 portrait.\n• Submission: Archive named 'Poster_SchoolName_YourName.rar' with working file (.psd, .ai) and exported PNG/JPG."
    },
    {
      keywords: ["logo", "logo design"],
      answer: "Logo Design:\n• Create a futuristic tech-inspired brand identity.\n• Tools: Illustrator, Photoshop, Figma, or equivalent.\n• Must include both full-color and simplified monochrome versions, plus a design note explaining inspiration.\n• Archive named 'Logo_SchoolName_YourName.rar' via Google Drive."
    },
    {
      keywords: ["ui", "ux", "ui/ux", "figma", "interface"],
      answer: "UI/UX Design:\n• Theme: 'Beyond the Screen: Envisioning Interactive Futures'.\n• Tools: Figma, Adobe XD, or Sketch.\n• Requirements: At least 1 primary screen, 2-3 screen user flow/wireframe, and max 200-word concept note PDF.\n• Archive named 'UIUX_SchoolName_YourName.rar' via Google Drive."
    },
    {
      keywords: ["whatsapp", "group", "chat", "link"],
      answer: "Join our official channels:\n• Participant WhatsApp Group: https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg\n• Direct Coordinator WhatsApp Link: https://wa.link/05138r"
    },
    {
      keywords: ["contact", "muditha", "koralegedara", "nethun", "phone", "email", "organizer"],
      answer: "Official Contact Channels:\n• Muditha Koralegedara: +94 70 264 5851\n• Nethun the Editor: +94 71 490 6145\n• Email: drck.ictsociety@gmail.com\n• Direct WhatsApp: https://wa.link/05138r"
    },
    {
      keywords: ["register", "how to register", "signup", "apply"],
      answer: "Registration is 100% open online! Click any 'Register Now' button or tell me which competition you'd like to enter (e.g., 'Register for Algorithm' or 'Register for Quiz') and I'll launch the form directly for you."
    },
    {
      keywords: ["prize", "prizes", "deadline", "date", "when"],
      answer: "Official dates, round schedules, and prize announcements are communicated through the official SYNC '26 WhatsApp community and our school ICT society channels. Join here: https://chat.whatsapp.com/IaBJyTRhZcACMFKUOrYndg"
    }
  ];

  function getLocalResponse(query) {
    const q = query.toLowerCase().trim();

    // Check for registration intent
    if (q.includes("register for") || (q.includes("register") && q.length > 8)) {
      if (q.includes("quiz")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("quiz"), 600);
        return "Opening the Inter-School Quiz team registration form right now! Make sure you have your team name and up to 5 members ready.";
      }
      if (q.includes("web")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("webdev"), 600);
        return "Opening Web Development registration now! Get ready to build Bob's command center.";
      }
      if (q.includes("algo")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("algorithm"), 600);
        return "Opening Algorithm registration now!";
      }
      if (q.includes("aspect") || q.includes("gaming") || q.includes("cod")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("aspect"), 600);
        return "Opening ASPECT Gaming Competition registration!";
      }
      if (q.includes("photo")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("photoman"), 600);
        return "Opening Photo Manipulation registration!";
      }
      if (q.includes("poster")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("poster"), 600);
        return "Opening Poster Design registration!";
      }
      if (q.includes("logo")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("logo"), 600);
        return "Opening Logo Design registration!";
      }
      if (q.includes("ui") || q.includes("ux")) {
        setTimeout(() => window.SYNC_REGISTRATION?.openModal("uiux"), 600);
        return "Opening UI/UX Design registration!";
      }
    }

    // Match keywords in knowledge base
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => q.includes(k))) {
        return item.answer;
      }
    }

    return "I am the SYNC AI assistant for Dharmaraja College ICT Society. You can ask me about competition formats, grade eligibility (Grades 6–13, Quiz 10–13), team size limits, submission guidelines, or official coordinator contacts.";
  }

  window.SYNC_CHATBOT = {
    isOpen: false,

    init: function () {
      this.bindEvents();
    },

    toggle: function () {
      this.isOpen = !this.isOpen;
      const windowEl = document.getElementById("chatbot-window");
      const triggerEl = document.getElementById("chatbot-trigger");

      if (this.isOpen) {
        if (windowEl) {
          windowEl.classList.remove("hidden");
          windowEl.classList.add("flex");
        }
        if (triggerEl) triggerEl.classList.add("ring-2", "ring-neon");
        document.getElementById("chatbot-input")?.focus();
      } else {
        if (windowEl) {
          windowEl.classList.add("hidden");
          windowEl.classList.remove("flex");
        }
        if (triggerEl) triggerEl.classList.remove("ring-2", "ring-neon");
      }
    },

    addMessage: function (text, sender) {
      const messagesContainer = document.getElementById("chatbot-messages");
      if (!messagesContainer) return;

      const isBot = sender === "bot";
      const bubble = document.createElement("div");
      bubble.className = `flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`;

      // Convert URLs to clickable links and preserve line breaks
      const formatted = text
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-neon underline hover:text-white">$1</a>')
        .replace(/\n/g, '<br/>');

      bubble.innerHTML = `
        <div class="max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
          isBot 
            ? 'bg-forest/90 border border-neon/30 text-gray-200 shadow-[0_0_15px_rgba(183,255,55,0.08)]' 
            : 'bg-neon text-black font-semibold shadow-[0_0_15px_rgba(183,255,55,0.3)]'
        }">
          ${formatted}
        </div>
      `;

      messagesContainer.appendChild(bubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    showTyping: function () {
      const messagesContainer = document.getElementById("chatbot-messages");
      if (!messagesContainer) return;

      const typing = document.createElement("div");
      typing.id = "chatbot-typing-indicator";
      typing.className = "flex justify-start mb-3";
      typing.innerHTML = `
        <div class="bg-forest/90 border border-neon/30 rounded-2xl px-4 py-2 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style="animation-delay: 0ms"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style="animation-delay: 150ms"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style="animation-delay: 300ms"></span>
        </div>
      `;
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    hideTyping: function () {
      const typing = document.getElementById("chatbot-typing-indicator");
      if (typing) typing.remove();
    },

    handleSend: async function (userInput) {
      const text = userInput || document.getElementById("chatbot-input")?.value?.trim();
      if (!text) return;

      const inputEl = document.getElementById("chatbot-input");
      if (inputEl) inputEl.value = "";

      this.addMessage(text, "user");
      this.showTyping();

      const appsScriptUrl = window.SYNC_CONFIG?.backend?.appsScriptUrl;

      try {
        let answer = "";
        if (appsScriptUrl && appsScriptUrl.startsWith("http")) {
          const res = await fetch(appsScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              action: "chat",
              prompt: text
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.reply) answer = data.reply;
          }
        }

        if (!answer) {
          // Use grounded local FAQ engine
          await new Promise(r => setTimeout(r, 450));
          answer = getLocalResponse(text);
        }

        this.hideTyping();
        this.addMessage(answer, "bot");
      } catch (err) {
        this.hideTyping();
        const fallback = getLocalResponse(text);
        this.addMessage(fallback, "bot");
      }
    },

    bindEvents: function () {
      const trigger = document.getElementById("chatbot-trigger");
      const closeBtn = document.getElementById("chatbot-close");
      const form = document.getElementById("chatbot-form");

      if (trigger) trigger.addEventListener("click", () => this.toggle());
      if (closeBtn) closeBtn.addEventListener("click", () => this.toggle());

      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleSend();
        });
      }

      // Quick action pills
      document.querySelectorAll(".bot-quick-action").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const prompt = e.currentTarget.getAttribute("data-prompt");
          if (prompt) {
            if (!this.isOpen) this.toggle();
            this.handleSend(prompt);
          }
        });
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.SYNC_CHATBOT.init();
  });
})();
