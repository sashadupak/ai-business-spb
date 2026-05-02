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

  const tagsEl = $('winner-tags');
  if (tagsEl) w.tags.forEach(t => tagsEl.insertAdjacentHTML('beforeend', `<span class="ctag">${t}</span>`));
}

/* ─── RENDER: CASES ─── */
function renderCases() {
  const root = $('cases-grid');
  if (!root) return;
  SITE_DATA.cases.forEach(c => {
    root.insertAdjacentHTML('beforeend', `
      <div class="ccard">
        <div class="cco">${c.company}</div>
        <h3 class="ctitle">${c.title}</h3>
        <p class="cdesc">${c.description}</p>
        <span class="ctag">${c.tags}</span>
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

/* ─── RENDER: BUSINESS PARTNERS ─── */
function renderBusinessPartners() {
  const root = $('partners-logos');
  if (!root) return;
  SITE_DATA.business_partners.forEach(p => {
    const div = el('div', 'partner-item');
    const logoBox = el('div', 'partner-logo-box');
    const img = imgEl(p.logo, p.name);
    const fallback = el('span', 'partner-item-name', p.name);
    img.onerror = () => img.replaceWith(fallback);
    logoBox.appendChild(img);
    div.appendChild(logoBox);
    div.insertAdjacentHTML('beforeend', `<span class="partner-item-desc">${p.desc}</span>`);
    root.appendChild(div);
  });
}

/* ─── RENDER: PARTNER REVIEWS ─── */
function renderPartnerReviews() {
  const d = SITE_DATA.reviews_partners;

  const valsEl = $('partner-values');
  if (valsEl) d.values.forEach(v => {
    valsEl.insertAdjacentHTML('beforeend', `<span class="pvtag">${v}</span>`);
  });

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
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rev').forEach(r => io.observe(r));
}

/* ─── NAV SCROLL ─── */
function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(244,247,246,.97)'
      : 'rgba(244,247,246,.88)';
  }, { passive: true });
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
  initReveal();
  initNav();
  initForm();
});
