// Menu mobile
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
}

// Apparition au défilement
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Année du pied de page
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Présélection du service via ?service=
const select = document.querySelector('#service');
if (select) {
  try {
    const s = new URLSearchParams(location.search).get('service');
    if (s) select.value = s;
  } catch (e) {}
}

// Formulaire de contact (FormSubmit)
const form = document.querySelector('#contact-form');
if (form) {
  const msg = document.querySelector('#form-msg');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Envoi en cours…';
    msg.className = 'form-msg';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('send');
      form.reset();
      msg.className = 'form-msg ok';
      msg.textContent = 'Merci, votre message est bien parti. Réponse sous 24 h ouvrées.';
    } catch (e) {
      msg.className = 'form-msg err';
      msg.textContent = "L'envoi n'a pas fonctionné. Écrivez directement à servicesmjpm@gmail.com.";
    }
    btn.disabled = false; btn.textContent = 'Envoyer le message';
  });
}

// Galerie : agrandir une photo
const gal = document.querySelectorAll('.gallery a');
if (gal.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button aria-label="Fermer">×</button><img alt="">';
  document.body.appendChild(lb);
  const big = lb.querySelector('img');
  gal.forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    big.src = a.getAttribute('href');
    big.alt = a.querySelector('img').alt;
    lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
}
