console.log('Script file loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    try {
        initHeader();
        
        setupLogoRefresh();
        
        initCatalogNav();
        
        initSkuCards();
        
        handleStickyElements();
        
        console.log('All initializations completed');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

function initHeader() {
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navContainer = document.querySelector('.main-nav-container .container');
    const navButtons = document.querySelector('.nav-buttons');
    navContainer.insertBefore(mobileToggle, navButtons);
    
    mobileToggle.addEventListener('click', () => {
        document.querySelector('.nav-buttons').classList.toggle('active');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelector('.nav-buttons').classList.remove('active');
        }
    });
}

function setupLogoRefresh() {
    const logoLink = document.querySelector('.logo-link');
    
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Navigate to:', link.textContent);
        });
    });
    
    const signInBtn = document.querySelector('.sign-in-btn');
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Sign In clicked');
    });
}

function initCatalogNav() {
    const catalogNav = document.getElementById('catalog-nav');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.catalog-nav__link');
    const leftArrow = document.getElementById('nav-arrow-left');
    const rightArrow = document.getElementById('nav-arrow-right');
    
    function updateArrows() {
        if (navLinks.scrollWidth > navLinks.clientWidth) {
            leftArrow.hidden = false;
            rightArrow.hidden = false;
            
            leftArrow.disabled = navLinks.scrollLeft <= 0;
            rightArrow.disabled = navLinks.scrollLeft + navLinks.clientWidth >= navLinks.scrollWidth;
        } else {
            leftArrow.hidden = true;
            rightArrow.hidden = true;
        }
    }
    
    leftArrow.addEventListener('click', () => {
        navLinks.scrollBy({ left: -100, behavior: 'smooth' });
    });
    
    rightArrow.addEventListener('click', () => {
        navLinks.scrollBy({ left: 100, behavior: 'smooth' });
    });
    
    navLinks.addEventListener('scroll', updateArrows);
    
    window.addEventListener('resize', updateArrows);
    
    updateArrows();
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 190, 
                    behavior: 'smooth'
                });
                
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.catalog-section__container');
        let currentActive = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 200 && window.pageYOffset < sectionTop + sectionHeight - 200) {
                currentActive = section.getAttribute('id');
            }
        });
        
        if (currentActive) {
            links.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                if (href === currentActive) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
    
    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
        featuredCard.addEventListener('click', () => {
            console.log('Featured card clicked');
        });
    }
}

function initSkuCards() {
    const skuCards = document.querySelectorAll('.sku-card');
    
    skuCards.forEach(card => {
        card.addEventListener('mouseenter', handleSkuCardHover);
        card.addEventListener('mouseleave', handleSkuCardLeave);
    });
    
    function handleSkuCardHover(e) {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        
        const image = e.currentTarget.querySelector('.sku-card__image');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    }
    
    function handleSkuCardLeave(e) {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        
        const image = e.currentTarget.querySelector('.sku-card__image');
        if (image) {
            image.style.transform = '';
        }
    }
    
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const card = button.closest('.sku-card');
            const productTitle = card.querySelector('.sku-card__title').textContent;
            const productPrice = button.textContent;
            
            console.log(`Purchasing: ${productTitle} (${productPrice})`);
            
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 1000);
        });
    });
}

function handleStickyElements() {
    const header = document.querySelector('.main-header');
    const catalogNav = document.querySelector('.catalog-nav');
    const headerHeight = header.offsetHeight;
    const catalogNavHeight = catalogNav.querySelector('.catalog-nav__container').offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        const catalogNavTop = catalogNav.getBoundingClientRect().top;
        if (catalogNavTop <= headerHeight) {
            catalogNav.classList.add('sticky');
        } else {
            catalogNav.classList.remove('sticky');
        }
    });
} 