// js/social.js

function updateViewerCount() {
    // Read or initialize count
    let count = parseInt(localStorage.getItem('viewerCount') || '0', 10);
  
    // Bump by 0–1 for demo
    count += Math.floor(Math.random() * 2);
  
    // Persist and display
    localStorage.setItem('viewerCount', count);
    const el = document.getElementById('viewer-count');
    if (el) el.textContent = `${count} people currently viewing`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    updateViewerCount();
    setInterval(updateViewerCount, 30_000); // every 30 s
  });
  