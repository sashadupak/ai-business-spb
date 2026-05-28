/**
 * AI Business SPb — Rendering & interactivity
 */

/* ─── UTILS ─── */
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

function imgEl(src, alt, css) {
  const img = document.createElement('img');
  img.src = encodeURI(src);
  img.alt = alt || '';
  if (css) img.style.cssText = css;
  return img;
}

/* ─── TEAM AVATAR ─── */
function teamAvatar(member) {
  const colorMap = { purple: 'av1', cyan: 'av2', amber: 'av3', green: 'av4', red: 'av5' };
  const cls = colorMap[member.color] || 'av1';
  const wrap = el('div', `tav ${cls}`, member.initials);
  const img = imgEl(member.photo, member.name, 'width:100%; height:100%; object-fit:cover; border-radius:50%;');
  img.onload = () => { wrap.innerHTML = ''; wrap.appendChild(img); };
  return wrap;
}

/* ─── RENDER: HERO ─── */
function renderHero() {
  const d = SITE_DATA.hero;

  const badgeEl = $('hero-badge');
  if (badgeEl) badgeEl.textContent = d.badge;

  const titleEl = $('hero-title');
  if (titleEl) {
    const lines = d.title;
    titleEl.innerHTML = lines.map((line, i) =>
      i === lines.length - 1 ? `<span class="ac">${line}</span>` : line
    ).join('<br>');
  }

  const subEl = $('hero-sub');
  if (subEl) subEl.textContent = d.subtitle;

  const ctasEl = $('hero-ctas');
  if (ctasEl) {
    ctasEl.innerHTML = `
      <a href="${d.cta_primary.href}" class="btn btn-p">${d.cta_primary.text}</a>
      <a href="${d.cta_secondary.href}" class="btn btn-o">${d.cta_secondary.text}</a>
    `;
  }

  const statsEl = $('hero-stats');
  if (statsEl) d.stats.forEach(s => {
    statsEl.insertAdjacentHTML('beforeend', `
      <div>
        <div class="hs-num">${s.num}</div>
        <div class="hs-lbl">${s.label}</div>
      </div>
    `);
  });
}

/* ─── RENDER: VALUE ─── */
function renderValue() {
  const root = $('value-grid');
  if (!root) return;
  const colorMap = { purple: 'ic-p', cyan: 'ic-c', amber: 'ic-a', green: 'ic-g' };
  SITE_DATA.value.forEach(v => {
    root.insertAdjacentHTML('beforeend', `
      <div class="vi">
        <div class="vi-ico ${colorMap[v.color] || 'ic-p'}">${v.icon}</div>
        <h3>${v.title}</h3>
        <p>${v.text}</p>
      </div>
    `);
  });
}

/* ─── RENDER: HACKATHON STATS ─── */
function renderHackathonStats() {
  const titleEl = $('hackathon-title');
  if (titleEl) titleEl.textContent = SITE_DATA.hackathon.title;

  const root = $('hackathon-big3');
  if (!root) return;
  SITE_DATA.hackathon.stats.forEach(s => {
    root.insertAdjacentHTML('beforeend', `
      <div class="bstat">
        <div class="bnum ${s.color[0]}">${s.num}</div>
        <div class="blbl">${s.label.replace('\n', '<br>')}</div>
      </div>
    `);
  });
}

/* ─── RENDER: WINNER ─── */
function renderWinner() {
  const w = SITE_DATA.winner;

  const nameEl = $('winner-name');
  if (nameEl) nameEl.textContent = w.name;

  const descEl = $('winner-desc');
  if (descEl) descEl.textContent = w.description;

  const photoEl = $('winner-photo-img');
  if (photoEl && w.photo) photoEl.src = encodeURI(w.photo);

  const tagsEl = $('winner-tags');
  if (tagsEl) w.tags.forEach(t => tagsEl.insertAdjacentHTML('beforeend', `<span class="ctag">${t}</span>`));
}

/* ─── RENDER: CASES ─── */
function renderCases() {
  const root = $('cases-grid');
  if (!root) return;
  SITE_DATA.cases.forEach(c => {
    const tags = c.tags.split('·').map(t => t.trim()).filter(Boolean);
    const tagsHtml = tags.map(t => `<span class="ctag">${t}</span>`).join('');
    root.insertAdjacentHTML('beforeend', `
      <div class="ccard">
        <div class="cco">${c.company}</div>
        <h3 class="ctitle">${c.title}</h3>
        <p class="cdesc">${c.description}</p>
        <div class="ctags-row">${tagsHtml}</div>
      </div>
    `);
  });
}

