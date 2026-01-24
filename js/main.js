// ===== Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Typing Effect =====
const typingElement = document.getElementById('typing');
const phrases = [
    'DevOps Engineer',
    'Cloud Architect',
    'Automation Expert',
    'Infrastructure as Code Specialist',
    'Kubernetes Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate stats when visible
            if (entry.target.classList.contains('about')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// ===== Stats Counter Animation =====
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + '+';
            }
        };

        updateStat();
    });
}

// ===== Navbar Background on Scroll =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar background
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }

    // Back to top button visibility
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    lastScroll = currentScroll;
});

// Back to top click handler
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Skill Tags Hover Effect =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ===== Timeline Animation =====
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 150}ms`;
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/eltelemaco', 'font-size: 14px;');
