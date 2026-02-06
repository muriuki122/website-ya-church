// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            console.log('Mobile toggle clicked');
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                resetHamburger();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                resetHamburger();
            }
        });
    }

    function resetHamburger() {
        const spans = mobileToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Language Switcher Functionality
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLanguage = document.getElementById('currentLanguage');

    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Language toggle clicked');
            languageDropdown.classList.toggle('show');
        });

        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = option.getAttribute('data-lang');
                const selectedText = option.querySelector('span').textContent;
                
                console.log(`Selected language: ${selectedText}`);
                
                // Update current language display
                if (currentLanguage) {
                    currentLanguage.textContent = selectedText;
                }
                
                // Update active state
                languageOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Close dropdown
                languageDropdown.classList.remove('show');
                
                // Show language change confirmation
                showNotification(`Language changed to ${selectedText}`);
                
                // In a real implementation, load translations
                loadTranslations(selectedLang);
            });
        });

        // Close language dropdown when clicking outside
        document.addEventListener('click', () => {
            languageDropdown.classList.remove('show');
        });
    }

    // Schedule Tabs Functionality
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleDays = document.querySelectorAll('.schedule-day');

    if (scheduleTabs.length > 0) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetDay = tab.getAttribute('data-day');
                console.log(`Schedule tab clicked: ${targetDay}`);
                
                // Update active tab
                scheduleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding schedule
                scheduleDays.forEach(day => {
                    day.classList.remove('active');
                    if (day.id === targetDay) {
                        day.classList.add('active');
                    }
                });
            });
        });
    }

    // YouTube Subscribe Button
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            console.log('Subscribe button clicked');
            // Replace with your actual YouTube channel URL
            window.open('https://www.youtube.com/@churchofelohimkaloleni', '_blank');
            showNotification('Thank you for subscribing to our YouTube channel!');
        });
    }

    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification(`Thank you for subscribing with: ${emailInput.value}`);
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    });

    // YouTube Play Button Functionality
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Play button clicked');
            // Get the YouTube playlist URL from the parent link
            const youtubeLink = btn.closest('.music-group').querySelector('.youtube-link');
            if (youtubeLink) {
                window.open(youtubeLink.href, '_blank');
            } else {
                showNotification('Video playlist would open here');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize animations
    initAnimations();
}

// Translation function (placeholder for real implementation)
function loadTranslations(lang) {
    console.log(`Loading translations for: ${lang}`);
    // This would typically fetch a JSON file with translations
    // and update all elements with data-key attributes
}

// Enhanced Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification to page
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Close notification on button click
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Enhanced Scroll Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.history-item, .music-group, .ceremony-card, .leader-card, .activity-card, .timeline-item'
    );

    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered delay for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize counter animation
    initCounterAnimation();
}

// Enhanced Counter Animation
function initCounterAnimation() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.history-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById('navLinks');
            const mobileToggle = document.getElementById('mobileToggle');
            if (navLinks && mobileToggle) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                resetHamburger();
            }
        }
    }, 250);
});

// Add error handling for missing elements
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounter,
        initAnimations
    };
}