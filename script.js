const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'Open navigation';
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('.sr-only').textContent = opening ? 'Close navigation' : 'Open navigation';
  navigation.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const shouldOpen = button.getAttribute('aria-expanded') !== 'true';

    document.querySelectorAll('.faq-item button').forEach((otherButton) => {
      const otherAnswer = document.getElementById(otherButton.getAttribute('aria-controls'));
      otherButton.setAttribute('aria-expanded', 'false');
      otherAnswer.hidden = true;
    });

    if (shouldOpen) {
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const contactForm = document.getElementById('contact-form');
const formStatus = contactForm.querySelector('.form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = [...contactForm.querySelectorAll('[required]')];
  let isValid = true;

  requiredFields.forEach((field) => {
    const fieldIsValid = field.checkValidity();
    field.classList.toggle('invalid', !fieldIsValid);
    if (!fieldIsValid) isValid = false;
  });

  formStatus.classList.toggle('error', !isValid);
  formStatus.textContent = isValid
    ? 'Thanks — your form is ready to connect to your preferred inbox before launch.'
    : 'Please complete the required fields and enter a valid email.';

  if (!isValid) requiredFields.find((field) => !field.checkValidity()).focus();
});

contactForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
