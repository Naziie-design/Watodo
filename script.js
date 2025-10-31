/* =========================================================
   Watodo.com — Script.js (Polished Version)
   Polished by: Senior Dev 5 🧩
   Description:
   Handles loader animation, particle effects, theme toggles,
   robot floating motion, and button transitions.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. Loader Fade-out on Page Load
     --------------------------------------------------------- */
  const loader = document.querySelector(".loader");

  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("fade-out"), 1000);
    });
  }

  /* ---------------------------------------------------------
     2. Background Particles (simple floating dots)
     --------------------------------------------------------- */
  const particleContainer = document.querySelector(".particles");

  if (particleContainer) {
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${4 + Math.random() * 6}s`;
      particle.style.animationDelay = `${Math.random() * 4}s`;
      particleContainer.appendChild(particle);
    }
  }

  /* ---------------------------------------------------------
     3. Theme Toggle (Dark / Light Mode)
     --------------------------------------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load previously saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.classList.add("dark-mode");

  // Toggle behavior
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      // Save current theme
      const currentTheme = body.classList.contains("dark-mode")
        ? "dark"
        : "light";
      localStorage.setItem("theme", currentTheme);

      // Animate icon swap
      themeToggle.classList.add("rotate");
      setTimeout(() => themeToggle.classList.remove("rotate"), 500);
    });
  }

  /* ---------------------------------------------------------
     4. Floating Robot Motion
     --------------------------------------------------------- */
  const robot = document.querySelector(".robot");

  if (robot) {
    let floatUp = true;

    setInterval(() => {
      robot.style.transform = `translateY(${floatUp ? "-6px" : "6px"})`;
      floatUp = !floatUp;
    }, 1500);
  }

  /* ---------------------------------------------------------
     5. Scroll-to Section (for smooth navigation)
     --------------------------------------------------------- */
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ---------------------------------------------------------
     6. Button Hover Transitions (for subtle effects)
     --------------------------------------------------------- */
  const buttons = document.querySelectorAll("button, .btn");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.classList.add("hovered"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("hovered"));
  });

  /* ---------------------------------------------------------
     7. Future-ready Section (reserved for features)
     --------------------------------------------------------- */
  // Placeholder for future modules like reminders, tasks, etc.
  // e.g. WatodoApp.reminders.init();
});
