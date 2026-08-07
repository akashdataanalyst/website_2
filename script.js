// =========================================================
// 1. Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// On mobile, tapping a "has-dropdown" link toggles its submenu instead of navigating
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 980) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Close mobile nav after clicking a real link
document.querySelectorAll('.main-nav a:not(.has-dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// 2. Hero "cell grid" — animated spreadsheet-cell background
// =========================================================
const cellGrid = document.getElementById('cellGrid');
const TOTAL_CELLS = 64;
const palette = ['#0F3576', '#123E8C', '#164AA6', '#1D5FD6'];

for (let i = 0; i < TOTAL_CELLS; i++) {
  const cell = document.createElement('div');
  cell.style.background = palette[Math.floor(Math.random() * palette.length)];
  cell.style.opacity = '0.5';
  cell.style.transition = 'opacity .6s ease, background .6s ease';
  cellGrid.appendChild(cell);
}

function pulseRandomCells() {
  const cells = cellGrid.children;
  const count = 6;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * cells.length);
    const cell = cells[idx];
    cell.style.opacity = '1';
    cell.style.background = '#4C86F7';
    setTimeout(() => {
      cell.style.opacity = '0.5';
      cell.style.background = palette[Math.floor(Math.random() * palette.length)];
    }, 700);
  }
}
setInterval(pulseRandomCells, 900);

// Respect reduced-motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clearInterval(pulseRandomCells);
}

// =========================================================
// 3. Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// 4. Contact form -> Google Apps Script -> Google Sheet
// =========================================================
// STEP 1: Deploy the Apps Script in /google-apps-script/Code.gs as a Web App
//         (see README.md for exact steps).
// STEP 2: Paste the deployment URL below.
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR')) {
    statusEl.textContent = 'Form is not connected yet — add your Google Apps Script URL in script.js.';
    statusEl.className = 'form-status error';
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.submittedAt = new Date().toISOString();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script web apps don't return CORS headers by default
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // no-cors mode means we can't read the response, so we optimistically assume success
    statusEl.textContent = 'Thanks! We\'ve received your query and will reply within one business day.';
    statusEl.className = 'form-status success';
    form.reset();
  } catch (err) {
    statusEl.textContent = 'Something went wrong. Please email us directly at gridcellsolutions@gmail.com.';
    statusEl.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Query';
  }
});
