// Navegación y funcionalidad de categorías para la página de herramientas
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const subcategoryLinks = document.querySelectorAll('.subcategory-link');
    const subcategorySections = document.querySelectorAll('.subcategory-section');
    const toolsContent = document.querySelector('.tools-content');
    
    // Función para mostrar solo una sección específica
    function showOnlySection(targetId) {
        subcategorySections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    }
    
    // Función para mostrar mensaje inicial cuando no hay sección seleccionada
    function showWelcomeMessage() {
        const existingMessage = document.querySelector('.welcome-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Ocultar todas las secciones
        subcategorySections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Crear mensaje de bienvenida
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <div class="welcome-content">
                <h2>Bienvenido al Catálogo de Herramientas</h2>
                <p>Selecciona una categoría del menú lateral para explorar nuestros productos.</p>
                <div class="welcome-icon">🔧</div>
            </div>
        `;
        toolsContent.appendChild(welcomeDiv);
    }
    
    // Mostrar mensaje de bienvenida al cargar la página
    showWelcomeMessage();
    
    // Event listeners para botones de categoría
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const subcategoryList = document.getElementById('cat-' + category);
            
            // Toggle active state
            this.classList.toggle('active');
            if (subcategoryList) {
                subcategoryList.classList.toggle('active');
            }
            
            // Close other open categories
            categoryBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    const otherList = document.getElementById('cat-' + otherBtn.dataset.category);
                    if (otherList) {
                        otherList.classList.remove('active');
                    }
                }
            });
        });
    });
    
    // Event listeners para enlaces de subcategoría
    subcategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Remover mensaje de bienvenida si existe
                const welcomeMessage = document.querySelector('.welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.remove();
                }
                
                // Remover clase active de todos los links
                subcategoryLinks.forEach(l => l.classList.remove('active'));
                
                // Agregar clase active al link clickeado
                this.classList.add('active');
                
                // Mostrar solo la sección seleccionada
                showOnlySection(targetId);
                
                // Scroll suave al top del contenido
                toolsContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});
