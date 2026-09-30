const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('#navLinks');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const emailButton = document.querySelector('[data-copy-email]');
if (emailButton) {
  emailButton.addEventListener('click', async () => {
    const email = emailButton.dataset.copyEmail;
    try {
      await navigator.clipboard.writeText(email);
      const old = emailButton.textContent;
      emailButton.textContent = 'Email copied ✓';
      setTimeout(() => emailButton.textContent = old, 1800);
    } catch {
      emailButton.textContent = email;
    }
  });
}
