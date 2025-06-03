// lightbox.js

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[data-lightbox]');
  const images = Array.from(links).map(link => ({
    src: link.getAttribute('href'),
    caption: link.getAttribute('data-title') || link.querySelector('img')?.alt || '',
    link
  }));

  let current = 0;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-image">
      <div class="lightbox-caption"></div>
      <span class="lightbox-nav lightbox-prev">&#10094;</span>
      <span class="lightbox-nav lightbox-next">&#10095;</span>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.style.display = 'none';

  const img = overlay.querySelector('img');
  const captionBox = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const contentBox = overlay.querySelector('.lightbox-content');

  function show(index) {
    current = index;
    img.src = images[current].src;
    captionBox.textContent = images[current].caption || '';
    overlay.style.display = 'flex';
  }

  function close() {
    overlay.style.display = 'none';
  }

  function prev() {
    show((current - 1 + images.length) % images.length);
  }

  function next() {
    show((current + 1) % images.length);
  }

  links.forEach((link, i) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      show(i);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Close when clicking outside the image/content
  overlay.addEventListener('click', (e) => {
    if (!contentBox.contains(e.target)) {
      close();
    }
  });

  // Optional: keyboard support (← and →)
  document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') close();
    }
  });
});

