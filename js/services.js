// Services Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.services-wrapper');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!wrapper || !prevBtn || !nextBtn) {
        console.warn('Services slider elements not found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = wrapper.children.length;

    // Cria aria-live container (visualmente invisível)
    let liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0 0 0 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    wrapper.parentElement.appendChild(liveRegion);

    function updateSlide() {
        const slideWidth = wrapper.children[0].offsetWidth + 32; // margin + padding
        wrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - 1;
        
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide >= totalSlides - 1 ? '0.5' : '1';

        // Atualiza destaque visual (CSS .active)
        Array.from(wrapper.children).forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });

        // Atualiza aria-live
        const activeCard = wrapper.children[currentSlide];
        const title = activeCard.querySelector('h3')?.textContent || '';
        const description = activeCard.querySelector('p')?.textContent || '';
        liveRegion.textContent = `Slide ${currentSlide + 1} de ${totalSlides}: ${title}. ${description}`;
    }

    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    // Event listeners
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') goToPrevSlide();
        else if (e.key === 'ArrowRight') goToNextSlide();
    });

    let startX = 0;
    let endX = 0;

    wrapper.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        stopAutoPlay(); // pause autoplay on touch
    });

    wrapper.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        setTimeout(startAutoPlay, 3000); // resume autoplay
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) goToNextSlide();
            else goToPrevSlide();
        }
    }

    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) goToNextSlide();
            else {
                currentSlide = 0;
                updateSlide();
            }
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);

    // Initialize slider
    updateSlide();
    startAutoPlay();
});
