// ===== COOKIE CONSENT BANNER =====

(function() {
    'use strict';

    // Check if user already accepted cookies
    function checkCookieConsent() {
        return localStorage.getItem('cookieConsent') === 'accepted';
    }

    // Show cookie banner
    function showCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p>We use cookies to enhance your experience and analyze website traffic. 
                    By using our site, you consent to our use of cookies.</p>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept</button>
                    <button id="cookie-policy" class="cookie-btn cookie-btn-secondary">Learn More</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);

        // Accept button
        document.getElementById('cookie-accept').addEventListener('click', function() {
            acceptCookies();
        });

        // Privacy Policy button
        document.getElementById('cookie-policy').addEventListener('click', function() {
            window.location.href = 'privacy-policy.html';
        });
    }

    // Save consent and hide banner
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (!checkCookieConsent()) {
            showCookieBanner();
        }
    });
})();