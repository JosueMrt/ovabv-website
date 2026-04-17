(function () {
    'use strict';

    // ---------- Year in footer ----------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---------- Navbar scroll state ----------
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        if (window.scrollY > 10) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---------- Mobile menu ----------
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const open = navbar.classList.toggle('menu-open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('menu-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- Reveal on scroll ----------
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // ---------- Contact form ----------
    const form = document.getElementById('contact-form');
    if (form) {
        const status = form.querySelector('.form-status');
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !emailRe.test(email)) {
                status.textContent = 'Please add your name and a valid email address.';
                status.style.color = '#ff8a9b';
                return;
            }

            status.textContent = 'Sending…';
            status.style.color = 'var(--accent-2)';

            // No backend configured — simulate a success state.
            setTimeout(() => {
                form.reset();
                status.textContent = `Thanks ${name.split(' ')[0]} — we'll be in touch within one working day.`;
                status.style.color = 'var(--accent-2)';
            }, 700);

            // Optional: log payload for future backend wiring.
            // console.debug({ name, email, message });
        });
    }
})();
