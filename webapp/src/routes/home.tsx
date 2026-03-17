import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { VERTICALS, LISTINGS, HOSPITALITY_BRANDS, RETAIL_BRANDS, ADVISORY_PARTNERS } from '../lib/constants'

// ── RECENT INSIGHTS (3 latest) ───────────────────────────────────────────────
const RECENT_INSIGHTS = [
  {
    id: 'horeca-cloud-kitchen-india-2026',
    category: 'HORECA',
    date: 'March 2026',
    readTime: '9 min read',
    title: 'Cloud Kitchens & Dark Stores: India\'s HORECA Infrastructure Revolution',
    excerpt: 'India\'s online food delivery GMV has crossed ₹1,00,000 Cr. We map how cloud kitchens, dark stores and ghost brands are reshaping HORECA procurement, supply chains and real estate demand in 2026.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80',
    color: '#065F46',
  },
  {
    id: 'india-hospitality-brand-strategy-2026',
    category: 'Hospitality',
    date: 'March 2026',
    readTime: '12 min read',
    title: 'Hotel Brand Affiliation in India 2026: Choosing the Right Flag for Your Asset',
    excerpt: 'With 20+ international and domestic brands competing for India hotel management agreements, selecting the right brand is the most consequential decision a hotel owner makes. Our complete evaluation framework.',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=80',
    color: '#1A3A6B',
  },
  {
    id: 'entertainment-destination-development-india-2026',
    category: 'Entertainment',
    date: 'March 2026',
    readTime: '10 min read',
    title: 'Building India\'s Next Entertainment Destination: Development Economics & Operational Model',
    excerpt: '₹15,000+ Cr of entertainment real estate is in planning across India. We analyse format typology, capex benchmarks, revenue model and the operational structure required to deliver sustainable returns.',
    img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    color: '#7C3AED',
  },
]

const app = new Hono()

// ── HERO SLIDES ─────────────────────────────────────────────────────────────
// 3 Active Mandate slides + 3 Advisory Service slides
const SLIDES = [
  // ── MANDATE 1: Prism Tower, Gurgaon ────────────────────────────────────
  {
    bg: '#030610',
    tag: 'Active Mandate · Gurgaon · ₹400 Cr · Due Diligence Stage',
    h1a: 'Prism Tower',
    h1b: 'Gurgaon.',
    h1c: '312 Keys · Mixed-Use · REIT-Grade',
    sub: 'Institutional-grade mixed-use commercial building on Gurgaon-Faridabad Road, part of a 4-star hotel complex. 312 keys. REIT listing potential. India Gully advising on acquisition & due diligence.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/prism-tower-gurgaon' },
    cta2: { text: 'Enquire via WhatsApp', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20I%20am%20interested%20in%20Prism%20Tower%20Gurgaon%20mandate' },
    img: '/static/mandates/prism/prism-tower-hero.jpg',
    label: 'REIT-Grade · ₹400 Cr',
    spoc: 'Arun Manikonda',
    value: '₹400 Cr',
    type: 'mandate',
  },
  // ── MANDATE 2: Belcibo Multi-Brand F&B Platform ─────────────────────────
  {
    bg: '#0a0008',
    tag: 'Growth Equity · Delhi NCR & Goa · ₹100 Cr · Active Fundraise',
    h1a: 'Belcibo',
    h1b: 'F&B Platform.',
    h1c: '15+ Outlets · Pan-India Rollout',
    sub: 'Scalable multi-brand F&B platform — Imperfecto, Noor, Begam, Khybani, Informal, RuinPub, Patio & more. Seeking strategic growth equity partner for pan-India expansion. Exclusive advisory mandate with India Gully.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/belcibo-hospitality-platform' },
    cta2: { text: 'Express Interest', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20interested%20in%20Belcibo%20growth%20equity%20mandate' },
    img: '/static/mandates/belcibo/belcibo-cover.jpg',
    label: 'Growth Equity · ₹100 Cr',
    spoc: 'Arun Manikonda',
    value: '₹100 Cr',
    type: 'mandate',
  },
  // ── MANDATE 3: Sawasdee JLG Galleria, Noida ─────────────────────────────
  {
    bg: '#020b14',
    tag: 'Outright Sale · Noida · ₹150 Cr · Negotiation Ready',
    h1a: 'Sawasdee JLG',
    h1b: 'Galleria.',
    h1c: '114 Keys · Hotel + Retail Mall · Noida',
    sub: 'Structure-ready 114-key hotel with integrated retail mall in Sector 63, Noida. Independent hotel access, possession-ready. India Gully holds the exclusive sale mandate. Outright sale — negotiation ready.',
    cta1: { text: 'View Mandate & Sign NDA', href: '/listings/sawasdee-jlg-noida' },
    cta2: { text: 'Enquire via WhatsApp', href: 'https://wa.me/919810889134?text=Hi%20Arun%2C%20interested%20in%20Sawasdee%20JLG%20Galleria%20Noida%20mandate' },
    img: '/static/mandates/sawasdee/sawasdee-cover.jpg',
    label: 'Hotel + Mall · ₹150 Cr',
    spoc: 'Arun Manikonda',
    value: '₹150 Cr',
    type: 'mandate',
  },
  // ── ADVISORY 1: Transaction Advisory ───────────────────────────────────
  {
    bg: '#040408',
    tag: 'Transaction Advisory · Real Estate · Hospitality · Retail',
    h1a: 'India Gully',
    h1b: 'Advisory.',
    h1c: '₹2,000 Cr+ Transacted Across Verticals',
    sub: "India's premier multi-vertical advisory — Real Estate acquisitions, Hospitality asset sales, Retail leasing, Entertainment divestments and Debt solutions. EY & CBRE co-advisory credentials. NDA-governed mandates.",
    cta1: { text: 'View Active Mandates', href: '/listings' },
    cta2: { text: 'Submit Your Mandate', href: '/contact' },
    img: '/static/mandates/hero/hero-ig-advisory-skyline.jpg',
    label: 'Transaction Advisory',
    type: 'advisory',
  },
  // ── ADVISORY 2: Growth Equity & F&B Platform Advisory ──────────────────
  {
    bg: '#050408',
    tag: 'Growth Equity Advisory · F&B Platforms · HORECA Solutions',
    h1a: 'Growth Capital',
    h1b: 'Advisory.',
    h1c: 'F&B · Hospitality · Entertainment',
    sub: "India Gully structures and executes growth equity rounds for India's most exciting F&B platforms and hospitality brands. Proprietary deal flow. Institutional-grade information memoranda. NDA-protected pipeline.",
    cta1: { text: 'Explore Advisory Services', href: '/services' },
    cta2: { text: 'Discuss Your Mandate', href: '/contact' },
    img: '/static/mandates/hero/hero-fine-dining.jpg',
    label: 'Growth Equity · F&B',
    type: 'advisory',
  },
  // ── ADVISORY 3: HORECA & Procurement ───────────────────────────────────
  {
    bg: '#050404',
    tag: 'HORECA Solutions · Procurement · FF&E · OS&E · Pan-India',
    h1a: 'HORECA',
    h1b: 'Solutions.',
    h1c: '500+ SKUs · 15+ Hotel Properties',
    sub: "India Gully's HORECA division is the complete hospitality supply partner — FF&E, OS&E, kitchen equipment, linen, uniforms and guest amenities delivered on spec and on schedule across India.",
    cta1: { text: 'Explore HORECA Services', href: '/horeca' },
    cta2: { text: 'Request a Quote', href: '/horeca#enquiry' },
    img: '/static/mandates/hero/hero-hotel-products.jpg',
    label: 'HORECA Procurement',
    type: 'advisory',
  },
]

