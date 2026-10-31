/**
 * =========================================================================
 * SYNC ’26 — Main Application Coordinator
 * Dharmaraja College ICT Society
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Competition Cards
  if (window.SYNC_COMPETITIONS) {
    window.SYNC_COMPETITIONS.renderCards("competitions-grid");
  }

  // 2. Navigation & Smooth Scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("text-neon", "border-neon");
            link.classList.remove("text-gray-400", "border-transparent");
          } else {
            link.classList.remove("text-neon", "border-neon");
            link.classList.add("text-gray-400", "border-transparent");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);

  // Smooth scroll click handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
        // Close mobile nav if open
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Mobile navigation hamburger toggle
  const mobileToggle = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        mobileToggle.setAttribute("aria-expanded", "true");
      } else {
        mobileMenu.classList.add("hidden");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hero CTA Buttons
  const heroExploreBtn = document.getElementById("hero-explore-btn");
  const heroRegisterBtn = document.getElementById("hero-register-btn");

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener("click", () => {
      document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (heroRegisterBtn) {
    heroRegisterBtn.addEventListener("click", () => {
      if (window.SYNC_REGISTRATION) {
        window.SYNC_REGISTRATION.openModal("algorithm");
      }
    });
  }

  // Final CTA section buttons
  const ctaExploreBtn = document.getElementById("cta-explore-btn");
  const ctaContactBtn = document.getElementById("cta-contact-btn");

  if (ctaExploreBtn) {
    ctaExploreBtn.addEventListener("click", () => {
      document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (ctaContactBtn) {
    ctaContactBtn.addEventListener("click", () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Global escape key to close open modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.SYNC_COMPETITIONS?.closeModal();
      window.SYNC_REGISTRATION?.closeModal();
      if (window.SYNC_CHATBOT?.isOpen) window.SYNC_CHATBOT.toggle();
    }
  });
});
