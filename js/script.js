/**
 * STREAMFLIX - JavaScript Interactif
 * Fonctionnalités Bootstrap et animations personnalisées
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================================
    // NAVIGATION SCROLLED EFFECT
    // ==========================================================================
    const navbar = document.querySelector('.navbar-streamflix');
    let scrollTimer = null;

    function handleScroll() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            if (window.scrollY > 50) {
                navbar?.classList.add('navbar-scrolled');
            } else {
                navbar?.classList.remove('navbar-scrolled');
            }
        }, 10);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==========================================================================
    // ANIMATION DES CARTES AU SCROLL
    // ==========================================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-slide-left');
                }, index * 100); // Délai échelonné pour effet cascade

                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux cartes
    document.querySelectorAll('.card-streamflix').forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // ==========================================================================
    // VALIDATION BOOTSTRAP FORMS
    // ==========================================================================
    (function() {
        'use strict';

        const forms = document.querySelectorAll('.needs-validation');

        Array.from(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                // Validation personnalisée des mots de passe
                const password = form.querySelector('#password');
                const confirmPassword = form.querySelector('#confirm-password');

                if (password && confirmPassword) {
                    if (password.value !== confirmPassword.value) {
                        confirmPassword.setCustomValidity('Les mots de passe ne correspondent pas');
                    } else {
                        confirmPassword.setCustomValidity('');
                    }
                }

                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();

                    // Focus sur le premier champ invalide
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                }

                form.classList.add('was-validated');
            }, false);

            // Validation en temps réel pour les mots de passe
            const confirmPassword = form.querySelector('#confirm-password');
            const password = form.querySelector('#password');

            if (confirmPassword && password) {
                confirmPassword.addEventListener('input', function() {
                    if (password.value !== confirmPassword.value) {
                        confirmPassword.setCustomValidity('Les mots de passe ne correspondent pas');
                    } else {
                        confirmPassword.setCustomValidity('');
                    }
                });
            }
        });
    })();

    // ==========================================================================
    // RECHERCHE INTERACTIVE
    // ==========================================================================
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = createSearchSuggestions();

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', showSuggestions);
        searchInput.addEventListener('blur', hideSuggestions);
    }

    function createSearchSuggestions() {
        const suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions position-absolute w-100 bg-dark border border-secondary rounded-bottom mt-1 d-none';
        suggestions.style.zIndex = '1050';

        const suggestionsList = [
            'Inception', 'The Dark Knight', 'Interstellar', 'The Matrix',
            'Pulp Fiction', 'Forrest Gump', 'Fight Club', 'The Godfather'
        ];

        suggestionsList.forEach(movie => {
            const item = document.createElement('div');
            item.className = 'p-2 text-light border-bottom border-secondary suggestion-item';
            item.textContent = movie;
            item.style.cursor = 'pointer';

            item.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = movie;
                    hideSuggestions();
                }
            });

            item.addEventListener('mouseenter', () => {
                item.classList.add('bg-danger');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('bg-danger');
            });

            suggestions.appendChild(item);
        });

        if (searchInput?.parentNode) {
            searchInput.parentNode.appendChild(suggestions);
        }

        return suggestions;
    }

    function handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const suggestions = searchSuggestions.querySelectorAll('.suggestion-item');

        suggestions.forEach(suggestion => {
            const text = suggestion.textContent.toLowerCase();
            if (text.includes(query) && query.length > 0) {
                suggestion.style.display = 'block';
            } else {
                suggestion.style.display = 'none';
            }
        });

        if (query.length > 0) {
            showSuggestions();
        } else {
            hideSuggestions();
        }
    }

    function showSuggestions() {
        searchSuggestions?.classList.remove('d-none');
    }

    function hideSuggestions() {
        setTimeout(() => {
            searchSuggestions?.classList.add('d-none');
        }, 200);
    }

    // ==========================================================================
    // TOOLTIPS BOOTSTRAP
    // ==========================================================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ==========================================================================
    // CARTES INTERACTIVES
    // ==========================================================================
    document.querySelectorAll('.card-streamflix').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // Ajout d'un effet de pulse au clic
        card.addEventListener('click', function() {
            this.classList.add('animate-pulse');
            setTimeout(() => {
                this.classList.remove('animate-pulse');
            }, 1000);
        });
    });

    // ==========================================================================
    // EFFET PARALLAX HERO (si supporté)
    // ==========================================================================
    const hero = document.querySelector('.hero');

    if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // ==========================================================================
    // LAZY LOADING AMÉLIORÉ
    // ==========================================================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================================================
    // GESTION DU THEME (BONUS)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // ==========================================================================
    // PERFORMANCE: DEBOUNCE UTILITY
    // ==========================================================================
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // ==========================================================================
    // ANALYTICS & TRACKING (simulation)
    // ==========================================================================
    function trackEvent(category, action, label) {
        console.log(`Analytics: ${category} - ${action} - ${label}`);
        // Ici, vous intégreriez Google Analytics ou autre
    }

    // Tracker les clics sur les cartes de films
    document.querySelectorAll('.card-streamflix').forEach((card, index) => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title')?.textContent || `Film ${index + 1}`;
            trackEvent('Movie', 'Click', title);
        });
    });

});

// ==========================================================================
// SERVICE WORKER (OPTIONNEL POUR PWA)
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