app.get('/', (c) => {
  const content = `

<!-- ══ HERO CAROUSEL ════════════════════════════════════════════════════ -->
<div class="car">
  <div class="car-track">
    ${SLIDES.map((s, i) => `
    <div class="car-slide${i === 0 ? ' on' : ''}">
      <!-- Full-bleed background with Ken Burns -->
      <div class="car-bg" style="background-image:url('${s.img}');background-color:${s.bg};"></div>
      <!-- Cinematic layered overlays -->
      <div class="car-ov-main"></div>
      <div class="car-ov-btm"></div>
      <div class="car-ov-gold"></div>
      <!-- Gold grid texture -->
      <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.025) 1px,transparent 1px);background-size:88px 88px;pointer-events:none;"></div>
      <!-- Star / particle canvas overlay -->
      <canvas class="hero-stars" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.55;z-index:1;"></canvas>
      <div class="car-body">
        <div class="wrap" style="width:100%;">
          <div style="max-width:760px;">

            <!-- Tag line — slides in from left -->
            <div class="s-tag" style="display:flex;align-items:center;gap:.875rem;margin-bottom:2rem;">
              <div style="width:36px;height:1px;background:linear-gradient(90deg,var(--gold),var(--gold-lt));flex-shrink:0;"></div>
              <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">${s.tag}</span>
            </div>

            <!-- Display headline -->
            <div class="s-txt">
              <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(3.4rem,7.5vw,7rem);line-height:1.01;color:#fff;letter-spacing:-.025em;font-weight:400;margin-bottom:1.75rem;">
                ${s.h1a}<br>
                <em style="font-style:italic;color:var(--gold);display:inline-block;position:relative;">${s.h1b}<span style="position:absolute;bottom:-.15em;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);opacity:.5;"></span></em><br>
                <span style="font-size:.48em;font-weight:300;color:rgba(255,255,255,.42);letter-spacing:-.01em;">${s.h1c}</span>
              </h1>
              <p style="font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,.62);max-width:560px;margin-bottom:2.5rem;font-weight:400;">${s.sub}</p>
            </div>

            <!-- CTAs -->
            <div class="s-cta" style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">
              <a href="${s.cta1.href}" class="btn btn-g" style="min-width:200px;justify-content:center;">${s.cta1.text}</a>
              <a href="${s.cta2.href}" ${(s as any).type === 'mandate' && s.cta2.href.startsWith('https://wa.me') ? 'target="_blank" rel="noopener"' : ''} class="btn btn-ghost" style="min-width:160px;justify-content:center;">${s.cta2.text}</a>
            </div>

            ${(s as any).type === 'mandate' && (s as any).spoc ? `
            <!-- Mandate SPOC strip -->
            <div style="display:inline-flex;align-items:center;gap:.75rem;margin-top:1.5rem;padding:.5rem 1rem .5rem .5rem;background:rgba(0,0,0,.35);backdrop-filter:blur(8px);border:1px solid rgba(184,150,12,.25);">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.78rem;flex-shrink:0;">A</div>
              <div>
                <div style="font-size:.55rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.15rem;">SPOC · India Gully</div>
                <div style="font-size:.78rem;font-weight:600;color:#fff;">${(s as any).spoc}</div>
              </div>
              <div style="width:1px;height:28px;background:rgba(255,255,255,.12);margin:0 .25rem;"></div>
              <div>
                <div style="font-size:.55rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.15rem;">Mandate Value</div>
                <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--gold);">${(s as any).value}</div>
              </div>
            </div>` : ''}

          </div>
        </div>
      </div>

      <!-- Slide label — bottom right -->
      <div style="position:absolute;bottom:3.5rem;right:2.5rem;z-index:3;display:flex;flex-direction:column;align-items:flex-end;gap:.35rem;">
        ${(s as any).type === 'mandate' ? `<div style="background:rgba(184,150,12,.85);padding:.22rem .6rem;font-size:.52rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin-bottom:.25rem;">Active Mandate · NDA Required</div>` : `<div style="background:rgba(26,58,107,.7);padding:.22rem .6rem;font-size:.52rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.25rem;">Advisory Services</div>`}
        <div style="width:1px;height:40px;background:linear-gradient(180deg,transparent,rgba(184,150,12,.5));margin-left:auto;"></div>
        <span style="font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.3);">${s.label}</span>
      </div>
    </div>
    `).join('')}
  </div>

  <!-- Controls -->
  <div class="car-ct"></div>
  <button class="car-arr car-prev" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>
  <button class="car-arr car-next" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>
  <div class="car-dots" role="tablist">
    ${SLIDES.map((_,i) => `<button class="c-dot${i===0?' on':''}" role="tab" aria-label="Go to slide ${i+1}"></button>`).join('')}
  </div>
  <div class="car-pb" aria-hidden="true"></div>

  <!-- Scroll hint -->
  <div style="position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:.5rem;">
    <span style="font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.25);">Scroll</span>
    <div style="width:1px;height:32px;background:linear-gradient(180deg,rgba(184,150,12,.4),transparent);animation:pulse-line 2s ease-in-out infinite;"></div>
  </div>
</div>
<style>
@keyframes pulse-line{0%,100%{opacity:.3;transform:scaleY(.8)}50%{opacity:.8;transform:scaleY(1)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
</style>
<script>
(function(){
  /* ── Hero star/particle canvas ── */
  function initStars(canvas){
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    if(!ctx) return;
    var COUNT = Math.min(Math.floor(W * H / 8000), 120);
    var stars = Array.from({length: COUNT}, function(){
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.2 + 0.2,
        sp: Math.random() * 0.4 + 0.05,
        op: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
        ts: Math.random() * 0.015 + 0.005
      };
    });
    var raf;
    function draw(){
      ctx.clearRect(0, 0, W, H);
      stars.forEach(function(s){
        s.tw += s.ts;
        s.y  -= s.sp;
        if(s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
        var alpha = s.op * (0.6 + 0.4 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,220,100,' + alpha.toFixed(2) + ')';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return function(){ cancelAnimationFrame(raf); };
  }
  var destroyers = [];
  function startAll(){
    destroyers.forEach(function(d){ d(); });
    destroyers = [];
    document.querySelectorAll('.hero-stars').forEach(function(c){
      destroyers.push(initStars(c));
    });
  }
  /* start after hero loads */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startAll);
  } else {
    setTimeout(startAll, 200);
  }
  /* Pause stars on non-active slides to save CPU */
  var obs = new MutationObserver(function(){
    document.querySelectorAll('.car-slide').forEach(function(slide){
      var c = slide.querySelector('.hero-stars');
      if(!c) return;
      c.style.opacity = slide.classList.contains('on') ? '0.55' : '0';
    });
  });
  document.querySelectorAll('.car-slide').forEach(function(s){
    obs.observe(s, {attributes:true, attributeFilter:['class']});
  });
})();
</script>

<!-- ══ GOLD SERVICE TICKER ═══════════════════════════════════════════════ -->
<div class="ticker" role="marquee" aria-label="India Gully services">
  <div class="ticker-tr">
    ${[
      'Real Estate Advisory','Transaction Advisory','Retail Leasing Strategy',
      'Hotel Management Advisory','Entertainment Destinations','Debt & Special Situations',
      'HORECA Solutions','Brand On-Boarding','Financial Feasibility','Project Management',
      'Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement',
      '₹1,165 Cr+ Pipeline','15+ Hotel Projects','35+ Retail Brands','Pan-India Presence'
    ].map(t=>`<span style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.25);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
    ${[
      'Real Estate Advisory','Transaction Advisory','Retail Leasing Strategy',
      'Hotel Management Advisory','Entertainment Destinations','Debt & Special Situations',
      'HORECA Solutions','Brand On-Boarding','Financial Feasibility','Project Management',
      'Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement',
      '₹1,165 Cr+ Pipeline','15+ Hotel Projects','35+ Retail Brands','Pan-India Presence'
    ].map(t=>`<span style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.25);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
  </div>
</div>

<!-- ══ STATS BAR ════════════════════════════════════════════════════════ -->
<div style="position:relative;z-index:1;" id="homeStatsSection">
  <div id="homeStats">
    ${[
      { n:'₹1,165 Cr+', l:'Advisory Pipeline',      sub:'Active mandates under advisory', icon:'chart-line' },
      { n:'15+',         l:'Hotel Projects',          sub:'Pre-opening & PMC mandates', icon:'hotel' },
      { n:'30+',         l:'Retail Brand Partners',   sub:'Leasing & franchise advisory', icon:'store' },
      { n:'20+',         l:'Hospitality Brands',      sub:'Management & on-boarding', icon:'concierge-bell' },
      { n:'Pan-India',   l:'Operations Reach',        sub:'Tier 1, 2 &amp; 3 cities', icon:'map-marked-alt' },
    ].map((s) => `
    <div class="home-stat-cell">
      <i class="fas fa-${s.icon}" style="font-size:.7rem;color:var(--gold);opacity:.6;display:block;margin-bottom:.625rem;"></i>
      <div class="stat-n count-up" data-target="${s.n}" style="font-size:2.7rem;letter-spacing:-.03em;">${s.n}</div>
      <div style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);margin-top:.4rem;margin-bottom:.2rem;">${s.l}</div>
      <div style="font-size:.67rem;color:var(--ink-muted);">${s.sub}</div>
    </div>`).join('')}
  </div>
</div>
<!-- gold rule separator -->
<div class="sec-sep"></div>

<!-- ══ CREDENTIALS PROOF BAR ════════════════════════════════════════════ -->
<div id="proofBar" style="background:#0c0c18;border-top:1px solid rgba(184,150,12,.15);border-bottom:1px solid rgba(184,150,12,.15);padding:.85rem 0;overflow:hidden;position:relative;">
  <!-- subtle animated gold line top -->
  <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(184,150,12,.4) 30%,rgba(212,174,42,.6) 50%,rgba(184,150,12,.4) 70%,transparent 100%);animation:goldShimmer 3s ease-in-out infinite;"></div>
  <div class="proof-track" style="display:flex;align-items:center;gap:0;white-space:nowrap;animation:proofScroll 38s linear infinite;">
    ${[
      { icon:'shield-alt',     color:'#22c55e', text:'CERT-In Compliant' },
      { icon:'check-double',   color:'#B8960C', text:'OWASP Top-10 Secure' },
      { icon:'handshake',      color:'#60a5fa', text:'EY Co-Advisory Partner' },
      { icon:'chart-line',     color:'#B8960C', text:'₹1,165 Cr+ Active Pipeline' },
      { icon:'hotel',          color:'#a78bfa', text:'15+ Hotel Projects Executed' },
      { icon:'store',          color:'#34d399', text:'35+ Retail Brand Partnerships' },
      { icon:'building',       color:'#60a5fa', text:'CBRE Co-Advisory Partner' },
      { icon:'balance-scale',  color:'#fbbf24', text:'SEBI-Framework Advisory' },
      { icon:'registered',     color:'#B8960C', text:'MCA Registered · CIN U74999DL2017PTC323237' },
      { icon:'map-marked-alt', color:'#a78bfa', text:'Pan-India · Delhi · Chandigarh · Mumbai · Kerala' },
      { icon:'trophy',         color:'#fbbf24', text:'₹2,000 Cr+ Transactions Advised' },
      { icon:'calendar-alt',   color:'#34d399', text:'Established 2017 · 8+ Years' },
      { icon:'file-contract',  color:'#B8960C', text:'Mutual NDA Framework · All Mandates' },
      { icon:'concierge-bell', color:'#a78bfa', text:'20+ Hospitality Brand Partnerships' },
    ].concat([
      { icon:'shield-alt',     color:'#22c55e', text:'CERT-In Compliant' },
      { icon:'check-double',   color:'#B8960C', text:'OWASP Top-10 Secure' },
      { icon:'handshake',      color:'#60a5fa', text:'EY Co-Advisory Partner' },
      { icon:'chart-line',     color:'#B8960C', text:'₹1,165 Cr+ Active Pipeline' },
      { icon:'hotel',          color:'#a78bfa', text:'15+ Hotel Projects Executed' },
      { icon:'store',          color:'#34d399', text:'35+ Retail Brand Partnerships' },
    ]).map(item => `
    <span style="display:inline-flex;align-items:center;gap:.5rem;padding:0 2rem;font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);">
      <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.58rem;flex-shrink:0;"></i>${item.text}
    </span><span style="color:rgba(184,150,12,.3);font-size:.45rem;flex-shrink:0;">◆</span>`).join('')}
  </div>
  <style>
    @keyframes proofScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes goldShimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
    #proofBar:hover .proof-track { animation-play-state:paused; }
    @media(prefers-reduced-motion:reduce){ .proof-track{animation:none;} }
  </style>
</div>

<!-- ══ PARTNER MARQUEE ══════════════════════════════════════════════════ -->
<div class="partner-marquee-section" style="background:var(--parch-dk);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:1.1rem 0;overflow:hidden;">
  <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0;">
    <div class="partner-marquee-label" style="flex-shrink:0;padding:0 1.5rem;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);white-space:nowrap;">
      Advisory Partners
    </div>
    <div class="marquee-outer" style="flex:1;">
      <div class="marquee-track">
        ${[
          '🏛️ EY (Ernst & Young)',
          '🏢 CBRE India',
          '📊 ANAROCK',
          '⚖️ Pipara & Co LLP',
          '💼 Resurgent India',
          '🏨 Sarovar Hotels',
          '🏪 CGH Earth',
          '🏖️ Mahindra Holidays',
          '🏝️ WelcomHeritage',
          '🎰 Pride Hotels',
          '🍽️ Maple Resorts',
          '🏛️ EY (Ernst & Young)',
          '🏢 CBRE India',
          '📊 ANAROCK',
          '⚖️ Pipara & Co LLP',
          '💼 Resurgent India',
          '🏨 Sarovar Hotels',
          '🏪 CGH Earth',
          '🏖️ Mahindra Holidays',
          '🏝️ WelcomHeritage',
          '🎰 Pride Hotels',
          '🍽️ Maple Resorts',
        ].map(p => `<span class="marquee-item">${p}</span>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ TRUST SIGNALS ROW ════════════════════════════════════════════════ -->
<div class="trust-signals-section" style="background:var(--parch-dk);padding:1.5rem 0;border-bottom:1px solid var(--border);">
  <div class="wrap">
    <div class="trust-row">
      <div class="trust-item">
        <span class="sla-badge">24h Response</span>
        <span>All enquiries guaranteed</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-shield-alt" style="color:var(--gold);"></i>
        <span>Mutual <strong>NDA</strong> before all mandates</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-certificate" style="color:var(--gold);"></i>
        <span>CERT-In & <strong>OWASP Top-10</strong> compliant</span>
      </div>
      <div class="trust-item">
        <i class="fas fa-map-marked-alt" style="color:var(--gold);"></i>
        <span><strong>Pan-India</strong> · Delhi NCR · Chandigarh · Mumbai</span>
      </div>
      <div class="trust-item">
        <a href="/testimonials" style="color:var(--gold);font-weight:600;font-family:'DM Sans',sans-serif;font-size:.8rem;text-decoration:none;">
          ⭐ View Client Testimonials →
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ══ PAN-INDIA PRESENCE MAP ════════════════════════════════════════════ -->
<div class="map-presence-section" style="background:var(--parch);padding:5rem 0;border-top:1px solid var(--border);overflow:hidden;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;" class="mob-stack">
      <!-- Left: copy -->
      <div class="fu">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Pan-India Presence</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">Active Mandates<br>Across India</h2>
        <p class="body-lg" style="margin-bottom:2rem;color:var(--ink-soft);">India Gully operates across Tier 1, 2 and 3 markets — from Delhi NCR and Mumbai to Kasauli, Chail, Chandigarh and Jaipur. Our active mandates span 8+ cities with ₹1,165 Cr+ in combined advisory value.</p>
        <!-- City list -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:2rem;">
          ${[
            { city:'Delhi NCR',       sub:'Gurugram · Noida · Shalimar Bagh', pin:'#B8960C' },
            { city:'Chandigarh',      sub:'Hotel Rajshree & Spa', pin:'#065F46' },
            { city:'Himachal Pradesh',sub:'Kasauli · Chail · Shimla', pin:'#1A3A6B' },
            { city:'Jaipur',          sub:'Heritage Hotel Corridor', pin:'#7C3AED' },
            { city:'Mumbai',          sub:'BKC · Lower Parel', pin:'#B8960C' },
            { city:'Bengaluru',       sub:'Whitefield · MG Road', pin:'#065F46' },
          ].map(c => `
          <div class="city-pin-card" style="display:flex;align-items:flex-start;gap:.625rem;padding:.625rem;background:var(--surface);border:1px solid var(--border);transition:border-color .2s;" onmouseover="this.style.borderColor='${c.pin}44'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="width:8px;height:8px;border-radius:50%;background:${c.pin};flex-shrink:0;margin-top:.25rem;"></div>
            <div>
              <div class="map-city-name" style="font-size:.75rem;font-weight:700;color:var(--ink);">${c.city}</div>
              <div class="map-city-sub" style="font-size:.62rem;color:var(--ink-faint);">${c.sub}</div>
            </div>
          </div>`).join('')}
        </div>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
          <a href="/listings" class="btn btn-g" style="font-size:.75rem;"><i class="fas fa-map-marked-alt" style="margin-right:.4rem;font-size:.65rem;"></i>View Active Mandates</a>
          <a href="/pipeline" class="btn btn-dko" style="font-size:.75rem;"><i class="fas fa-chart-bar" style="margin-right:.4rem;font-size:.65rem;"></i>Pipeline Dashboard</a>
        </div>
      </div>
      <!-- Right: SVG India map -->
      <div style="position:relative;" id="indiaMapWrap" class="india-map-wrap">
        <div class="india-map-box" style="border:1px solid var(--border);padding:1.25rem 1rem 1rem;position:relative;overflow:hidden;border-radius:3px;">
          <!-- India SVG map — geographically accurate, viewBox 520×600 -->
          <svg id="igIndiaMap" viewBox="0 0 440 510" width="100%" style="display:block;max-width:440px;margin:0 auto;" aria-label="India map showing active mandate locations">
            <defs>
              <filter id="mapPinGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="mapShadow" x="-5%" y="-5%" width="115%" height="120%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.12)"/>
              </filter>
              <style>
                .india-state { fill: #d4cdb8; stroke: #9a8468; stroke-width: 0.7; stroke-linejoin: round; }
                .india-state-claim { fill: #d4cdb8; stroke: #8b7d5e; stroke-width: 0.9; stroke-dasharray: 3,2; stroke-linejoin: round; }
                .india-state:hover { fill: #c8bfa5; }
                .map-pin-label { font-family: "DM Sans", sans-serif; font-size: 8px; font-weight: 700; fill: currentColor; }
                .map-pin-sub { font-family: "DM Sans", sans-serif; font-size: 6px; fill: currentColor; opacity: 0.65; }
              </style>
            </defs>

            <!-- India States — generated from GADM GeoJSON, simplified for SVG rendering -->
            <g id="india-states" filter="url(#mapShadow)">
              <!-- J&K Full Claim: DRAWN FIRST so state borders render on top -->
              <!-- Covers India-claimed territory: POK + Gilgit-Baltistan + Indian-administered J&K/Ladakh + Aksai Chin -->
              <!-- Dashed border = disputed/claimed territory per Survey of India -->
              <!-- J&K Full Claim: wider trapezoidal shape covering POK/GB (left) + Indian J&K/Ladakh + Aksai Chin (right) -->
              <!-- Geographically accurate: lon 72.5-80.5°E, lat 32.5-37.4°N, bottom at y=88 to overlap Punjab/HP -->
              <path class="india-state-claim" id="jk-full-claim" d="M89.8,88.0L82.3,65.8L71.9,44.4L67.4,24.7L82.3,6.6L112.3,3.3L134.7,1.6L157.2,4.9L179.6,11.5L187.1,32.9L179.6,60.9L161.7,82.2L134.7,88.0L104.8,88.0Z"/>
              <!-- J&K territory label — centre of claim polygon approx (127,44) -->
              <text x="127" y="40" font-family="DM Sans,sans-serif" font-size="5.5" font-weight="600" fill="rgba(90,74,60,.7)" text-anchor="middle" pointer-events="none" letter-spacing="0.3">J&amp;K</text>
              <text x="127" y="49" font-family="DM Sans,sans-serif" font-size="4.5" fill="rgba(90,74,60,.55)" text-anchor="middle" pointer-events="none" font-style="italic">India's Claim</text>
              <!-- Telangana — separated from AP path below; lon 76.7-81.5 lat 15.4-19.5 -->
              <path class="india-state" id="state-telangana" d="M132.0,304.4L139.3,299.4L146.7,301.1L154.0,296.1L161.3,299.4L168.7,304.4L176.0,304.4L183.3,312.6L190.7,320.8L198.0,329.0L198.0,345.5L190.7,353.7L183.3,357.0L176.0,361.9L168.7,363.6L161.3,361.9L154.0,353.7L146.7,358.7L139.3,363.6L132.0,361.9L128.0,353.7L128.0,337.2L130.7,320.8Z"/>
              <path class="india-state" d="M213.3,335.3L211.4,335.1L213.4,337.6L208.0,340.4L199.3,341.0L193.4,351.1L189.2,348.7L183.0,352.0L179.7,361.7L183.7,388.1L181.2,383.5L179.7,385.7L183.6,389.2L179.1,386.6L175.2,392.0L170.5,389.9L166.3,395.0L159.6,394.3L157.3,400.2L154.6,401.4L152.0,400.3L152.7,397.6L155.9,397.5L157.8,390.9L154.6,390.0L155.0,385.8L150.4,384.9L150.7,381.4L146.4,380.1L144.8,383.3L140.9,384.3L140.6,381.7L136.9,380.4L136.7,383.0L134.1,383.2L132.6,376.5L140.2,381.0L139.4,377.0L141.7,374.8L133.3,375.2L133.8,371.3L130.7,369.4L130.8,362.0L135.4,362.9L136.5,361.0L133.8,355.0L136.0,352.6L135.2,348.4L141.8,348.1L143.1,341.3L137.7,339.2L141.2,337.4L139.9,327.1L144.5,322.7L140.8,321.3L144.0,315.0L142.1,307.4L148.3,301.3L145.5,297.9L147.1,293.5L151.7,294.6L153.8,291.0L153.8,283.7L161.8,286.2L166.7,291.0L167.7,288.5L171.1,290.4L176.2,289.1L178.6,291.9L177.6,301.5L188.4,306.1L189.9,311.7L193.5,311.8L194.6,318.0L203.0,317.5L209.2,313.6L212.7,314.8L215.9,305.9L218.2,310.8L220.7,307.4L224.5,308.5L223.9,304.2L229.6,301.1L228.3,298.6L230.5,299.3L233.0,295.9L239.9,302.5L243.3,301.9L244.8,298.2L249.2,296.0L240.5,309.5L214.3,328.7L213.3,335.3Z"/>
              <path class="india-state" d="M420.0,130.9L423.5,133.0L419.3,135.8L420.1,138.6L425.5,135.8L426.8,140.7L421.6,146.6L427.5,145.7L438.5,150.0L438.3,154.9L431.0,159.3L434.7,167.7L426.9,163.3L419.1,165.6L406.3,174.4L405.6,168.7L417.9,163.4L415.4,162.4L414.0,157.6L417.3,153.7L394.7,160.4L391.6,159.0L385.3,168.1L380.2,170.3L367.8,168.7L359.6,171.1L358.2,161.6L351.4,159.9L351.3,155.5L356.8,157.8L361.1,155.5L366.3,156.1L369.0,153.4L368.2,151.2L376.1,147.8L377.9,142.9L386.7,142.4L397.2,131.5L399.7,134.4L408.8,136.5L414.3,131.3L420.0,130.9Z"/>
              <path class="india-state" d="M416.9,154.2L414.0,157.6L415.4,162.4L417.9,163.4L410.3,165.1L392.5,178.0L391.9,176.5L387.5,186.8L384.8,188.5L384.4,186.0L377.8,192.8L380.0,196.6L374.5,204.7L373.5,211.1L370.3,211.6L369.4,209.3L364.9,215.6L361.1,213.7L361.6,203.2L365.3,203.6L365.2,199.9L370.0,198.1L366.4,194.1L367.7,192.1L363.7,189.5L360.4,190.8L362.4,184.2L356.8,185.5L355.3,183.6L346.4,189.9L342.2,186.3L329.9,186.1L326.2,192.8L326.5,186.4L323.6,182.4L326.1,173.6L334.2,170.9L338.6,173.1L353.3,172.5L367.8,168.7L373.2,170.7L382.7,169.9L391.6,159.0L394.7,160.4L411.8,153.9L416.9,154.2Z"/>
              <path class="india-state" d="M240.4,161.1L247.9,163.9L248.3,168.6L256.7,173.2L263.1,171.4L266.3,176.3L273.4,175.5L279.4,178.7L284.5,176.0L288.5,179.9L296.7,177.6L298.8,179.6L301.8,176.6L302.5,180.1L295.4,186.8L299.4,193.9L295.0,194.4L295.9,198.4L292.0,196.0L288.2,198.0L284.1,208.0L277.5,208.0L275.2,211.8L269.2,205.2L264.5,204.5L263.5,208.4L254.9,211.6L250.5,209.2L246.0,213.1L243.0,208.6L231.2,209.2L228.9,198.4L240.1,190.0L248.0,189.9L239.4,183.9L241.2,179.5L237.2,178.2L239.9,175.1L244.8,175.4L239.4,171.1L236.1,164.1L240.4,161.1Z"/>
              <path class="india-state" d="M228.6,216.1L235.3,224.2L238.7,223.7L239.1,231.6L244.3,235.9L238.7,240.8L238.7,244.1L233.0,246.8L232.4,252.5L228.7,258.1L229.7,260.5L227.8,260.1L226.6,263.9L218.3,263.7L215.7,269.0L214.0,268.0L214.6,281.3L219.4,282.4L219.4,284.7L217.5,286.0L206.9,281.5L206.6,283.7L209.7,285.8L209.1,290.3L211.5,291.7L212.4,299.8L201.8,310.3L199.6,317.7L194.5,318.0L193.5,311.8L189.9,311.7L189.8,307.9L182.6,302.4L184.7,294.5L187.5,291.9L190.2,293.8L192.3,290.9L187.1,285.2L184.9,285.6L187.1,281.2L184.7,278.4L188.2,276.9L185.8,263.4L189.0,261.3L189.7,254.6L195.5,242.9L203.1,241.3L207.9,232.6L211.1,231.6L211.6,228.6L207.6,225.3L203.0,225.7L203.0,219.2L216.5,221.2L220.7,218.4L225.6,219.5L228.6,216.1Z"/>
              <path class="india-state" d="M137.5,139.8L139.3,145.0L136.7,146.6L132.4,145.0L133.4,140.0L137.5,139.8Z"/>
              <path class="india-state" d="M87.7,350.3L89.5,353.1L93.3,352.4L94.6,358.2L92.1,364.4L88.2,361.5L86.3,356.3L88.0,356.2L84.7,351.3L87.7,350.3Z"/>
              <path class="india-state" d="M61.2,207.4L73.4,212.5L76.1,209.8L78.0,211.9L75.8,214.8L78.2,217.6L80.1,215.7L80.0,221.2L84.4,223.8L84.0,226.6L91.1,229.1L96.6,236.2L95.2,239.7L90.2,241.3L93.9,243.6L90.6,244.2L91.7,250.6L86.7,252.8L88.0,255.4L86.3,256.0L87.4,258.1L94.4,258.1L83.4,263.4L88.1,266.4L88.7,270.3L84.6,273.2L81.3,270.8L81.0,278.9L78.4,280.2L75.7,279.6L76.2,276.4L70.7,280.1L72.9,270.2L68.4,261.7L70.7,257.3L68.6,257.2L72.1,255.4L67.7,255.4L67.2,250.7L68.3,246.8L73.3,245.5L66.9,246.8L65.1,243.9L63.8,251.1L64.1,248.2L61.8,250.3L64.2,256.0L61.4,263.0L45.5,270.5L42.9,270.8L43.1,267.0L40.8,266.3L39.8,270.1L31.3,264.4L25.9,255.6L24.4,255.8L25.5,257.4L23.7,256.1L14.0,245.0L15.9,242.3L18.4,245.8L32.3,241.1L37.2,232.7L35.0,235.0L32.1,233.4L25.4,238.3L21.9,237.5L9.8,231.5L8.7,230.1L11.3,228.5L7.3,225.8L11.4,219.8L7.7,220.6L9.9,219.1L8.2,218.3L11.2,218.4L11.5,213.0L29.8,215.1L38.4,211.0L38.4,213.7L41.8,214.1L46.7,211.3L44.7,209.0L46.3,206.8L61.2,207.4Z"/>
              <path class="india-state" d="M131.8,106.8L136.5,109.9L137.3,113.2L143.1,115.0L136.0,124.7L137.5,138.6L133.4,140.0L131.7,143.8L141.3,146.6L142.2,154.0L134.8,156.1L133.8,158.8L132.2,149.6L127.3,153.7L126.3,150.7L123.6,150.3L122.7,155.8L118.8,155.4L118.4,151.7L120.7,150.7L112.7,143.3L110.3,132.9L105.6,133.3L102.0,130.6L98.4,131.8L98.5,125.0L96.4,124.4L97.3,121.7L105.7,122.3L107.7,128.3L111.0,124.1L119.9,125.0L122.9,123.1L122.4,118.4L128.3,119.7L127.5,116.7L130.6,113.9L133.2,114.6L131.8,106.8Z"/>
              <path class="india-state" d="M131.3,68.8L139.1,75.5L144.9,73.0L148.9,79.2L154.7,76.4L153.3,80.5L155.7,80.6L155.7,84.7L160.7,88.7L159.5,92.0L161.5,94.9L159.7,96.5L164.0,103.0L154.5,100.1L147.5,102.3L144.5,108.6L146.3,112.4L142.8,114.8L136.1,112.1L136.5,109.9L128.4,104.8L128.8,101.4L124.7,97.7L121.9,99.9L117.7,89.5L113.0,87.4L118.3,81.9L116.5,73.7L131.3,68.8Z"/>
              <path class="india-state" d="M147.7,33.4L150.8,32.6L149.0,34.7L152.9,45.2L163.8,51.1L159.7,55.3L159.8,62.0L165.2,68.9L170.2,69.7L169.3,72.9L172.2,78.9L163.7,83.2L160.3,77.5L153.8,81.0L154.7,76.4L148.9,79.2L144.9,73.0L139.1,75.5L130.9,68.5L116.5,73.7L118.2,78.3L111.8,84.3L99.9,80.9L99.9,75.2L97.4,76.8L89.7,69.4L92.3,65.2L88.8,61.0L93.4,56.9L87.7,55.6L89.1,52.2L86.0,50.5L88.9,45.2L95.1,43.5L115.6,48.1L129.5,44.2L130.5,41.5L134.2,41.3L146.5,32.2L147.7,33.4Z"/>
              <path class="india-state" d="M292.3,196.5L297.9,203.3L293.7,215.3L290.2,218.0L286.9,217.1L287.0,220.5L280.3,220.5L280.3,222.8L275.0,223.7L272.9,227.1L269.2,224.5L266.4,226.6L267.2,231.8L276.5,234.1L274.7,237.5L279.8,240.8L281.7,245.9L274.9,245.1L269.0,240.9L267.1,250.5L264.9,250.2L265.5,248.2L259.4,247.4L257.0,250.0L253.3,248.6L254.5,242.3L243.0,244.6L238.7,241.6L244.4,234.9L240.9,234.5L239.1,231.6L238.7,223.7L235.3,224.2L228.6,216.1L229.6,209.6L238.5,207.5L240.3,210.0L243.1,208.7L246.0,213.1L250.5,209.2L254.9,211.6L263.5,208.4L264.5,204.5L269.2,205.2L275.2,211.8L277.5,208.0L284.1,208.0L286.0,200.6L292.3,196.5Z"/>
              <path class="india-state" d="M139.3,307.5L139.6,309.5L143.2,310.0L144.0,315.0L140.8,321.3L144.5,322.6L139.9,327.1L141.2,337.4L137.7,339.2L143.1,342.1L141.8,348.1L134.6,349.5L136.1,352.3L133.8,355.0L136.7,360.3L135.4,362.9L130.9,361.8L130.7,369.4L133.8,371.3L133.4,375.2L141.7,374.8L139.4,377.0L140.2,381.0L132.6,376.5L134.1,383.2L136.7,383.0L136.9,380.4L141.3,384.2L148.8,379.9L150.4,384.9L155.0,385.8L154.6,390.0L157.8,390.9L155.9,397.5L154.3,396.3L152.4,399.2L146.6,397.4L143.0,400.7L141.2,408.0L145.1,408.6L144.2,412.3L141.5,412.4L140.5,415.3L132.7,414.8L131.8,418.2L125.4,416.7L120.9,411.8L117.3,412.2L110.7,406.7L109.3,401.9L102.4,399.1L95.3,370.2L90.9,366.1L94.6,358.2L93.3,352.4L90.9,352.1L94.9,350.4L96.5,346.1L95.0,345.9L96.9,345.1L93.6,338.0L99.8,337.0L103.5,331.6L107.6,333.2L114.5,331.3L113.9,322.9L125.0,325.6L124.3,321.1L127.1,318.4L129.6,319.7L133.6,311.5L135.9,312.1L139.3,307.5Z"/>
              <path class="india-state" d="M104.3,398.6L110.6,403.3L113.0,408.9L125.4,415.3L122.9,420.0L127.3,421.7L126.1,424.5L130.1,424.1L131.1,426.7L129.0,428.6L132.7,431.1L131.5,438.8L133.8,440.2L137.6,438.1L136.5,449.9L140.1,451.7L136.2,459.5L138.2,467.1L136.6,470.8L127.5,461.3L124.0,451.2L123.0,444.0L124.6,451.2L126.8,451.1L125.0,445.7L122.5,441.2L122.7,443.9L117.2,425.2L108.4,411.2L110.4,409.1L107.4,411.2L102.4,399.2L104.3,398.6Z"/>
              <path class="india-state" d="M154.6,171.5L164.0,174.4L166.1,179.9L160.3,189.5L161.2,191.5L155.6,192.5L153.6,195.6L155.8,199.5L151.6,203.9L154.9,213.3L156.7,211.4L161.0,214.8L163.6,212.0L157.6,197.4L155.5,197.0L158.9,194.5L160.6,195.8L160.1,193.5L161.6,194.6L162.4,192.6L162.2,199.0L164.1,197.1L164.4,199.3L168.2,199.7L168.6,196.1L171.4,197.3L170.0,199.8L176.7,200.0L176.7,197.7L182.8,194.7L185.3,198.8L183.7,201.6L187.9,199.1L190.6,200.6L189.4,199.4L192.1,198.5L190.9,202.5L195.9,203.4L197.9,198.9L201.1,200.4L202.3,198.5L208.2,204.3L211.7,204.4L213.2,207.8L218.6,206.4L220.7,208.1L218.6,215.6L220.9,218.3L218.2,220.3L202.8,219.5L203.0,225.7L207.6,225.3L211.6,228.6L211.1,231.6L207.9,232.6L203.1,241.3L195.5,242.9L188.9,260.7L185.0,260.1L182.9,256.1L172.1,257.4L167.5,254.5L163.1,258.3L155.6,258.0L154.8,256.2L143.0,260.3L140.5,257.5L143.3,257.4L142.3,254.8L138.5,253.8L131.2,256.5L128.6,263.0L121.9,264.8L120.8,260.1L107.7,259.5L97.8,255.1L96.1,249.6L91.7,250.7L90.6,244.2L93.9,243.6L90.2,241.3L95.2,239.7L96.6,236.2L94.3,232.9L100.6,230.4L97.2,228.6L103.5,223.7L104.3,217.3L100.7,213.2L102.3,210.2L100.1,209.5L101.4,204.9L102.8,207.2L104.7,205.3L102.2,205.0L101.9,202.1L105.1,203.9L106.8,200.9L109.6,200.9L108.3,203.4L110.6,203.8L107.5,203.1L107.6,206.1L116.9,206.0L118.0,210.4L115.2,211.2L116.8,216.5L114.9,218.2L112.1,217.0L113.1,221.0L119.0,218.8L122.1,212.4L122.5,214.2L127.2,215.1L129.7,213.1L132.7,215.6L131.5,209.1L133.7,210.3L135.2,208.5L131.3,204.5L133.5,203.7L132.1,201.4L140.2,199.8L139.6,195.0L130.8,196.6L126.5,190.0L136.1,181.6L154.6,171.5Z"/>
              <path class="india-state" d="M96.0,249.5L98.3,255.4L108.9,259.9L120.8,260.1L123.5,264.9L128.6,263.0L131.2,256.5L138.5,253.8L142.3,254.8L143.3,257.4L140.5,257.5L143.0,260.3L154.8,256.2L155.6,258.0L163.1,258.3L167.5,254.5L172.1,257.4L182.9,256.1L185.0,260.1L189.0,261.1L185.4,264.6L188.2,276.9L184.7,278.4L187.1,281.2L184.9,285.6L192.1,290.0L191.6,292.6L186.1,293.0L183.0,298.6L184.1,301.4L180.6,303.6L177.4,301.1L178.6,291.9L175.8,288.8L171.1,290.4L167.7,288.5L166.7,291.0L161.8,286.2L153.8,283.7L153.8,291.0L151.7,294.6L147.1,293.5L145.5,297.9L148.3,301.3L143.1,305.7L142.7,309.5L139.6,309.5L139.0,307.2L135.9,312.1L133.6,311.5L129.6,319.7L127.1,318.4L124.3,321.1L125.0,325.6L113.9,322.9L114.5,331.3L107.6,333.2L103.5,331.6L99.8,337.0L93.5,338.1L94.5,342.5L97.1,343.5L94.9,350.4L89.9,353.2L87.6,350.1L84.7,351.2L79.3,338.5L79.3,330.0L73.5,311.0L76.0,311.9L72.4,303.3L75.1,298.4L71.7,300.1L69.4,284.6L72.7,278.6L77.3,281.4L80.9,279.0L81.4,270.7L84.6,273.2L88.7,270.3L88.1,266.4L83.4,263.4L86.8,263.4L88.8,259.6L94.5,257.4L87.4,258.1L86.7,252.8L96.0,249.5Z"/>
              <path class="india-state" d="M396.4,191.2L398.0,194.2L396.5,198.1L398.9,201.2L390.2,220.1L372.5,215.9L374.5,204.7L378.9,197.4L382.0,198.4L385.4,192.5L392.4,193.6L396.4,191.2Z"/>
              <path class="india-state" d="M355.8,183.8L356.8,185.5L362.5,184.3L360.4,190.8L363.7,189.5L367.8,192.2L366.4,194.1L370.0,198.1L364.8,201.0L359.0,198.6L334.9,199.3L325.7,196.8L328.4,191.8L326.6,189.6L329.9,186.1L342.2,186.3L346.4,189.9L355.8,183.8Z"/>
              <path class="india-state" d="M369.9,211.0L373.2,211.4L372.5,215.9L377.9,216.9L379.5,222.9L378.8,231.6L374.9,233.1L376.0,245.8L371.6,250.9L368.7,247.5L367.1,250.4L361.8,220.7L362.4,213.7L364.9,215.6L369.4,209.3L369.9,211.0Z"/>
              <path class="india-state" d="M405.9,170.4L403.7,178.1L405.5,184.2L401.3,192.5L397.2,194.1L396.3,190.4L392.5,193.6L385.4,192.5L382.0,198.3L380.4,197.7L377.8,192.8L384.4,186.0L384.8,188.5L387.5,186.8L391.9,176.5L392.5,178.0L401.6,170.2L405.6,168.7L405.9,170.4Z"/>
              <path class="india-state" d="M269.6,241.4L282.9,248.7L283.8,252.2L286.9,250.7L290.3,254.4L290.6,256.3L285.0,257.8L280.7,263.0L282.9,269.0L279.7,272.4L284.1,270.8L279.4,274.5L279.9,276.9L274.3,282.6L272.2,281.4L273.9,283.0L259.8,288.3L250.2,296.6L244.8,298.2L243.3,301.9L237.0,301.5L233.0,295.9L230.5,299.3L228.3,298.6L229.6,301.1L223.9,304.2L224.5,308.5L220.7,307.4L218.2,310.8L215.9,305.9L212.8,314.7L209.2,313.6L199.6,317.6L201.8,310.3L212.4,299.8L211.5,291.7L209.1,290.3L209.7,285.8L206.8,281.7L219.3,285.0L219.4,282.4L214.6,281.3L214.0,268.0L215.7,269.0L218.3,263.7L225.5,264.5L227.8,260.1L229.7,260.5L228.7,258.1L233.1,246.7L238.7,244.1L238.6,241.5L243.0,244.6L254.5,242.3L253.4,248.8L265.5,248.2L264.9,250.2L267.1,250.5L269.6,241.4Z"/>
              <path class="india-state" d="M117.4,80.8L113.0,87.4L117.7,89.5L121.9,99.9L124.7,97.7L128.7,101.2L128.4,104.8L132.0,108.2L129.6,108.9L132.2,110.0L133.2,114.7L130.6,113.9L127.5,116.7L128.3,119.7L122.4,118.4L122.9,123.1L119.9,125.0L111.0,124.1L107.7,128.3L105.7,122.3L87.9,121.5L87.6,114.8L99.8,103.3L97.0,102.6L98.4,90.6L108.0,87.3L109.3,83.2L111.8,84.3L117.4,80.8Z"/>
              <path class="india-state" d="M87.8,121.3L97.2,121.9L98.4,131.8L102.0,130.6L105.6,133.3L110.3,132.9L112.7,143.3L120.7,150.7L118.4,151.7L118.8,155.4L122.7,155.8L123.6,150.3L126.3,150.7L127.3,153.7L132.7,149.9L132.8,158.7L134.8,156.1L138.6,156.5L139.2,160.8L144.3,166.1L141.7,167.8L145.5,169.0L140.5,171.5L140.9,173.4L145.5,170.4L153.1,170.6L150.4,174.5L136.1,181.6L126.5,190.0L130.8,196.6L139.6,195.0L140.2,199.8L132.1,201.4L133.5,203.7L131.3,204.5L135.2,208.5L133.7,210.3L131.5,209.1L132.7,215.6L129.7,213.1L127.2,215.1L122.5,214.2L122.1,212.4L119.0,218.8L113.1,221.0L112.1,217.0L114.9,218.2L116.8,216.5L115.2,211.2L118.0,210.4L116.9,206.0L107.6,206.1L107.5,203.1L110.6,203.8L108.3,203.4L109.6,200.9L106.8,200.9L105.1,203.9L102.1,202.0L102.2,205.0L104.7,205.6L102.8,207.2L101.4,204.9L100.1,209.5L102.3,210.2L100.7,213.2L104.3,217.3L103.5,223.7L97.2,228.6L100.6,230.4L94.3,232.9L89.1,227.8L84.0,226.6L84.4,223.8L80.0,221.2L80.1,215.7L78.2,217.6L75.8,214.8L78.0,211.9L76.0,209.8L73.4,212.5L67.8,209.6L66.6,211.2L63.4,208.4L64.9,207.8L60.4,206.4L57.5,208.0L46.5,207.0L39.9,195.3L39.8,190.4L34.0,190.3L31.3,186.4L32.3,176.6L22.1,172.5L23.7,166.5L35.3,153.1L38.2,152.9L43.0,158.1L58.1,153.9L65.4,140.9L73.7,136.7L80.4,122.0L89.0,117.8L87.8,121.3Z"/>
              <path class="india-state" d="M307.9,151.6L311.5,155.0L309.7,160.2L311.8,164.8L304.7,168.0L299.7,167.2L300.2,154.0L307.9,151.6Z"/>
              <path class="india-state" d="M180.1,386.7L183.8,388.0L182.8,398.7L176.6,412.2L173.6,411.7L176.0,414.4L176.8,427.8L174.6,428.7L176.8,430.4L177.2,438.7L168.5,439.3L162.5,451.8L166.9,455.1L154.6,458.2L151.7,461.6L150.1,469.8L142.5,474.6L139.0,473.9L135.6,471.0L138.2,467.1L136.2,459.5L140.1,451.7L136.5,449.9L138.4,440.2L137.6,438.1L133.8,440.2L131.5,438.8L132.7,431.1L129.0,428.6L131.1,426.7L130.1,424.1L126.1,424.5L127.3,421.7L122.7,418.3L126.8,416.2L131.8,418.2L132.7,414.8L140.5,415.3L141.5,412.4L144.2,412.3L145.7,409.5L141.2,407.4L143.3,405.5L143.0,400.7L146.6,397.4L155.9,401.4L159.6,394.3L166.3,395.0L170.5,389.9L175.2,392.0L180.1,386.7Z"/>
              <path class="india-state" d="M360.7,209.3L362.8,219.8L361.3,223.3L357.4,222.1L355.5,232.4L352.3,234.8L349.3,229.4L348.4,232.3L345.4,221.9L348.7,216.0L351.9,216.4L353.0,214.0L354.4,215.5L354.1,213.8L356.5,215.5L356.8,212.3L360.7,209.3Z"/>
              <path class="india-state" d="M143.0,114.4L148.1,117.0L144.7,123.0L149.0,128.3L155.3,124.6L162.9,129.7L159.8,132.0L170.2,139.4L175.6,138.8L178.5,141.7L180.8,139.9L186.7,144.3L187.5,142.1L207.1,155.5L209.9,154.5L215.5,158.4L219.4,157.7L219.8,161.2L228.5,164.0L229.6,161.6L232.9,161.8L237.4,164.1L239.4,171.1L244.8,175.4L237.2,177.1L241.2,179.5L238.7,182.6L248.0,189.9L240.1,190.0L228.7,198.7L231.8,207.7L226.6,219.0L222.8,219.7L218.7,215.7L220.2,207.3L213.2,207.8L211.7,204.4L208.2,204.3L202.3,198.5L201.1,200.4L197.9,198.9L195.9,203.4L190.9,202.5L192.1,198.5L189.4,199.4L190.6,200.6L187.9,199.1L183.1,201.3L185.3,198.8L182.8,194.7L176.7,197.7L176.8,200.0L170.0,199.8L171.4,197.3L168.5,196.1L168.6,199.5L166.0,199.8L164.1,197.1L162.2,198.9L163.4,196.0L160.8,196.8L163.7,195.5L163.0,192.6L161.6,194.6L160.1,193.5L160.6,195.8L158.9,194.5L155.5,197.0L157.6,197.4L163.6,212.0L161.0,214.8L156.7,211.4L154.3,212.8L151.6,203.9L155.8,199.5L153.6,195.6L155.6,192.5L161.2,191.5L160.3,189.5L166.0,178.3L164.0,174.4L152.3,172.0L152.4,170.1L140.6,173.1L145.5,169.0L141.9,168.2L144.3,166.1L138.9,159.5L142.3,149.2L137.1,140.3L135.5,127.4L143.0,114.4Z"/>
              <path class="india-state" d="M167.0,99.1L170.2,104.2L176.8,105.2L182.3,108.6L182.2,111.6L194.2,116.9L184.5,125.0L183.4,133.8L178.8,141.7L162.6,134.7L159.8,132.0L162.9,129.7L156.2,125.0L154.1,124.3L149.0,128.3L144.7,123.0L148.1,117.0L142.6,114.2L146.3,112.4L144.5,108.6L147.5,102.3L154.5,100.1L163.2,103.1L164.7,97.3L167.0,99.1Z"/>
              <path class="india-state" d="M300.2,167.4L310.2,167.1L315.2,172.5L326.0,174.1L326.2,178.3L321.5,186.1L315.7,183.3L314.6,179.0L312.7,178.0L314.3,181.4L310.9,181.7L303.9,175.9L306.1,179.7L301.0,183.1L300.1,188.8L302.3,188.6L306.4,193.4L310.4,193.2L313.4,196.9L312.1,198.9L305.0,198.4L304.3,202.5L300.4,202.6L298.5,207.0L303.3,211.6L309.3,213.3L309.8,218.0L306.9,220.0L306.7,223.5L310.2,225.9L309.0,229.8L313.1,230.4L310.9,233.8L312.6,238.9L310.3,238.2L312.6,240.1L311.0,243.0L308.4,240.4L311.4,244.3L309.2,246.8L308.2,244.5L307.4,251.4L305.7,252.0L306.6,249.4L305.4,251.7L303.9,250.5L302.4,254.3L301.3,247.3L296.6,242.9L301.1,248.4L297.8,248.3L297.2,253.2L290.6,256.3L286.9,250.7L283.8,252.2L283.7,249.3L279.1,247.7L281.7,245.3L279.8,240.8L274.7,237.5L276.5,234.1L271.6,234.0L265.9,229.6L269.0,224.5L272.9,227.1L275.0,223.7L280.3,222.8L280.3,220.5L287.0,220.5L286.9,217.1L290.2,218.0L293.7,215.3L297.9,203.3L294.9,200.0L294.7,195.0L299.4,193.5L295.4,186.8L302.7,179.8L301.8,176.6L299.9,176.8L300.9,171.5L298.2,167.4L298.8,165.8L300.2,167.4Z"/>
            </g>

            <!-- ══ MANDATE CITY PINS ══ -->

            <!-- Himachal Pradesh (Kasauli · Chail) lon 77.1°E lat 31.0°N → 136,100 -->
            <!-- Label placed LEFT side to avoid overlap with Chandigarh -->
            <g id="pin-himachal" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('himachal',true)" onmouseout="igMapHover('himachal',false)">
              <circle cx="136" cy="100" r="7.5" fill="#1A3A6B" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="136" cy="100" r="3" fill="#fff"/>
              <text x="125" y="95" class="map-pin-label" text-anchor="end">Kasauli · Chail</text>
              <text x="125" y="105" class="map-pin-sub" text-anchor="end">₹75 Cr</text>
            </g>

            <!-- Chandigarh lon 76.8°E lat 30.7°N → 131,108 -->
            <!-- Label placed RIGHT side -->
            <g id="pin-chandigarh" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('chandigarh',true)" onmouseout="igMapHover('chandigarh',false)">
              <circle cx="131" cy="112" r="7.5" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="131" cy="112" r="3" fill="#fff"/>
              <text x="142" y="109" class="map-pin-label">Chandigarh</text>
              <text x="142" y="119" class="map-pin-sub">₹70 Cr</text>
            </g>

            <!-- Delhi NCR lon 77.2°E lat 28.6°N → 137,138 — pulsing gold -->
            <g id="pin-delhi" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('delhi',true)" onmouseout="igMapHover('delhi',false)">
              <circle cx="137" cy="144" r="22" fill="rgba(184,150,12,.09)" stroke="rgba(184,150,12,.28)" stroke-width="1">
                <animate attributeName="r" values="22;32;22" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values=".7;0.08;.7" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="137" cy="144" r="12" fill="#B8960C" stroke="#fff" stroke-width="2" filter="url(#mapPinGlow)"/>
              <circle cx="137" cy="144" r="5" fill="#fff"/>
              <text x="154" y="138" class="map-pin-label" style="font-size:9.5px;">Delhi NCR</text>
              <text x="154" y="150" class="map-pin-sub" style="font-size:7px;opacity:.7;">3 Mandates · ₹900 Cr</text>
            </g>

            <!-- Jaipur lon 75.8°E lat 26.9°N → 116,166 -->
            <g id="pin-jaipur" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('jaipur',true)" onmouseout="igMapHover('jaipur',false)">
              <circle cx="116" cy="171" r="7.5" fill="#7C3AED" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="116" cy="171" r="3" fill="#fff"/>
              <text x="103" y="167" class="map-pin-label" text-anchor="end">Jaipur</text>
              <text x="103" y="177" class="map-pin-sub" text-anchor="end">₹20 Cr</text>
            </g>

            <!-- Mumbai lon 72.8°E lat 19.1°N → 72,293 -->
            <g id="pin-mumbai" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('mumbai',true)" onmouseout="igMapHover('mumbai',false)">
              <circle cx="72" cy="297" r="8" fill="#dc2626" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="72" cy="297" r="3.2" fill="#fff"/>
              <text x="59" y="293" class="map-pin-label" text-anchor="end">Mumbai</text>
              <text x="59" y="303" class="map-pin-sub" text-anchor="end">Pipeline</text>
            </g>

            <!-- Hyderabad lon 78.5°E lat 17.4°N → 156,323 -->
            <g id="pin-hyderabad" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('hyderabad',true)" onmouseout="igMapHover('hyderabad',false)">
              <circle cx="156" cy="323" r="7" fill="#b45309" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="156" cy="323" r="2.8" fill="#fff"/>
              <text x="168" y="319" class="map-pin-label">Hyderabad</text>
              <text x="168" y="329" class="map-pin-sub">Pipeline</text>
            </g>

            <!-- Bengaluru lon 77.6°E lat 12.9°N → 143,395 -->
            <g id="pin-bengaluru" class="map-pin-group" style="cursor:pointer;" onmouseover="igMapHover('bengaluru',true)" onmouseout="igMapHover('bengaluru',false)">
              <circle cx="143" cy="397" r="7" fill="#065F46" stroke="rgba(255,255,255,.9)" stroke-width="1.5"/>
              <circle cx="143" cy="397" r="2.8" fill="#fff"/>
              <text x="155" y="394" class="map-pin-label">Bengaluru</text>
              <text x="155" y="404" class="map-pin-sub">Pipeline</text>
            </g>

            <!-- ══ LEGEND ══ -->
            <rect x="5" y="463" width="390" height="50" rx="2"
              fill="rgba(184,150,12,.04)" stroke="rgba(184,150,12,.18)" stroke-width=".7"/>
            <text x="12" y="476" font-family="DM Sans,sans-serif" font-size="6" font-weight="700"
              fill="currentColor" opacity=".45" letter-spacing="1.5">ACTIVE MANDATE LOCATIONS</text>
            <circle cx="14" cy="490" r="4" fill="#B8960C"/>
            <text x="22" y="494" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Delhi NCR ₹900Cr</text>
            <circle cx="110" cy="490" r="4" fill="#065F46"/>
            <text x="118" y="494" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Chandigarh ₹70Cr</text>
            <circle cx="210" cy="490" r="4" fill="#1A3A6B"/>
            <text x="218" y="494" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Himachal ₹75Cr</text>
            <circle cx="300" cy="490" r="4" fill="#7C3AED"/>
            <text x="308" y="494" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".7">Jaipur ₹20Cr</text>
            <circle cx="14" cy="505" r="4" fill="#dc2626"/>
            <text x="22" y="509" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Mumbai · Pipeline</text>
            <circle cx="110" cy="505" r="4" fill="#065F46"/>
            <text x="118" y="509" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Bengaluru · Pipeline</text>
            <circle cx="210" cy="505" r="4" fill="#b45309"/>
            <text x="218" y="509" font-family="DM Sans,sans-serif" font-size="6.5" fill="currentColor" opacity=".5">Hyderabad · Pipeline</text>

          </svg>
          <!-- Hover tooltip -->
          <div id="map-tooltip" style="position:absolute;display:none;background:rgba(10,10,10,.95);color:#fff;padding:.5rem .75rem;font-size:.7rem;pointer-events:none;border:1px solid rgba(184,150,12,.35);max-width:180px;z-index:10;border-radius:3px;box-shadow:0 8px 24px rgba(0,0,0,.3);"></div>
        </div>
        <!-- Map caption -->
        <p class="india-map-caption" style="font-size:.62rem;color:var(--ink-faint);text-align:center;margin-top:.5rem;"><i class="fas fa-map-pin" style="color:var(--gold);margin-right:.3rem;font-size:.55rem;"></i>Pins show active India Gully advisory mandates · Updated Q1 2026 · J&amp;K shown per India's claimed boundaries</p>
        <script>
        (function(){
          var tooltips = {
            delhi:      { title:'Delhi NCR', sub:'Prism Tower · Ambience Tower · Sawasdee JLG', val:'₹900 Cr combined', color:'#B8960C' },
            chandigarh: { title:'Chandigarh', sub:'Hotel Rajshree & Spa · 41 Keys', val:'₹70 Cr', color:'#065F46' },
            himachal:   { title:'Himachal Pradesh', sub:'WelcomHeritage Kasauli · Maple Resort Chail', val:'₹75 Cr combined', color:'#1A3A6B' },
            jaipur:     { title:'Jaipur', sub:'Heritage Hotel · 43 Keys', val:'₹20 Cr', color:'#7C3AED' },
            mumbai:     { title:'Mumbai', sub:'BKC · Lower Parel · Advisory pipeline', val:'In discussion', color:'#dc2626' },
            bengaluru:  { title:'Bengaluru', sub:'Whitefield · MG Road · Active pipeline', val:'In discussion', color:'#065F46' },
            hyderabad:  { title:'Hyderabad', sub:'HITEC City · Banjara Hills · Advisory pipeline', val:'In discussion', color:'#b45309' },
          };
          window.igMapHover = function(id, on) {
            var tt = document.getElementById('map-tooltip');
            var wrap = document.getElementById('indiaMapWrap');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = on ? '0.55' : '1'; });
            var active = document.getElementById('pin-'+id);
            if (active) active.style.opacity = '1';
            if (!tt || !wrap) return;
            if (on && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            } else {
              tt.style.display = 'none';
              groups.forEach(function(g){ g.style.opacity = '1'; });
            }
          };
          // Fetch mandate locations from API and update tooltips dynamically
          fetch('/api/mandate-locations').then(function(r){ return r.json(); }).then(function(data){
            if (data && data.locations) {
              data.locations.forEach(function(loc){
                if (tooltips[loc.id]) {
                  tooltips[loc.id].val = loc.value;
                  tooltips[loc.id].sub = loc.mandates;
                }
              });
            }
          }).catch(function(){});

          // ── AUTO-CYCLE through mandate pins like Google Earth ──────────
          var _pins = ['delhi','chandigarh','himachal','jaipur','mumbai','bengaluru'];
          var _pinIdx = 0;
          var _cycleTimer = null;
          var _userInteracting = false;
          var _interactTimer = null;

          function igMapCyclePin(id) {
            var tt = document.getElementById('map-tooltip');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = '0.45'; g.style.transform = 'scale(1)'; g.style.transition = 'opacity .4s,transform .4s'; });
            var active = document.getElementById('pin-'+id);
            if (active) {
              active.style.opacity = '1';
              active.style.transform = 'scale(1.25)';
              active.style.transition = 'opacity .4s,transform .4s';
            }
            if (tt && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            }
          }

          function igMapResetAll() {
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = '1'; g.style.transform = 'scale(1)'; });
            var tt = document.getElementById('map-tooltip');
            if (tt) tt.style.display = 'none';
          }

          function igStartCycle() {
            _cycleTimer = setInterval(function(){
              if (_userInteracting) return;
              igMapResetAll();
              setTimeout(function(){
                igMapCyclePin(_pins[_pinIdx]);
                _pinIdx = (_pinIdx + 1) % _pins.length;
              }, 200);
            }, 2800);
            // Start first cycle immediately after 1.5s
            setTimeout(function(){
              igMapCyclePin(_pins[_pinIdx]);
              _pinIdx = (_pinIdx + 1) % _pins.length;
            }, 1500);
          }

          // Override hover to pause auto-cycle
          window.igMapHover = function(id, on) {
            _userInteracting = on;
            clearTimeout(_interactTimer);
            if (!on) {
              // Resume auto-cycle 4s after user stops interacting
              _interactTimer = setTimeout(function(){ _userInteracting = false; }, 4000);
            }
            var tt = document.getElementById('map-tooltip');
            var groups = document.querySelectorAll('.map-pin-group');
            groups.forEach(function(g){ g.style.opacity = on ? '0.45' : '1'; g.style.transform = 'scale(1)'; });
            var active = document.getElementById('pin-'+id);
            if (active) { active.style.opacity = '1'; if (on) active.style.transform = 'scale(1.2)'; }
            if (!tt) return;
            if (on && tooltips[id]) {
              var d = tooltips[id];
              tt.innerHTML = '<strong style="display:block;font-size:.72rem;color:'+d.color+';margin-bottom:.2rem;">'+d.title+'</strong>'+
                '<span style="display:block;font-size:.65rem;color:rgba(255,255,255,.65);margin-bottom:.2rem;">'+d.sub+'</span>'+
                '<span style="font-size:.65rem;color:#D4AE2A;font-weight:700;">'+d.val+'</span>';
              tt.style.display = 'block';
              tt.style.top = '12px'; tt.style.right = '12px'; tt.style.left = 'auto'; tt.style.transform = 'none';
            } else {
              tt.style.display = 'none';
              if (!on) groups.forEach(function(g){ g.style.opacity = '1'; g.style.transform = 'scale(1)'; });
            }
          };

          // Use IntersectionObserver to start cycle only when map is visible
          var mapWrap = document.getElementById('indiaMapWrap');
          if (mapWrap && 'IntersectionObserver' in window) {
            var obs = new IntersectionObserver(function(entries){
              entries.forEach(function(entry){
                if (entry.isIntersecting && !_cycleTimer) {
                  igStartCycle();
                } else if (!entry.isIntersecting && _cycleTimer) {
                  clearInterval(_cycleTimer); _cycleTimer = null;
                  _pinIdx = 0;
                  igMapResetAll();
                }
              });
            }, { threshold: 0.3 });
            obs.observe(mapWrap);
          } else {
            igStartCycle();
          }
        })();
        </script>
      </div>
    </div>
  </div>
