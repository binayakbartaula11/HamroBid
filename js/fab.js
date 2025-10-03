// FAB functionality
document.addEventListener('DOMContentLoaded', function() {
    const fab = document.getElementById('fab');
    const fabMenu = document.getElementById('fabMenu');
    let isMenuOpen = false;

    // Toggle menu on FAB click
    fab.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !fab.contains(e.target) && !fabMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Keyboard support
    fab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        isMenuOpen = true;
        fab.classList.add('active');
        fabMenu.classList.add('show');
        fab.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        isMenuOpen = false;
        fab.classList.remove('active');
        fabMenu.classList.remove('show');
        fab.setAttribute('aria-expanded', 'false');
    }
});