// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 1) Hero Section Entrance
gsap.from("#hero h1", {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power2.out"
});
gsap.from("#hero p", {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power2.out",
  delay: 0.3
});

// 2) Fade‑in nav links
gsap.from("nav.main-nav a", {
  duration: 0.6,
  y: -10,
  opacity: 0,
  ease: "power2.out",
  stagger: 0.1,
  delay: 0.5
});

// 3) Scroll‑triggered project‑card animations
gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 100,
      duration: 0.6,
      ease: "power2.out",
      delay: i * 0.2
    });
});

// Touch swipe gesture for .projects-grid
const grid = document.querySelector('.projects-grid');

if (grid) {
  let startX = 0;
  let currentScroll = 0;

  grid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentScroll = grid.scrollLeft;
  });

  grid.addEventListener('touchmove', (e) => {
    const deltaX = e.touches[0].clientX - startX;
    grid.scrollLeft = currentScroll - deltaX;
  });
}

// Refresh ScrollTrigger on load and resize (to fix layout shift issues)
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});
  