</div>

<!-- ══ WHY INDIA GULLY ══════════════════════════════════════════════════ -->
<div class="sec-pc" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:5rem;align-items:start;margin-bottom:4.5rem;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Why India Gully</p>
        <h2 class="h2">The Advisory Partner<br>Built for India</h2>
      </div>
      <div style="display:flex;align-items:center;padding-top:1rem;">
        <div>
          <p class="lead" style="margin-bottom:1.5rem;">20+ years of boots-on-the-ground execution across every vertical — not just strategy, but delivery. We are investors' most trusted partner in India's complex advisory landscape.</p>
          <div style="width:48px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        </div>
      </div>
    </div>

    <!-- Why cards grid -->
    <div class="why-grid">
      ${[
        { icon:'trophy',         color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'₹2,000+ Cr Transacted',       desc:'Landmark transactions including joint advisory with EY for the ₹1,350 Cr+ 100% shareholder-consented divestment of Entertainment City Limited, Noida.' },
        { icon:'hotel',          color:'#065F46', bg:'rgba(6,95,70,.08)',    border:'rgba(6,95,70,.18)',    title:'15+ Hotels On-Boarded',        desc:'Hotel brand selection, pre-opening management and PMC across Marriott, Radisson, Cygnett, Regenta and more — from site selection to first check-in.' },
        { icon:'store',          color:'#1A3A6B', bg:'rgba(26,58,107,.08)', border:'rgba(26,58,107,.18)',  title:'1,40,000+ Sq Ft Leased',       desc:'Premium F&B and retail leasing at Gardens Galleria, Hyatt Andaz, AIPL Joy Street and Entertainment City — India\'s top retail destinations.' },
        { icon:'utensils',       color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'HORECA to 15+ Properties',     desc:'End-to-end supply of FF&E, OS&E, kitchen equipment and amenities for Mahindra Holidays, Accor, CGH Earth and more across India.' },
        { icon:'handshake',      color:'#7C3AED', bg:'rgba(124,58,237,.08)', border:'rgba(124,58,237,.18)', title:'Co-Advisory with EY & CBRE',   desc:'Trusted by India\'s top professional service firms as co-advisor on complex, multi-party institutional transactions requiring deep sector expertise.' },
        { icon:'map-marked-alt', color:'#B8960C', bg:'rgba(184,150,12,.08)', border:'rgba(184,150,12,.18)', title:'Pan-India Presence',           desc:'Active mandates in Delhi NCR, Chandigarh, Kasauli, Chail, Jaipur, Noida, Gurugram, Bengaluru, Mumbai and Kerala — Tier 1 to 3 markets.' },
      ].map((w, wi) => `
      <div class="why-card reveal" style="transition-delay:${wi*0.07}s;">
        <div class="why-icon" style="background:${w.bg};border:1px solid ${w.border};">
          <i class="fas fa-${w.icon}" style="color:${w.color};font-size:1.1rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);margin-bottom:.6rem;line-height:1.25;">${w.title}</h3>
        <p style="font-size:.875rem;line-height:1.8;color:var(--ink-soft);">${w.desc}</p>
        <div style="width:28px;height:1px;background:linear-gradient(90deg,${w.color},transparent);margin-top:1.25rem;opacity:.6;"></div>
      </div>`).join('')}
    </div>

  </div>