/* ─── RENDER: PARTICIPANTS ─── */
function renderParticipants() {
  const barsEl = $('role-bars');
  const statEl = $('status-grid');
  const expEl  = $('experience-tags');
  const unisEl = $('unis-row');
  const d = SITE_DATA.participants;

  if (barsEl) d.roles.forEach(r => {
    barsEl.insertAdjacentHTML('beforeend', `
      <div>
        <div class="pbh"><span class="pbl">${r.label}</span><span class="pbp">${r.pct}%</span></div>
        <div class="pbtrack"><div class="pbfill" data-w="${r.pct}"></div></div>
      </div>
    `);
  });

  if (statEl) d.statuses.forEach(s => {
    statEl.insertAdjacentHTML('beforeend', `
      <div class="si">
        <div class="sdot" style="background:${s.color};"></div>
        <div><div class="slbl">${s.label}</div>${s.sub ? `<div class="ssub">${s.sub}</div>` : ''}</div>
        <div class="spct" style="color:${s.color};">${s.pct}</div>
      </div>
    `);
  });

  const colorVar  = { purple: 'rgba(66,34,147,.1)',  cyan: 'rgba(107,79,200,.1)',  amber: 'rgba(192,120,0,.1)',  none: 'var(--bg-el)' };
  const borderVar = { purple: 'rgba(66,34,147,.2)',  cyan: 'rgba(107,79,200,.2)',  amber: 'rgba(192,120,0,.2)',  none: 'var(--border)' };
  const textVar   = { purple: 'var(--purple)',       cyan: 'var(--purple-l)',       amber: 'var(--amber)',        none: 'var(--text2)' };
  if (expEl) d.experience.forEach(e => {
    expEl.insertAdjacentHTML('beforeend', `
      <span class="pvtag" style="background:${colorVar[e.color]};border-color:${borderVar[e.color]};color:${textVar[e.color]};">${e.label}</span>
    `);
  });

  if (unisEl) d.universities.forEach(u => {
    unisEl.insertAdjacentHTML('beforeend', `<span class="unitag">${u}</span>`);
  });
}

/* ─── RENDER: TEAM ─── */
function renderTeam() {
  const root = $('team-grid');
  if (!root) return;
  SITE_DATA.team.forEach(m => {
    const card = el('div', 'tcard');
    card.appendChild(teamAvatar(m));
    card.insertAdjacentHTML('beforeend', `
      <div class="tname">${m.name}</div>
      <div class="trole">${m.role}</div>
      <div class="tdesc">${m.desc}</div>
    `);
    root.appendChild(card);
  });
}

/* ─── RENDER: MEDIA ─── */
function renderMedia() {
  const groups = [
    { id: 'media-dev', items: SITE_DATA.media.developers },
    { id: 'media-biz', items: SITE_DATA.media.business },
    { id: 'media-agg', items: SITE_DATA.media.aggregators },
  ];
  groups.forEach(({ id, items }) => {
    const root = $(id);
    if (!root) return;
    root.classList.add('cols-' + items.length);
    items.forEach(m => {
      const a = el('a', 'mitem');
      a.href = m.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `<div class="mname">${m.name}</div>`;
      root.appendChild(a);
    });
  });
}

/* ─── RENDER: BUSINESS PARTNERS (marquee) ─── */
function renderBusinessPartners() {
  const root = $('partners-logos');
  if (!root) return;
  function createItem(p) {
    const div = el('div', 'partner-item');
    const logoBox = el('div', 'partner-logo-box');
    const img = imgEl(p.logo, p.name);
    if (p.logoScale) img.style.transform = `scale(${p.logoScale})`;
    const fallback = el('span', 'partner-item-name', p.name);
    img.onerror = () => img.replaceWith(fallback);
    logoBox.appendChild(img);
    div.appendChild(logoBox);
    div.insertAdjacentHTML('beforeend', `<span class="partner-item-desc">${p.desc}</span>`);
    return div;
  }
  const items = SITE_DATA.business_partners;
  items.forEach(p => root.appendChild(createItem(p)));
  items.forEach(p => root.appendChild(createItem(p)));
}

