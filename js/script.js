// ==========================
// DOM Content Loaded Event
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeCountdown();
  initializeScrollAnimations();
  initializeGalleryFilter();
  initializeContactForm();
  initializeSmoothScrolling();
  initializeAnimationDelays();
});

// ==========================
// Navigation Menu Toggle
// ==========================
function initializeNavigation() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(79, 195, 247, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  const sections = document.querySelectorAll('section');
  const navLinksArray = Array.from(navLinks);

  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
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

// ==========================
// Countdown Timer
// ==========================
function initializeCountdown() {
  const countDownDate = new Date("2026-01-16T07:00:00").getTime();
  const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) daysElement.innerHTML = String(days).padStart(2, '0');
    if (hoursElement) hoursElement.innerHTML = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.innerHTML = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.innerHTML = String(seconds).padStart(2, '0');

    if (distance < 0) {
      clearInterval(countdownInterval);
      if (daysElement) daysElement.innerHTML = "00";
      if (hoursElement) hoursElement.innerHTML = "00";
      if (minutesElement) minutesElement.innerHTML = "00";
      if (secondsElement) secondsElement.innerHTML = "00";
    }
  }, 1000);
}

// ==========================
// Scroll Animations
// ==========================
function initializeScrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        if (
          entry.target.classList.contains('member-card') ||
          entry.target.classList.contains('robot-card') ||
          entry.target.classList.contains('gallery-item') ||
          entry.target.classList.contains('sponsor-card')
        ) {
          const siblings = entry.target.parentElement.children;
          const index = Array.from(siblings).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.about-card, .member-card, .achievement-item, .timeline-item, ' +
    '.robot-card, .gallery-item, .sponsor-card, .contact-item'
  );

  animateElements.forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
  });

  const achievementItems = document.querySelectorAll('.achievement-item');
  achievementItems.forEach((item, index) => {
    observer.observe(item);
    item.style.animationDelay = `${index * 0.2}s`;
  });
}

// ==========================
// Gallery Filter
// ==========================
function initializeGalleryFilter() {
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      galleryTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
          item.classList.add('visible');
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden');
          item.classList.remove('visible');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.classList.add('visible');
  });
}

// ==========================
// Contact Form
// ==========================
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// ==========================
// Notification System
// ==========================
function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

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

  document.body.appendChild(notification);
  setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);

  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ==========================
// Smooth Scrolling
// ==========================
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });
}

// ==========================
// Animation Delays
// ==========================
function initializeAnimationDelays() {
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

// ==========================
// Robot Card Interaction
// ==========================
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('robot-btn')) {
    const robotCard = e.target.closest('.robot-card');
    const robotTitle = robotCard.querySelector('.robot-info h3').textContent;
    showNotification(`More details about ${robotTitle} coming soon!`, 'info');
  }
});

// ==========================
// Parallax Effect
// ==========================
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const rate = scrolled * -0.5;
    heroSection.style.transform = `translateY(${rate}px)`;
  }
});

// ==========================
// Loading Animation
// ==========================
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDescription = document.querySelector('.hero-description');
  const heroButtons = document.querySelector('.hero-buttons');

  if (heroTitle) { setTimeout(() => heroTitle.style.opacity = '1', 200); }
  if (heroSubtitle) { setTimeout(() => heroSubtitle.style.opacity = '1', 400); }
  if (heroDescription) { setTimeout(() => heroDescription.style.opacity = '1', 600); }
  if (heroButtons) { setTimeout(() => heroButtons.style.opacity = '1', 800); }
});

// ==========================
// Lazy Loading
// ==========================
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

if (document.querySelectorAll('img[data-src]').length > 0) {
  initializeLazyLoading();
}

// ==========================
// Easter Egg: "ahdabest"
// ==========================
let secret = [];
const target = ['a','h','d','a','b','e','s','t'];

document.addEventListener('keydown', e => {
  secret.push(e.key.toLowerCase());
  if (secret.length > target.length) secret.shift();

  if (secret.join('') === target.join('')) {
    showNotification('🎉 Easter Egg Activated, Absolute Hack is Da Best! 🤖', 'success');

    document.body.classList.add('rainbow-filter', 'shake-screen');
    launchConfetti();
    showBigText("Absolute is Da Best");

    setTimeout(() => {
      document.body.classList.remove('rainbow-filter', 'shake-screen');
    }, 10000);

    secret = [];
  }
});

// ==========================
// Easter Egg Styles
// ==========================
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbowHue {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  .rainbow-filter { animation: rainbowHue 10s linear infinite; }

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
  .shake-screen { animation: shake 0.5s infinite; }

  @keyframes popSpin {
    0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
    20% { transform: scale(1.5) rotate(180deg); opacity: 1; }
    50% { transform: scale(0.8) rotate(360deg); }
    80% { transform: scale(1.8) rotate(540deg); }
    100% { transform: scale(1) rotate(720deg); opacity: 0; }
  }
  .big-text {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    font-weight: bold;
    color: gold;
    text-shadow: 0 0 30px red, 0 0 50px blue;
    z-index: 100000;
    white-space: nowrap;
    animation: popSpin 10s ease-in-out forwards;
    pointer-events: none;
  }

  @keyframes fall {
    0% { transform: translateY(-50px) rotate(0deg); opacity:1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
  }
  .confetti {
    position: fixed;
    top: -20px;
    width: 10px;
    height: 10px;
    background-color: red;
    z-index: 99999;
    pointer-events: none;
    animation: fall 10s linear forwards;
  }
`;
document.head.appendChild(style);

// ==========================
// Easter Egg Helpers
// ==========================
function launchConfetti() {
  for (let i=0; i<100; i++) {
    let c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*window.innerWidth + "px";
    c.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    let size = Math.random()*8+5;
    c.style.width = size+"px";
    c.style.height = size+"px";
    c.style.animation

