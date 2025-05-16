document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTestimonialSlider();
    initContactForm();
    initEmailSignup();
    initCookieConsent();
    initLazyLoading();
    initAnimations();
});

// Performance optimization - Lazy loading images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src], img:not([data-src])');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    // Add animation class when image comes into view
                    img.classList.add('animate-in');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('animate-in');
        });
    }
}

// Add animations to elements when they come into view
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .testimonial-card, .contact-form');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('animate-in'));
    }
}

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        if (link.hash) {
            link.addEventListener('click', function(e) {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (name === '' || email === '' || message === '') {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (in a real project, this would be an API call)
        setTimeout(function() {
            showFormMessage('Your message has been sent successfully!', 'success');
            contactForm.reset();
        }, 1000);
    });
    
    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = type;
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Email signup functionality
function initEmailSignup() {
    const emailSignup = document.getElementById('emailSignup');
    const closeSignup = document.getElementById('closeSignup');
    const signupForm = document.getElementById('signupForm');
    const signupStatus = document.getElementById('signupStatus');
    
    if (!emailSignup) return;
    
    // Check if user has previously closed the signup
    const hasClosedSignup = localStorage.getItem('closedSignup');
    
    if (!hasClosedSignup) {
        // Show signup after 5 seconds
        setTimeout(function() {
            emailSignup.classList.add('show');
        }, 5000);
    }
    
    // Close button functionality
    if (closeSignup) {
        closeSignup.addEventListener('click', function() {
            emailSignup.classList.remove('show');
            localStorage.setItem('closedSignup', 'true');
        });
    }
    
    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            
            // Validate form
            if (name === '' || email === '') {
                showSignupMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showSignupMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            setTimeout(function() {
                showSignupMessage('Thank you for subscribing!', 'success');
                signupForm.reset();
                
                // Hide signup after successful submission
                setTimeout(function() {
                    emailSignup.classList.remove('show');
                    localStorage.setItem('closedSignup', 'true');
                }, 3000);
            }, 1000);
        });
    }
    
    function showSignupMessage(message, type) {
        signupStatus.textContent = message;
        signupStatus.className = type;
        signupStatus.style.display = 'block';
    }
}

// Cookie consent functionality
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    if (!cookieBanner) return;
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent === null) {
        // Show cookie banner if no choice has been made
        cookieBanner.classList.add('show');
    }
    
    // Accept cookies
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
        });
    }
    
    // Decline cookies
    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}