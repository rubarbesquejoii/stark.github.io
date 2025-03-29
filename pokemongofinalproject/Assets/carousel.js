document.addEventListener('DOMContentLoaded', () => {
    console.log('Carousel script loaded');
    
    // Get carousel elements
    const slides = document.querySelectorAll('.carousel-fade__frame-item');
    const nextButton = document.querySelector('.carousel__next-button');
    const prevButton = document.querySelector('.carousel__previous-button');
    const gotoButtons = document.querySelectorAll('.carousel__goto-button');
    
    if (!slides.length || !nextButton || !prevButton || !gotoButtons.length) {
        console.error('Missing required carousel elements');
        return;
    }
    
    console.log('Found carousel elements:', {
        slides: slides.length,
        nextButton: !!nextButton,
        prevButton: !!prevButton,
        gotoButtons: gotoButtons.length
    });
    
    let currentIndex = 0;
    let isTransitioning = false;
    
    slides[0].classList.add('active');
    gotoButtons[0].classList.add('active');
    
    function showSlide(index) {
        if (isTransitioning) {
            console.log('Transition in progress, ignoring slide change');
            return;
        }
        
        isTransitioning = true;
        console.log('Transitioning to slide', index);
        
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.transform = '';
            slide.style.opacity = '';
            slide.style.visibility = '';
        });
        
        gotoButtons.forEach(button => button.classList.remove('active'));
        
        slides[index].classList.add('active');
        gotoButtons[index].classList.add('active');
        
        slides[index].style.transform = 'translateX(0)';
        slides[index].style.opacity = '1';
        slides[index].style.visibility = 'visible';
        
        currentIndex = index;
        
        setTimeout(() => {
            isTransitioning = false;
            console.log('Slide transition completed');
        }, 500);
    }
    
    function nextSlide() {
        console.log('Next button clicked, current index:', currentIndex);
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        console.log('Previous button clicked, current index:', currentIndex);
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Next button clicked');
        nextSlide();
    });
    
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Previous button clicked');
        prevSlide();
    });
    
    gotoButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Goto button clicked for slide', index);
            showSlide(index);
        });
    });
    
    console.log('Carousel initialization completed');
}); 