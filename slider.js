
        let slideIndex = 1;
        let autoplay = true;
        let autoplayInterval;
        const autoplaySpeed = 5000; // 5 seconds
        
        // Initialize the slideshow
        showSlides(slideIndex);
        startAutoplay();
        
        function plusSlides(n) {
            showSlides(slideIndex += n);
            resetAutoplay();
        }
        
        function currentSlide(n) {
            showSlides(slideIndex = n);
            resetAutoplay();
        }
        
        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            
            // Remove active class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            
            // Show the current slide and activate corresponding dot
            slides[slideIndex-1].classList.add("active");
            dots[slideIndex-1].className += " active";
            
            // Reset progress bar
            resetProgressBar();
        }
        
        function startAutoplay() {
            if (autoplay) {
                autoplayInterval = setInterval(() => {
                    plusSlides(1);
                }, autoplaySpeed);
            }
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        function resetAutoplay() {
            stopAutoplay();
            if (autoplay) {
                startAutoplay();
            }
        }
        
        function toggleAutoplay() {
            autoplay = !autoplay;
            const playIcon = document.getElementById('play-icon');
            const playText = document.getElementById('play-text');
            
            if (autoplay) {
                startAutoplay();
                playIcon.textContent = '⏸️';
                playText.textContent = 'Pause';
            } else {
                stopAutoplay();
                playIcon.textContent = '▶️';
                playText.textContent = 'Play';
            }
        }
        
        function resetProgressBar() {
            const progressBar = document.getElementById('progress');
            progressBar.style.width = '0%';
            
            // Animate progress bar
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                } else {
                    width += 100 / (autoplaySpeed / 100);
                    progressBar.style.width = width + '%';
                }
            }, 100);
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                plusSlides(-1);
            } else if (event.key === 'ArrowRight') {
                plusSlides(1);
            } else if (event.key === ' ') {
                event.preventDefault();
                toggleAutoplay();
            }
        });
        
        // Add swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.querySelector('.slideshow-container').addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.querySelector('.slideshow-container').addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                plusSlides(1); // Swipe left - next slide
            }
            if (touchEndX > touchStartX + 50) {
                plusSlides(-1); // Swipe right - previous slide
            }
        }