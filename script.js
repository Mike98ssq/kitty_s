// Header hide/show on scroll
let lastScrollTop = 0;
const header = document.getElementById('header');
let isHeaderVisible = true;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - partially hide header
        if (isHeaderVisible) {
            header.classList.remove('header-visible');
            header.classList.add('header-hidden');
            isHeaderVisible = false;
        }
    } else {
        // Scrolling up - show header
        if (!isHeaderVisible) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            isHeaderVisible = true;
        }
    }
    lastScrollTop = scrollTop;
});

// Show header on hover
header.addEventListener('mouseenter', () => {
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
    isHeaderVisible = true;
});

// Hide header after leaving if scrolled down
header.addEventListener('mouseleave', () => {
    if (window.pageYOffset > 100) {
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
        isHeaderVisible = false;
    }
});

// Smooth scrolling and active section detection
let currentSection = 0;
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section[id^="section-"], #hero');

// Update navigation buttons
function updateNavButtons(activeIndex) {
    navButtons.forEach((btn, index) => {
        if (index === activeIndex) {
            btn.className = 'nav-btn px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded-full';
        } else {
            btn.className = 'nav-btn px-3 py-1 text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full';
        }
    });
}

// Scroll to section function
function scrollToSection(index) {
    const section = document.getElementById(index === 0 ? 'hero' : `section-${index-1}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        currentSection = index;
        updateNavButtons(currentSection);
    }
}

// Intersection Observer for scroll detection
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'hero') {
                currentSection = 0;
            } else if (id.startsWith('section-')) {
                currentSection = parseInt(id.split('-')[1]) + 1;
            }
            updateNavButtons(currentSection);
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Animation on scroll
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .section-content').forEach(el => {
    observer2.observe(el);
});

// Mute all videos (except the one with controls)
document.querySelectorAll('video').forEach(video => {
    if(!video.hasAttribute('controls')) {
        video.setAttribute('muted', '');
    }
    video.setAttribute('playsinline', '');
});

// Modal functionality
const modal = document.getElementById('modal');
const ctaButton = document.getElementById('ctaButton');
const modalClose = document.querySelector('.modal-close');

ctaButton.addEventListener('click', () => {
    modal.classList.add('show');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Initialize first section
updateNavButtons(0);