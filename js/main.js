// Animate on Scroll
AOS.init({
    duration: 1000,
    once: true,
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-transparent');
    } else {
        navbar.classList.remove('bg-transparent');
    }
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

// Smooth scroll for all anchor links (only for links that actually point to elements on the page)
// Only run this on index.html (landing page), not on dashboard pages
// Check if we're on the landing page by looking for specific elements
const isLandingPage = document.getElementById('navbar') || document.getElementById('back-to-top') ||
    window.location.pathname.includes('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/');

if (isLandingPage) {
    // Use DOMContentLoaded to ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
    } else {
        initSmoothScroll();
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip if already has other click handlers (check for data attributes or classes)
        if (anchor.hasAttribute('data-modal') || anchor.hasAttribute('data-toggle') ||
            anchor.hasAttribute('data-bs-toggle') || anchor.hasAttribute('onclick') ||
            anchor.classList.contains('modal-trigger') || anchor.classList.contains('swal-trigger')) {
            return;
        }

        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#" or empty (used for modals/swal/other functionality)
            if (!href || href === '#' || href === '#!' || href === 'javascript:void(0)') {
                return;
            }

            // Skip if link has onclick attribute (likely for modals/swal)
            if (this.hasAttribute('onclick')) {
                return;
            }

            // Skip if link has data attributes commonly used for modals
            if (this.hasAttribute('data-toggle') || this.hasAttribute('data-modal') ||
                this.hasAttribute('data-target') || this.hasAttribute('data-bs-toggle') ||
                this.hasAttribute('data-bs-target')) {
                return;
            }

            // Skip if link is inside sidebar, dropdown, modal, button, or table (likely for navigation/modals)
            if (this.closest('aside') || this.closest('.dropdown-panel') ||
                this.closest('#profileDropdown') || this.closest('.modal') ||
                this.closest('.modal-overlay') || this.closest('button') ||
                this.closest('table') || this.closest('.btn') || this.closest('[role="button"]')) {
                return;
            }

            // Only prevent default and scroll if target element actually exists and has an ID
            try {
                const target = document.querySelector(href);
                if (target && target.id && href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                    target.scrollIntoView({ behavior: 'smooth' });
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) {
                        mobileMenu.classList.remove('translate-x-0');
                        mobileMenu.classList.add('translate-x-full');
                    }
                }
            } catch (err) {
                // Silently fail if there's any error
                console.debug('Smooth scroll error:', err);
            }
        }, { capture: false, passive: false });
    });
}

// Counter Animation
const counters = document.querySelectorAll('.counter');
let started = false;

function startCountUp() {
    counters.forEach(counter => {
        let target = +counter.getAttribute('data-target');
        let count = 0;
        let increment = target / 100;

        let updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    });
}

// Trigger when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            startCountUp();
            started = true;
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Icon Elements
const iconHamburger = document.getElementById('icon-hamburger');
const iconClose = document.getElementById('icon-close');

menuBtn.addEventListener('click', () => {
    const isMenuClosed = mobileMenu.classList.contains('opacity-0');

    if (isMenuClosed) {
        mobileMenu.classList.add('opacity-100', 'max-h-screen'); // Ganti max-h-[500px] dengan max-h-screen untuk fleksibilitas
        mobileMenu.classList.remove('opacity-0', 'max-h-0');

        iconHamburger.classList.add('hidden');
        iconClose.classList.remove('hidden');
    } else {
        mobileMenu.classList.remove('opacity-100', 'max-h-screen');
        mobileMenu.classList.add('opacity-0', 'max-h-0');
        iconHamburger.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100', 'max-h-screen');
        mobileMenu.classList.add('opacity-0', 'max-h-0');
        iconHamburger.classList.remove('hidden');
        iconClose.classList.add('hidden');
    });
});

document.getElementById('#mobile-menu a').addEventListener('click', () => {
    window.location.href = 'sign-in.html';
});

// Splide Initialization for Testimonial Carousel
document.addEventListener('DOMContentLoaded', () => {
    new Splide('#testimonialSplide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '1.5rem',
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        arrows: true,
        breakpoints: {
            1024: {
                perPage: 2,
                gap: '1rem',
            },
            640: {
                perPage: 1,
                gap: '0.75rem',
            },
        },
    }).mount();
});

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format number with + sign
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
    const counters = [
        { element: document.querySelectorAll('h4')[0], target: 65 },
        { element: document.querySelectorAll('h4')[1], target: 10 },
        { element: document.querySelectorAll('h4')[2], target: 40 },
        { element: document.querySelectorAll('h4')[3], target: 50 },
        { element: document.querySelectorAll('h4')[4], target: 45 },
        { element: document.querySelectorAll('h4')[5], target: 5000 },
        { element: document.querySelectorAll('h4')[6], target: 2000 }
    ];

    counters.forEach(counter => {
        animateCounter(counter.element, counter.target);
    });
});
