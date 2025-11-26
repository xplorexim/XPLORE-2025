// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smooth follow for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .event-card, .team-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            lenis.scrollTo(targetElement, {
                offset: -80, // Adjust for fixed header
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

sections.forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveLink(section.id),
        onEnterBack: () => setActiveLink(section.id)
    });
});

function setActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// =========================================
// GSAP ANIMATIONS
// =========================================

// Hero Section Animations
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.hero-label', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out'
    })
    .from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.cta-wrapper', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    }, '-=0.4');

// About Section Animations
gsap.from('.about-text > *', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.image-wrapper', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
    },
    scale: 0.8,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 1.2,
    ease: 'power3.out'
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: 'power2.out'
            });
        }
    });
});

// Events Section Animations
gsap.from('.section-header', {
    scrollTrigger: {
        trigger: '#events',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 1,
    ease: 'power3.out'
});

// Team Section Animations
gsap.from('.team-card', {
    scrollTrigger: {
        trigger: '.team-grid',
        start: 'top 85%',
    },
    y: 100,
    opacity: 0,
    filter: 'blur(5px)',
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
});

// Contact Section Animations
gsap.from('.contact-wrapper', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    filter: 'blur(10px)',
    duration: 1.2,
    ease: 'power3.out'
});

// =========================================
// EVENT DATA & RENDERING
// =========================================
const eventsContent = document.querySelector('.events-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

const events = [
    {
        id: 1,
        title: "Git and Github Workshop",
        date: "2025-05-03",
        description: "Master the basics of version control with our hands-on Git & GitHub workshop.",
        type: "past",
        link: "#"
    },
    {
        id: 2,
        title: "ESG Hackathon",
        date: "2025-07-25",
        description: "Uniting students to tackle real-world ESG challenges with innovative tech solutions.",
        type: "upcoming",
        link: "#"
    },
    {
        id: 3,
        title: "Code Relay",
        date: "2025-09-13",
        description: "A high-energy coding competition where teamwork makes the dream work.",
        type: "upcoming",
        link: "#"
    },
    {
        id: 4,
        title: "Blind Coding",
        date: "2024-09-13",
        description: "Test your coding muscle memory in this challenging blind coding event.",
        type: "past",
        link: "#"
    },
    {
        id: 5,
        title: "AI Prompting",
        date: "2024-09-13",
        description: "Explore the art of communicating with AI to generate code and content.",
        type: "past",
        link: "#"
    },
];

function renderEvents(filter) {
    eventsContent.innerHTML = '';
    
    const filteredEvents = filter === 'all' 
        ? events 
        : events.filter(event => event.type === filter);

    filteredEvents.forEach((event, index) => {
        const date = new Date(event.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <span class="event-date">${formattedDate}</span>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <a href="${event.link}" class="event-link">
                ${event.type === 'upcoming' ? 'Register Now' : 'View Details'}
            </a>
        `;
        
        eventsContent.appendChild(card);

        // Animate new cards with a clear "to" state
        gsap.fromTo(card, 
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                delay: index * 0.1, 
                ease: 'power3.out',
                clearProps: 'opacity' // Ensure opacity is cleared after animation to avoid issues
            }
        );
    });
    
    // Refresh ScrollTrigger to account for new DOM elements
    ScrollTrigger.refresh();
}

// Initial Render
renderEvents('all');

// Filter Click Handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderEvents(btn.getAttribute('data-filter'));
    });
});

// =========================================
// FORM HANDLING
// =========================================
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        // e.preventDefault(); // Uncomment if you want to handle via AJAX
        // Add AJAX handling here if needed
    });
}

// Dynamic Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
