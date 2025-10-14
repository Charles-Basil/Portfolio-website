const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
   
    // state
    let isMobileNavOpen = false;
    
    // Ensure mobile nav exists
    if (!headerBtn || !mobileNav) {
        console.error('Mobile navigation elements not found');
        return;
    }
    
    headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isMobileNavOpen = !isMobileNavOpen;
        
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex';
            // Force reflow
            mobileNav.offsetHeight;
            mobileNav.classList.add('show');
            document.body.style.overflowY = 'hidden';
        } else {
            mobileNav.classList.remove('show');
            setTimeout(() => {
                mobileNav.style.display = 'none';
            }, 300); // Match transition duration
            document.body.style.overflowY = 'auto';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.classList.remove('show');
            setTimeout(() => {
                mobileNav.style.display = 'none';
            }, 300);
            document.body.style.overflowY = 'auto';
        });
    });
};

export default mobileNav;