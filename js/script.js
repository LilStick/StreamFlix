/**
 * STREAMFLIX - JavaScript Interactif
 * Fonctionnalités Bootstrap, animations personnalisées et exercices progressifs
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 StreamFlix - Chargement des exercices JavaScript');

    // ==========================================================================
    // EXERCICE 1 : AFFICHER/MASQUER SECTIONS
    // ==========================================================================
    console.log('📋 Exercice 1 : Initialisation des boutons masquer/afficher');

    // Sélectionner toutes les sections de films
    const movieSections = document.querySelectorAll('.movie-grid');

    movieSections.forEach(function(section) {
        // Créer un bouton pour chaque section
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Masquer la section';
        toggleButton.classList.add('section-toggle');

        // Insérer le bouton avant la section
        section.parentNode.insertBefore(toggleButton, section);

        // Ajouter l'événement click
        toggleButton.addEventListener('click', function() {
            const movieGrid = this.nextElementSibling; // La section suivante

            if (movieGrid.classList.contains('hidden')) {
                movieGrid.classList.remove('hidden');
                this.textContent = 'Masquer la section';
            } else {
                movieGrid.classList.add('hidden');
                this.textContent = 'Afficher la section';
            }

            console.log('Section toggle:', movieGrid.classList.contains('hidden') ? 'masquée' : 'affichée');
        });
    });

    // ==========================================================================
    // EXERCICE 2 : COMPTEUR DE FILMS
    // ==========================================================================
    console.log('📊 Exercice 2 : Comptage des films');

    // Compter tous les films (cartes de films)
    const allMovieCards = document.querySelectorAll('.card-streamflix');
    const movieCount = allMovieCards.length;

    // Créer l'élément compteur
    const counterElement = document.createElement('div');
    counterElement.classList.add('film-counter');
    counterElement.innerHTML = `
        <h3>📊 Catalogue StreamFlix</h3>
        <p><strong>${movieCount} films</strong> disponibles</p>
    `;

    // Ajouter le compteur dans le footer
    const footer = document.querySelector('footer .container');
    if (footer) {
        footer.insertBefore(counterElement, footer.firstChild);
    }

    console.log(`Nombre total de films: ${movieCount}`);

    // ==========================================================================
    // EXERCICE 3 : MARQUER FILMS COMME "VUS"
    // ==========================================================================
    console.log('✅ Exercice 3 : Système de films vus');

    // Ajouter event listeners sur toutes les cartes de films
    allMovieCards.forEach(function(card, index) {
        card.addEventListener('click', function(event) {
            // Empêcher la propagation si on clique sur un bouton
            if (event.target.closest('button')) return;

            // Toggle de la classe 'watched'
            this.classList.toggle('watched');

            // Récupérer le titre du film
            const titleElement = this.querySelector('.card-title, h3, img');
            const title = titleElement ?
                (titleElement.textContent || titleElement.alt || `Film ${index + 1}`) :
                `Film ${index + 1}`;

            const isWatched = this.classList.contains('watched');
            console.log(`Film "${title}" marqué comme:`, isWatched ? 'VU ✓' : 'NON VU');

            // Effet visuel supplémentaire
            if (isWatched) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });

    // ==========================================================================
    // EXERCICE 4 : RECHERCHE SIMPLE
    // ==========================================================================
    console.log('🔍 Exercice 4 : Système de recherche');

    const searchInputElement = document.querySelector('#search-input');
    let noResultsMessage = null;

    if (searchInputElement) {
        // Créer le message "Aucun résultat"
        noResultsMessage = document.createElement('div');
        noResultsMessage.classList.add('no-results');
        noResultsMessage.style.display = 'none';
        noResultsMessage.innerHTML = `
            <h3>🔍 Aucun résultat trouvé</h3>
            <p>Essayez avec d'autres mots-clés comme "Dark Knight", "Matrix", "Inception"...</p>
        `;

        // Insérer après les sections de films
        const contentGrids = document.querySelector('.content-grids');
        if (contentGrids) {
            contentGrids.appendChild(noResultsMessage);
        }

        searchInputElement.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            console.log('Recherche:', searchTerm);

            let visibleCount = 0;

            // Filtrer les films
            allMovieCards.forEach(function(card) {
                // Chercher dans le titre (img alt, h3, ou données du film)
                const img = card.querySelector('img');
                const titleElement = card.querySelector('.card-title, h3');

                let title = '';
                if (img && img.alt) title += img.alt.toLowerCase() + ' ';
                if (titleElement) title += titleElement.textContent.toLowerCase() + ' ';

                // Chercher aussi dans les badges de genre
                const badges = card.querySelectorAll('.badge');
                badges.forEach(badge => {
                    title += badge.textContent.toLowerCase() + ' ';
                });

                if (searchTerm === '' || title.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Afficher/masquer le message "Aucun résultat"
            if (visibleCount === 0 && searchTerm !== '') {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }

            console.log(`Films trouvés: ${visibleCount}`);
        });
    }

    // ==========================================================================
    // EXERCICE 5 : MODAL SIMPLE
    // ==========================================================================
    console.log('� Exercice 5 : Système de modal');

    const modal = document.querySelector('#modal');
    const modalBody = document.querySelector('#modal-body');
    const closeButton = document.querySelector('.modal-close');

    // Fonction pour ouvrir la modal
    function openModal(title, imageUrl, genres) {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="modal-film-info">
                <h2>🎬 ${title}</h2>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="max-width: 200px; border-radius: 8px; margin: 1rem 0;">` : ''}
                <div class="modal-film-meta">
                    ${genres ? genres.map(genre => `<span class="badge bg-danger">${genre}</span>`).join('') : ''}
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-danger btn-sm">▶️ Regarder</button>
                    <button class="btn btn-outline-light btn-sm">+ Ma Liste</button>
                    <button class="btn btn-secondary btn-sm">ℹ️ Plus d'infos</button>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }

    // Fonction pour fermer la modal
    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurer le scroll
    }

    // Event listeners pour la modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Fermer au clic en dehors de la modal
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Ajouter les event listeners sur les cartes de films pour la modal
    allMovieCards.forEach(function(card, index) {
        // Créer un bouton "Voir détails" pour éviter le conflit avec l'exercice 3
        const detailsButton = document.createElement('button');
        detailsButton.textContent = '👁️ Détails';
        detailsButton.classList.add('btn', 'btn-primary', 'btn-sm', 'mt-2');
        detailsButton.style.cssText = 'position: absolute; top: 10px; left: 10px; z-index: 15; font-size: 0.7rem; padding: 0.25rem 0.5rem; opacity: 0.9; transition: all 0.3s ease;';

        card.style.position = 'relative';
        card.appendChild(detailsButton);

        detailsButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Empêcher le déclenchement de l'exercice 3

            // Récupérer les infos du film
            const img = card.querySelector('img');
            const titleElement = card.querySelector('.card-title, h3');
            const badges = card.querySelectorAll('.badge');

            const title = titleElement ?
                titleElement.textContent :
                (img && img.alt ? img.alt : `Film ${index + 1}`);

            const imageUrl = img ? img.src : null;
            const genres = Array.from(badges).map(badge => badge.textContent);

            openModal(title, imageUrl, genres);
            console.log('Modal ouverte pour:', title);
        });
    });

    // ==========================================================================
    // EXERCICE 6 : CHANGEMENT DE THÈME (BONUS)
    // ==========================================================================
    console.log('� Exercice 6 : Système de thème');

    const themeToggleButton = document.getElementById('theme-toggle');

    if (themeToggleButton) {
        // Initialiser le thème (par défaut : mode sombre)
        function initTheme() {
            const savedTheme = localStorage.getItem('streamflix-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'light' || (savedTheme === null && !prefersDark)) {
                // Mode clair
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                themeToggleButton.textContent = '🌓';
                themeToggleButton.title = 'Passer en mode sombre';
            } else {
                // Mode sombre (par défaut StreamFlix)
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
                themeToggleButton.textContent = '☀️';
                themeToggleButton.title = 'Passer en mode clair';
            }
        }

        // Initialiser le thème au chargement
        initTheme();

        themeToggleButton.addEventListener('click', function() {
            const isCurrentlyDark = document.body.classList.contains('dark-theme');

            if (isCurrentlyDark) {
                // Passer en mode clair
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                this.textContent = '🌓';
                this.title = 'Passer en mode sombre';
                localStorage.setItem('streamflix-theme', 'light');
                console.log('� Thème changé: MODE CLAIR activé');
            } else {
                // Passer en mode sombre
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
                this.textContent = '☀️';
                this.title = 'Passer en mode clair';
                localStorage.setItem('streamflix-theme', 'dark');
                console.log('🌙 Thème changé: MODE SOMBRE activé');
            }

            // Effet visuel sur le bouton
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });

        // Écouter les changements de préférence système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('streamflix-theme')) {
                initTheme();
                console.log('🔄 Thème ajusté selon les préférences système');
            }
        });
    }

    // ==========================================================================
    // FONCTIONNALITÉS STREAMFLIX EXISTANTES (CONSERVÉES)
    // ==========================================================================
    console.log('🎬 Chargement des fonctionnalités StreamFlix existantes...');

    // NAVIGATION SCROLLED EFFECT
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

    // ANIMATION DES CARTES AU SCROLL (adaptée pour éviter les conflits)
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
                }, index * 100);

                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux cartes (seulement si pas déjà animées)
    document.querySelectorAll('.card-streamflix').forEach(function(card, index) {
        if (!card.style.opacity) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        }
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

    // RECHERCHE INTERACTIVE EXISTANTE (amélioration de celle des exercices)
    const originalSearchInput = document.getElementById('search-input');
    const searchSuggestions = createSearchSuggestions();

    if (originalSearchInput && !searchInputElement) {
        originalSearchInput.addEventListener('input', handleSearchAdvanced);
        originalSearchInput.addEventListener('focus', showSuggestions);
        originalSearchInput.addEventListener('blur', hideSuggestions);
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
                if (originalSearchInput) {
                    originalSearchInput.value = movie;
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

        if (originalSearchInput?.parentNode) {
            originalSearchInput.parentNode.appendChild(suggestions);
        }

        return suggestions;
    }

    function handleSearchAdvanced(event) {
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

    // Nettoyage des duplications - les fonctionnalités sont intégrées ci-dessus



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
