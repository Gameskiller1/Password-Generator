// ===== COOKIE CONSENT BANNER =====

(function() {
    'use strict';

    // Check if user already accepted/rejected cookies
    function checkCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        return consent === 'accepted' || consent === 'rejected';
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
                    <button id="cookie-reject" class="cookie-btn cookie-btn-secondary">Reject</button>
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

        // Reject button
        document.getElementById('cookie-reject').addEventListener('click', function() {
            rejectCookies();
        });

        // Privacy Policy button
        document.getElementById('cookie-policy').addEventListener('click', function() {
            window.location.href = 'privacy-policy.html';
        });
    }

    // Save consent and hide banner
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        hideBanner();
        // Here you can enable analytics, tracking pixels, etc.
        loadGoogleAnalytics();
        console.log('Cookies accepted');
    }

    // Reject cookies and hide banner
    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        hideBanner();
        // Delete existing cookies (optional)
        deleteCookies();
        console.log('Cookies rejected');
    }

    // Hide banner with animation
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Delete all cookies
    function deleteCookies() {
        document.cookie.split(";").forEach(function(c) {
            const cookieName = c.split("=")[0].trim();
            document.cookie = `${cookieName}=;expires=${new Date().toUTCString()};path=/`;
        });
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (!checkCookieConsent()) {
            showCookieBanner();
        }
    });
    // Google Analytics loading function
function loadGoogleAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-P0T3MB5LBZ');
    
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-P0T3MB5LBZ";
    
    document.head.appendChild(script);
    
    console.log('Google Analytics loaded');
    }
})();