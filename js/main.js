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
// Enhanced 3D card transform with depth and lighting effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / -15;
    
    // Apply transform with enhanced perspective
    card.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      
    // Dynamic shadow based on position
    const shadowX = (centerX - x) / 20;
    const shadowY = (centerY - y) / 20;
    card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.2)`;
    
    // Add highlight effect based on mouse position
    const shine = document.createElement('div');
    shine.style.position = 'absolute';
    shine.style.top = '0';
    shine.style.left = '0';
    shine.style.right = '0';
    shine.style.bottom = '0';
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 80%)`;
    shine.style.pointerEvents = 'none';
    
    // Remove any existing highlights and add the new one
    card.querySelectorAll('.card-highlight').forEach(el => el.remove());
    shine.classList.add('card-highlight');
    card.appendChild(shine);
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.boxShadow = '8px 8px 16px #080808, -8px -8px 16px #161616';
    card.querySelectorAll('.card-highlight').forEach(el => el.remove());
  });
});