// Año dinámico
document.getElementById('y').textContent = new Date().getFullYear();

// Toggle tema con persistencia
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Reveal on scroll (IntersectionObserver)
const revealGroups = document.querySelectorAll('.reveal, .about, .contact');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const targets = e.target.classList.contains('reveal')
        ? e.target.children
        : [e.target];
      [...targets].forEach((el, i) => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 500, delay: i * 50, easing: 'cubic-bezier(.2,.6,.2,1)', fill: 'forwards' }
        );
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealGroups.forEach(g => io.observe(g));

// “Magnetic” hover en botones principales
const magnets = document.querySelectorAll('.magnetic');
magnets.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});

// Accesibilidad: pref. reduce motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  io.disconnect();
  document.querySelectorAll('*').forEach(el => el.style.scrollBehavior = 'auto');
}
