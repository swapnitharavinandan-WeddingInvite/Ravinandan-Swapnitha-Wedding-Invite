/* ==========================================================================
   ELEGANT MINIMALIST WEDDING INVITATION JAVASCRIPT
   Interactions, Canvas Gold Dust, RSVP, Countdown, Scroll Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === PRELOADER ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
        }, 1200);
    });
    
    // Fallback in case load takes too long
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 3500);

    // === AUDIO SETUP & CONTROL ===
    const bgMusic = document.getElementById('bg-music');
    const audioToggle = document.getElementById('audio-toggle');
    let isMusicPlaying = false;

    function playMusic() {
        if (bgMusic && !isMusicPlaying) {
            bgMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    updateAudioButtonState();
                })
                .catch(err => {
                    console.log("Autoplay blocked by browser policy. Will play on first touch/click.", err);
                });
        }
    }

    function toggleMusic() {
        if (!bgMusic) return;
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
        } else {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                updateAudioButtonState();
            });
        }
        updateAudioButtonState();
    }

    function updateAudioButtonState() {
        if (!audioToggle) return;
        const onIcon = audioToggle.querySelector('.audio-icon.on');
        const offIcon = audioToggle.querySelector('.audio-icon.off');
        if (isMusicPlaying) {
            if (onIcon) onIcon.style.display = 'block';
            if (offIcon) offIcon.style.display = 'none';
            audioToggle.setAttribute('title', 'Mute Music');
        } else {
            if (onIcon) onIcon.style.display = 'none';
            if (offIcon) offIcon.style.display = 'block';
            audioToggle.setAttribute('title', 'Play Music');
        }
    }

    // Try playing immediately on load
    playMusic();

    // Unlock audio playback automatically on first user touch or click anywhere on screen
    const unlockAudioPlayback = () => {
        playMusic();
        document.removeEventListener('click', unlockAudioPlayback);
        document.removeEventListener('touchstart', unlockAudioPlayback);
    };
    document.addEventListener('click', unlockAudioPlayback, { once: true });
    document.addEventListener('touchstart', unlockAudioPlayback, { once: true });

    if (audioToggle) {
        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }

    // === TRADITIONAL HINDU INVITATION COVER UNLOCK & REOPEN ===
    const waxSeal = document.getElementById('wax-seal');
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelopeCard = document.getElementById('envelope-card');
    const openIndicator = document.getElementById('open-indicator');
    const mainContent = document.getElementById('main-content');
    const reopenCoverBtn = document.getElementById('reopen-cover-btn');

    let isOpening = false;

    function openInvitation() {
        if (isOpening) return;
        isOpening = true;

        // Play background music
        playMusic();
        
        // Phase 1: Hide prompt indicator & scale card
        if (openIndicator) {
            openIndicator.style.opacity = '0';
        }

        // Phase 2: Fade envelope wrapper & overlay
        if (envelopeWrapper) {
            envelopeWrapper.classList.add('fade-envelope');
        }
        
        if (envelopeOverlay) {
            envelopeOverlay.style.opacity = '0';
        }
        
        if (mainContent) {
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                handleScrollReveal();
            }, 150);
        }

        // Phase 3: Completely hide cover overlay after transition
        setTimeout(() => {
            if (envelopeOverlay) {
                envelopeOverlay.style.display = 'none';
            }
            isOpening = false;
        }, 1200);
    }

    function reopenCover() {
        if (!envelopeOverlay) return;
        envelopeOverlay.style.display = 'flex';
        setTimeout(() => {
            envelopeOverlay.style.opacity = '1';
            if (envelopeWrapper) {
                envelopeWrapper.classList.remove('fade-envelope');
            }
            if (openIndicator) {
                openIndicator.style.opacity = '1';
            }
        }, 50);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (waxSeal) waxSeal.addEventListener('click', (e) => { e.stopPropagation(); openInvitation(); });
    if (envelopeCard) envelopeCard.addEventListener('click', openInvitation);
    if (reopenCoverBtn) reopenCoverBtn.addEventListener('click', reopenCover);

    // === FLOATING GHIBLI LEAVES & PETALS (CANVAS) ===
    const canvas = document.getElementById('gold-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        const maxParticles = 80;
        const types = ['sparks', 'dust', 'shimmer'];

        class GoldDustParticle {
            constructor() {
                this.reset(true);
            }

            reset(init = false) {
                this.x = Math.random() * canvas.width;
                this.y = init ? Math.random() * canvas.height : -20;
                this.z = Math.random() * 1.5 + 0.3; // Depth factor
                this.type = types[Math.floor(Math.random() * types.length)];
                
                this.size = (Math.random() * 5 + 2) * this.z;
                this.speedY = (Math.random() * 0.4 + 0.2) * this.z; // Slow floating down
                this.speedX = (Math.random() * 0.6 - 0.15) * this.z;
                
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = (Math.random() * 0.015 - 0.007) * this.z;
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = Math.random() * 0.008 + 0.004;
                
                // Exquisite floating gold dust particles for crisp Royal Cream background
                const goldTones = [
                    `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.35})`,  // Champagne Gold
                    `rgba(180, 138, 28, ${Math.random() * 0.4 + 0.3})`,   // Metallic Gold
                    `rgba(150, 110, 20, ${Math.random() * 0.3 + 0.25})`,  // Rich Bronze
                    `rgba(245, 220, 150, ${Math.random() * 0.5 + 0.3})`   // Soft Gold Glow
                ];
                this.color = goldTones[Math.floor(Math.random() * goldTones.length)];
            }

            update() {
                this.y += this.speedY;
                this.wobble += this.wobbleSpeed;
                this.x += this.speedX + Math.sin(this.wobble) * 0.3;
                this.angle += this.angleSpeed;

                if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillStyle = this.color;

                if (this.type === 'sparks') {
                    // Star sparkle cross
                    ctx.beginPath();
                    ctx.fillRect(-this.size, -0.6, this.size * 2, 1.2);
                    ctx.fillRect(-0.6, -this.size, 1.2, this.size * 2);
                    ctx.arc(0, 0, 1, 0, Math.PI * 2);
                    ctx.fill();
                } else if (this.type === 'dust') {
                    // Glowing soft circular particle
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Tiny twinkling dot
                    ctx.beginPath();
                    ctx.arc(0, 0, 1.5 * this.z, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new GoldDustParticle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }




    // === COUNTDOWN TIMER ===
    const targetDate = new Date('August 27, 2026 10:57:00').getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(countdownTimer);
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.innerHTML = "<div class='wedding-started-msg'>OUR WEDDING HAS BEGUN!</div>";
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    }, 1000);

    // === NAVIGATION MOBILE MENU TOGGLE ===
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        highlightActiveNavLink();
    });

    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // === SCROLL REVEAL (INTERSECTION OBSERVER) ===
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    function handleScrollReveal() {
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
    handleScrollReveal();

    // === ROYAL GOLD GALLERY SLIDESHOW ===
    const slideshowStage = document.getElementById('slideshow-stage');
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const counterBadge = document.getElementById('slide-counter');
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    const royalGoldFrame = document.getElementById('royal-gold-frame');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    if (slideshowStage && totalSlides > 0) {
        // Build filmstrip thumbnails
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = '';
            slides.forEach((slide, idx) => {
                const img = slide.querySelector('img');
                if (img) {
                    const thumb = document.createElement('img');
                    thumb.src = img.src;
                    thumb.alt = `Thumbnail ${idx + 1}`;
                    thumb.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
                    thumb.addEventListener('click', () => {
                        goToSlide(idx);
                        resetAutoSlide();
                    });
                    thumbnailsContainer.appendChild(thumb);
                }
            });
        }

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            slides[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');

            // Update Counter
            if (counterBadge) {
                counterBadge.innerText = `${currentSlide + 1} / ${totalSlides}`;
            }

            // Update Thumbnails (Scroll ONLY the thumbnail horizontal wrapper, NEVER the main window)
            if (thumbnailsContainer) {
                const thumbs = thumbnailsContainer.querySelectorAll('.gallery-thumb');
                const wrapper = thumbnailsContainer.parentElement;
                thumbs.forEach((t, i) => {
                    if (i === currentSlide) {
                        t.classList.add('active');
                        if (wrapper) {
                            const targetLeft = t.offsetLeft - (wrapper.clientWidth / 2) + (t.clientWidth / 2);
                            wrapper.scrollTo({ left: targetLeft, behavior: 'smooth' });
                        }
                    } else {
                        t.classList.remove('active');
                    }
                });
            }
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

        // Auto-play timer
        function startAutoSlide() {
            if (!autoSlideInterval && isGalleryInView) {
                autoSlideInterval = setInterval(nextSlide, 4500);
            }
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Pause auto-play on hover
        if (royalGoldFrame) {
            royalGoldFrame.addEventListener('mouseenter', stopAutoSlide);
            royalGoldFrame.addEventListener('mouseleave', startAutoSlide);
        }

        // Only auto-play when Gallery is actively visible on user screen
        let isGalleryInView = false;
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isGalleryInView = entry.isIntersecting;
                if (isGalleryInView) {
                    startAutoSlide();
                } else {
                    stopAutoSlide();
                }
            });
        }, { threshold: 0.25 });

        if (royalGoldFrame) {
            galleryObserver.observe(royalGoldFrame);
        }

        // Touch Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slideshowStage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slideshowStage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 40) {
                nextSlide();
                resetAutoSlide();
            } else if (touchEndX - touchStartX > 40) {
                prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });
    }

    // === PRIVATE BLESSINGS FORM SUBMISSION TO EMAIL ===
    const blessingsForm = document.getElementById('blessings-form');
    const blessingsSuccessMsg = document.getElementById('blessings-success-msg');

    // Automatically display success state if returning after submission (?submitted=true)
    if (window.location.search.includes('submitted=true')) {
        if (blessingsForm) blessingsForm.style.display = 'none';
        if (blessingsSuccessMsg) blessingsSuccessMsg.style.display = 'block';
    }

    if (blessingsForm) {
        blessingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('blessings-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>SENDING YOUR BLESSINGS...</span>';
            }

            const nameInput = document.getElementById('blessings-name');
            const messageInput = document.getElementById('blessings-message');
            const name = nameInput ? nameInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !message) {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>SEND PRIVATE WISHES</span>';
                }
                return;
            }

            fetch('https://formsubmit.co/ajax/swapnitharavinandan@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Wedding Blessing from ${name}! 💌`,
                    _template: "table",
                    _captcha: "false",
                    "Guest Name": name,
                    "Blessing Message": message
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.success === 'true' || data.success === true) {
                    blessingsForm.style.display = 'none';
                    if (blessingsSuccessMsg) {
                        blessingsSuccessMsg.style.display = 'block';
                    }
                } else {
                    // Requires 1-time email activation -> submit directly so user can activate
                    blessingsForm.submit();
                }
            })
            .catch(function(error) {
                console.error("AJAX error, falling back to direct submit:", error);
                blessingsForm.submit();
            });
        });
    }

});


