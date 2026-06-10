const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('#themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('paigos-theme');
if (savedTheme) body.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  const icon = themeToggle.querySelector('i');
  const syncIcon = () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };
  syncIcon();
  themeToggle.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    localStorage.setItem('paigos-theme', next);
    syncIcon();
  });
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
    });
  });
}, { rootMargin: '-40% 0px -45% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const bookingForm = document.querySelector('#bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name')?.value?.trim();
    const service = document.querySelector('#service')?.value;
    const date = document.querySelector('#date')?.value;
    const time = document.querySelector('#time')?.value;

    if (!name || !service || !date || !time) return;

    const message = [
      'Hello Paigos Barbershop, I would like to book:',
      `Name: ${name}`,
      `Service: ${service}`,
      `Date: ${date}`,
      `Time: ${time}`
    ].join('\n');

    const target = `https://www.facebook.com/messages/t/100083240225588?text=${encodeURIComponent(message)}`;
    window.open(target, '_blank', 'noopener');
  });
}

const galleryImages = [...document.querySelectorAll('.gallery-item img')];
if (galleryImages.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image viewer">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <img alt="" />
    <p></p>
  `;
  document.body.appendChild(dialog);

  const lightboxImg = dialog.querySelector('img');
  const lightboxCaption = dialog.querySelector('p');
  const closeBtn = dialog.querySelector('button');

  galleryImages.forEach((image) => {
    image.closest('.gallery-item')?.setAttribute('tabindex', '0');
    image.closest('.gallery-item')?.setAttribute('role', 'button');
    image.closest('.gallery-item')?.setAttribute('aria-label', `Open ${image.alt}`);

    const openImage = () => {
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightboxCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
      dialog.showModal();
    };

    image.closest('.gallery-item')?.addEventListener('click', openImage);
    image.closest('.gallery-item')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage();
      }
    });
  });

  closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
