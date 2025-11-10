/* ---------- Loader hide ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.style.display = 'none';
  }, 1800);

  setTimeout(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }, 1850);

  // initialize theme from storage immediately so FOUC minimized
  initTheme();
});

/* ---------- Theme toggle (light default, dark optional) ---------- */
function initTheme(){
  try {
    const saved = localStorage.getItem('watodo-theme'); // 'dark' or 'light'
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    const apply = (theme) => {
      if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (toggle) {
          toggle.setAttribute('aria-pressed','true');
          toggle.textContent = '🌙';
        }
      } else {
        body.removeAttribute('data-theme');
        if (toggle) {
          toggle.setAttribute('aria-pressed','false');
          toggle.textContent = '🌞';
        }
      }
    };

    // apply saved (default light)
    apply(saved === 'dark' ? 'dark' : 'light');

    if (toggle) {
      toggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem('watodo-theme', next); } catch(e) {}
      });
    }
  } catch (e) {
    // silent fail (e.g., localStorage disabled)
    console.warn('Theme init failed', e);
  }
}

/* ---------- Particles (kept original behavior) ---------- */
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const particles = [];
  function rand(a,b){ return Math.random()*(b-a)+a; }
  for(let i=0;i<80;i++){
    particles.push({x:rand(0,w),y:rand(0,h),r:rand(0.6,2.8),vx:rand(-0.22,0.22),vy:rand(-0.06,0.06),alpha:rand(0.04,0.25)});
  }
  window.addEventListener('resize', ()=>{ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-10)p.x=w+10; if(p.x>w+10)p.x=-10;
      if(p.y<-10)p.y=h+10; if(p.y>h+10)p.y=-10;
      ctx.beginPath();
      // color slightly brighter in light mode, but keep same feel
      ctx.fillStyle = 'rgba(0,160,220,'+p.alpha+')';
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Robot subtle animation (kept) ---------- */
(() => {
  const robot = document.getElementById('robot');
  if (!robot) return;
  let t = 0;
  function animate(){
    t += 0.02;
    const y = Math.sin(t) * 6;
    const r = 1 + Math.sin(t/1.6)*0.01;
    robot.style.transform = `translateY(${y}px) scale(${r})`;
    requestAnimationFrame(animate);
  }
  setTimeout(()=>{ requestAnimationFrame(animate); }, 900);
})();

/* ---------- Rotating words (updated student-focused list) ---------- */
(() => {
  const words = ['ACTIVITIES','DEADLINES','PROGRESS','HABITS'];
  const el = document.getElementById('cycleText');
  if (!el) return;
  let i = 0;
  function change(){
    el.style.opacity = 0;
    el.style.transform = 'translateY(6px)';
    setTimeout(()=>{
      el.textContent = words[i];
      el.style.transition = 'opacity .42s ease, transform .42s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      i = (i+1) % words.length;
    }, 320);
  }
  setTimeout(change, 500);
  setInterval(change, 2100);
})();

/* ---------- Popup handlers (kept) ---------- */
function showPopup(){
  const pb = document.getElementById('popupBack');
  if (!pb) return;
  pb.style.display = 'flex';
  pb.setAttribute('aria-hidden','false');
  setTimeout(()=>pb.style.opacity = 1, 20);
  setTimeout(()=>{
    pb.style.opacity = 0;
    setTimeout(()=>{ pb.style.display = 'none'; pb.setAttribute('aria-hidden','true'); }, 420);
  }, 1800);
}
const tryBtn = document.getElementById('tryBtn');
// previously we had remindBtn which is removed — safe check kept
const remindBtn = document.getElementById('remindBtn');
if (tryBtn) tryBtn.addEventListener('click', showPopup);
if (remindBtn) remindBtn.addEventListener('click', showPopup); // no-op if null

/* ---------- Load Facebook SDK (kept) ---------- */
(function(d,s,id){
  var js,fjs=d.getElementsByTagName(s)[0];
  if(d.getElementById(id)) return;
  js=d.createElement(s); js.id=id;
  js.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0";
  fjs.parentNode.insertBefore(js,fjs);
}(document,'script','facebook-jssdk'));

/* ---------- Reveal on scroll (new) ---------- */
(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  });

  // reveal section containers and small components
  document.querySelectorAll('.section-reveal, .reveal').forEach(el => {
    observer.observe(el);
  });
})();

