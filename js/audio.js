// js/audio.js

const sounds = {
    click: new Howl({
      src: ['assets/audio/click.mp3'],
      volume: 0.5
    })
  };
  
  // Add click sound to nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => sounds.click.play());
  });
  