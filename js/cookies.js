// ===== COOKIE CONSENT BANNER =====

// ===== COOKIE CONSENT BANNER =====

(function() {
    'use strict';

    // ✅ Инициализируй gtag ДО использования
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    // ✅ По умолчанию - запрашиваем согласие
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',              
        'ad_personalization': 'denied',        
        'wait_for_update': 500
    });

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

    // ✅ Accept: Включи Analytics
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        
        // ✅ Обнови согласие
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });

        loadGoogleAnalytics();
        hideBanner();
        console.log('✅ Cookies accepted - Full consent granted');
    }

    // ✅ Reject: Отключи Analytics (ИСПРАВЛЕНО!)
    function rejectCookies() {
        localStorage.setItem('cookieConsent', 'rejected');
        
        // ✅ Обнови согласие (теперь синтаксис правильный!)
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        }); // ✅ ИСПРАВЛЕНА СКОБКА!
        
        hideBanner();
        console.log('❌ Cookies rejected - All consent denied');
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

    // ✅ Load Google Analytics
    function loadGoogleAnalytics() {
        gtag('js', new Date());
        gtag('config', 'G-P0T3MB5LBZ');
        gtag('event', 'page_view');
        
        // Load the GA script dynamically
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-P0T3MB5LBZ";
        document.head.appendChild(script);
        
        console.log('📊 Google Analytics loaded');
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        const consent = localStorage.getItem('cookieConsent');
        
        if (!consent) {
            // ✅ Нет согласия → показывай баннер
            showCookieBanner();
        } else if (consent === 'accepted') {
            // ✅ Уже согласился → загружай Analytics
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
            loadGoogleAnalytics();
        }
    });

})();