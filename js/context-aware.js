// Enhanced context-aware.js

// 1) Time‑based theming with smoother transitions
function setThemeByTime() {
  const hour = new Date().getHours();
  const body = document.body;
  
  // Add transition for smoother theme changes
  if (!body.style.transition) {
      body.style.transition = 'background-color 1s, color 1s';
  }
  
  if (hour >= 6 && hour < 18) {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
  } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
  }
  
  // Adjust avatar based on time of day
  const assistant = document.getElementById('assistant');
  if (assistant) {
      assistant.setAttribute('data-time', hour >= 6 && hour < 18 ? 'day' : 'night');
  }
}

// 2) Enhanced device detection
function detectDevice() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  const isTablet = /iPad/.test(navigator.userAgent) || 
                  (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document);
  const isLaptop = window.innerWidth >= 1024 && window.innerWidth <= 1366;
  const isDesktop = window.innerWidth > 1366;
  
  // Remove all device classes first
  document.body.classList.remove('mobile', 'tablet', 'laptop', 'desktop');
  
  // Add appropriate device class
  if (isMobile && !isTablet) document.body.classList.add('mobile');
  else if (isTablet) document.body.classList.add('tablet');
  else if (isLaptop) document.body.classList.add('laptop');
  else document.body.classList.add('desktop');
  
  // Adjust layout based on device orientation
  if (window.matchMedia("(orientation: portrait)").matches) {
      document.body.classList.add('portrait');
      document.body.classList.remove('landscape');
  } else {
      document.body.classList.add('landscape');
      document.body.classList.remove('portrait');
  }
}

// 3) Detect user's preferred color scheme
function detectColorScheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.setAttribute('data-prefers-dark', prefersDark ? 'true' : 'false');
}

// 4) Connection speed detection 
function detectConnection() {
  if (navigator.connection) {
      const connection = navigator.connection;
      const type = connection.effectiveType;
      
      // Add data attribute to body
      document.body.setAttribute('data-connection', type);
      
      // Adjust loading strategy based on connection
      if (type === 'slow-2g' || type === '2g') {
          // Disable animations for slow connections
          document.body.classList.add('reduce-motion');
      }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setThemeByTime();
  detectDevice();
  detectColorScheme();
  detectConnection();
  
  // Listen for orientation changes
  window.addEventListener('orientationchange', detectDevice);
  window.addEventListener('resize', detectDevice);
  
  // Update time-based theme every minute
  setInterval(setThemeByTime, 60000);
});