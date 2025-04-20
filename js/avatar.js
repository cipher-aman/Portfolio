// js/avatar.js

// 1) Load the Lottie animation
const avatarAnim = lottie.loadAnimation({
    container: document.getElementById('assistant'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/lottie/avatar.json'  // ensure you place your avatar.json here
});
  
// 2) Time‑based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
  
    if (hour >= 5 && hour < 12) greeting = 'Good morning!';
    else if (hour < 18) greeting = 'Good afternoon!';
    else greeting = 'Good evening!';
  
    document.getElementById('greeting-text').textContent =
      `${greeting} Welcome to my portfolio.`;
}
  
// 3) Navigation assistance
function showNavTip() {
  const greetingEl = document.getElementById('greeting-text');
  const tips = [
      'Try clicking on the navigation links above!',
      'Scroll down to see my projects!',
      'Feel free to contact me using the form below!'
  ];
  
  // Select a random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  
  // Show the tip
  if (greetingEl) {
      greetingEl.textContent = randomTip;
      
      // Reset to greeting after 5 seconds
      setTimeout(() => {
          updateGreeting();
      }, 5000);
  }
}

// 4) User interaction tracking (simulated affective computing)
function trackUserInteraction() {
  // Variables to track user behavior
  let clickCount = 0;
  let scrollCount = 0;
  let lastInteraction = Date.now();
  
  // Track clicks
  document.addEventListener('click', () => {
      clickCount++;
      lastInteraction = Date.now();
      updateAvatarMood();
  });
  
  // Track scrolls
  document.addEventListener('scroll', () => {
      scrollCount++;
      lastInteraction = Date.now();
      updateAvatarMood();
  });
  
  // Check for inactivity
  setInterval(() => {
      const inactiveTime = Date.now() - lastInteraction;
      
      // If inactive for more than 30 seconds
      if (inactiveTime > 30000) {
          // Show a tip
          showNavTip();
      }
  }, 10000);
  
  // Update avatar based on user interaction
  function updateAvatarMood() {
      const assistant = document.getElementById('assistant');
      
      if (clickCount > 10) {
          // User is very active - show happy avatar
          assistant.setAttribute('data-mood', 'happy');
          // You could modify the animation here if your Lottie supports it
          
      } else if (clickCount > 5) {
          // User is moderately active
          assistant.setAttribute('data-mood', 'neutral');
      } else {
          // User is still new
          assistant.setAttribute('data-mood', 'curious');
      }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateGreeting();
  trackUserInteraction();

  // If no click/scroll in first 7s, show tip
  let interacted = false;
  ['click', 'scroll', 'touchstart'].forEach(evt =>
    document.addEventListener(evt, () => (interacted = true))
  );
  setTimeout(() => { if (!interacted) showNavTip(); }, 7000);
  
  // Show navigation tips every 60 seconds if user is still on the page
  setInterval(() => {
      if (document.visibilityState === 'visible') {
          showNavTip();
      }
  }, 60000);
});
