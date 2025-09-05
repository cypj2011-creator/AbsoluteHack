// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCountdown();
    initializeScrollAnimations();
    initializeGalleryFilter();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeAnimationDelays();
});

// Navigation Menu Toggle
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(79, 195, 247, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinksArray = Array.from(navLinks);

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Countdown Timer
function initializeCountdown() {
    // Set the date we're counting down to (example: next competition)
    // You can change this to any future date
    const countDownDate = new Date("2026-01-16T07:00:00").getTime();

    // Update the countdown every 1 second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (daysElement) daysElement.innerHTML = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.innerHTML = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.innerHTML = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.innerHTML = String(seconds).padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysElement) daysElement.innerHTML = "00";
            if (hoursElement) hoursElement.innerHTML = "00";
            if (minutesElement) minutesElement.innerHTML = "00";
            if (secondsElement) secondsElement.innerHTML = "00";
        }
    }, 1000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Add stagger animation for grid items
                if (entry.target.classList.contains('member-card') || 
                    entry.target.classList.contains('robot-card') ||
                    entry.target.classList.contains('gallery-item') ||
                    entry.target.classList.contains('sponsor-card')) {

                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.about-card, .member-card, .achievement-item, .timeline-item, ' +
        '.robot-card, .gallery-item, .sponsor-card, .contact-item'
    );

    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });

    // Achievement counters animation
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        observer.observe(item);
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Gallery Filter Functionality
function initializeGalleryFilter() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    item.style.display = 'block';

                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';

                    // Hide after animation
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize with all items visible
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4FC3F7' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize Animation Delays
function initializeAnimationDelays() {
    // Add staggered animation delays to grid items
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const robotCards = document.querySelectorAll('.robot-card');
    robotCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    const sponsorCards = document.querySelectorAll('.sponsor-card');
    sponsorCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
}

// Robot Card Interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('robot-btn')) {
        const robotCard = e.target.closest('.robot-card');
        const robotTitle = robotCard.querySelector('.robot-info h3').textContent;

        // Show robot details modal (placeholder)
        showNotification(`More details about ${robotTitle} coming soon!`, 'info');
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 200);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.style.opacity = '1', 400);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.style.opacity = '1', 600);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.style.opacity = '1', 800);
    }
});

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initializeLazyLoading();
}

