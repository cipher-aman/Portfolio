document.addEventListener('DOMContentLoaded', () => {
  if (typeof Howl === 'undefined') {
    console.error('⚠️ Howler.js not found. Make sure you included the CDN <script> before audio.js');
    return;
  }

  const clickSound = new Howl({
    src: ['assets/audio/click.mp3'],
    volume: 0.5
  });

  // Unlock audio context after user interaction
  function unlockAudio() {
    clickSound.play();
    clickSound.stop();
    window.removeEventListener('click', unlockAudio);
  }
  window.addEventListener('click', unlockAudio, { once: true });

  // Play sound on any link or button click
  document.body.addEventListener('click', (e) => {
    const isClickable = e.target.closest('a, button');
    if (isClickable) {
      clickSound.play();
    }
  });
});
