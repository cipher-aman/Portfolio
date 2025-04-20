// Enhanced social.js

// 1) Simulate current viewers with more realistic behavior
function updateViewerCount() {
  // Read or initialize count
  let count = parseInt(localStorage.getItem('viewerCount') || '0', 10);
  
  // More realistic viewer simulation
  const time = new Date();
  const hour = time.getHours();
  
  // More viewers during business hours, fewer at night
  let modifierByTime = 1;
  if (hour >= 9 && hour <= 17) modifierByTime = 1.5;
  if (hour >= 22 || hour <= 5) modifierByTime = 0.5;
  
  // Random fluctuation that's more realistic
  const randomChange = Math.random() > 0.7 ? 
      Math.floor(Math.random() * 3 * modifierByTime) : 
      -Math.floor(Math.random() * 2 * modifierByTime);
      
  // Ensure count stays reasonable
  count = Math.max(1, count + randomChange);
  if (count > 20) count = Math.floor(count * 0.95); // Decay large numbers

  // Persist and display
  localStorage.setItem('viewerCount', count);
  const el = document.getElementById('viewer-count');
  if (el) el.textContent = `${count} people currently viewing`;
  
  // Add simulated user activity
  updateRecentVisitors();
}

// 2) Simulated recent visitor activity
function updateRecentVisitors() {
  const names = [
      'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 
      'Riley', 'Quinn', 'Avery', 'Jamie', 'Blake'
  ];
  
  // Create or update recent visitors list
  let visitors = JSON.parse(localStorage.getItem('recentVisitors') || '[]');
  
  // 20% chance to add a new visitor
  if (Math.random() > 0.8) {
      const newVisitor = {
          name: names[Math.floor(Math.random() * names.length)],
          time: new Date().getTime()
      };
      
      // Add to start, limit to 5 visitors
      visitors.unshift(newVisitor);
      if (visitors.length > 5) visitors.pop();
      
      localStorage.setItem('recentVisitors', JSON.stringify(visitors));
  }
  
  // Display recent visitors
  displayRecentVisitors(visitors);
}

// 3) Display recent visitors in the UI
function displayRecentVisitors(visitors) {
  const container = document.getElementById('recent-visitors');
  if (!container) return;
  
  container.innerHTML = '<h4>Recent Visitors</h4>';
  
  if (visitors.length === 0) {
      container.innerHTML += '<p>No recent visitors</p>';
      return;
  }
  
  const visitorList = document.createElement('ul');
  visitorList.className = 'visitor-list';
  
  visitors.forEach(visitor => {
      const timeAgo = formatTimeAgo(visitor.time);
      const li = document.createElement('li');
      li.className = 'visitor-item';
      li.innerHTML = `
          <span class="visitor-name">${visitor.name}</span>
          <span class="visitor-time">${timeAgo}</span>
      `;
      visitorList.appendChild(li);
  });
  
  container.appendChild(visitorList);
}

// Helper function to format time
function formatTimeAgo(timestamp) {
  const now = new Date().getTime();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
}

// 4) Handle form submission and show testimonials
function setupSocialInteractions() {
  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Show success message
          const formNote = contactForm.querySelector('.form-note');
          formNote.textContent = 'Message sent! (Demo only - no actual submission)';
          formNote.style.color = 'var(--accent-primary)';
          
          // Reset form
          setTimeout(() => {
              contactForm.reset();
              formNote.textContent = '* This form is for demo purposes.';
              formNote.style.color = '';
          }, 3000);
      });
  }
  
  // Add testimonials section
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
      // Create testimonials container
      const testimonialContainer = document.createElement('div');
      testimonialContainer.className = 'testimonials-container';
      testimonialContainer.innerHTML = `
          <h3>What Others Say</h3>
          <div class="testimonials-grid">
              <div class="testimonial">
                  <p>"This portfolio showcases exceptional talent and creativity!"</p>
                  <cite>- Design Professor</cite>
              </div>
              <div class="testimonial">
                  <p>"The multimodal interactions really bring this portfolio to life."</p>
                  <cite>- UX Designer</cite>
              </div>
              <div class="testimonial">
                  <p>"Impressive context-aware features that adapt to the user."</p>
                  <cite>- Tech Recruiter</cite>
              </div>
          </div>
      `;
      
      // Add recent visitors
      const recentVisitors = document.createElement('div');
      recentVisitors.id = 'recent-visitors';
      recentVisitors.className = 'recent-visitors';
      
      // Insert elements
      projectsSection.appendChild(testimonialContainer);
      projectsSection.appendChild(recentVisitors);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateViewerCount();
  setupSocialInteractions();
  
  // Update view count every 30 seconds
  setInterval(updateViewerCount, 30000);
});