// Add CSS for loading states
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-description,
    .loaded .hero-buttons {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(loadingStyles);

// Console log for debugging
console.log('🚀 FTC Team 28028 Absolute Hack website loaded successfully!');
console.log('✨ All animations and interactions are ready!');

// Easter egg
console.log(`
    🤖 ABSOLUTE HACK - FTC Team 28028 🤖
    ════════════════════════════════════
    Innovating, Competing, Winning!
    
    Thanks for checking out our website!
    Interested in robotics? Contact us!
`);

// Add some fun interactions
// Easter Egg: triggers on "ahdabest" or "28028"
let secret = [];
const targets = ["ahdabest", "28028"];

// Listen for key presses
document.addEventListener("keydown", e => {
  secret.push(e.key.toLowerCase());
  if (secret.length > 10) secret.shift(); // keep recent 10 keys

  const typed = secret.join("");
  if (targets.some(t => typed.endsWith(t))) {
    activateEasterEgg();
    secret = [];
  }
});

function activateEasterEgg() {
  showNotification("🎉 Easter Egg Activated, Absolute Hack is Da Best! 🤖", "success");

  // ===== Easter Egg: "ahdabest" or "28028" =====
(function () {
  let buffer = "";
  let eggActive = false;

  // Listen for typing anywhere
  document.addEventListener("keydown", (e) => {
    buffer += (e.key || "").toLowerCase();
    if (buffer.length > 20) buffer = buffer.slice(-20);
    if (/(ahdabest|28028)$/.test(buffer)) {
      buffer = "";
      if (!eggActive) activateEasterEgg();
    }
  });

  function activateEasterEgg() {
    eggActive = true;
    if (typeof showNotification === "function") {
      showNotification("🎉 Easter Egg Activated! 🤖", "success");
    }

    // Add classes to BOTH <html> and <body> so everything gets affected
    document.documentElement.classList.add("rainbow", "shake-screen");
    document.body.classList.add("rainbow", "shake-screen");

    // Confetti continuously for 10s (spawns across entire screen)
    launchConfettiFor(10000, 28); // spawn 28 pieces per burst

    // Turn off effects after 10s
    setTimeout(() => {
      document.documentElement.classList.remove("rainbow", "shake-screen");
      document.body.classList.remove("rainbow", "shake-screen");
      eggActive = false;
    }, 10000);
  }

  // Spawn confetti for `durationMs`, bursting every ~120ms
  function launchConfettiFor(durationMs, perBurst) {
    const start = performance.now();
    const tick = () => {
      // Make a burst
      for (let i = 0; i < perBurst; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        // spawn anywhere (x: 0–100vw, y: -10vh to 100vh)
        const x = Math.random() * 100;
        const y = Math.random() * 110 - 10;
        c.style.left = x + "vw";
        c.style.top = y + "vh";
        c.style.width = c.style.height = (Math.random() * 8 + 5) + "px";
        c.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        c.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
        // each piece falls 100vh; random duration & delay for variety
        const dur = (Math.random() * 3 + 7).toFixed(2); // 7–10s
        const del = (Math.random() * 0.5).toFixed(2); // 0–0.5s
        c.style.animationDuration = dur + "s";
        c.style.animationDelay = del + "s";
        // add a little horizontal drift
        const drift = (Math.random() * 40 - 20).toFixed(1); // -20 to 20vw
        c.style.setProperty("--drift", drift + "vw");
        // random rotate speed
        const spin = (Math.random() * 900 + 360).toFixed(0);
        c.style.setProperty("--spin", spin + "deg");
        document.body.appendChild(c);
        // clean up
        setTimeout(() => c.remove(), (parseFloat(dur) + parseFloat(del)) * 1000 + 100);
      }

      if (performance.now() - start < durationMs) {
        setTimeout(tick, 120); // next burst
      }
    };
    tick();
  }

  // Inject CSS (rainbow + shake can run TOGETHER)
  const style = document.createElement("style");
  style.textContent = `
    /* Rainbow hue shift (applies to whole page) */
    @keyframes rainbowHue {
      0%   { filter: hue-rotate(0deg); }
      25%  { filter: hue-rotate(90deg); }
      50%  { filter: hue-rotate(180deg); }
      75%  { filter: hue-rotate(270deg); }
      100% { filter: hue-rotate(360deg); }
    }
    html.rainbow, body.rainbow {
      filter: hue-rotate(0deg);
      animation: rainbowHue 10s linear infinite;
    }

    /* Screen shake */
    @keyframes shake {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-10px, 5px); }
      20% { transform: translate(15px, -5px); }
      30% { transform: translate(-5px, -10px); }
      40% { transform: translate(10px, 10px); }
      50% { transform: translate(-15px, 5px); }
      60% { transform: translate(5px, -15px); }
      70% { transform: translate(10px, 5px); }
      80% { transform: translate(-10px, -5px); }
      90% { transform: translate(5px, 15px); }
    }
    html.shake-screen, body.shake-screen {
      animation: shake 0.5s infinite;
    }

    /* When BOTH are on, combine animations (this fixes the override issue) */
    html.rainbow.shake-screen, body.rainbow.shake-screen {
      filter: hue-rotate(0deg);
      animation: rainbowHue 10s linear infinite, shake 0.5s infinite;
    }

    /* Confetti */
    @keyframes fall {
      0%   { transform: translateY(0) translateX(0) rotate(0); opacity: 1; }
      100% { transform: translateY(100vh) translateX(var(--drift, 0)) rotate(var(--spin, 720deg)); opacity: 0; }
    }
    .confetti {
      position: fixed;
      pointer-events: none;
      z-index: 999999;
      will-change: transform, opacity;
      animation-name: fall;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  `;
  document.head.appendChild(style);
})();
