/* ==========================================================
   Go Laos Adventure — main.js
   Handles: elephant loader, language toggle, nav menu, form
   ========================================================== */
(function(){
  /* ---------- Language ---------- */
  const STORE_LANG = 'gla_lang';
  const STORE_SEEN = 'gla_seen_loader';

  function currentLang(){
    return localStorage.getItem(STORE_LANG) || 'en';
  }
  function applyLang(lang){
    const dict = (window.I18N && window.I18N[lang]) || window.I18N.en;
    document.documentElement.lang = (lang === 'my' ? 'my' : 'en');
    document.body.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el=>{
      // format: "attrName:key"
      const spec = el.getAttribute('data-i18n-attr');
      const [attr, key] = spec.split(':');
      if (attr && key && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });

    // Update language toggle buttons
    document.querySelectorAll('.lang-toggle button').forEach(b=>{
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    localStorage.setItem(STORE_LANG, lang);
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    applyLang(currentLang());

    document.querySelectorAll('.lang-toggle button').forEach(b=>{
      b.addEventListener('click', ()=> applyLang(b.dataset.lang));
    });

    // Mobile menu
    const toggle = document.querySelector('.menu-toggle');
    const links  = document.querySelector('.nav-links');
    if (toggle && links){
      toggle.addEventListener('click', ()=> links.classList.toggle('open'));
    }

    // Contact form
    const form = document.getElementById('inquiry-form');
    if (form){
      form.addEventListener('submit', e=>{
        e.preventDefault();
        const thanks = document.getElementById('form-thanks');
        form.style.display = 'none';
        if (thanks) thanks.style.display = 'block';
      });
    }
  });

  /* ---------- Elephant loader ---------- */
  window.addEventListener('load', ()=>{
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const seen = sessionStorage.getItem(STORE_SEEN) === '1';
    const delay = seen ? 250 : 1800;

    setTimeout(()=>{
      loader.classList.add('hidden');
      sessionStorage.setItem(STORE_SEEN, '1');
    }, delay);
  });
})();
