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

  // ====== Easter Egg (uses direct style.animation on body/html) ======
(function() {
  // typing buffer for triggers
  let buf = "";
  const targets = ["ahdabest","28028"];

  // ensure keyframes + confetti CSS is present once
  const STYLE_ID = "easter-egg-inline-style";
  if (!document.getElementById(STYLE_ID)) {
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = `
      /* rainbow (multi-step like original) */
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
      }

      /* screen shake */
      @keyframes shake {
        0%,100% { transform: translate(0,0); }
        10% { transform: translate(-10px,5px); }
        20% { transform: translate(15px,-5px); }
        30% { transform: translate(-5px,-10px); }
        40% { transform: translate(10px,10px); }
        50% { transform: translate(-15px,5px); }
        60% { transform: translate(5px,-15px); }
        70% { transform: translate(10px,5px); }
        80% { transform: translate(-10px,-5px); }
        90% { transform: translate(5px,15px); }
      }

      /* confetti fall */
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
      }

      .eg-confetti {
        position: fixed;
        pointer-events: none;
        z-index: 2147483647; /* extremely high so it's on top */
        will-change: transform, opacity;
        animation-name: confettiFall;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
    `;
    document.head.appendChild(s);
  }

  // Listen for keys
  document.addEventListener("keydown", (ev) => {
    const k = (ev.key || "").toLowerCase();
    buf += k;
    if (buf.length > 20) buf = buf.slice(-20);

    for (const t of targets) {
      if (buf.endsWith(t)) {
        buf = "";
        activateEgg();
        return;
      }
    }
  });

  let running = false;
  function activateEgg() {
    if (running) return;
    running = true;

    // optional notification (if you have showNotification)
    if (typeof showNotification === "function") {
      showNotification("🎉 Easter Egg Activated! 🤖", "success");
    }

    // Save previous inline animations to restore later
    const prevHtmlAnim = document.documentElement.style.animation || "";
    const prevBodyAnim = document.body.style.animation || "";

    // Build animation string exactly via style (rainbow + shake together)
    // You can adjust durations here (rainbow 10s, shake 0.5s repeating)
    const rainbowAnim = "rainbow 10s linear infinite";
    const shakeAnim = "shake 0.5s ease-in-out infinite";
    const combined = `${rainbowAnim}, ${shakeAnim}`;

    // Apply directly like your original snippet (but to both html and body)
    document.documentElement.style.animation = combined;
    document.body.style.animation = combined;

    // Confetti: spawn bursts across the whole viewport repeatedly for 10s
    const burstIntervalMs = 120; // burst frequency
    const burstCount = 24;       // confetti pieces per burst
    const durationMs = 10000;    // total duration
    const interval = setInterval(() => spawnBurst(burstCount), burstIntervalMs);

    // Stop after duration and restore previous animations
    setTimeout(() => {
      clearInterval(interval);
      // remove any leftover confetti after a grace period
      setTimeout(() => {
        document.querySelectorAll(".eg-confetti").forEach(n => n.remove());
      }, 3500);

      // restore previous inline animation values exactly as they were
      document.documentElement.style.animation = prevHtmlAnim;
      document.body.style.animation = prevBodyAnim;

      running = false;
    }, durationMs);
  }

  // Spawn a burst of confetti anywhere (everywhere)
  function spawnBurst(count) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (let i=0;i<count;i++){
      const el = document.createElement("div");
      el.className = "eg-confetti";

      // Size
      const size = (Math.random()*12 + 6) | 0; // 6-18px
      el.style.width = size + "px";
      el.style.height = (size*0.6 | 0) + "px"; // rectangle-ish

      // Start position: anywhere across viewport (use vw/vh units for resilience)
      const startX = Math.random() * vw;
      const startY = Math.random() * vh;
      el.style.left = startX + "px";
      el.style.top = startY + "px";

      // Color
      el.style.background = `hsl(${Math.random()*360}, 90%, 55%)`;
      el.style.borderRadius = (Math.random() > 0.5 ? "2px" : "50%");

      // Animation duration + delay + horizontal drift + spin
      const dur = (Math.random() * 3 + 7).toFixed(2); // 7-10s
      const delay = (Math.random() * 0.5).toFixed(2);
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay = `${delay}s`;

      // drift in vw to allow horizontal movement
      const drift = ((Math.random() - 0.5) * 40).toFixed(1) + "vw";
      el.style.setProperty("--drift", drift);

      // spin amount (applied inside keyframes by var)
      const spin = ((Math.random() * 720) + 360) | 0;
      el.style.setProperty("--spin", spin + "deg");

      // Slight opacity randomness
      el.style.opacity = (0.6 + Math.random()*0.4).toFixed(2);

      document.body.appendChild(el);

      // cleanup element after it should be done
      const removeAfter = (parseFloat(dur) + parseFloat(delay)) * 1000 + 200;
      setTimeout(() => el.remove(), removeAfter);
    }
  }
})();
