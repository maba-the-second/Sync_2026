/**
 * =========================================================================
 * SYNC ’26 — Competitions Module
 * Dharmaraja College ICT Society
 * =========================================================================
 */

(function () {
  const COMPETITIONS = [
    {
      id: "algorithm",
      name: "Algorithm",
      badge: "ALGORITHMIC THINKING",
      shortDesc: "Challenge your programming logic, analytical thinking, and problem-solving ability through a competitive online algorithmic programming experience.",
      icon: "code-2",
      logo: "assets/logo.png",
      category: "Code & Logic",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      platform: "HackerRank",
      tagline: "Break limits with precision logic and rapid algorithm execution.",
      sections: {
        participation: [
          "Open to students from Grade 6–13 of Dharmaraja College and other schools.",
          "Individual participation only. Team entries are not permitted.",
          "Registration for the competition must be completed before the announced deadline.",
          "All solutions must be the participant's own work. Code plagiarism, sharing solutions, or copying another participant's work will result in immediate disqualification."
        ],
        format: [
          "Hosted online through the HackerRank platform.",
          "Five algorithmic problems will be released simultaneously.",
          "Each problem carries 100 points, for a total of 500 points.",
          "Participants will have four hours to solve as many problems as possible.",
          "Submissions are accepted in C++, Python, Java, or JavaScript.",
          "Multiple attempts may be submitted for each problem.",
          "This is a single-round competition.",
          "Final date, time, HackerRank link, and other details will be communicated through the official SYNC '26 channels and WhatsApp group."
        ],
        scoring: [
          "Partial scoring will be available based on successfully passed test cases/subtasks.",
          "For multiple attempts, only the highest-scoring submission for that problem will count.",
          "There is no penalty for incorrect submissions.",
          "The total score across all 5 problems will decide the rankings of each contestant.",
          "In the event of a tie, the participant who achieved their final total score earliest will rank higher.",
          "The decisions of the judging panel will be final."
        ],
        submission: [
          "All solutions must be submitted directly through HackerRank before the competition closes.",
          "No separate submission through the SYNC '26 website is required."
        ]
      }
    },
    {
      id: "webdev",
      name: "Web Development",
      badge: "COMMAND CENTER CHALLENGE",
      shortDesc: "Design and develop an innovative digital platform that solves a practical problem through functionality, creativity, and excellent user experience.",
      icon: "layout",
      logo: "assets/logo.png",
      category: "Full-Stack & Web",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Build Bob's school command center for events, updates, and ticketing.",
      sections: {
        statement: [
          "With dozens of events happening across the year—debates, sports meets, exhibitions—the administration is struggling to keep everyone updated. Bob is tasked with building a digital command center for all school events: a place where students, teachers, and parents can stay informed and engaged.",
          "Key capabilities: Announcements and event pages; Interactive calendars and countdowns; Online registrations and ticketing; Optional live event updates or highlights.",
          "Challenge: Creating a scalable, interactive system that can handle multiple events smoothly with a clean user experience."
        ],
        participation: [
          "Students from Grade 6–13 of Dharmaraja College and other schools are eligible to participate.",
          "Individual participation only—team entries are not accepted.",
          "Registration for the competition must be completed by the specified deadline.",
          "All submissions must represent original work. Copying existing solutions or plagiarizing content will result in disqualification."
        ],
        instructions: [
          "Participants are required to develop a fully functional web application.",
          "Solutions may include interactive interfaces (web, desktop, or GUI), data processing, and visual outputs.",
          "Participants are free to use any suitable programming environment (HTML/CSS/JS, React, Angular, Vue.js, etc.).",
          "The final web application must be hosted online, using platforms such as GitHub Pages, Netlify, Vercel, or similar services.",
          "A README.md file must accompany the project repository documenting project purpose, technologies used, and step-by-step instructions to run."
        ],
        scoring: [
          "Functionality: Does the application perform all required tasks correctly and efficiently?",
          "Design & User Experience: How intuitive, engaging, and visually appealing is the interface?",
          "Creativity & Innovation: Does the solution demonstrate original ideas, unique features, or creative approaches?",
          "Code Structure & Quality: Is the code clean, organized, and maintainable?",
          "Adding backend functionality, such as databases or APIs, will be considered a bonus and can improve scoring.",
          "Multiple submissions are not allowed. Only the first submitted version will be evaluated."
        ],
        submission: [
          "Submit a public GitHub repository link containing the project code through the official SYNC '26 website before the deadline.",
          "Provide a hosted link to the live web application.",
          "Ensure all links are accessible and fully functional before the deadline. Modifications after the deadline will not be considered."
        ]
      }
    },
    {
      id: "photoman",
      name: "Photo Manipulation",
      badge: "THE DIGITAL FRONTIER",
      shortDesc: "Transform the digital world into a futuristic visual experience using advanced photo manipulation, lighting, textures, and artistic storytelling.",
      icon: "camera",
      logo: "assets/logo.png",
      category: "Visual Arts & VFX",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Theme: 'The Future-Tech Realm: A Digital Frontier'",
      sections: {
        theme: [
          "Theme: 'The Future-Tech Realm: A Digital Frontier'",
          "Step into a futuristic digital world where neon lights illuminate a vast cyber landscape.",
          "Designs should reflect a futuristic digital realm characterized by glowing grids, sleek cybernetic elements, and immersive, high-tech environments.",
          "Combine dynamic lighting, bold colors, and imaginative digital structures to tell a story or convey a concept."
        ],
        participation: [
          "Students from Grade 6–13 of Dharmaraja College and other schools are eligible to participate.",
          "Individual participation only; no team submissions. Schools may have multiple participants.",
          "Registration must be completed by the specified deadline.",
          "Each participant may submit only one entry."
        ],
        instructions: [
          "Only Adobe Photoshop may be used for creating the artwork.",
          "Participants must capture regular process screenshots to document their workflow.",
          "Artwork should maintain a consistent theme and aesthetic, inspired by futuristic digital environments.",
          "Templates or pre-made designs are not allowed; originality is mandatory.",
          "Any dimensions may be used for the final artwork."
        ],
        scoring: [
          "Concept & Relevance: How effectively the artwork captures the futuristic digital theme.",
          "Creativity: Originality and innovative approach.",
          "Visual Appeal: Composition, color, and lighting effects.",
          "Technical Skill: Use of Photoshop tools, layers, and techniques.",
          "Audience Impact: Ability of the artwork to engage and communicate visually."
        ],
        submission: [
          "Project files should include all layers, textures, and assets in a .rar archive.",
          "Final artwork: Export the completed piece as .png or .jpg.",
          "Naming format: Photo_SchoolName_YourName.rar (Example: Photo_RoyalCollege_MihinRukshan.rar).",
          "Upload the Google Drive link of your archive via the official website of SYNC '26, setting public access to your archive.",
          "Submissions received after the deadline will not be considered."
        ]
      }
    },
    {
      id: "poster",
      name: "Poster Design",
      badge: "HAPPENING NOW",
      shortDesc: "Create a futuristic promotional poster that feels like an event happening in real time.",
      icon: "image",
      logo: "assets/logo.png",
      category: "Graphic Design",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Theme: 'Happening Now: A Futuristic Call to SYNC '26'",
      sections: {
        theme: [
          "Theme: 'Happening Now: A Futuristic Call to SYNC '26'",
          "Create a bold, futuristic graphic poster that captures the essence of the event in a 'happening now' style.",
          "Posters should reflect the dynamic energy, digital aesthetic, and innovative spirit of SYNC '26.",
          "The best submission may be featured as part of the official announcement of SYNC '26 on the main event day!"
        ],
        participation: [
          "Students from Grade 6–13 of Dharmaraja College and other schools are eligible to participate.",
          "Individual entries only; team participation is not permitted.",
          "Schools may send any number of participants. Registration must be completed by deadline.",
          "Each participant is limited to one poster submission."
        ],
        instructions: [
          "Participants may use Adobe Photoshop, Illustrator, or any professional graphic design software.",
          "Designs must represent a 'Happening Now' SYNC '26 poster concept.",
          "Submissions must be original; plagiarism or use of stock templates will lead to disqualification.",
          "Standard poster dimensions recommended (A3 or A4 portrait), but creative layouts are valued."
        ],
        scoring: [
          "Concept & Relevance (Capturing futuristic digital theme).",
          "Creativity (Originality and innovative approach).",
          "Visual Appeal (Composition, color, and lighting effects).",
          "Technical Skill (Use of design tools, layers, techniques).",
          "Audience Impact (Communicative visual energy)."
        ],
        submission: [
          "Poster file: Export final design in .png or .jpg format.",
          "Editable source file: Submit the working file (.psd, .ai, or equivalent) with all layers intact.",
          "File naming format: Poster_SchoolName_YourName.rar (Example: Poster_RoyalCollege_MihinRukshan.rar).",
          "Upload Google Drive link with public access via the official SYNC '26 website before deadline."
        ]
      }
    },
    {
      id: "logo",
      name: "Logo Design",
      badge: "FUTURISTIC IDENTITY",
      shortDesc: "Create a memorable, futuristic identity that communicates innovation, digital transformation, and creative thinking.",
      icon: "shield",
      logo: "assets/logo.png",
      category: "Identity & Branding",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Design the visual emblem of boundary-breaking future technologies.",
      sections: {
        overview: [
          "Participants should design a futuristic, tech-inspired logo that embodies the spirit of innovation, digital transformation, and boundary-breaking creativity, suitable for a future-tech event."
        ],
        participation: [
          "Students from Grade 6–13 of Dharmaraja College and other schools are eligible.",
          "Individual participation only; no team submissions. Each participant may submit only one entry."
        ],
        instructions: [
          "Logos must be created digitally using professional design tools such as Adobe Illustrator, Photoshop, Figma, or equivalent.",
          "Submissions must include both a full-color version and a simplified monochrome version.",
          "The design should be scalable, usable on small digital icons and large posters.",
          "All work must be original; plagiarism and stock logo templates lead to disqualification.",
          "A short design note must accompany the logo, explaining the inspiration and concept."
        ],
        scoring: [
          "Concept & Relevance: Aligning with future-tech vision.",
          "Creativity: Freshness, innovative symbolism, and uniqueness.",
          "Simplicity & Memorability: Clear and distinctive across contexts.",
          "Versatility: Scalability, monochrome, and print adaptability.",
          "Visual Impact: Professional balance and aesthetic poise."
        ],
        submission: [
          "Export logo in .png and .jpg formats (both color & monochrome versions).",
          "Include short concept note text.",
          "Naming format: Logo_SchoolName_YourName.rar (Example: Logo_RoyalCollege_MihinRukshan.rar).",
          "Upload Google Drive public link via the SYNC '26 portal."
        ]
      }
    },
    {
      id: "uiux",
      name: "UI/UX Design",
      badge: "BEYOND THE SCREEN",
      shortDesc: "Imagine how people will experience the next generation of digital products.",
      icon: "smartphone",
      logo: "assets/logo.png",
      category: "Product & Interface",
      eligibility: "Grades 6–13 • Individual Only",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Theme: 'Beyond the Screen: Envisioning Interactive Futures'",
      sections: {
        theme: [
          "Theme: 'Beyond the Screen: Envisioning Interactive Futures'",
          "Merge creativity with functionality by designing a futuristic user interface and user experience concept.",
          "Imagine a digital environment that feels immersive, seamless, and intuitive—pushing boundaries of human-system interaction."
        ],
        participation: [
          "Students from Grade 6–13 of Dharmaraja College and other schools are eligible.",
          "Individual participation only; no team submissions. One entry per participant."
        ],
        instructions: [
          "Participants may use any recognized UI/UX tools: Figma, Adobe XD, or Sketch.",
          "Must include at least one primary interface screen (homepage, dashboard, app main screen).",
          "Provide a short user flow or wireframe sketch showing at least 2 to 3 connected screens.",
          "Demonstrate both aesthetic vision and user-centered thinking. No pre-made templates."
        ],
        scoring: [
          "Concept & Innovation: Futuristic vision and novelty.",
          "User Experience: Intuitiveness, accessibility, flow clarity.",
          "Visual Design: Aesthetics, typography, design consistency.",
          "Functionality: Logical layout and interactive feasibility.",
          "Impact & Engagement: Digital identity presence."
        ],
        submission: [
          "Export interface screens in .png or .jpg.",
          "Provide interactive prototype link (Figma, Adobe XD) if available.",
          "PDF file containing max 200-word concept note, 2-3 wireframe sketches/user flows, and design process screenshots.",
          "Archive named UIUX_SchoolName_YourName.rar uploaded via Google Drive public link."
        ]
      }
    },
    {
      id: "quiz",
      name: "Inter-School Quiz",
      badge: "KNOWLEDGE ARENA",
      shortDesc: "Premier team-based ICT championship spanning fundamentals, emerging technologies, logic, and digital ethics.",
      icon: "help-circle",
      logo: "assets/quiz_logo.svg",
      category: "Team ICT Championship",
      eligibility: "Grades 10–13 • Teams Only (Max 5 Members)",
      minGrade: 10,
      maxGrade: 13,
      isTeam: true,
      tagline: "Two intense online rounds culminating in the Grand Physical Final at SYNC '26.",
      sections: {
        overview: [
          "Tests students on a wide range of ICT topics: fundamentals, emerging tech, digital ethics, programming logic, and industry trends.",
          "Conducted in two online rounds followed by a final physical round at SYNC '26."
        ],
        participation: [
          "Students of Grades 10–13 from schools across Sri Lanka.",
          "Teams only. No individual or mixed-school entries allowed.",
          "A maximum of 5 members per team, all from the same school.",
          "Strict limit of TWO teams per school.",
          "Registration must be completed by the specified deadline."
        ],
        format: [
          "Round 1 — Online Preliminary: Hosted via official SYNC '26 quiz portal with Zoom breakout rooms. MCQs & short-answer challenges. Top 8 teams advance.",
          "Round 2 — Online Semifinal: Advanced MCQs & scenario reasoning in breakout rooms. Top 2 teams advance to the Physical Final.",
          "Final Round — Physical at SYNC '26 Main Event: Onsite championship stage covering A/L & O/L ICT syllabus, programming logic, and tech innovation with live interactive scoring."
        ],
        rules: [
          "All team members must keep functioning cameras and microphones on throughout online rounds.",
          "Team communication is permitted ONLY between registered members within assigned Zoom breakout rooms.",
          "Any form of cheating or external assistance results in immediate disqualification.",
          "Preset time limit per question; answers submitted after expiration are rejected."
        ]
      }
    },
    {
      id: "aspect",
      name: "ASPECT — Gaming Competition",
      badge: "CALL OF DUTY 3",
      shortDesc: "The premier esports battleground featuring Call of Duty 3. Tactical combat, reflex coordination, and competitive cyber warfare.",
      icon: "gamepad-2",
      logo: "assets/gaming_logo.png",
      category: "Esports Arena",
      eligibility: "Grades 6–13 • Competitive Gaming",
      minGrade: 6,
      maxGrade: 13,
      isTeam: false,
      tagline: "Enter the cyber warfare grid in Call of Duty 3.",
      sections: {
        overview: [
          "ASPECT is the official gaming championship of SYNC ’26, hosted by Dharmaraja College ICT Society.",
          "Official tournament game title: Call of Duty 3.",
          "Experience fast-paced tactical competition with professional tournament oversight."
        ],
        announcement: [
          "Tournament rules, bracket structure, match rotation, schedule, and prize distribution will be officially announced through the SYNC '26 event channels and WhatsApp community.",
          "Stay connected via the official WhatsApp group for bracket releases and platform guidelines."
        ],
        participation: [
          "Open to school students Grade 6–13.",
          "Players must register via the official form to reserve their bracket allocation.",
          "Join the official WhatsApp group for scrim updates, lobby codes, and coordinator briefings."
        ]
      }
    }
  ];

  window.SYNC_COMPETITIONS = {
    getAll: () => COMPETITIONS,
    getById: (id) => COMPETITIONS.find(c => c.id === id),

    renderCards: function (containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = COMPETITIONS.map((comp, idx) => {
        const isGaming = comp.id === "aspect";
        const isQuiz = comp.id === "quiz";
        const logoSrc = comp.logo;

        return `
          <div class="comp-card-wrap" data-comp-id="${comp.id}" data-category="${comp.category}">
            <div class="comp-card glass-panel group relative flex flex-col justify-between overflow-hidden p-6 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2">
              <!-- Holographic Corner Cuts & Neon Accent Borders -->
              <div class="card-border-glow absolute inset-0 pointer-events-none rounded-2xl border border-neon/20 group-hover:border-neon/60 transition-colors duration-500"></div>
              <div class="card-light-sweep absolute -inset-full pointer-events-none bg-gradient-to-r from-transparent via-neon/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Card Top Meta -->
              <div class="relative z-10 flex items-start justify-between gap-4 mb-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-full bg-forest/80 text-neon border border-neon/30">
                  <span class="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></span>
                  ${comp.badge}
                </span>
                <span class="text-xs font-mono text-muted uppercase tracking-wider">${comp.category}</span>
              </div>

              <!-- Card Logo & Title Area -->
              <div class="relative z-10 flex items-center gap-4 mb-4">
                <div class="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl bg-forest/90 border border-neon/30 p-2 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(92,227,210,0.15)] group-hover:shadow-[0_0_30px_rgba(92,227,210,0.35)] transition-shadow">
                  <img src="${logoSrc}" alt="${comp.name} logo" class="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(92,227,210,0.4)] transform group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div>
                  <h3 class="font-orbitron font-bold text-xl md:text-2xl text-white tracking-wide group-hover:text-neon transition-colors">
                    ${comp.name}
                  </h3>
                  <div class="text-xs font-mono text-neon/80 mt-1 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    ${comp.eligibility}
                  </div>
                </div>
              </div>

              <!-- Card Description -->
              <p class="relative z-10 text-muted text-sm leading-relaxed mb-6 flex-grow font-sans">
                ${comp.shortDesc}
              </p>

              <!-- Card Action Controls -->
              <div class="relative z-10 pt-4 border-t border-forest-light/60 flex flex-wrap items-center justify-between gap-2">
                <button type="button" class="btn-view-details text-xs font-orbitron font-semibold uppercase tracking-wider px-3 py-2 rounded-lg text-white hover:text-neon bg-forest/40 hover:bg-forest border border-white/10 hover:border-neon/40 transition-all flex items-center gap-1.5" data-comp-id="${comp.id}">
                  <span>View Details</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <div class="flex items-center gap-2">
                  <a href="${window.SYNC_CONFIG.contact.whatsappDirectLink}" target="_blank" rel="noopener noreferrer" class="btn-contact-wa p-2 rounded-lg text-neon/80 hover:text-neon bg-forest/40 hover:bg-forest border border-neon/20 hover:border-neon/50 transition-all" title="Contact via WhatsApp" aria-label="Contact Coordinator via WhatsApp">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z"/>
                    </svg>
                  </a>
                  <button type="button" class="btn-register-comp text-xs font-orbitron font-bold uppercase tracking-wider px-4 py-2 rounded-lg text-black bg-neon hover:bg-lime shadow-[0_0_15px_rgba(92,227,210,0.4)] hover:shadow-[0_0_25px_rgba(92,227,210,0.7)] transition-all flex items-center gap-1.5" data-comp-id="${comp.id}">
                    <span>Register</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");

      // Bind events
      container.querySelectorAll(".comp-card-wrap").forEach(cardWrap => {
        cardWrap.addEventListener("click", function (e) {
          if (e.target.closest("a, button")) return;
          const compId = this.getAttribute("data-comp-id");
          window.SYNC_COMPETITIONS.openModal(compId);
        });
      });

      container.querySelectorAll(".btn-view-details").forEach(btn => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const compId = this.getAttribute("data-comp-id");
          window.SYNC_COMPETITIONS.openModal(compId);
        });
      });

      container.querySelectorAll(".btn-register-comp").forEach(btn => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const compId = this.getAttribute("data-comp-id");
          if (window.SYNC_REGISTRATION) {
            window.SYNC_REGISTRATION.openModal(compId);
          }
        });
      });
    },

    openModal: function (compId) {
      const comp = this.getById(compId);
      if (!comp) return;

      const modal = document.getElementById("comp-detail-modal");
      if (!modal) return;

      const title = modal.querySelector(".modal-comp-title");
      const badge = modal.querySelector(".modal-comp-badge");
      const logo = modal.querySelector(".modal-comp-logo");
      const body = modal.querySelector(".modal-comp-body");
      const regBtn = modal.querySelector(".modal-btn-register");
      const waBtn = modal.querySelector(".modal-btn-whatsapp");

      if (title) title.textContent = comp.name;
      if (badge) badge.textContent = `${comp.badge} • ${comp.eligibility}`;
      if (logo) logo.src = comp.logo;

      // Construct detailed section tabs/panels
      let contentHtml = `<div class="space-y-6 text-sm text-gray-300">`;

      if (comp.sections.statement) {
        contentHtml += `
          <div class="glass-subpanel p-5 rounded-xl border border-neon/30 bg-forest/50">
            <h4 class="font-orbitron font-bold text-neon uppercase tracking-wider text-base mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Challenge Statement
            </h4>
            <div class="space-y-2">
              ${comp.sections.statement.map(s => `<p class="leading-relaxed">${s}</p>`).join("")}
            </div>
          </div>
        `;
      }

      if (comp.sections.theme) {
        contentHtml += `
          <div class="glass-subpanel p-5 rounded-xl border border-neon/30 bg-forest/50">
            <h4 class="font-orbitron font-bold text-neon uppercase tracking-wider text-base mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
              Theme & Aesthetic Vision
            </h4>
            <div class="space-y-2">
              ${comp.sections.theme.map(t => `<p class="leading-relaxed">${t}</p>`).join("")}
            </div>
          </div>
        `;
      }

      if (comp.sections.participation) {
        contentHtml += `
          <div>
            <h4 class="font-orbitron font-bold text-white uppercase tracking-wider text-sm mb-3 flex items-center gap-2 text-neon">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Participation & Eligibility
            </h4>
            <ul class="space-y-2 list-none">
              ${comp.sections.participation.map(p => `
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-neon mt-2 flex-shrink-0"></span>
                  <span>${p}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }

      if (comp.sections.format) {
        contentHtml += `
          <div>
            <h4 class="font-orbitron font-bold text-white uppercase tracking-wider text-sm mb-3 flex items-center gap-2 text-neon">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Competition Format
            </h4>
            <ul class="space-y-2 list-none">
              ${comp.sections.format.map(f => `
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0"></span>
                  <span>${f}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }

      if (comp.sections.instructions) {
        contentHtml += `
          <div>
            <h4 class="font-orbitron font-bold text-white uppercase tracking-wider text-sm mb-3 flex items-center gap-2 text-neon">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Instructions & Technical Guidelines
            </h4>
            <ul class="space-y-2 list-none">
              ${comp.sections.instructions.map(i => `
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-neon mt-2 flex-shrink-0"></span>
                  <span>${i}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }

      if (comp.sections.scoring) {
        contentHtml += `
          <div>
            <h4 class="font-orbitron font-bold text-white uppercase tracking-wider text-sm mb-3 flex items-center gap-2 text-neon">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Evaluation & Scoring Criteria
            </h4>
            <ul class="space-y-2 list-none">
              ${comp.sections.scoring.map(s => `
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0"></span>
                  <span>${s}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }

      if (comp.sections.submission) {
        contentHtml += `
          <div class="p-4 rounded-xl border border-neon/20 bg-forest/40">
            <h4 class="font-orbitron font-bold text-white uppercase tracking-wider text-sm mb-2 flex items-center gap-2 text-neon">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Submission Protocol
            </h4>
            <ul class="space-y-2 list-none">
              ${comp.sections.submission.map(sub => `
                <li class="flex items-start gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-neon mt-2 flex-shrink-0"></span>
                  <span class="font-mono text-xs text-gray-200">${sub}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `;
      }

      if (comp.sections.announcement) {
        contentHtml += `
          <div class="p-5 rounded-xl border border-neon/40 bg-forest/60 text-neon">
            <h4 class="font-orbitron font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Official Tournament Announcement
            </h4>
            <div class="space-y-2">
              ${comp.sections.announcement.map(a => `<p class="leading-relaxed text-gray-200">${a}</p>`).join("")}
            </div>
          </div>
        `;
      }

      contentHtml += `</div>`;
      if (body) body.innerHTML = contentHtml;

      if (regBtn) {
        regBtn.onclick = function () {
          window.SYNC_COMPETITIONS.closeModal();
          if (window.SYNC_REGISTRATION) {
            window.SYNC_REGISTRATION.openModal(compId);
          }
        };
      }

      if (waBtn) {
        waBtn.href = window.SYNC_CONFIG.contact.whatsappDirectLink;
      }

      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    },

    closeModal: function () {
      const modal = document.getElementById("comp-detail-modal");
      if (!modal) return;
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }
  };

  // Close handlers
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("comp-detail-modal");
    if (modal) {
      modal.querySelectorAll(".modal-close-btn").forEach(btn => {
        btn.addEventListener("click", () => window.SYNC_COMPETITIONS.closeModal());
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) window.SYNC_COMPETITIONS.closeModal();
      });
    }
  });
})();
