/**
 * =========================================================================
 * SYNC ’26 — Leaderboard Module
 * Dharmaraja College ICT Society
 * =========================================================================
 */

(function () {
  let leaderboardData = [];
  let currentFilter = {
    competition: "all",
    school: "all",
    search: ""
  };

  window.SYNC_LEADERBOARD = {
    init: async function () {
      this.bindFilters();
      await this.fetchData();
    },

    fetchData: async function () {
      const endpoint = window.SYNC_CONFIG?.backend?.leaderboardEndpoint;
      const appsScriptUrl = window.SYNC_CONFIG?.backend?.appsScriptUrl;

      try {
        if (endpoint && endpoint.startsWith("http")) {
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            leaderboardData = Array.isArray(data) ? data : (data.results || []);
          }
        } else if (appsScriptUrl && appsScriptUrl.startsWith("http")) {
          const res = await fetch(`${appsScriptUrl}?action=getLeaderboard`);
          if (res.ok) {
            const data = await res.json();
            leaderboardData = Array.isArray(data) ? data : (data.results || []);
          }
        }
      } catch (err) {
        console.warn("Leaderboard fetch error, displaying unannounced state:", err);
      }

      this.render();
    },

    bindFilters: function () {
      const compFilter = document.getElementById("leaderboard-filter-comp");
      const searchInput = document.getElementById("leaderboard-search");
      const previewToggle = document.getElementById("leaderboard-preview-toggle");

      if (compFilter) {
        compFilter.addEventListener("change", (e) => {
          currentFilter.competition = e.target.value;
          this.render();
        });
      }

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          currentFilter.search = e.target.value.toLowerCase().trim();
          this.render();
        });
      }

      if (previewToggle) {
        previewToggle.addEventListener("change", (e) => {
          if (e.target.checked) {
            // Sample verified test dataset for judges & organizer preview
            leaderboardData = [
              { rank: 1, name: "Vimukthi Bandara", school: "Dharmaraja College", competition: "algorithm", score: 500, status: "Verified" },
              { rank: 2, name: "Kavindu Jayasundara", school: "Royal College", competition: "algorithm", score: 480, status: "Verified" },
              { rank: 3, name: "CyberKnights Alpha", school: "Ananda College", competition: "quiz", score: 450, status: "Verified" },
              { rank: 4, name: "Senula Perera", school: "Dharmaraja College", competition: "webdev", score: 430, status: "Verified" },
              { rank: 5, name: "Dulan Nimsara", school: "Trinity College", competition: "photoman", score: 410, status: "Verified" }
            ];
          } else {
            leaderboardData = [];
          }
          this.render();
        });
      }
    },

    render: function () {
      const container = document.getElementById("leaderboard-content-area");
      const podiumArea = document.getElementById("leaderboard-podium-area");
      if (!container) return;

      if (!leaderboardData || leaderboardData.length === 0) {
        if (podiumArea) podiumArea.innerHTML = "";
        container.innerHTML = `
          <div class="glass-panel p-8 md:p-12 rounded-2xl border border-neon/20 text-center max-w-2xl mx-auto my-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-forest flex items-center justify-center border border-neon/30 text-neon shadow-[0_0_20px_rgba(92,227,210,0.2)]">
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <h3 class="font-orbitron font-bold text-2xl text-white tracking-widest uppercase mb-2">
              THE RANKINGS WILL BE REVEALED HERE.
            </h3>
            <p class="text-gray-400 font-sans text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Official scores and tournament standings will appear as each competition concludes and results are published by the judging panel.
            </p>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/80 border border-neon/30 text-xs font-mono text-neon">
              <span class="w-2 h-2 rounded-full bg-neon animate-ping"></span>
              AWAITING MAIN EVENT TOURNAMENT RESULTS
            </div>
          </div>
        `;
        return;
      }

      // Filter data
      let filtered = leaderboardData.filter(item => {
        if (currentFilter.competition !== "all" && item.competition.toLowerCase() !== currentFilter.competition.toLowerCase()) {
          return false;
        }
        if (currentFilter.search) {
          const matchName = item.name.toLowerCase().includes(currentFilter.search);
          const matchSchool = item.school.toLowerCase().includes(currentFilter.search);
          if (!matchName && !matchSchool) return false;
        }
        return true;
      });

      // Top 3 Podium
      if (podiumArea) {
        const top3 = filtered.slice(0, 3);
        if (top3.length >= 3) {
          podiumArea.innerHTML = `
            <div class="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto mb-10 items-end">
              <!-- #2 Silver -->
              <div class="glass-panel p-4 md:p-6 rounded-2xl border border-gray-400/30 text-center transform hover:scale-105 transition-transform">
                <div class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Rank #2</div>
                <div class="w-10 h-10 mx-auto rounded-full bg-gray-400/20 border border-gray-400 text-gray-200 font-orbitron font-bold flex items-center justify-center mb-2">2</div>
                <h4 class="font-orbitron font-bold text-sm md:text-base text-white truncate">${top3[1].name}</h4>
                <p class="text-[11px] font-mono text-gray-400 truncate">${top3[1].school}</p>
                <div class="mt-2 text-xs font-mono text-neon font-bold">${top3[1].score} PTS</div>
              </div>

              <!-- #1 Gold Center -->
              <div class="glass-panel p-6 md:p-8 rounded-2xl border-2 border-neon text-center relative -translate-y-4 shadow-[0_0_30px_rgba(92,227,210,0.25)] transform hover:scale-105 transition-transform">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neon text-black font-orbitron font-black text-[10px] tracking-wider uppercase">CHAMPION</div>
                <div class="text-xs font-mono text-neon uppercase tracking-widest mb-1">Rank #1</div>
                <div class="w-12 h-12 mx-auto rounded-full bg-neon/20 border-2 border-neon text-neon font-orbitron font-black text-xl flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(92,227,210,0.5)]">1</div>
                <h4 class="font-orbitron font-bold text-base md:text-lg text-white truncate">${top3[0].name}</h4>
                <p class="text-xs font-mono text-gray-300 truncate">${top3[0].school}</p>
                <div class="mt-2 text-sm font-mono text-lime font-black">${top3[0].score} PTS</div>
              </div>

              <!-- #3 Bronze -->
              <div class="glass-panel p-4 md:p-6 rounded-2xl border border-amber-600/30 text-center transform hover:scale-105 transition-transform">
                <div class="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">Rank #3</div>
                <div class="w-10 h-10 mx-auto rounded-full bg-amber-600/20 border border-amber-600 text-amber-400 font-orbitron font-bold flex items-center justify-center mb-2">3</div>
                <h4 class="font-orbitron font-bold text-sm md:text-base text-white truncate">${top3[2].name}</h4>
                <p class="text-[11px] font-mono text-gray-400 truncate">${top3[2].school}</p>
                <div class="mt-2 text-xs font-mono text-neon font-bold">${top3[2].score} PTS</div>
              </div>
            </div>
          `;
        } else {
          podiumArea.innerHTML = "";
        }
      }

      // Ranking Table
      container.innerHTML = `
        <div class="glass-panel rounded-2xl border border-neon/20 overflow-hidden shadow-2xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-forest-light bg-forest/80 text-neon font-orbitron text-xs tracking-wider uppercase">
                  <th class="py-4 px-6 text-center w-20">Rank</th>
                  <th class="py-4 px-6">Participant / Team</th>
                  <th class="py-4 px-6">School</th>
                  <th class="py-4 px-6">Competition</th>
                  <th class="py-4 px-6 text-right">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 font-sans text-sm">
                ${filtered.map(item => `
                  <tr class="hover:bg-forest/50 transition-colors">
                    <td class="py-4 px-6 text-center font-orbitron font-bold text-white">
                      <span class="inline-block w-7 h-7 leading-7 rounded-full ${item.rank === 1 ? 'bg-neon text-black font-black' : item.rank === 2 ? 'bg-gray-400 text-black' : item.rank === 3 ? 'bg-amber-600 text-white' : 'bg-forest text-gray-300'}">
                        ${item.rank}
                      </span>
                    </td>
                    <td class="py-4 px-6 font-semibold text-white">${item.name}</td>
                    <td class="py-4 px-6 text-gray-300 font-mono text-xs">${item.school}</td>
                    <td class="py-4 px-6 text-neon font-mono text-xs uppercase">${item.competition}</td>
                    <td class="py-4 px-6 text-right font-mono font-bold text-lime text-base">${item.score}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.SYNC_LEADERBOARD.init();
  });
})();
