// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Highlight nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Contact form feedback
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = 'Thank you for your message!';
    form.reset();
    setTimeout(() => {
      formMessage.textContent = '';
    }, 4000);
  });
}

// Project image modal (lightbox)
const galleryImages = document.querySelectorAll('.project-gallery img');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('#image-modal .close-btn');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('active');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modalImg.src = '';
  });
}
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalImg.src = '';
    }
  });
} 