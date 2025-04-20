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
  
// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
  
    // If no click/scroll in first 7s, show tip
    let interacted = false;
    ['click', 'scroll', 'touchstart'].forEach(evt =>
      document.addEventListener(evt, () => (interacted = true))
    );
    setTimeout(() => { if (!interacted) showNavTip(); }, 7000);
});