/* ─── RENDER: PARTNER REVIEWS ─── */
function renderPartnerReviews() {
  const d = SITE_DATA.reviews_partners;

  const valsEl = $('partner-values');
  if (valsEl) {
    const track = el('div', 'pvals-track');
    const tags = d.values.map(v => `<span class="pvtag">${v}</span>`).join('');
    track.innerHTML = tags + tags;
    valsEl.appendChild(track);
  }

  const quotesEl = $('partner-quotes');
  if (quotesEl) d.quotes.forEach(q => {
    quotesEl.insertAdjacentHTML('beforeend', `
      <div class="qcard">
        <div class="qm">"</div>
        <p class="qt">${q.text}</p>
        <div class="qa">${q.author} <span class="qr">· ${q.role}</span></div>
      </div>
    `);
  });
}

/* ─── RENDER: PARTICIPANT REVIEWS ─── */
function renderParticipantReviews() {
  const d = SITE_DATA.reviews_participants;
  const colorMap = { green: 'sg', cyan: 'sc', amber: 'sa', red: 'sr' };

  const scoresEl = $('participant-scores');
  if (scoresEl) d.scores.forEach(s => {
    scoresEl.insertAdjacentHTML('beforeend', `
      <div class="sitem">
        <span class="slabel">${s.label}</span>
        <span class="snum ${colorMap[s.tier]}">${s.score}</span>
      </div>
    `);
  });

  const quotesEl = $('participant-quotes');
  if (quotesEl) d.quotes.forEach(q => {
    quotesEl.insertAdjacentHTML('beforeend', `
      <div class="qcard">
        <div class="qm">"</div>
        <p class="qt">${q}</p>
        <div class="qa">Участник хакатона</div>
      </div>
    `);
  });
}

/* ─── RENDER: GUEST REVIEW ─── */
function renderGuestReview() {
  const g = SITE_DATA.guest_review;
  const textEl = $('guest-text');
  const authEl = $('guest-author');
  if (textEl) textEl.textContent = g.text;
  if (authEl) authEl.innerHTML = `${g.author} <span class="qr">· ${g.role}</span>`;
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      e.target.querySelectorAll('.pbfill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      if (e.target.classList.contains('rev-stagger')) {
        Array.from(e.target.children).forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(18px)';
          setTimeout(() => {
            child.style.transition = 'opacity .5s ease, transform .5s ease';
            child.style.opacity = '1';
            child.style.transform = 'none';
          }, i * 80);
        });
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rev').forEach(r => io.observe(r));
}

/* ─── NAV SCROLL ─── */
function initNav() {
  const nav = document.querySelector('nav');
  function update() {
    const y = window.scrollY;
    nav.style.background = y > 60 ? 'rgba(10,6,18,.92)' : 'rgba(10,6,18,.6)';
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ─── FORM ─── */
function initForm() {
  const form = $('contact-form');
  const success = $('form-success');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const action = SITE_DATA.contact.form_action;
    if (action) {
      fetch(action, { method: 'POST', body: new FormData(form) })
        .then(() => { form.style.display = 'none'; success.style.display = 'block'; })
        .catch(() => { form.style.display = 'none'; success.style.display = 'block'; });
    } else {
      form.style.display = 'none';
      success.style.display = 'block';
    }
  });
}

