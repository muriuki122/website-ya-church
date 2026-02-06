// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// YouTube Search Functionality
const youtubeSearchInput = document.getElementById('youtube-search-input');
const youtubeSearchBtn = document.getElementById('youtube-search-btn');
const videoPlayerFrame = document.querySelector('.stream-player iframe');

const CHANNEL_ID = 'UCRlkkd6Koyi5biTO8W7eRaQ';
const UPLOADS_PLAYLIST_ID = 'UURlkkd6Koyi5biTO8W7eRaQ'; // The 'UC' replaced with 'UU' for all uploads

if (youtubeSearchBtn && youtubeSearchInput && videoPlayerFrame) {
    youtubeSearchBtn.addEventListener('click', () => {
        const query = youtubeSearchInput.value.trim();
        if (query) {
            // Attempt searching within the embed
            const searchQuery = encodeURIComponent('Kaloleni Church ' + query);
            videoPlayerFrame.src = `https://www.youtube.com/embed?listType=search&list=${searchQuery}&autoplay=1`;
            showToast('Searching for: ' + query);
        } else {
            // If search is empty, show all uploads
            videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=1`;
            showToast('Showing all church videos');
        }
    });

    youtubeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            youtubeSearchBtn.click();
        }
    });
}

// Quick Browse Functionality - Using Channel ID context
const browseBtns = document.querySelectorAll('.btn-browse');
if (browseBtns.length > 0 && videoPlayerFrame) {
    browseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-browse');

            // For now, we point to the main uploads playlist for all categories
            // If you have specific playlists for Songs/Activities, we can use those IDs
            videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=1`;

            document.querySelector('.stream-player').scrollIntoView({ behavior: 'smooth' });
            showToast('Loading Kaloleni ' + btn.textContent.trim() + '...');
        });
    });
}

// Language Switcher Functionality
const currentLanguage = document.getElementById('current-language');
const languageOptions = document.querySelectorAll('.language-dropdown li');

languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLang = option.getAttribute('data-lang');
        currentLanguage.textContent = selectedLang.toUpperCase();

        // In a real implementation, you would load translations here
        console.log(`Language changed to: ${option.textContent}`);
    });
});

// Toast Notification Function
function showToast(message, duration = 3000) {
    const toast = document.getElementById('notification-success');
    const toastMessage = document.getElementById('notification-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// Notify Me Button Functionality
const notifyBtn = document.getElementById('btn-notify-me');
if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
        // Simple visual feedback without redirection
        notifyBtn.innerHTML = '<i class="fas fa-check"></i> Notified';
        notifyBtn.style.backgroundColor = '#d4af37';
        notifyBtn.style.color = '#1a2b6d';

        showToast('You will be notified for the next live service!');

        // Disable button after clicking to show it worked
        notifyBtn.disabled = true;
        notifyBtn.style.cursor = 'default';
        notifyBtn.style.opacity = '0.8';
    });
}

// Check Live Button Functionality
const checkLiveBtn = document.getElementById('btn-check-live');
if (checkLiveBtn) {
    checkLiveBtn.addEventListener('click', () => {
        const originalContent = checkLiveBtn.innerHTML;
        checkLiveBtn.innerHTML = '<i class="fas fa-sync fa-spin"></i> Checking...';

        // Refresh the status
        updateStreamStatus();

        // Visual feedback
        setTimeout(() => {
            checkLiveBtn.innerHTML = originalContent;
            showToast('Checked for live stream status.');
        }, 1500);
    });
}

// YouTube Subscribe Button Functionality (Simulation)
const subscribeBtn = document.getElementById('btn-subscribe-live');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
        subscribeBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed';
        subscribeBtn.style.opacity = '0.8';
        showToast('Thank you for subscribing to our YouTube updates!');
        subscribeBtn.disabled = true;
    });
}

// Form Submission Handling (Newsletter)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (emailInput && emailInput.value) {
            // Visual feedback
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showToast(`Successfully subscribed: ${emailInput.value}`);
                emailInput.value = '';
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
});

// Live Stream Status & Player Control
function updateStreamStatus() {
    const liveBadge = document.querySelector('.live-badge');
    const streamStatus = document.querySelector('.stream-status h3');
    const sermonTitle = document.querySelector('.sermon-title');
    const videoPlayerFrame = document.querySelector('.stream-player iframe');

    // Check if current time is during service hours
    // Friday: From 6:30 PM (18.5) onwards
    // Saturday: 9:00 AM to 4:00 PM (16.0)
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInDecimal = hour + (minute / 60);

    let isLiveTime = false;
    let serviceName = '';
    let serviceStatusText = '';

    if (day === 5 && timeInDecimal >= 18.5) {
        // Friday evening
        isLiveTime = true;
        serviceName = 'Friday Evening Service';
        serviceStatusText = 'Join us for our Friday vespers service';
    } else if (day === 6 && timeInDecimal >= 9 && timeInDecimal < 16) {
        // Saturday service
        isLiveTime = true;
        serviceName = 'Saturday Service';
        serviceStatusText = 'The Shabbat service is currently in progress';
    }

    if (liveBadge) {
        if (isLiveTime) {
            // Live time - Use Live Embed URL
            liveBadge.innerHTML = '<i class="fas fa-circle"></i> LIVE NOW';
            liveBadge.style.background = 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)';
            if (streamStatus) streamStatus.textContent = serviceName;
            if (sermonTitle) sermonTitle.textContent = serviceStatusText;

            // Direct link to the live stream if possible, otherwise use the live playlist
            // Using channel direct live embed is most reliable for "currently live"
            const liveEmbedUrl = `https://www.youtube.com/embed/live?channel=${CHANNEL_ID}&autoplay=1&mute=1`;

            if (videoPlayerFrame && !videoPlayerFrame.src.includes('embed/live')) {
                videoPlayerFrame.src = liveEmbedUrl;
            }
        } else {
            // Not during service hours
            liveBadge.innerHTML = '<i class="fas fa-circle"></i> OFFLINE';
            liveBadge.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
            if (streamStatus) streamStatus.textContent = 'Service Not Currently Live';
            if (sermonTitle) sermonTitle.textContent = 'Browse our songs and activities below or visit our archives';

            // Revert to uploads playlist if it was live before
            if (videoPlayerFrame && videoPlayerFrame.src.includes('embed/live')) {
                videoPlayerFrame.src = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&autoplay=0`;
            }
        }
    }
}

// Update stream status on page load
document.addEventListener('DOMContentLoaded', updateStreamStatus);

// Update stream status every minute
setInterval(updateStreamStatus, 60000);

// Scroll Animation for Elements
function checkScroll() {
    const elements = document.querySelectorAll('.event-card, .stream-info, .cta-box');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .stream-info, .cta-box');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Check scroll position on load
    checkScroll();
});

// Listen for scroll events
window.addEventListener('scroll', checkScroll);

// YouTube API Integration (for future enhancements)
// This would be used to get real-time stream status and viewer count
function loadYouTubeAPI() {
    // This is a placeholder for YouTube API integration
    // In a real implementation, you would:
    // 1. Load the YouTube IFrame API
    // 2. Get the channel's live broadcast status
    // 3. Update the UI accordingly
    console.log('YouTube API would be loaded here');
}

// Load YouTube API when the page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadYouTubeAPI);
} else {
    loadYouTubeAPI();
}