</div>

<!-- ══ FEATURED MANDATES ═══════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;padding-top:7rem;padding-bottom:7rem;">
  <!-- Background texture -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 100%,rgba(184,150,12,.04) 0%,transparent 60%);pointer-events:none;"></div>

  <div class="wrap" style="position:relative;">

    <!-- Section header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow-lt" style="margin-bottom:1rem;">Active Mandates</p>
        <h2 class="h2-lt" style="max-width:500px;">Investment Opportunities<br>of Institutional Grade</h2>
      </div>
      <div style="text-align:right;max-width:360px;">
        <p style="font-size:.875rem;line-height:1.8;color:rgba(255,255,255,.45);margin-bottom:1.5rem;">Exclusive mandates across Hospitality, Real Estate, Heritage & Mixed-Use. All strictly subject to NDA.</p>
        <a href="/listings" class="btn btn-ghost-g">View All 8 Mandates <i class="fas fa-arrow-right" style="font-size:.6rem;margin-left:.25rem;"></i></a>
      </div>
    </div>

    <!-- Featured 3-column mandate cards -->
    <div id="featuredMandates">
      ${LISTINGS.filter((l: any) => l.highlight).slice(0,3).map((l: any, idx: number) => {
        const img = l.images?.[0] || ''
        const ss = { active: { bg:'rgba(184,150,12,.15)', text:'#D4AE2A', border:'rgba(184,150,12,.35)' }, negotiation: { bg:'rgba(59,130,246,.12)', text:'#60a5fa', border:'rgba(59,130,246,.3)' }, feasibility: { bg:'rgba(22,163,74,.1)', text:'#4ade80', border:'rgba(22,163,74,.25)' } }[l.statusType] || { bg:'rgba(184,150,12,.15)', text:'#D4AE2A', border:'rgba(184,150,12,.35)' }
        return `
      <a href="/listings/${l.id}"
         class="ed-card reveal"
         style="display:block;text-decoration:none;transition-delay:${idx*0.1}s;"
         onmouseover="this.style.borderColor='rgba(184,150,12,.4)';this.style.boxShadow='0 24px 70px rgba(0,0,0,.5)';this.style.transform='translateY(-6px)'"
         onmouseout="this.style.borderColor='rgba(255,255,255,.08)';this.style.boxShadow='none';this.style.transform='translateY(0)'"
         style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);overflow:hidden;transition:all .3s cubic-bezier(.4,0,.2,1);">

        <!-- Image area -->
        <div class="ed-card-img" style="height:248px;background:#0a0a12;position:relative;">
          ${img
            ? `<img src="${img}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,#090912 0%,#0f0f1e 50%,#111128 100%);position:relative;overflow:hidden;">
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:32px 32px;"></div>
                <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(184,150,12,.06) 0%,transparent 70%);"></div>
                <div style="position:relative;text-align:center;">
                  <div style="width:56px;height:56px;background:rgba(184,150,12,.1);border:1.5px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;border-radius:2px;">
                    <i class="fas fa-lock" style="color:var(--gold);font-size:1.2rem;"></i>
                  </div>
                  <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;line-height:1;margin-bottom:.25rem;">${l.value}</div>
                  ${l.valueUSD ? `<div style="font-size:.58rem;color:rgba(255,255,255,.4);letter-spacing:.05em;margin-bottom:.5rem;">${l.valueUSD}</div>` : '<div style="margin-bottom:.5rem;"></div>'}
                  <div style="font-size:.56rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(184,150,12,.7);">Confidential · NDA</div>
                </div>
              </div>`
          }
          <!-- Gradient overlay (images only) -->
          ${img ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.2) 50%,transparent 100%);"></div>` : ''}

          <!-- Sector pill -->
          <div style="position:absolute;top:1.25rem;left:1.25rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.57rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.28rem .75rem;">${l.sector}</span>
          </div>
          <!-- NDA badge always shown -->
          <div style="position:absolute;top:1.25rem;right:1.25rem;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);padding:.22rem .65rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(184,150,12,.4);">
            <i class="fas fa-lock" style="font-size:.48rem;color:var(--gold);"></i>
            <span style="font-size:.54rem;color:rgba(255,255,255,.85);letter-spacing:.08em;font-weight:700;text-transform:uppercase;">NDA</span>
          </div>

          <!-- Value overlay on image bottom (images only) -->
          ${img ? `<div style="position:absolute;bottom:1.25rem;left:1.25rem;right:1.25rem;display:flex;align-items:flex-end;justify-content:space-between;">
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.1rem;color:#fff;line-height:1;text-shadow:0 2px 12px rgba(0,0,0,.6);">${l.value}</div>
              ${l.valueUSD ? `<div style="font-size:.6rem;color:rgba(255,255,255,.5);letter-spacing:.08em;">${l.valueUSD}</div>` : ''}
            </div>
            <div style="background:rgba(0,0,0,.4);backdrop-filter:blur(6px);padding:.2rem .55rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.15);">
              <i class="fas fa-images" style="font-size:.48rem;color:rgba(255,255,255,.5);"></i>
              <span style="font-size:.54rem;color:rgba(255,255,255,.6);letter-spacing:.06em;">${l.images.length} photos · NDA</span>
            </div>
          </div>` : ''}
        </div>

        <!-- Content -->
        <div style="padding:1.75rem;">
          <!-- Status + location -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem;">
            <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .65rem;">${l.status}</span>
            <span style="font-size:.68rem;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.55rem;"></i>${l.locationShort}</span>
          </div>

          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;line-height:1.2;margin-bottom:.35rem;">${l.title}</h3>
          <p style="font-size:.72rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1rem;">${l.subtitle}</p>

          <!-- Description -->
          <p style="font-size:.825rem;color:rgba(255,255,255,.45);line-height:1.75;margin-bottom:1.25rem;">${l.desc}</p>

          <!-- Highlights row -->
          <div style="display:flex;gap:.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
            ${l.highlights.slice(0,2).map((h: any) => `
            <div style="flex:1;min-width:120px;padding:.75rem 1rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);">
              <div style="font-size:.58rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:.3rem;">${h.label}</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);line-height:1;">${h.value}</div>
            </div>`).join('')}
          </div>

          <!-- CTA row -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1.1rem;border-top:1px solid rgba(255,255,255,.07);">
            <span style="font-size:.68rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">
              <i class="fas fa-file-signature" style="font-size:.6rem;"></i>View Mandate
            </span>
            <div style="width:28px;height:28px;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.25);display:flex;align-items:center;justify-content:center;transition:all .22s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(184,150,12,.12)';this.style.borderColor='rgba(184,150,12,.25)'">
              <i class="fas fa-arrow-right" style="font-size:.55rem;color:var(--gold);pointer-events:none;"></i>
            </div>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>

    <!-- Remaining mandates list -->
    <div style="border:1px solid rgba(255,255,255,.07);overflow:hidden;margin-top:.25rem;">
      <div style="padding:1.1rem 1.75rem;background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.06);">
        <div style="display:flex;align-items:center;gap:.75rem;">
          <i class="fas fa-folder-open" style="color:var(--gold);font-size:.75rem;"></i>
          <span style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);">More Active Mandates</span>
        </div>
        <a href="/listings" style="font-size:.65rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">View All <i class="fas fa-arrow-right" style="font-size:.55rem;"></i></a>
      </div>
      ${LISTINGS.filter((l: any) => !l.highlight).map((l: any) => `
      <a href="/listings/${l.id}"
         style="display:flex;align-items:center;gap:1.5rem;padding:1.1rem 1.75rem;border-bottom:1px solid rgba(255,255,255,.04);text-decoration:none;transition:background .2s;"
         onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
        ${l.images?.[0]
          ? `<div style="width:60px;height:46px;overflow:hidden;flex-shrink:0;border:1px solid rgba(255,255,255,.08);"><img src="${l.images[0]}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"></div>`
          : `<div style="width:60px;height:46px;flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;"><i class="fas fa-lock" style="color:rgba(184,150,12,.5);font-size:.7rem;"></i></div>`
        }
        <div style="flex:1;min-width:0;">
          <div style="font-size:.875rem;font-weight:600;color:#fff;margin-bottom:.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${l.title}</div>
          <div style="font-size:.7rem;color:rgba(255,255,255,.35);">${l.locationShort} · ${l.sector}</div>
        </div>
        <div style="flex-shrink:0;text-align:right;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--gold);">${l.value}</div>
          <div style="font-size:.6rem;color:rgba(255,255,255,.3);letter-spacing:.06em;margin-top:.1rem;">${l.status}</div>
        </div>
        <i class="fas fa-chevron-right" style="font-size:.55rem;color:rgba(255,255,255,.2);flex-shrink:0;"></i>
      </a>`).join('')}
    </div>

    <!-- NDA disclaimer -->
    <div style="text-align:center;margin-top:2rem;padding:1.25rem;border:1px solid rgba(184,150,12,.1);background:rgba(184,150,12,.03);">
      <p style="font-size:.72rem;color:rgba(255,255,255,.35);line-height:1.75;">
        <i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.5rem;font-size:.65rem;"></i>
        All mandates strictly by Mutual NDA · Information Memoranda available to qualified investors, family offices &amp; institutional buyers upon request
      </p>
    </div>

  </div>
