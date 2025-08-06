/* ============================
   NAVEGACIÓN PRINCIPAL - FUNCIONAL COMPLETA
   ============================ */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧭 Inicializando navegación completa...');
    
    // ============================
    // MOBILE SIDEBAR ORIGINAL
    // ============================
    const hamburgerBtn = document.querySelector('.navbar-toggler');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    
    console.log('Elementos encontrados:', {
        hamburger: !!hamburgerBtn,
        sidebar: !!mobileSidebar,
        overlay: !!mobileOverlay,
        closeBtn: !!closeSidebarBtn
    });
    
    if (hamburgerBtn && mobileSidebar && mobileOverlay) {
        console.log('✅ Mobile sidebar configurado');
        
        // Abrir sidebar
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Abriendo sidebar móvil');
            
            // Prevenir comportamiento Bootstrap
            const bsTarget = this.getAttribute('data-bs-target');
            if (bsTarget) {
                const bsCollapse = document.querySelector(bsTarget);
                if (bsCollapse) {
                    bsCollapse.style.display = 'none';
                }
            }
            
            mobileOverlay.classList.add('active');
            mobileSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animar elementos del sidebar
            setTimeout(() => {
                const sidebarItems = mobileSidebar.querySelectorAll('.sidebar-item');
                sidebarItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 50);
                });
            }, 100);
        });
        
        // Cerrar sidebar
        function closeSidebar() {
            console.log('❌ Cerrando sidebar móvil');
            mobileOverlay.classList.remove('active');
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = '';
            
            // Quitar animaciones
            const sidebarItems = mobileSidebar.querySelectorAll('.sidebar-item');
            sidebarItems.forEach(item => {
                item.classList.remove('animate-in');
            });
        }
        
        // Event listeners para cerrar
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', closeSidebar);
        }
        
        mobileOverlay.addEventListener('click', closeSidebar);
        
        // Cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    }
    
    // ============================
    // BOOTSTRAP NAVBAR (DESKTOP)
    // ============================
    
    // Asegurar que Bootstrap navbar funcione en desktop
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // En desktop, usar Bootstrap normal
        if (window.innerWidth >= 992) {
            navbarToggler.addEventListener('click', function(e) {
                // Solo en desktop permitir Bootstrap
                if (window.innerWidth >= 992) {
                    e.stopPropagation();
                    navbarCollapse.classList.toggle('show');
                }
            });
        }
    }
    
    // ============================
    // DROPDOWN DESKTOP
    // ============================
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        console.log('✅ Dropdown de escritorio encontrado');
        
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            dropdownMenu.classList.toggle('show');
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
    
    // ============================
    // RESPONSIVE HANDLERS
    // ============================
    
    // Cerrar navbar en resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Desktop: cerrar sidebar móvil si está abierto
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                mobileSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        } else {
            // Móvil: cerrar navbar Bootstrap si está abierto
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
    
    console.log('✅ Navegación completamente configurada');
});
