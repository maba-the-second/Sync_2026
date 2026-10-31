/**
 * =========================================================================
 * SYNC ’26 — Animations & 3D WebGL Engine
 * Dharmaraja College ICT Society
 * =========================================================================
 */

(function () {
  let threeScene, threeCamera, threeRenderer, particlesMesh, cyberGridMesh;
  let audioCtx = null, synthOscillator = null, synthGain = null;
  let isAudioPlaying = false;

  window.SYNC_ANIMATIONS = {
    init: function () {
      this.initPreloader();
      this.initCustomCursor();
      this.initThreeScene();
      this.initScrollAnimations();
      this.initAudioEngine();
    },

    // 1. Cinematic Preloader
    initPreloader: function () {
      const preloader = document.getElementById("cinematic-preloader");
      const progressText = document.getElementById("preloader-progress-text");
      const progressBar = document.getElementById("preloader-progress-bar");
      if (!preloader) return;

      let dismissed = false;
      const dismiss = () => {
        if (!dismissed) {
          dismissed = true;
          preloader.style.pointerEvents = "none";
          preloader.style.opacity = "0";
          preloader.style.transition = "opacity 0.3s ease";
          setTimeout(() => {
            preloader.classList.add("hidden");
            preloader.classList.remove("flex");
            preloader.style.display = "none";
            window.SYNC_ANIMATIONS.animateHeroEntrance();
          }, 300);
        }
      };

      // Autostart or quick dismiss on click
      if (window.location.search.includes("autostart=1")) {
        dismissed = true;
        preloader.style.pointerEvents = "none";
        preloader.classList.add("hidden");
        preloader.classList.remove("flex");
        preloader.style.display = "none";
        window.SYNC_ANIMATIONS.animateHeroEntrance();
        return;
      }

      preloader.addEventListener("click", dismiss);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 18;
        if (progress > 100) progress = 100;

        if (progressText) progressText.textContent = `${progress}%`;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            dismiss();
          }, 150);
        }
      }, 30);

      // Failsafe: never trap visitor
      setTimeout(dismiss, 1200);
    },

    // 2. Hero Entrance Animation
    animateHeroEntrance: function () {
      if (!window.gsap) return;

      const tl = gsap.timeline();
      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-headline-line", { y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power4.out" }, "-=0.3")
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta-group", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".hero-artwork-frame", { scale: 0.95, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.7")
        .from(".hero-stat-badge", { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, "-=0.5");
    },

    // 3. Custom Cursor & Neon Light Orb
    initCustomCursor: function () {
      if (window.matchMedia("(pointer: coarse)").matches) return; // Touch device

      const cursorDot = document.getElementById("cursor-dot");
      const cursorRing = document.getElementById("cursor-ring");
      if (!cursorDot || !cursorRing) return;

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });

      function renderCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderCursor);
      }
      requestAnimationFrame(renderCursor);

      // Interactive hover states
      document.querySelectorAll("a, button, input, select, .comp-card").forEach(el => {
        el.addEventListener("mouseenter", () => {
          cursorRing.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
          cursorRing.classList.remove("cursor-hover");
        });
      });
    },

    // 4. Three.js Genuine 3D Cyber Scene (Software-WebGL compatible)
    initThreeScene: function () {
      const container = document.getElementById("hero-three-canvas-container");
      if (!container || !window.THREE) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      threeScene = new THREE.Scene();
      threeCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      threeCamera.position.z = 25;

      try {
        threeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch (e) {
        console.warn("WebGL unavailable, continuing with CSS effects:", e);
        return;
      }

      threeRenderer.setSize(width, height);
      threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(threeRenderer.domElement);

      // 3D Particles Field
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 60;
        positions[i + 1] = (Math.random() - 0.5) * 40;
        positions[i + 2] = (Math.random() - 0.5) * 40;

        // Turquoise / Deep Ocean / Azure Mist Palette
        colors[i] = 0.36; // R (#5CE3D2)
        colors[i + 1] = 0.89; // G
        colors[i + 2] = 0.82; // B
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.65
      });

      particlesMesh = new THREE.Points(geometry, material);
      threeScene.add(particlesMesh);

      // Cyber Torus Knot (Futuristic Digital Artifact)
      const torusGeo = new THREE.TorusKnotGeometry(6, 1.8, 64, 16);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x5CE3D2,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      cyberGridMesh = new THREE.Mesh(torusGeo, torusMat);
      cyberGridMesh.position.set(10, 0, -5);
      threeScene.add(cyberGridMesh);

      // Mouse Parallax Response
      let targetX = 0;
      let targetY = 0;
      window.addEventListener("mousemove", (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 4;
        targetY = (e.clientY / window.innerHeight - 0.5) * 4;
      });

      // Animation Loop
      function animate() {
        requestAnimationFrame(animate);

        if (particlesMesh) {
          particlesMesh.rotation.y += 0.0008;
          particlesMesh.rotation.x += 0.0004;
        }

        if (cyberGridMesh) {
          cyberGridMesh.rotation.x += 0.002;
          cyberGridMesh.rotation.y += 0.003;
        }

        threeCamera.position.x += (targetX - threeCamera.position.x) * 0.05;
        threeCamera.position.y += (-targetY - threeCamera.position.y) * 0.05;
        threeCamera.lookAt(threeScene.position);

        threeRenderer.render(threeScene, threeCamera);
      }
      animate();

      window.addEventListener("resize", () => {
        if (!threeRenderer || !threeCamera) return;
        const newW = container.clientWidth || window.innerWidth;
        const newH = container.clientHeight || window.innerHeight;
        threeCamera.aspect = newW / newH;
        threeCamera.updateProjectionMatrix();
        threeRenderer.setSize(newW, newH);
      });
    },

    // 5. Scroll Animations (GSAP ScrollTrigger)
    initScrollAnimations: function () {
      if (!window.gsap) return;

      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Section Headers Reveal
        gsap.utils.toArray(".reveal-on-scroll").forEach(el => {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0.85 },
            {
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                toggleActions: "play none none none"
              },
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "transform,opacity"
            }
          );
        });

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }
    },

    // 6. Audio Engine (Web Audio Procedural Cyber Synth & Effects)
    initAudioEngine: function () {
      const audioToggleBtn = document.getElementById("audio-toggle-btn");
      const audioIcon = document.getElementById("audio-icon");
      const audioLabel = document.getElementById("audio-label");

      const toggleAudio = () => {
        if (!audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;
          audioCtx = new AudioContext();
        }

        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        if (!isAudioPlaying) {
          // Start ambient drone synth
          try {
            synthGain = audioCtx.createGain();
            synthGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
            synthGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 2);
            synthGain.connect(audioCtx.destination);

            synthOscillator = audioCtx.createOscillator();
            synthOscillator.type = "sine";
            synthOscillator.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A drone (55Hz)
            synthOscillator.connect(synthGain);
            synthOscillator.start();

            isAudioPlaying = true;
            if (audioIcon) audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
            if (audioLabel) audioLabel.textContent = "AUDIO: ON";
            if (audioToggleBtn) audioToggleBtn.classList.add("border-neon", "text-neon");
          } catch (e) {
            console.warn("Audio initiation error:", e);
          }
        } else {
          // Stop ambient synth
          if (synthGain && audioCtx) {
            synthGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
            setTimeout(() => {
              try { synthOscillator?.stop(); } catch (err) {}
            }, 550);
          }
          isAudioPlaying = false;
          if (audioIcon) audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
          if (audioLabel) audioLabel.textContent = "AUDIO: OFF";
          if (audioToggleBtn) audioToggleBtn.classList.remove("border-neon", "text-neon");
        }
      };

      if (audioToggleBtn) {
        audioToggleBtn.addEventListener("click", toggleAudio);
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.SYNC_ANIMATIONS.init();
  });
})();
