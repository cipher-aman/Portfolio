// js/social.js

// Handle contact form submission only
function setupSocialInteractions() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const formNote = contactForm.querySelector('.form-note');
    if (formNote) {
      formNote.textContent = 'Message sent! (Demo only – no actual submission)';
      formNote.style.color = 'var(--accent-primary)';
    }
    
    // Reset form after a short delay
    setTimeout(() => {
      contactForm.reset();
      if (formNote) {
        formNote.textContent = '* This form is for demo purposes.';
        formNote.style.color = '';
      }
    }, 3000);
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', setupSocialInteractions);