</div>

<!-- ══ ADVISORY VERTICALS ═════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:5rem;align-items:start;margin-bottom:4.5rem;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Advisory Verticals</p>
        <h2 class="h2">Six Verticals.<br>One Trusted Partner.</h2>
      </div>
      <div style="display:flex;align-items:flex-end;padding-bottom:.25rem;">
        <p class="lead" style="max-width:480px;">From strategy to execution, India Gully delivers institutional-grade advisory across every sector it operates in. Deep expertise. Proven results.</p>
      </div>
    </div>

    <!-- Vertical grid -->
    <div class="vg">
      ${VERTICALS.map((v: any) => `
      <div class="vg-cell" onclick="window.location='/services#${v.id}'" role="button" tabindex="0">
        <div class="vg-icon">
          <span style="font-size:1.45rem;">${v.icon}</span>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);margin-bottom:.65rem;line-height:1.2;">${v.name}</h3>
        <p style="font-size:.875rem;line-height:1.8;color:var(--ink-soft);margin-bottom:1.1rem;">${v.desc}</p>
        <div class="vg-arr" style="display:flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;">
          Explore <i class="fas fa-arrow-right" style="font-size:.6rem;"></i>
        </div>
      </div>`).join('')}
    </div>

  </div>
</div>

<!-- ══ THE INDIA GULLY DIFFERENCE ════════════════════════════════════ -->
<div class="sec-dk diff-section" style="background:#0a0a10;position:relative;overflow:hidden;padding-top:7rem;padding-bottom:7rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>

  <div class="wrap" style="position:relative;">
    <div style="text-align:center;max-width:640px;margin:0 auto 4.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow-lt" style="margin-bottom:1rem;">Our Proposition</p>
      <h2 class="h2-lt" style="color:#fff;">The India Gully Difference</h2>
      <p style="font-size:1rem;line-height:1.85;color:rgba(255,255,255,.6);margin-top:1.25rem;">What separates us from other advisory firms is not just depth of expertise — it is the way we stay committed from mandate inception to final delivery.</p>
    </div>

    <div class="diff-grid">
      ${[
        { icon:'flag',      n:'01', title:'India-Deep Expertise',    desc:'Born in India. We understand local markets, regulations, culture and consumer behaviour at granular depth across Tier 1, 2 and 3 cities.' },
        { icon:'handshake', n:'02', title:'20+ Brand Relationships', desc:'Deep relationships with every major hotel brand. We know which brand fits which project and navigate negotiations with authority.' },
        { icon:'utensils',  n:'03', title:'HORECA End-to-End',       desc:'One of the few consultants who also procure and supply, giving clients a single accountable partner from strategy to FF&E delivery.' },
        { icon:'bolt',      n:'04', title:'Execution-Led',           desc:'We stay involved through implementation, not just advisory. Turnkey delivery and hands-on project management is our differentiator.' },
      ].map((d, di) => `
      <div class="diff-cell reveal" style="transition-delay:${di*0.1}s;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:4rem;color:rgba(212,174,42,.18);line-height:1;margin-bottom:1.25rem;letter-spacing:-.05em;">${d.n}</div>
        <div class="ig-icon-box" style="margin-bottom:1.75rem;">
          <i class="fas fa-${d.icon}" style="color:var(--gold);font-size:.85rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;color:#fff;line-height:1.2;margin-bottom:1rem;">${d.title}</h3>
        <p style="font-size:.875rem;line-height:1.85;color:rgba(255,255,255,.6);">${d.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ BRAND PARTNERS ═════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">

    <!-- ── HOSPITALITY BRANDS ── -->
    <div style="margin-bottom:6rem;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1.5rem;">
        <div>
          <div class="gr"></div>
          <p class="eyebrow" style="margin-bottom:.875rem;">Hospitality Partners</p>
          <h2 class="h2">Hotel Brands We<br>Work With</h2>
        </div>
        <div style="max-width:380px;text-align:right;">
          <p class="lead" style="font-size:.9375rem;margin-bottom:1.25rem;">Active relationships with India's most prominent hotel brands — from global chains to homegrown operators. Including our exclusive partner <strong>Nile Hospitality</strong>.</p>
          <a href="/services#hospitality" class="btn btn-sm btn-dko">Our Hospitality Practice</a>
        </div>
      </div>

      <!-- Category filter tabs for hotel brands -->
      <div id="hb-filters" style="display:flex;gap:.5rem;margin-bottom:2rem;flex-wrap:wrap;">
        ${['All','Global Chain','Indian Luxury','Midscale','Economy'].map((c,i) => `
        <button onclick="filterHB('${c}')" data-hbcat="${c}"
          style="padding:.3rem .85rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'var(--border)'};background:${i===0?'rgba(184,150,12,.08)':'transparent'};color:${i===0?'var(--gold)':'var(--ink-muted)'};cursor:pointer;transition:all .2s;">
          ${c}${c!=='All'?` <span style="font-size:.55rem;opacity:.7;">(${HOSPITALITY_BRANDS.filter((b:any)=>b.cat===c).length})</span>`:''}
        </button>`).join('')}
      </div>

      <!-- Hotel brand grid -->
      <div id="hbGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;">
        ${HOSPITALITY_BRANDS.map((b: any) => `
        <div class="hb-card" data-hbcat="${b.cat}"
          style="border:1px solid var(--border);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:all .25s;cursor:default;"
          onmouseover="this.style.borderColor='${b.color}';this.style.background='rgba(${parseInt(b.color.slice(1,3),16)},${parseInt(b.color.slice(3,5),16)},${parseInt(b.color.slice(5,7),16)},.04)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <img src="${b.svg}" alt="${b.name}" width="155" height="62"
               style="width:155px;height:62px;object-fit:contain;border-radius:3px;"
               loading="lazy" decoding="async">
          <div style="text-align:center;">
            <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);">${b.cat}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- ── RETAIL BRANDS ── -->
    <div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1.5rem;">
        <div>
          <div class="gr"></div>
          <p class="eyebrow" style="margin-bottom:.875rem;">Retail Partners</p>
          <h2 class="h2">Retail Brands We<br>Advise &amp; Place</h2>
        </div>
        <div style="max-width:420px;text-align:right;">
          <p class="lead" style="font-size:.9375rem;margin-bottom:1.25rem;">${RETAIL_BRANDS.length}+ active retail brand relationships — F&amp;B, anchor stores, cinemas, fashion, accessories &amp; electronics.</p>
          <a href="/services#retail" class="btn btn-sm btn-dko">Our Retail Practice</a>
        </div>
      </div>

      <!-- Retail category tabs -->
      <div id="rb-filters" style="display:flex;gap:.5rem;margin-bottom:2rem;flex-wrap:wrap;">
        ${['All','F&B','Anchor Retail','Cinema','Fashion & Apparel','Accessories & Beauty','Electronics'].map((c,i) => `
        <button onclick="filterRB('${c}')" data-rbcat="${c}"
          style="padding:.3rem .85rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'var(--border)'};background:${i===0?'rgba(184,150,12,.08)':'transparent'};color:${i===0?'var(--gold)':'var(--ink-muted)'};cursor:pointer;transition:all .2s;">
          ${c}${c!=='All'?` <span style="font-size:.55rem;opacity:.7;">(${RETAIL_BRANDS.filter((b:any)=>b.cat===c).length})</span>`:''}
        </button>`).join('')}
      </div>

      <!-- Retail brand grid -->
      <div id="rbGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;">
        ${RETAIL_BRANDS.map((b: any) => `
        <div class="rb-card" data-rbcat="${b.cat}"
          style="border:1px solid var(--border);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;transition:all .25s;cursor:default;"
          onmouseover="this.style.borderColor='${b.color}';this.style.background='rgba(${parseInt(b.color.slice(1,3),16)},${parseInt(b.color.slice(3,5),16)},${parseInt(b.color.slice(5,7),16)},.04)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.background='transparent'">
          <img src="${b.svg}" alt="${b.name}" width="155" height="62"
               style="width:155px;height:62px;object-fit:contain;border-radius:3px;"
               loading="lazy" decoding="async">
          <div style="text-align:center;">
            <div style="font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);">${b.cat}</div>
          </div>
        </div>`).join('')}
      </div>

      <!-- Category count summary strip -->
      <div style="display:flex;gap:1rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center;padding:1.5rem;background:rgba(184,150,12,.03);border:1px solid rgba(184,150,12,.12);">
        ${['F&B','Anchor Retail','Cinema','Fashion & Apparel','Accessories & Beauty','Electronics'].map((c: string) => {
          const count = RETAIL_BRANDS.filter((b: any) => b.cat === c).length
          const icons: Record<string,string> = {
            'F&B':'fa-utensils','Anchor Retail':'fa-store','Cinema':'fa-film',
            'Fashion & Apparel':'fa-shirt','Accessories & Beauty':'fa-gem','Electronics':'fa-mobile-screen'
          }
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:80px;">
            <i class="fas ${icons[c]||'fa-tag'}" style="font-size:.9rem;color:var(--gold);"></i>
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);">${count}</span>
            <span style="font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);text-align:center;">${c}</span>
          </div>`
        }).join('')}
      </div>
    </div>

  </div>
</div>

<script>
/* ── Brand filter tabs ────────────────────────────────────────────── */
function filterHB(cat){
  document.querySelectorAll('[data-hbcat]').forEach(function(el){
    if(el.tagName === 'BUTTON'){
      var isActive = el.getAttribute('data-hbcat') === cat;
      el.style.borderColor  = isActive ? 'var(--gold)' : 'var(--border)';
      el.style.background   = isActive ? 'rgba(184,150,12,.08)' : 'transparent';
      el.style.color        = isActive ? 'var(--gold)' : 'var(--ink-muted)';
    } else {
      var show = cat === 'All' || el.getAttribute('data-hbcat') === cat;
      el.style.display = show ? '' : 'none';
    }
  });
}
function filterRB(cat){
  document.querySelectorAll('[data-rbcat]').forEach(function(el){
    if(el.tagName === 'BUTTON'){
      var isActive = el.getAttribute('data-rbcat') === cat;
      el.style.borderColor  = isActive ? 'var(--gold)' : 'var(--border)';
      el.style.background   = isActive ? 'rgba(184,150,12,.08)' : 'transparent';
      el.style.color        = isActive ? 'var(--gold)' : 'var(--ink-muted)';
    } else {
      var show = cat === 'All' || el.getAttribute('data-rbcat') === cat;
      el.style.display = show ? '' : 'none';
    }
  });
}
</script>

<!-- ══ Phase 43: SECTOR VELOCITY / DEAL ACTIVITY ══════════════════════ -->
<div style="background:linear-gradient(135deg,#04040a 0%,#080810 60%,#0a0a14 100%);border-top:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);padding:4rem 0;overflow:hidden;position:relative;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;" class="mob-stack">

      <!-- LEFT: Live Activity feed -->
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Live Deal Activity</p>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.95rem;color:#fff;line-height:1.2;margin-bottom:2rem;">Q1 2026<br><em style="color:var(--gold);font-style:italic;">Mandate Pulse</em></h2>
        <div>
          ${[
            { icon:'rocket',       color:'#16a34a', badge:'Active',      text:'Prism Tower, Gurugram',           sub:'₹400 Cr · Mixed-Use · Due Diligence Stage' },
            { icon:'handshake',    color:'#B8960C', badge:'Negotiation', text:'Belcibo Multi-Brand Platform',   sub:'₹120 Cr · F&B Franchise · Term Sheet Review' },
            { icon:'hotel',        color:'#7C3AED', badge:'Feasibility', text:'Boutique Hotel Asset, Kasauli',  sub:'₹85 Cr · Heritage Hospitality · Site Approved' },
            { icon:'store',        color:'#0369a1', badge:'Listed',      text:'Jaipur Heritage Estate',         sub:'₹575 Cr · Heritage Hospitality · IM Ready' },
            { icon:'chart-line',   color:'#B8960C', badge:'Active',      text:'Sawasdee JLG Galleria, Noida',  sub:'HORECA Retail · Anchor Leasing · 12,000 sqft' },
          ].map((item, ii) => `
          <div class="reveal" style="display:flex;gap:1rem;padding:.875rem 0;border-bottom:1px solid rgba(255,255,255,.06);transition-delay:${ii*0.08}s;" class="mob-stack">
            <div style="width:36px;height:36px;flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.72rem;"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.2rem;">
                <span style="font-size:.78rem;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.text}</span>
                <span style="font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${item.color};background:rgba(255,255,255,.05);padding:.12rem .45rem;flex-shrink:0;">${item.badge}</span>
              </div>
              <div style="font-size:.68rem;color:rgba(255,255,255,.38);">${item.sub}</div>
            </div>
          </div>`).join('')}
        </div>
        <a href="/pipeline" style="display:inline-flex;align-items:center;gap:.5rem;margin-top:1.5rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);text-decoration:none;transition:gap .2s;" onmouseover="this.style.gap='.75rem'" onmouseout="this.style.gap='.5rem'">
          View Full Pipeline <i class="fas fa-arrow-right" style="font-size:.6rem;"></i>
        </a>
      </div>

      <!-- RIGHT: Sector breakdown with animated bars -->
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Advisory Mix</p>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.95rem;color:#fff;line-height:1.2;margin-bottom:2rem;">Sector<br><em style="color:var(--gold);font-style:italic;">Distribution</em></h2>
        <div id="sectorBarsHome" style="display:flex;flex-direction:column;gap:1.25rem;">
          ${[
            { label:'Real Estate & Commercial', pct:45, val:'₹524 Cr',  color:'#1A3A6B' },
            { label:'Hospitality & Hotels',     pct:28, val:'₹325 Cr',  color:'#065F46' },
            { label:'Retail & Leasing',         pct:14, val:'₹163 Cr',  color:'#7C3AED' },
            { label:'HORECA & F&B',             pct: 9, val:'₹105 Cr',  color:'#B8960C' },
            { label:'Debt & Special',            pct: 4, val:'₹48 Cr',   color:'#b91c1c' },
          ].map((s, si) => `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;">
              <span style="font-size:.72rem;font-weight:600;color:rgba(255,255,255,.75);">${s.label}</span>
              <span style="font-size:.68rem;color:var(--gold);font-weight:700;">${s.val} <span style="color:rgba(255,255,255,.3);font-weight:400;">(${s.pct}%)</span></span>
            </div>
            <div style="height:5px;background:rgba(255,255,255,.07);overflow:hidden;">
              <div class="home-sector-bar" data-pct="${s.pct}" style="height:100%;width:0%;background:${s.color};transition:width 1.3s cubic-bezier(.4,0,.2,1);transition-delay:${si*0.12}s;"></div>
            </div>
          </div>`).join('')}
        </div>
        <div style="margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.06);">
          <div style="display:flex;gap:2.5rem;flex-wrap:wrap;">
            ${[
              { n:'₹1,165 Cr+', l:'Total Pipeline' },
              { n:'8',           l:'Live Mandates'  },
              { n:'Q1 2026',     l:'Data Period'    },
            ].map(s => `
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.45rem;color:var(--gold);line-height:1;margin-bottom:.2rem;">${s.n}</div>
              <div style="font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);">${s.l}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>

    </div>
  </div>
  <script>
  /* Phase 43: Animate sector bars on scroll */
  (function(){
    var bars = document.querySelectorAll('.home-sector-bar');
    if (!bars.length) return;
    function animateBars() {
      bars.forEach(function(bar) {
        bar.style.width = (bar.dataset.pct || '0') + '%';
      });
    }
    var section = document.getElementById('sectorBarsHome');
    if (section && 'IntersectionObserver' in window) {
      var ob = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { animateBars(); ob.disconnect(); }
        });
      }, { threshold: 0.25 });
      ob.observe(section);
    } else {
      animateBars();
    }
  })();
  </script>
