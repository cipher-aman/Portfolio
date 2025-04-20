// js/context-aware.js

// 1) Time‑based theming
function setThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
}
  
// 2) Simple device detection
function detectDevice() {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    document.body.classList.add(isMobile ? 'mobile' : 'desktop');
}
  
// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setThemeByTime();
    detectDevice();
});
  