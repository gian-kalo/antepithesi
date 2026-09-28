document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. MOBILE MENU TOGGLE (3 ΜΠΑΡΕΣ)
    // ========================================
    const mobileBtn = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('.main-navigation');

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }


    // ========================================
    // 2. DROPDOWNS ΣΤΑ ΚΙΝΗΤΑ (π.χ. "ΤΟ ΚΟΜΜΑ")
    // ========================================
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(function (dropdown) {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    // Κλείνουμε τα υπόλοιπα dropdowns για καθαρότητα
                    dropdowns.forEach(function (other) {
                        if (other !== dropdown) {
                            other.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                }
            });
        }
    });


    // ========================================
    // 3. MEGA MENU / ΠΡΟΤΑΣΕΙΣ (DESKTOP & MOBILE)
    // ========================================
    const openButtons = document.querySelectorAll(".open-proposals-menu");
    const megaMenuContainer = document.getElementById("megaMenu");

    openButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            
            if (window.innerWidth <= 768) {
                // ΣΤΑ ΚΙΝΗΤΑ:
                // 1. Εμφανίζουμε το κυρίως mobile menu αν είναι κλειστό
                if (mainNav) {
                    mainNav.classList.add('active');
                }
                if (mobileBtn) {
                    mobileBtn.classList.add('active');
                }

                // 2. Ανοίγουμε το υπομενού των προτάσεων
                const proposalsNavItem = document.querySelector('.nav-item.dropdown.proposals') || button.closest('.nav-item');
                if (proposalsNavItem) {
                    proposalsNavItem.classList.add('open');
                }
                if (megaMenuContainer) {
                    megaMenuContainer.classList.add('mega-menu-open');
                }

                // 3. Smooth scroll πάνω στο header για να δει ο χρήστης το ανοιχτό μενού
                window.scrollTo({ top: 0, behavior: 'smooth' });

            } else {
                // ΣΤΟ DESKTOP:
                if (megaMenuContainer) {
                    megaMenuContainer.classList.toggle('mega-menu-open');
                }
            }
        });
    });

    // Κλείσιμο Mega Menu όταν πατάμε έξω
    document.addEventListener("click", function (event) {
        if (megaMenuContainer && !megaMenuContainer.contains(event.target)) {
            const isClickOnBtn = Array.from(openButtons).some(b => b.contains(event.target));
            if (!isClickOnBtn) {
                megaMenuContainer.classList.remove("mega-menu-open");
            }
        }
    });

    // Κλείσιμο με ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && megaMenuContainer) {
            megaMenuContainer.classList.remove("mega-menu-open");
        }
    });

});