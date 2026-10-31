/**
 * =========================================================================
 * SYNC ’26 / BTUI’26 — Registration Module
 * Dharmaraja College ICT Society
 * =========================================================================
 */

(function () {
  let currentCompId = "algorithm";
  let quizMembersCount = 3; // default members for quiz (up to 5)

  function getGradeOptions(minGrade, maxGrade, selectedGrade) {
    let html = `<option value="">Select Grade</option>`;
    for (let g = minGrade; g <= maxGrade; g++) {
      const isSel = selectedGrade === String(g) ? "selected" : "";
      html += `<option value="${g}" ${isSel}>Grade ${g}</option>`;
    }
    return html;
  }

  function generateConfirmationId(compId) {
    const prefixes = {
      algorithm: "ALG",
      webdev: "WEB",
      photoman: "PHM",
      poster: "PST",
      logo: "LGD",
      uiux: "UIX",
      quiz: "QIZ",
      aspect: "ASP"
    };
    const p = prefixes[compId] || "SYNC";
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    const time = Date.now().toString(36).slice(-4).toUpperCase();
    return `SYNC-${p}-${time}${rand}`;
  }

  function validateSriLankanPhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-\(\)]/g, "");
    return /^(\+94|0094|0)?7[01245678][0-9]{7}$/.test(cleaned);
  }

  function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test((email || "").trim());
  }

  window.SYNC_REGISTRATION = {
    openModal: function (compId) {
      currentCompId = compId || "algorithm";
      const comp = window.SYNC_COMPETITIONS ? window.SYNC_COMPETITIONS.getById(currentCompId) : null;
      const modal = document.getElementById("registration-modal");
      if (!modal) return;

      const titleEl = modal.querySelector(".reg-modal-title");
      if (titleEl) {
        titleEl.textContent = `REGISTER FOR ${comp ? comp.name.toUpperCase() : "COMPETITION"}`;
      }

      const compSelect = modal.querySelector("#reg-competition");
      if (compSelect) {
        compSelect.value = currentCompId;
      }

      this.renderFormForCompetition(currentCompId);
      this.resetStates();

      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    },

    closeModal: function () {
      const modal = document.getElementById("registration-modal");
      if (!modal) return;
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    },

    resetStates: function () {
      const formContainer = document.getElementById("reg-form-container");
      const loadingState = document.getElementById("reg-loading-state");
      const successState = document.getElementById("reg-success-state");
      const errorState = document.getElementById("reg-error-state");

      if (formContainer) formContainer.classList.remove("hidden");
      if (loadingState) loadingState.classList.add("hidden");
      if (successState) successState.classList.add("hidden");
      if (errorState) errorState.classList.add("hidden");

      this.clearErrors();
    },

    clearErrors: function () {
      document.querySelectorAll(".reg-field-error").forEach(el => el.textContent = "");
      document.querySelectorAll(".reg-input").forEach(input => {
        input.classList.remove("border-red-500", "focus:border-red-500");
      });
    },

    showError: function (fieldId, message) {
      const errEl = document.getElementById(`err-${fieldId}`);
      const input = document.getElementById(fieldId);
      if (errEl) errEl.textContent = message;
      if (input) {
        input.classList.add("border-red-500");
        input.focus();
      }
    },

    renderFormForCompetition: function (compId) {
      const comp = window.SYNC_COMPETITIONS ? window.SYNC_COMPETITIONS.getById(compId) : null;
      const isQuiz = compId === "quiz";
      const dynamicArea = document.getElementById("reg-dynamic-fields");
      if (!dynamicArea) return;

      const minG = comp ? comp.minGrade : 6;
      const maxG = comp ? comp.maxGrade : 13;

      if (!isQuiz) {
        // Individual Registration Form
        dynamicArea.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="reg-fullname" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Full Name <span class="text-neon">*</span>
              </label>
              <input type="text" id="reg-fullname" name="fullName" required placeholder="e.g. Mihin Rukshan" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-fullname" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>

            <div>
              <label for="reg-grade" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Grade / Class <span class="text-neon">* (Grades ${minG}–${maxG})</span>
              </label>
              <select id="reg-grade" name="grade" required class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all">
                ${getGradeOptions(minG, maxG)}
              </select>
              <p id="err-reg-grade" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label for="reg-email" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Email Address <span class="text-neon">*</span>
              </label>
              <input type="email" id="reg-email" name="email" required placeholder="participant@example.com" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-email" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>

            <div>
              <label for="reg-phone" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                WhatsApp / Contact Number <span class="text-neon">*</span>
              </label>
              <input type="tel" id="reg-phone" name="contactNumber" required placeholder="0714906145 or +94 71 490 6145" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-phone" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>
          </div>
        `;
      } else {
        // Quiz Team Registration Form
        dynamicArea.innerHTML = `
          <div class="p-3 mb-4 rounded-xl bg-neon/10 border border-neon/30 text-neon text-xs font-mono flex items-center gap-2">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            <span>Team rule: Strictly Grades 10–13 only. All members from the same school. Max 5 members total (including Captain). Max 2 teams per school.</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="reg-teamname" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Team Name <span class="text-neon">*</span>
              </label>
              <input type="text" id="reg-teamname" name="teamName" required placeholder="e.g. CyberKnights" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-teamname" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>

            <div>
              <label for="reg-captain-name" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Team Captain's Full Name <span class="text-neon">*</span>
              </label>
              <input type="text" id="reg-captain-name" name="fullName" required placeholder="Captain's Full Name" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-captain-name" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label for="reg-captain-grade" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Captain's Grade <span class="text-neon">* (10–13)</span>
              </label>
              <select id="reg-captain-grade" name="grade" required class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all">
                ${getGradeOptions(10, 13)}
              </select>
              <p id="err-reg-captain-grade" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>

            <div>
              <label for="reg-email" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Captain's Email <span class="text-neon">*</span>
              </label>
              <input type="email" id="reg-email" name="email" required placeholder="captain@school.lk" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-email" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>

            <div>
              <label for="reg-phone" class="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                Captain's Phone <span class="text-neon">*</span>
              </label>
              <input type="tel" id="reg-phone" name="contactNumber" required placeholder="0714906145" class="reg-input w-full px-4 py-2.5 rounded-xl bg-forest/70 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" />
              <p id="err-reg-phone" class="reg-field-error text-xs text-red-400 mt-1"></p>
            </div>
          </div>

          <!-- Team Members Section -->
          <div class="mt-6 pt-4 border-t border-forest-light/60">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-orbitron font-bold text-sm text-neon uppercase tracking-wider flex items-center gap-2">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                Additional Team Members (Up to 4 more)
              </h4>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-add-member" class="text-xs px-2.5 py-1 rounded bg-forest border border-neon/30 text-neon hover:bg-neon hover:text-black transition-colors font-mono">
                  + Add Member
                </button>
                <button type="button" id="btn-remove-member" class="text-xs px-2.5 py-1 rounded bg-forest border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors font-mono">
                  - Remove
                </button>
              </div>
            </div>

            <div id="quiz-members-container" class="space-y-3">
              <!-- Dynamically populated member fields -->
            </div>
          </div>
        `;

        this.renderQuizMembers();

        const addBtn = document.getElementById("btn-add-member");
        const removeBtn = document.getElementById("btn-remove-member");

        if (addBtn) {
          addBtn.onclick = () => {
            if (quizMembersCount < 4) {
              quizMembersCount++;
              this.renderQuizMembers();
            }
          };
        }

        if (removeBtn) {
          removeBtn.onclick = () => {
            if (quizMembersCount > 1) {
              quizMembersCount--;
              this.renderQuizMembers();
            }
          };
        }
      }
    },

    renderQuizMembers: function () {
      const container = document.getElementById("quiz-members-container");
      if (!container) return;

      let html = "";
      for (let i = 1; i <= quizMembersCount; i++) {
        html += `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-lg bg-forest/40 border border-white/5">
            <div class="md:col-span-2">
              <label class="block text-[11px] font-mono text-gray-400 mb-1">
                Member #${i} Full Name <span class="text-neon">*</span>
              </label>
              <input type="text" name="member_${i}_name" required placeholder="Member #${i} Name" class="reg-input w-full px-3 py-2 rounded-lg bg-forest/80 border border-white/10 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-neon" />
              <p id="err-member_${i}_name" class="reg-field-error text-[11px] text-red-400 mt-0.5"></p>
            </div>
            <div>
              <label class="block text-[11px] font-mono text-gray-400 mb-1">
                Grade <span class="text-neon">* (10–13)</span>
              </label>
              <select name="member_${i}_grade" required class="reg-input w-full px-3 py-2 rounded-lg bg-forest/80 border border-white/10 text-white text-xs focus:outline-none focus:border-neon">
                ${getGradeOptions(10, 13)}
              </select>
              <p id="err-member_${i}_grade" class="reg-field-error text-[11px] text-red-400 mt-0.5"></p>
            </div>
          </div>
        `;
      }
      container.innerHTML = html;
    },

    handleSubmit: async function (e) {
      e.preventDefault();
      this.clearErrors();

      const compId = document.getElementById("reg-competition")?.value || currentCompId;
      const partType = document.getElementById("reg-part-type")?.value || "intra";
      const schoolNameInput = document.getElementById("reg-school");
      const schoolName = (schoolNameInput ? schoolNameInput.value : "").trim();

      // Collect base data
      let isValid = true;

      if (!schoolName) {
        this.showError("reg-school", "School name is required.");
        isValid = false;
      } else if (partType === "intra" && !/dharmaraja/i.test(schoolName)) {
        this.showError("reg-school", "Intra-School participation is restricted to Dharmaraja College.");
        isValid = false;
      }

      const isQuiz = compId === "quiz";
      let regPayload = {
        competitionId: compId,
        participationType: partType,
        schoolName: schoolName,
        timestamp: new Date().toISOString()
      };

      if (!isQuiz) {
        const fullName = (document.getElementById("reg-fullname")?.value || "").trim();
        const grade = document.getElementById("reg-grade")?.value || "";
        const email = (document.getElementById("reg-email")?.value || "").trim();
        const phone = (document.getElementById("reg-phone")?.value || "").trim();

        if (!fullName || fullName.length < 2) {
          this.showError("reg-fullname", "Full name must be at least 2 characters.");
          isValid = false;
        }

        const comp = window.SYNC_COMPETITIONS?.getById(compId);
        const gradeNum = parseInt(grade, 10);
        if (!grade || isNaN(gradeNum) || gradeNum < (comp?.minGrade || 6) || gradeNum > (comp?.maxGrade || 13)) {
          this.showError("reg-grade", `Please select a valid grade between ${comp?.minGrade || 6} and ${comp?.maxGrade || 13}.`);
          isValid = false;
        }

        if (!validateEmail(email)) {
          this.showError("reg-email", "Please enter a valid email address.");
          isValid = false;
        }

        if (!validateSriLankanPhone(phone)) {
          this.showError("reg-phone", "Please enter a valid Sri Lankan mobile number (e.g. 0714906145).");
          isValid = false;
        }

        regPayload = {
          ...regPayload,
          fullName,
          grade,
          email,
          contactNumber: phone
        };
      } else {
        const teamName = (document.getElementById("reg-teamname")?.value || "").trim();
        const captainName = (document.getElementById("reg-captain-name")?.value || "").trim();
        const captainGrade = document.getElementById("reg-captain-grade")?.value || "";
        const email = (document.getElementById("reg-email")?.value || "").trim();
        const phone = (document.getElementById("reg-phone")?.value || "").trim();

        if (!teamName || teamName.length < 2) {
          this.showError("reg-teamname", "Team name is required (min 2 characters).");
          isValid = false;
        }

        if (!captainName || captainName.length < 2) {
          this.showError("reg-captain-name", "Captain's name is required.");
          isValid = false;
        }

        const cGradeNum = parseInt(captainGrade, 10);
        if (!captainGrade || isNaN(cGradeNum) || cGradeNum < 10 || cGradeNum > 13) {
          this.showError("reg-captain-grade", "Quiz is strictly for Grades 10–13.");
          isValid = false;
        }

        if (!validateEmail(email)) {
          this.showError("reg-email", "Valid email address is required.");
          isValid = false;
        }

        if (!validateSriLankanPhone(phone)) {
          this.showError("reg-phone", "Valid Sri Lankan contact number is required.");
          isValid = false;
        }

        // Collect team members
        const members = [];
        for (let i = 1; i <= quizMembersCount; i++) {
          const mName = (document.querySelector(`input[name="member_${i}_name"]`)?.value || "").trim();
          const mGrade = document.querySelector(`select[name="member_${i}_grade"]`)?.value || "";

          if (!mName || mName.length < 2) {
            const errEl = document.getElementById(`err-member_${i}_name`);
            if (errEl) errEl.textContent = `Member #${i} name is required.`;
            isValid = false;
          }

          const mGradeNum = parseInt(mGrade, 10);
          if (!mGrade || isNaN(mGradeNum) || mGradeNum < 10 || mGradeNum > 13) {
            const errEl = document.getElementById(`err-member_${i}_grade`);
            if (errEl) errEl.textContent = "Must be in Grade 10–13.";
            isValid = false;
          }

          members.push({ name: mName, grade: mGrade });
        }

        regPayload = {
          ...regPayload,
          fullName: captainName,
          grade: captainGrade,
          email,
          contactNumber: phone,
          teamName,
          teamMembers: members
        };
      }

      if (!isValid) return;

      // Show loading UI
      const formContainer = document.getElementById("reg-form-container");
      const loadingState = document.getElementById("reg-loading-state");
      const successState = document.getElementById("reg-success-state");
      const errorState = document.getElementById("reg-error-state");

      if (formContainer) formContainer.classList.add("hidden");
      if (loadingState) loadingState.classList.remove("hidden");

      // Generate verified Confirmation ID
      const confirmationId = generateConfirmationId(compId);
      regPayload.confirmationId = confirmationId;

      try {
        let backendSuccess = false;
        const appsScriptUrl = window.SYNC_CONFIG?.backend?.appsScriptUrl;

        if (appsScriptUrl && appsScriptUrl.startsWith("http")) {
          // Real Google Apps Script Endpoint call
          const resp = await fetch(appsScriptUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              action: "register",
              payload: regPayload
            })
          });

          if (!resp.ok) throw new Error(`Server returned HTTP ${resp.status}`);
          const resJson = await resp.json();
          if (!resJson.success) throw new Error(resJson.error || "Submission failed");
          backendSuccess = true;
        } else {
          // Simulated persistence to localStorage for instant reliable local operation
          await new Promise(r => setTimeout(r, window.SYNC_CONFIG?.backend?.simulatedLatencyMs || 800));
          const existing = JSON.parse(localStorage.getItem("SYNC_REGISTRATIONS_STORE") || "[]");
          existing.push(regPayload);
          localStorage.setItem("SYNC_REGISTRATIONS_STORE", JSON.stringify(existing));
          backendSuccess = true;
        }

        if (backendSuccess) {
          if (loadingState) loadingState.classList.add("hidden");
          if (successState) {
            successState.classList.remove("hidden");
            const confEl = document.getElementById("reg-conf-id");
            const partNameEl = document.getElementById("reg-conf-name");
            const compNameEl = document.getElementById("reg-conf-comp");
            const waGroupBtn = document.getElementById("reg-btn-whatsapp-group");

            if (confEl) confEl.textContent = confirmationId;
            if (partNameEl) partNameEl.textContent = regPayload.fullName;
            const compObj = window.SYNC_COMPETITIONS?.getById(compId);
            if (compNameEl) compNameEl.textContent = compObj ? compObj.name : compId;
            if (waGroupBtn) waGroupBtn.href = window.SYNC_CONFIG.contact.whatsappGroupLink;
          }
        }
      } catch (err) {
        console.error("Registration error:", err);
        if (loadingState) loadingState.classList.add("hidden");
        if (errorState) {
          errorState.classList.remove("hidden");
          const msgEl = document.getElementById("reg-error-message");
          if (msgEl) msgEl.textContent = err.message || "Could not connect to registration server. Please retry.";
        }
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registration-modal");
    if (!modal) return;

    modal.querySelectorAll(".modal-reg-close").forEach(btn => {
      btn.addEventListener("click", () => window.SYNC_REGISTRATION.closeModal());
    });

    const form = document.getElementById("sync-registration-form");
    if (form) {
      form.addEventListener("submit", (e) => window.SYNC_REGISTRATION.handleSubmit(e));
    }

    const compSelect = document.getElementById("reg-competition");
    if (compSelect) {
      compSelect.addEventListener("change", function () {
        currentCompId = this.value;
        const comp = window.SYNC_COMPETITIONS ? window.SYNC_COMPETITIONS.getById(currentCompId) : null;
        const titleEl = document.querySelector(".reg-modal-title");
        if (titleEl) {
          titleEl.textContent = `REGISTER FOR ${comp ? comp.name.toUpperCase() : "COMPETITION"}`;
        }
        window.SYNC_REGISTRATION.renderFormForCompetition(currentCompId);
      });
    }

    const partTypeSelect = document.getElementById("reg-part-type");
    const schoolInput = document.getElementById("reg-school");
    if (partTypeSelect && schoolInput) {
      partTypeSelect.addEventListener("change", function () {
        if (this.value === "intra") {
          schoolInput.value = "Dharmaraja College";
          schoolInput.setAttribute("readonly", "readonly");
          schoolInput.classList.add("opacity-80");
        } else {
          if (schoolInput.value === "Dharmaraja College") schoolInput.value = "";
          schoolInput.removeAttribute("readonly");
          schoolInput.classList.remove("opacity-80");
          schoolInput.placeholder = "Enter your school name";
        }
      });
    }

    const retryBtn = document.getElementById("reg-btn-retry");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => window.SYNC_REGISTRATION.resetStates());
    }
  });
})();
