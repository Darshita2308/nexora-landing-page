const servicesButton = document.getElementById('servicesButton');
const servicesMenu = document.getElementById('servicesMenu');
const yearSpan = document.getElementById('year');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('siteNav');
const navItems = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');

if (servicesButton && servicesMenu) {
  servicesButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isExpanded = servicesButton.getAttribute('aria-expanded') === 'true';
    servicesButton.setAttribute('aria-expanded', String(!isExpanded));
    servicesMenu.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!servicesMenu.contains(event.target) && !servicesButton.contains(event.target)) {
      servicesMenu.classList.remove('show');
      servicesButton.setAttribute('aria-expanded', 'false');
    }
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('menu-open');
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! We\'ll contact you soon.');
    contactForm.reset();
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const isActive = link.dataset.section === entry.target.id;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

