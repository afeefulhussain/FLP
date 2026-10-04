/**
 * Future Leaders Parliament (FLP) - Site Core Engine
 * Handles: HTTPS Redirection, Cookie Consent, Privacy-Respecting Analytics,
 * Anti-Spam Bot Protection, and Real-Time Form Validation.
 */

(function() {
  'use strict';

  // 1. Force HTTPS Redirection (Non-localhost environments)
  if (window.location.protocol === 'http:' && 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1' && 
      !window.location.hostname.endsWith('.local')) {
    window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
    return;
  }

  // 2. State & Constants
  const COOKIE_KEY = 'flp_cookie_consent_v1';
  const PAGE_LOAD_TIME = Date.now();
  const GA_MEASUREMENT_ID = 'G-FLP2026YOUTH'; // Replaceable with client production GA4 ID

  // 3. Cookie Consent Banner
  function initCookieConsent() {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent) {
      if (consent === 'accepted') {
        initAnalytics(true);
      }
      return;
    }

    const banner = document.createElement('aside');
    banner.id = 'flp-cookie-banner';
    banner.setAttribute('aria-label', 'Cookie Consent Notice');
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999] bg-[#022F18]/95 backdrop-blur-md border border-[#D2A23C]/50 rounded-lg p-5 shadow-2xl text-white transition-all duration-500 transform translate-y-full opacity-0';
    
    banner.innerHTML = `
      <div class="flex items-start gap-3.5">
        <div class="w-9 h-9 rounded-full bg-[#D2A23C]/20 border border-[#D2A23C]/40 flex items-center justify-center shrink-0 text-[#D2A23C] text-lg">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        </div>
        <div class="flex-1">
          <h3 class="font-heading font-bold text-sm tracking-wide text-[#D2A23C] uppercase mb-1">Your Privacy Matters</h3>
          <p class="text-xs text-slate-200 leading-relaxed">
            We use essential cookies and anonymous analytics to ensure website security, measure engagement, and empower youth leaders. Review our 
            <a href="privacy.html" class="text-[#D2A23C] underline hover:text-white transition-colors">Privacy Policy</a>.
          </p>
          <div class="mt-3.5 flex flex-wrap items-center gap-2">
            <button id="flp-cookie-accept" type="button" class="px-4 py-1.5 bg-[#D2A23C] text-[#022F18] font-heading font-bold text-xs uppercase tracking-wider rounded hover:bg-white transition-colors shadow-sm cursor-pointer">
              Accept All
            </button>
            <button id="flp-cookie-decline" type="button" class="px-3.5 py-1.5 bg-transparent border border-white/30 text-xs text-slate-200 font-heading font-medium tracking-wider rounded hover:border-[#D2A23C] hover:text-white transition-colors cursor-pointer">
              Essential Only
            </button>
          </div>
        </div>
        <button id="flp-cookie-close" type="button" aria-label="Dismiss cookie banner" class="text-slate-400 hover:text-white p-1 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    // Smooth Entrance
    requestAnimationFrame(() => {
      banner.classList.remove('translate-y-full', 'opacity-0');
    });

    const hideBanner = (action) => {
      localStorage.setItem(COOKIE_KEY, action);
      banner.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => banner.remove(), 400);
      if (action === 'accepted') {
        initAnalytics(true);
      }
    };

    document.getElementById('flp-cookie-accept')?.addEventListener('click', () => hideBanner('accepted'));
    document.getElementById('flp-cookie-decline')?.addEventListener('click', () => hideBanner('declined'));
    document.getElementById('flp-cookie-close')?.addEventListener('click', () => hideBanner('declined'));
  }

  // 4. Privacy-Respecting Analytics Engine
  function initAnalytics(hasConsent) {
    if (window._flpAnalyticsLoaded) return;
    window._flpAnalyticsLoaded = true;

    // GA4 loader with consent mode
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('consent', 'default', {
      'analytics_storage': hasConsent ? 'granted' : 'denied',
      'ad_storage': 'denied'
    });

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Auto-track user interactions and CTAs
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.innerText || target.getAttribute('aria-label') || '').trim();

      // Track WhatsApp conversions
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackEvent('whatsapp_click', { category: 'engagement', label: text });
      }

      // Track Join & Event CTAs
      if (href.includes('join.html') || href.includes('events.html') || href.includes('event-')) {
        trackEvent('cta_click', { category: 'navigation', label: text, destination: href });
      }
    });
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    // Also log internally for diagnostics
    if (window.location.hostname === 'localhost') {
      console.log('[FLP Analytics Event]', eventName, params);
    }
  }

  // 5. Anti-Spam Bot Protection & Security Guard
  function setupSpamBotProtection(form) {
    if (!form || form.dataset.botProtected) return;
    form.dataset.botProtected = 'true';

    // A. Honeypot Hidden Input
    const hpContainer = document.createElement('div');
    hpContainer.className = 'hp-field-wrap';
    hpContainer.style.cssText = 'opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1; pointer-events: none;';
    hpContainer.setAttribute('aria-hidden', 'true');
    hpContainer.innerHTML = '<label for="_flp_security_token_hp">Leave empty</label><input type="text" id="_flp_security_token_hp" name="_flp_security_token_hp" tabindex="-1" autocomplete="off">';
    form.prepend(hpContainer);

    // B. Submission Interceptor
    form.addEventListener('submit', function(e) {
      const hpValue = form.querySelector('#_flp_security_token_hp')?.value;
      const elapsedSeconds = (Date.now() - PAGE_LOAD_TIME) / 1000;

      // Check honeypot
      if (hpValue && hpValue.trim() !== '') {
        console.warn('Bot detection triggered: Honeypot filled.');
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      }

      // Check fast bot submissions (< 2.0 seconds)
      if (elapsedSeconds < 2.0) {
        console.warn('Bot detection triggered: Fast automated submission (' + elapsedSeconds + 's).');
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Please review your information carefully before submitting.');
        return false;
      }

      // Check rate limiter in localStorage
      const lastSubmit = parseInt(localStorage.getItem('flp_last_submit_ts') || '0', 10);
      if (Date.now() - lastSubmit < 15000) { // 15s debounce
        console.warn('Rate limit exceeded.');
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Please wait a few seconds before submitting another request.');
        return false;
      }

      localStorage.setItem('flp_last_submit_ts', Date.now().toString());
      trackEvent('form_submission', { form_id: form.id || 'unnamed_form' });
    });
  }

  // 6. Universal Form Validator Engine
  function validateField(field) {
    const value = (field.value || '').trim();
    const type = field.type;
    const name = field.name || field.id || '';
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Clear previous error message
    const errorEl = field.parentElement.querySelector('.field-error-msg');
    if (errorEl) errorEl.remove();

    if (isRequired && !value && type !== 'checkbox') {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (isRequired && type === 'checkbox' && !field.checked) {
      isValid = false;
      errorMessage = 'You must agree to continue.';
    } else if (value) {
      if (type === 'email' || name.toLowerCase().includes('email')) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        }
      } else if (type === 'tel' || name.toLowerCase().includes('phone') || name.toLowerCase().includes('contact')) {
        const cleanPhone = value.replace(/[\s\-()]/g, '');
        if (cleanPhone.length < 9 || cleanPhone.length > 16 || !/^\+?[0-9]+$/.test(cleanPhone)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number (e.g. +92 328 6444392).';
        }
      } else if (name.toLowerCase().includes('name') && value.length < 3) {
        isValid = false;
        errorMessage = 'Name must be at least 3 characters.';
      }
    }

    // Apply visual feedback
    if (!isValid) {
      field.classList.add('border-rose-500', 'focus:ring-rose-500');
      field.classList.remove('border-emerald-500', 'border-[#D2A23C]/40');
      
      const msg = document.createElement('p');
      msg.className = 'field-error-msg text-xs text-rose-400 mt-1 flex items-center gap-1 animate-pulse';
      msg.innerHTML = '<svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>' + errorMessage;
      field.parentElement.appendChild(msg);
    } else if (value) {
      field.classList.remove('border-rose-500', 'focus:ring-rose-500');
      field.classList.add('border-emerald-500');
    } else {
      field.classList.remove('border-rose-500', 'focus:ring-rose-500', 'border-emerald-500');
    }

    return isValid;
  }

  function setupFormValidation(form) {
    if (!form) return;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('border-rose-500')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', function(e) {
      let isFormValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const firstError = form.querySelector('.border-rose-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });
  }

  // 7. Initialize Everything on DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initCookieConsent();
    
    // Auto-protect all forms on the page
    document.querySelectorAll('form').forEach(form => {
      setupSpamBotProtection(form);
      setupFormValidation(form);
    });
  });

})();