/* ─── COUNTDOWN TIMER ─── */
function initCountdown() {
  const target = new Date('2026-06-01T12:00:00').getTime();
  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const de = $('cd-days'), he = $('cd-hours'), me = $('cd-minutes'), se = $('cd-seconds');
    if (de) de.textContent = pad(d);
    if (he) he.textContent = pad(h);
    if (me) me.textContent = pad(m);
    if (se) se.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

/* ─── SIMPLEX NOISE (compact) ─── */
const Noise = (function() {
  const G2 = (3 - Math.sqrt(3)) / 6;
  const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  const p = []; for (let i = 0; i < 256; i++) p[i] = (Math.random() * 256) | 0;
  const perm = []; for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return function(x, y) {
    const s = (x + y) * 0.5 * (Math.sqrt(3) - 1);
    const i = Math.floor(x + s), j = Math.floor(y + s);
    const t = (i + j) * G2;
    const x0 = x - (i - t), y0 = y - (j - t);
    const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    let n = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { t0 *= t0; const g = grad[perm[ii + perm[jj]] % 8]; n += t0 * t0 * (g[0] * x0 + g[1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { t1 *= t1; const g = grad[perm[ii + i1 + perm[jj + j1]] % 8]; n += t1 * t1 * (g[0] * x1 + g[1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { t2 *= t2; const g = grad[perm[ii + 1 + perm[jj + 1]] % 8]; n += t2 * t2 * (g[0] * x2 + g[1] * y2); }
    return 70 * n;
  };
})();

/* ─── SITE-WIDE CANVAS — 3D terrain, mouse/scroll reactive ─── */
function initSiteCanvas() {
  const canvas = document.getElementById('site-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  const COLS = 60, ROWS = 40;
  const SPACING = 24;
  const PERSPECTIVE = 420;
  const CAMERA_Y = -200;
  const CAMERA_Z = 300;

  let mouseX = 0, mouseY = 0;
  let scrollY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  document.addEventListener('mousemove', e => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function project(x3, y3, z3, tiltY) {
    const camOffX = mouseX * 40;
    const cy = y3 - CAMERA_Y + mouseY * 20 + (tiltY || 0);
    const cz = z3 - CAMERA_Z;
    const scale = PERSPECTIVE / (PERSPECTIVE + cz);
    return { x: w / 2 + (x3 + camOffX) * scale, y: h * 0.55 + cy * scale, s: scale };
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.003;

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    const cx = (COLS - 1) * SPACING / 2;
    const camTiltY = scrollY * 0.02;

    for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLS - 1; col++) {
        const nx = col * 0.07;
        const ny = row * 0.07;
        const n1 = Noise(nx + t * 0.7, ny + t * 0.3)
                  + 0.4 * Noise(nx * 2.5 + t * 1.1 + 50, ny * 2.5 + t * 0.6);
        const n2 = Noise((col + 1) * 0.07 + t * 0.7, ny + t * 0.3)
                  + 0.4 * Noise((col + 1) * 0.07 * 2.5 + t * 1.1 + 50, ny * 2.5 + t * 0.6);

        const x1 = col * SPACING - cx;
        const z1 = row * SPACING;
        const x2 = (col + 1) * SPACING - cx;

        const h1 = n1 * 30;
        const h2 = n2 * 30;

        const p1 = project(x1, h1, z1, camTiltY);
        const p2 = project(x2, h2, z1, camTiltY);

        if (p1.s < 0.05 || p2.s < 0.05) continue;

        const intensity = Math.max(0, Math.min(1, (n1 / 1.75 + 1) / 2));
        const fade = Math.max(0, 1 - row / ROWS);
        const alpha = fade * 0.45 * p1.s;

        const r = Math.round(66 + intensity * 100);
        const g = Math.round(34 + intensity * 65);
        const b = Math.round(147 + intensity * 85);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = Math.max(0.4, p1.s * 1.0);
        ctx.stroke();

        if (row < ROWS - 1) {
          const nz = Noise(nx + t * 0.7, (row + 1) * 0.07 + t * 0.3)
                    + 0.4 * Noise(nx * 2.5 + t * 1.1 + 50, (row + 1) * 0.07 * 2.5 + t * 0.6);
          const z3 = (row + 1) * SPACING;
          const h3 = nz * 30;
          const p3 = project(x1, h3, z3, camTiltY);
          if (p3.s > 0.05) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.6})`;
            ctx.lineWidth = Math.max(0.3, p1.s * 0.7);
            ctx.stroke();
          }
        }

        if (intensity > 0.72 && Math.random() < 0.01) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.s * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155,130,224,${alpha * 0.7})`;
          ctx.fill();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

/* ─── CINEMATIC SCROLL SYSTEM ─── */
function initCinematicScroll() {
  const sections = document.querySelectorAll('section:not(#hero)');

  function lerp(a, b, t) { return a + (b - a) * t; }

  function getProgress(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const countersAnimated = new Set();

  function animateCounters() {
    document.querySelectorAll('.bnum').forEach(el => {
      if (countersAnimated.has(el)) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85) {
        countersAnimated.add(el);
        const raw = el.textContent;
        const suffix = raw.replace(/[\d.,]+/, '');
        const numStr = raw.replace(/[^\d.,]/g, '');
        const target = parseFloat(numStr.replace(',', '.'));
        if (isNaN(target)) return;
        const isFloat = numStr.includes('.') || numStr.includes(',');
        const duration = 1500;
        const start = performance.now();
        function step(now) {
          const p = Math.min(1, (now - start) / duration);
          const ep = easeOut(p);
          const val = ep * target;
          el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  }

  function tick() {
    sections.forEach(sec => {
      const p = getProgress(sec);
      if (p <= 0 || p >= 1) return;

      const entry = Math.min(1, p * 3.5);
      const ep = easeOut(entry);

      const cards = sec.querySelectorAll('.ccard, .tcard, .infra-card, .qcard, .bstat');
      cards.forEach((card, i) => {
        const delay = i * 0.06;
        const cp = Math.max(0, Math.min(1, (entry - delay) * 1.8));
        const cep = easeOut(cp);
        card.style.opacity = cep;
        card.style.transform = `translateY(${(1 - cep) * 40}px) scale(${lerp(0.92, 1, cep)})`;
      });

      const headings = sec.querySelectorAll('h2.st');
      headings.forEach(h => {
        const hp = easeOut(Math.min(1, entry * 2));
        h.style.opacity = hp;
        h.style.transform = `translateY(${(1 - hp) * 30}px)`;
        h.style.filter = `blur(${(1 - hp) * 4}px)`;
      });

      const labels = sec.querySelectorAll('.label');
      labels.forEach(l => {
        const lp = easeOut(Math.min(1, entry * 2.5));
        l.style.opacity = lp;
        l.style.letterSpacing = `${lerp(0.4, 0.13, lp)}em`;
      });
    });

    animateCounters();

    document.querySelectorAll('.ccard, .tcard, .infra-card, .qcard').forEach(card => {
      const cr = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const ratio = Math.max(0, Math.min(1, (vh - cr.top) / (vh + cr.height)));
      const alpha = 0.55 + ratio * 0.2;
      card.style.backgroundColor = `rgba(20,14,40,${alpha.toFixed(3)})`;
    });

    const hero = document.getElementById('hero');
    if (hero) {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      const ratio = Math.min(1, scrollY / heroH);
      const cnt = hero.querySelector('.hero-cnt');
      if (cnt) {
        cnt.style.opacity = 1 - ratio * 1.5;
        cnt.style.transform = `translateY(${ratio * -60}px) scale(${1 - ratio * 0.08})`;
      }
    }

    requestAnimationFrame(tick);
  }

  tick();
}

/* ─── MOBILE NAV ─── */
function initMobileNav() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('nav-mobile-menu');
  const close = document.getElementById('nav-mobile-close');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.add('open'));
  close.addEventListener('click', () => menu.classList.remove('open'));
  menu.addEventListener('click', e => {
    if (e.target === menu) menu.classList.remove('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ─── SCROLL HINTS ─── */
function initScrollHints() {
  document.querySelectorAll('.qgrid, .cgrid, .tgrid, .hs-photo-scroll').forEach(el => {
    if (el.scrollWidth <= el.clientWidth) return;
    const wrap = document.createElement('div');
    wrap.className = 'scroll-hint-wrap';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);
    el.addEventListener('scroll', () => {
      if (el.scrollLeft > 20) wrap.classList.add('scrolled');
      else wrap.classList.remove('scrolled');
    }, { passive: true });
  });
}

/* ─── LOADER ─── */
function initLoader(callback) {
  const loader = document.getElementById('loader');
  if (!loader) { document.body.classList.add('loaded'); callback(); return; }
  function hideLoader() {
    loader.classList.add('done');
    document.body.classList.add('loaded');
    const heroRevs = document.querySelectorAll('#hero .rev');
    heroRevs.forEach((el, i) => {
      setTimeout(() => el.classList.add('on'), i * 200 + 100);
    });
    callback();
    setTimeout(() => loader.remove(), 800);
  }
  window.addEventListener('load', hideLoader);
}

/* ─── CARD GLOW (mouse tracking) ─── */
function initCardGlow() {
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.ccard, .tcard, .infra-card, .qcard');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderValue();
  renderHackathonStats();
  renderWinner();
  renderCases();
  renderParticipants();
  renderTeam();
  renderMedia();
  renderBusinessPartners();
  renderPartnerReviews();
  renderParticipantReviews();
  renderGuestReview();
  initSiteCanvas();
  initNav();
  initForm();
  initMobileNav();
  initCardGlow();

  initLoader(() => {
    initReveal();
    initCinematicScroll();
    initScrollHints();
  });
});