/* ---------- Smooth header nav scrolling (new) ---------- */
(function(){
  const navLinks = document.querySelectorAll('header .header-nav a[href^="#"]');
  if (!navLinks) return;
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = a.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // optionally update focus for accessibility
        setTimeout(()=> target.setAttribute('tabindex','-1'), 600);
      }
    });
  });
})();

/* === Wato Robot Chat Bubble v3.3 (Unified Desktop + Mobile) === */
/* Author: Team Leader & GPT-5 | Watodo v3.0 */

document.addEventListener("DOMContentLoaded", () => {
  const robot = document.querySelector("#robot, .robot, [data-wato-robot]");
  const header = document.querySelector("header");
  const headerSections = document.querySelectorAll(".header-left, .header-nav, .header-right");

  if (!robot) {
    console.warn("⚠️ Wato: robot element not found (use id='robot' or class='robot').");
    return;
  }

  const messages = [
    "Hi, I'm Wato 👋 Need a boost today?",
    "You're doing great!",
    "Take a short break ☕",
    "Let's get things done 💪"
  ];
  let index = 0;
  let showing = false;
  let autoHideTimer = null;

  // === create floating UI elements ===
  const overlay = document.createElement("div");
  overlay.className = "wato-overlay";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.textContent = messages[0];

  const bubble = document.createElement("div");
  bubble.className = "wato-bubble";
  bubble.setAttribute("role", "status");
  bubble.setAttribute("aria-live", "polite");
  bubble.textContent = messages[0];

  document.body.appendChild(overlay);
  document.body.appendChild(bubble);

  // === helper functions ===
  function fadeOutHeader() {
    if (headerSections.length) {
      headerSections.forEach(el => el.classList.add("fade-out"));
      headerSections.forEach(el => el.classList.remove("fade-in"));
    } else if (header) {
      header.classList.add("fade-out");
      header.classList.remove("fade-in");
    }
  }

  function restoreHeader() {
    if (headerSections.length) {
      headerSections.forEach(el => {
        el.classList.remove("fade-out");
        el.classList.add("fade-in");
      });
    } else if (header) {
      header.classList.remove("fade-out");
      header.classList.add("fade-in");
    }
  }

  function clearAutoHide() {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
  }

  function showOverlay(msg) {
    overlay.textContent = msg;
    const headerRect = header ? header.getBoundingClientRect() : { top: 0, height: 56 };
    overlay.style.top = Math.max(0, headerRect.top) + "px";
    overlay.classList.add("active");
  }

  function hideOverlay() {
    overlay.classList.remove("active");
  }

  function showBubble(msg) {
    bubble.textContent = msg;
    const r = robot.getBoundingClientRect();

    const preferLeft = (window.innerWidth - r.right) < r.left;
    let top = Math.max(6, r.top - 8);
    let left;

    if (preferLeft) {
      left = r.left - bubble.offsetWidth - 12;
      if (left < 8) left = r.right + 8;
    } else {
      left = r.right + 8;
      if (left + bubble.offsetWidth > window.innerWidth - 8) {
        left = r.left - bubble.offsetWidth - 12;
      }
    }

    bubble.style.top = top + window.scrollY + "px";
    bubble.style.left = left + window.scrollX + "px";
    bubble.classList.add("active");
  }

  function hideBubble() {
    bubble.classList.remove("active");
  }

  // === main trigger ===
  robot.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    clearAutoHide();

    if (!showing) {
      fadeOutHeader();
      setTimeout(() => {
        const msg = messages[index];
        if (window.innerWidth <= 768) {
          showOverlay(msg);
          autoHideTimer = setTimeout(() => {
            hideOverlay();
            restoreHeader();
            showing = false;
          }, 4000);
        } else {
          showBubble(msg);
        }
      }, 400);
      showing = true;
    } else {
      index = (index + 1) % messages.length;
      const nextMsg = messages[index];
      if (window.innerWidth <= 768) {
        overlay.textContent = nextMsg;
        clearAutoHide();
        autoHideTimer = setTimeout(() => {
          hideOverlay();
          restoreHeader();
          showing = false;
        }, 4000);
      } else {
        showBubble(nextMsg);
      }
    }
  });

  // === responsive + cleanup ===
  window.addEventListener("resize", () => {
    if (overlay.classList.contains("active")) {
      hideOverlay();
      restoreHeader();
      showing = false;
      clearAutoHide();
    }
    if (bubble.classList.contains("active") && window.innerWidth > 768) {
      setTimeout(() => showBubble(bubble.textContent), 120);
    }
  });

  window.addEventListener("pagehide", () => {
    clearAutoHide();
    robot.removeEventListener("click", this);
  });
});