</div>

<!-- ══ RECENT INSIGHTS ═════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5.5rem;padding-bottom:5.5rem;border-top:1px solid var(--border);">
  <div class="wrap">

    <!-- Section header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Knowledge & Research</p>
        <h2 class="h2" style="margin-bottom:.5rem;">Recent Insights</h2>
        <p style="font-size:.88rem;color:var(--ink-muted);max-width:480px;line-height:1.7;">Advisory intelligence from India Gully's active deal pipeline — sector analysis, regulatory briefings, and market forecasts.</p>
      </div>
      <a href="/insights" class="btn btn-dko" style="flex-shrink:0;"><i class="fas fa-book-open" style="margin-right:.5rem;font-size:.7rem;"></i>All Articles</a>
    </div>

    <!-- 3-column article cards -->
    <div class="insights-strip-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;">
      ${RECENT_INSIGHTS.map((a, idx) => `
      <article class="ins-home-card reveal" style="border:1px solid var(--border);overflow:hidden;transition:box-shadow .25s,transform .25s;" onmouseover="this.style.boxShadow='0 12px 40px rgba(0,0,0,.12)';this.style.transform='translateY(-3px)'" onmouseout="this.style.boxShadow='';this.style.transform=''">
        <!-- Thumbnail -->
        <a href="/insights/${a.id}" style="display:block;position:relative;height:168px;overflow:hidden;">
          <img src="${a.img}" alt="${a.title}" loading="lazy"
               style="width:100%;height:100%;object-fit:cover;transition:transform 5s ease;"
               onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%);"></div>
          <span style="position:absolute;top:.875rem;left:.875rem;background:${a.color};color:#fff;font-size:.52rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .65rem;">${a.category}</span>
        </a>
        <!-- Body -->
        <div style="padding:1.5rem;">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.875rem;">
            <span style="font-size:.62rem;color:var(--ink-muted);">${a.date}</span>
            <span style="width:3px;height:3px;border-radius:50%;background:var(--border-dark);display:inline-block;"></span>
            <span style="font-size:.62rem;color:var(--ink-muted);"><i class="fas fa-clock" style="margin-right:.25rem;font-size:.55rem;"></i>${a.readTime}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.08rem;color:var(--ink);line-height:1.4;margin-bottom:.75rem;">
            <a href="/insights/${a.id}" style="text-decoration:none;color:inherit;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='inherit'">${a.title}</a>
          </h3>
          <p style="font-size:.8rem;color:var(--ink-soft);line-height:1.75;margin-bottom:1.25rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${a.excerpt}</p>
          <a href="/insights/${a.id}" style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${a.color};text-decoration:none;display:inline-flex;align-items:center;gap:.35rem;transition:gap .2s;" onmouseover="this.style.gap='.55rem'" onmouseout="this.style.gap='.35rem'">
            Read Article <i class="fas fa-arrow-right" style="font-size:.58rem;"></i>
          </a>
        </div>
      </article>`).join('')}
    </div>

    <style>
      @media(max-width:900px){.insights-strip-grid{grid-template-columns:repeat(2,1fr)!important;}}
      @media(max-width:560px){.insights-strip-grid{grid-template-columns:1fr!important;}}
    </style>

  </div>
