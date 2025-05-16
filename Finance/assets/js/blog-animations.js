/* Blog Post Animations */

document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements as they scroll into view
    const animateElements = () => {
        const elements = document.querySelectorAll('h2, h3, p, ul, ol, .post-cta, .sidebar-widget, .blog-post, .blog-card, .post-image img');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                // Add a slight delay for each element to create a cascade effect
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 50);
            }
        });
    };
    
    // Initial check for elements in view
    animateElements();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateElements);
    
    // Add hover effects to related posts and resource links
    const linkItems = document.querySelectorAll('.related-posts a, .resource-links a');
    
    linkItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(5px)';
            this.style.color = 'var(--secondary-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'var(--primary-color)';
        });
    });
    
    // Fix broken links
    const checkLinks = () => {
        const allLinks = document.querySelectorAll('a');
        
        allLinks.forEach(link => {
            // Skip links with hash or external links
            if (!link.hasAttribute('href') || 
                link.getAttribute('href').startsWith('#') || 
                link.getAttribute('href').startsWith('http')) {
                return;
            }
            
            // Check if link needs to be fixed
            if (link.getAttribute('href').startsWith('./') && 
                !window.location.pathname.includes('blogs/')) {
                // No need to fix links on main pages
                return;
            }
            
            // Fix links in blog posts that point to root files
            if (link.getAttribute('href').startsWith('./') && 
                window.location.pathname.includes('blogs/')) {
                const newHref = link.getAttribute('href').replace('./', '../');
                link.setAttribute('href', newHref);
            }
        });
    };
    
    // Run link checker
    checkLinks();
    
    // Optimize images
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading lazy attribute for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add error handling
            img.addEventListener('error', function() {
                this.src = '../assets/images/digital-analytics.jpg';
            });
        });
    };
    
    // Run image optimizer
    optimizeImages();
});