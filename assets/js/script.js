// Verdancy Storyworks Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initGlitchEffects();
    initTerminalAnimation();
    initNewsletterForm();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link (except dropdown toggle)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Don't close menu if this is the dropdown toggle
            if (!this.classList.contains('dropdown-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
        
        lastScroll = currentScroll;
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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

    // Dropdown functionality
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdown && dropdownToggle) {
        // Toggle dropdown on click (for mobile)
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking on dropdown links
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdown.classList.remove('active');
            });
        });

        // Handle keyboard navigation
        dropdownToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
}

// Scroll-based animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.book-card, .about-text, .newsletter-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add random glitch effect to dystopian frame
    const dystopianFrame = document.querySelector('.dystopian-frame');
    if (dystopianFrame) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                dystopianFrame.classList.add('glitch-active');
                setTimeout(() => {
                    dystopianFrame.classList.remove('glitch-active');
                }, 300);
            }
        }, 2000);
    }
    
    // Style Substack iframe content
    const substackIframe = document.querySelector('.embed-container iframe');
    if (substackIframe) {
        substackIframe.onload = function() {
            try {
                const iframeDoc = substackIframe.contentDocument || substackIframe.contentWindow.document;
                const style = iframeDoc.createElement('style');
                style.textContent = `
                    .embed-page, .embed-page-inner {
                        background: #1a1a1a !important;
                        color: white !important;
                    }
                    .publication-name, .publication-name a, .publication-tagline, 
                    .publication-meta, .pencraft {
                        color: white !important;
                    }
                    .subscribe-widget, .form, .container-IpPqBD {
                        background: #1a1a1a !important;
                    }
                    .emailInput-OkIMeB, .input-y4v6N4 {
                        background: #2a2a2a !important;
                        color: white !important;
                        border-color: #00ffff !important;
                    }
                    .subscribe-btn, .button-VFSdkv {
                        background: #00ff88 !important;
                        color: #0a0a0a !important;
                    }
                `;
                iframeDoc.head.appendChild(style);
            } catch (e) {
                // Cross-origin restrictions prevent styling - expected behavior
                console.log('Substack iframe styling blocked by CORS policy');
            }
        };
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced glitch effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        // Random glitch triggers
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.classList.add('glitch-active');
                setTimeout(() => {
                    element.classList.remove('glitch-active');
                }, 200);
            }
        }, 100);
        
        // Hover effect
        element.addEventListener('mouseenter', function() {
            this.classList.add('glitch-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('glitch-hover');
        });
    });

    // Random screen flicker
    setInterval(() => {
        if (Math.random() > 0.98) {
            document.body.style.filter = 'brightness(1.2) contrast(1.1)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 50);
        }
    }, 1000);
}

// Terminal animation
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    const cursor = document.querySelector('.terminal-cursor');
    
    if (terminalLines.length > 0) {
        // Animate terminal lines with typing effect
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTerminal();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.terminal-window'));
    }

    function animateTerminal() {
        terminalLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                typeText(line, text, 50);
            }, index * 800);
        });
    }

    function typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Newsletter form functionality
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    const input = document.querySelector('.form-input');
    const status = document.querySelector('.form-status');

    if (form) {
        // Check if EmailJS is configured
        const isConfigured = EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' && 
                           EMAIL_CONFIG.serviceId !== 'YOUR_SERVICE_ID' && 
                           EMAIL_CONFIG.templateId !== 'YOUR_TEMPLATE_ID';

        if (isConfigured) {
            // Initialize EmailJS
            emailjs.init({
                publicKey: EMAIL_CONFIG.publicKey,
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            
            if (!isValidEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            showStatus('Connecting to transmission network...', 'loading');

            if (!isConfigured) {
                // Fallback for when EmailJS is not configured
                console.warn('EmailJS not configured. Newsletter subscription for:', email);
                setTimeout(() => {
                    showStatus('Configuration required. Check console for setup instructions.', 'error');
                }, 1000);
                return;
            }

            // Send email using EmailJS
            const templateParams = {
                user_email: email,
                message: `New newsletter subscription from: ${email}`,
                to_name: 'Verdancy Storyworks',
                to_email: EMAIL_CONFIG.adminEmail, // Email to receive notifications
                from_name: email,
                current_time: new Date().toLocaleString()
            };

            // Debug: Log configuration being used
            console.log('EmailJS Config:', {
                serviceId: EMAIL_CONFIG.serviceId,
                templateId: EMAIL_CONFIG.templateId,
                publicKey: EMAIL_CONFIG.publicKey.substring(0, 5) + '...'
            });
            console.log('Template params:', templateParams);

            emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
                .then((response) => {
                    console.log('Newsletter subscription successful!', response.status, response.text);
                    showStatus('Successfully connected! Welcome to the network.', 'success');
                    input.value = '';
                }, (error) => {
                    console.error('Newsletter subscription failed:', error);
                    console.error('Error details:', {
                        status: error.status,
                        text: error.text,
                        message: error.message
                    });
                    
                    // More specific error messages
                    let errorMsg = 'Connection failed. Please try again later.';
                    if (error.status === 400) {
                        errorMsg = 'Invalid request. Please check your email format.';
                    } else if (error.status === 401 || error.status === 403) {
                        errorMsg = 'Authentication failed. Please contact support.';
                    } else if (error.status === 404) {
                        errorMsg = 'Service not found. Please contact support.';
                    }
                    
                    showStatus(errorMsg, 'error');
                });
        });

        // Input focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showStatus(message, type) {
        status.textContent = message;
        status.className = `form-status ${type}`;
        
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                status.textContent = '';
                status.className = 'form-status';
            }, 3000);
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createRipple(this);
        });
    });

    function createRipple(button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Book card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations
const additionalStyles = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .glitch-active {
        animation: glitch-intense 0.2s ease-in-out;
    }

    .glitch-hover {
        text-shadow: 
            2px 0 #ff00ff,
            -2px 0 #00ffff,
            0 2px #ffff00;
    }

    @keyframes glitch-intense {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }

    .form-status {
        margin-top: 1rem;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .form-status.success {
        background: rgba(0, 255, 136, 0.1);
        color: var(--accent-green);
        border: 1px solid var(--accent-green);
    }

    .form-status.error {
        background: rgba(255, 68, 68, 0.1);
        color: var(--accent-red);
        border: 1px solid var(--accent-red);
    }

    .form-status.loading {
        background: rgba(0, 255, 255, 0.1);
        color: var(--accent-blue);
        border: 1px solid var(--accent-blue);
    }

    .form-group.focused .form-input {
        border-color: var(--accent-blue);
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);