</div>

<!-- ══ ADVISORY PARTNERS ══════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;" class="mob-stack">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Transaction Advisory</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">Our Advisory<br>Partners</h2>
        <p class="lead" style="margin-bottom:2rem;">India Gully collaborates with globally recognised advisory and consulting firms, bringing institutional credibility, financial rigour and sector depth to complex mandates.</p>
        <div style="padding:1.25rem 1.5rem;border-left:3px solid var(--gold);background:rgba(184,150,12,.04);">
          <p style="font-size:.82rem;line-height:1.8;color:var(--ink-soft);">Joint advisory with Ernst &amp; Young on the <strong style="color:var(--ink);">₹1,350+ Cr Entertainment City Limited divestment</strong> — a 100% shareholder-consented divestment, one of India's most significant entertainment real estate transactions.</p>
        </div>
      </div>
      <div class="partners-grid" style="grid-template-columns:repeat(3,1fr);">
        ${ADVISORY_PARTNERS.slice(0,3).map((p: any) => `
        <div class="partner-card reveal">
          <div style="height:52px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
            <img src="${p.logo}" alt="${p.name}" style="max-width:140px;max-height:42px;width:auto;height:auto;object-fit:contain;"
                 loading="lazy" decoding="async"
                 onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
            <div style="display:none;align-items:center;justify-content:center;width:130px;height:42px;background:${p.color};border-radius:2px;">
              <span style="font-size:.78rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};">${p.abbr}</span>
            </div>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);margin-bottom:.25rem;">${p.name}</div>
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);">${p.sub}</div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Row 2: remaining partners centred -->
    ${ADVISORY_PARTNERS.slice(3).length > 0 ? `
    <div style="display:flex;justify-content:center;gap:1.5rem;margin-top:1.75rem;flex-wrap:wrap;">
      ${ADVISORY_PARTNERS.slice(3).map((p: any) => `
      <div class="partner-card" style="padding:1.75rem 2.5rem;flex:0 0 auto;min-width:160px;">
        <div style="height:52px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
          <img src="${p.logo}" alt="${p.name}" style="max-width:150px;max-height:46px;width:auto;height:auto;object-fit:contain;"
               loading="lazy" decoding="async"
               onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
          <div style="display:none;align-items:center;justify-content:center;width:130px;height:42px;background:${p.color};border-radius:2px;">
            <span style="font-size:.78rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};">${p.abbr}</span>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);text-align:center;margin-bottom:.25rem;">${p.name}</div>
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);text-align:center;">${p.sub}</div>
      </div>`).join('')}
    </div>` : ''}
  </div>
</div>

<!-- ══ TRACK RECORD ══════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:4rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Track Record</p>
        <h2 class="h2">Mandates Executed.<br>Relationships Built.</h2>
      </div>
      <a href="/works" class="btn btn-dko">View All Completed Works</a>
    </div>

    <div id="trackRecord">
      ${[
        { title:'Entertainment City Limited — Landmark Divestment',  loc:'Joint Advisory with EY · Noida, UP',      icon:'🏆', type:'Transaction Advisory', value:'₹1,350+ Cr', desc:'Served as Joint Transaction Advisors alongside EY for the 100% shareholder-consented divestment of Entertainment City Limited. A landmark entertainment real estate transaction with full board and promoter alignment.' },
        { title:'Worlds of Wonder — Post-COVID Re-opening',          loc:'10-Acre Waterpark · Noida, UP',           icon:'🎡', type:'Operational Revival',  value:'Pan-India',  desc:"Orchestrated the strategic re-opening of India's premier waterpark following COVID-19 closure. Managed lease negotiations and operational revival for this 10-acre world-class attraction." },
        { title:'Khubani at Hyatt Andaz Delhi',                      loc:'42,000 Sq. Ft. Dining · New Delhi',       icon:'🍽️', type:'Hospitality Leasing',  value:'42,000 Sq Ft', desc:'Negotiated and executed leasing for a signature 27,000 + 15,000 Sq. Ft. premium restaurant space within the iconic Hyatt Andaz property in New Delhi.' },
        { title:'800 Sq. Yard Asset — Anand Lok, New Delhi',         loc:'₹65 Cr+ Exit · South Delhi',              icon:'🏛️', type:'Asset Acquisition',    value:'₹65 Cr+', desc:'Executed a strategic acquisition of a prime South Delhi property. Delivered an exceptional ₹65+ Crores exit within a 6-month turnaround — demonstrating superior deal structuring and market timing.' },
        { title:'HORECA Supply — Mahindra Holidays & Resorts',        loc:'Pan-India · Multiple Locations',          icon:'🍽️', type:'HORECA Procurement',   value:'Pan-India', desc:"Established strategic HORECA supply partnership with Mahindra Holidays & Resorts, one of India's largest leisure hospitality companies, across their pan-India resort network." },
        { title:'Due Diligence — Adlabs Imagica for ECL',            loc:'₹500 Cr Transaction · Maharashtra',       icon:'⚖️', type:'Client-Side SPOC',     value:'₹500 Cr', desc:'Served as dedicated Client-Side SPOC for comprehensive due diligence in ECL\'s evaluation of Adlabs Imagica. Coordinated financial, legal and technical assessments for this landmark acquisition review.' },
      ].map((p, pi) => `
      <div class="feature-card reveal" style="padding:0;overflow:hidden;transition-delay:${pi*0.08}s;">
        <!-- Colored top strip -->
        <div style="height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);"></div>
        <div style="padding:2rem 1.75rem;">
          <!-- Icon + type -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;gap:.75rem;">
            <span style="font-size:2.1rem;flex-shrink:0;">${p.icon}</span>
            <span style="background:rgba(184,150,12,.08);color:var(--gold);border:1px solid rgba(184,150,12,.2);font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .65rem;white-space:nowrap;">${p.type}</span>
          </div>
          <!-- Value display -->
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${p.value}</div>
          <!-- Title + location -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.3;margin-bottom:.3rem;">${p.title}</h3>
          <p style="font-size:.68rem;letter-spacing:.07em;color:var(--ink-muted);margin-bottom:1rem;display:flex;align-items:center;gap:.35rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.58rem;"></i>${p.loc}</p>
          <p style="font-size:.85rem;color:var(--ink-soft);line-height:1.8;">${p.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ LEADERSHIP ════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:7rem;padding-bottom:7rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1.7fr;gap:5rem;align-items:start;" class="mob-stack">
      <div class="reveal-l">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Leadership</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">Steered by<br>Industry Veterans</h2>
        <p class="lead" style="margin-bottom:2.25rem;">Our leadership brings decades of combined experience across hospitality, real estate, retail and entertainment, having led marquee mandates for India's most prominent developers, hotel brands and institutional investors.</p>
        <a href="/about" class="btn btn-dk">Meet the Full Team</a>
        <div style="margin-top:3rem;padding:1.5rem;border:1px solid var(--border);background:rgba(184,150,12,.03);">
          <div style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Board & KMP</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);line-height:1.5;">Three Directors. One Vision.<br>Building India's Premier Advisory Practice.</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        ${[
          { name:'Arun K. Manikonda', title:'Managing Director',      sub:'Director on Board & KMP',  init:'AM', photo:'/static/team/arun-manikonda.jpg',  ph:'+91 98108 89134', em:'akm@indiagully.com', li:'https://www.linkedin.com/in/arun-kumar-manikon', bio:'Founding MD with 20+ years across hospitality, real estate and entertainment. Former MD of Entertainment City Limited, Noida. Led ₹1,350 Cr+ 100% shareholder-consented divestment in joint advisory with EY — a landmark entertainment real estate transaction.' },
          { name:'Pavan K. Manikonda', title:'Executive Director',      sub:'Director on Board & KMP',  init:'PM', photo:'/static/team/pavan-manikonda.jpg',  ph:'+91 62825 56067', em:'pavan@indiagully.com', li:'https://www.linkedin.com/in/pavan-kumar-manikonda-49254421/', bio:'Hospitality operations leader with 18+ years across hotel management, HORECA supply and brand on-boarding. Drives business development and operational delivery across India Gully\'s advisory verticals.' },
          { name:'Amit Jhingan',    title:'President, Real Estate',  sub:'Key Managerial Personnel', init:'AJ', photo:'/static/team/amit-jhingan.png',       ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com', li:'https://www.linkedin.com/in/amit-jhingan-11631451/', bio:'Real Estate Vertical Head with 15+ years of pan-India experience. Specialist in retail leasing (1,40,000+ sq ft placed), commercial transactions and hospitality asset advisory across Delhi NCR and beyond.' },
        ].map((p, pi) => `
        <div class="leader-card" style="padding:1.75rem;display:grid;grid-template-columns:auto 1fr auto;gap:1.5rem;align-items:center;transition-delay:${pi*0.1}s;border:1px solid var(--border);" onmouseover="this.style.borderColor='rgba(184,150,12,.25)'" onmouseout="this.style.borderColor='var(--border)'">
          <!-- Avatar -->
          <div style="width:62px;height:62px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid rgba(184,150,12,.3);background:var(--ink);position:relative;">
            <img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;"
                 onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\'width:62px;height:62px;background:var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;\'><span style=\'font-family:DM Serif Display,Georgia,serif;font-size:1.15rem;color:var(--gold);\'>${p.init}</span></div>';">
          </div>
          <!-- Info -->
          <div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.12rem;">${p.name}</div>
            <div style="font-size:.8rem;color:var(--ink-soft);margin-bottom:.1rem;">${p.title}</div>
            <div style="font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${p.sub}</div>
            <div style="font-size:.8rem;color:var(--ink-muted);line-height:1.6;">${p.bio}</div>
          </div>
          <!-- Contact -->
          <div style="text-align:right;flex-shrink:0;display:flex;flex-direction:column;gap:.3rem;">
            <a href="tel:${p.ph.replace(/\s/g,'')}" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-phone" style="font-size:.58rem;color:var(--gold);"></i>${p.ph}</a>
            <a href="mailto:${p.em}" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-envelope" style="font-size:.58rem;color:var(--gold);"></i>${p.em}</a>
            <a href="${p.li}" target="_blank" rel="noopener" style="font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;justify-content:flex-end;transition:color .2s;" onmouseover="this.style.color='#0a66c2'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fab fa-linkedin-in" style="font-size:.58rem;color:#0a66c2;"></i>LinkedIn</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ FINAL CTA ═══════════════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <!-- Radial gold glow -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 65% 85% at 50% 50%,rgba(184,150,12,.07) 0%,transparent 65%);pointer-events:none;"></div>
  <!-- Subtle grid -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.025) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>

  <div class="wrap" style="text-align:center;max-width:820px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:1rem;">Get in Touch</p>
    <h2 class="h2-lt" style="margin-bottom:1.5rem;">Ready to Work<br>With India Gully?</h2>
    <p style="font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,.5);max-width:580px;margin:0 auto 3rem;">Whether you are a developer, investor, brand or operator — we bring the advisory depth, network and execution capability to deliver exceptional results.</p>

    <!-- CTA buttons -->
    <div class="cta-flex" style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-bottom:4rem;">
      <a href="/contact"  class="btn btn-g" style="min-width:230px;justify-content:center;padding:.9rem 2.25rem;">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g" style="min-width:200px;justify-content:center;">View Active Mandates</a>
      <a href="/horeca"   class="btn btn-ghost" style="min-width:200px;justify-content:center;">HORECA Supply Enquiry</a>
    </div>

    <!-- Quick contact strip -->
    <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:2.5rem;display:flex;flex-wrap:wrap;gap:2.5rem;justify-content:center;align-items:center;">
      <a href="tel:+918988988988" style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.45);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.45)'">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-phone" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        +91 8988 988 988
      </a>
      <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.45);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.45)'">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-envelope" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        info@indiagully.com
      </a>
      <div style="display:flex;align-items:center;gap:.65rem;font-size:.82rem;color:rgba(255,255,255,.35);">
        <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-map-marker-alt" style="font-size:.65rem;color:var(--gold);"></i>
        </div>
        New Delhi, India
      </div>
    </div>

  </div>
</div>

`
  return c.html(layout('Home', content, {
    description: "India Gully. Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions. ₹1,165 Cr+ active mandate pipeline.",
    canonical: 'https://indiagully.com/',
    ogImage: 'https://indiagully.com/static/og.jpg',
    heroPreload: '/static/mandates/chail/chail-img1.jpg',
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://india-gully.pages.dev/#organization",
          "name": "India Gully",
          "legalName": "Vivacious Entertainment and Hospitality Pvt. Ltd.",
          "url": "https://india-gully.pages.dev",
          "logo": "https://india-gully.pages.dev/assets/logo-white.png",
          "description": "India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions.",
          "address": { "@type": "PostalAddress", "addressLocality": "New Delhi", "addressCountry": "IN" },
          "telephone": "+918988988988",
          "email": "info@indiagully.com",
          "sameAs": ["https://indiagully.com"],
          "foundingDate": "2017",
          "knowsAbout": ["Real Estate Advisory","Hospitality Management","Retail Leasing","Entertainment Advisory","HORECA Procurement","Debt & Special Situations"]
        },
        {
          "@type": "WebSite",
          "@id": "https://india-gully.pages.dev/#website",
          "url": "https://india-gully.pages.dev",
          "name": "India Gully",
          "publisher": { "@id": "https://india-gully.pages.dev/#organization" }
        }
      ]
    })
  }))
})

export default app
