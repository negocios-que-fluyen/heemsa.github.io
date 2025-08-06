document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de que TOOLS_DATA exista y tenga el formato esperado
    if (typeof window.TOOLS_DATA === 'undefined' || !window.TOOLS_DATA.sections) {
        console.error('Los datos de herramientas no están disponibles o tienen un formato incorrecto.');
        return;
    }

    const allProducts = flattenProducts(window.TOOLS_DATA);
    const productsGrid = document.getElementById('productsGrid');
    const productsContainer = document.getElementById('productsContainer');
    const productCountSpan = document.querySelector('#productCount .fw-semibold');
    const loadingState = document.querySelector('.loading-state');
    const emptyState = document.querySelector('.empty-state');

    function flattenProducts(data) {
        let products = [];
        if (data && data.sections) {
            data.sections.forEach(section => {
                const processProducts = (productList, category, subcategory) => {
                    if (productList && Array.isArray(productList)) {
                        productList.forEach(product => {
                            products.push({
                                ...product,
                                category: category,
                                subcategory: subcategory
                            });
                        });
                    }
                };

                // Caso 1: sections -> tools -> products
                if (section.tools && Array.isArray(section.tools)) {
                    section.tools.forEach(tool => {
                        processProducts(tool.products, section.category, tool.subcategory);
                    });
                }

                // Caso 2: sections -> products
                processProducts(section.products, section.category, section.category);
            });
        }
        return products;
    }

    function renderProducts(products) {
        // Ocultar estado de carga/vacío y mostrar rejilla
        loadingState.classList.add('d-none');
        productsGrid.classList.remove('d-none');
        emptyState.classList.add('d-none');

        productsContainer.innerHTML = ''; // Limpiar contenedor

        if (products.length === 0) {
            // Mostrar estado vacío si no hay productos
            productsGrid.classList.add('d-none');
            emptyState.classList.remove('d-none');
            productCountSpan.textContent = '0';
            return;
        }

        productCountSpan.textContent = products.length;

        products.forEach(product => {
            // Truncar descripción larga
            const maxLength = 80;
            const truncatedDescription = product.description.length > maxLength 
                ? product.description.substring(0, maxLength) + '...' 
                : product.description;

            // Usar URL de imagen si está disponible, sino usar imagen local
            const imageUrl = product.url || `/${product.image}`;

            const productCard = `
                <div>
                    <div class="product-card">
                        <div class="product-image-container">
                            <img src="${imageUrl}" 
                                 class="product-image"
                                 alt="${product.description}"
                                 loading="lazy"
                                 onerror="this.src='/assets/images/placeholder-product.jpg'; this.onerror=null;">
                        </div>
                        <div class="card-body">
                            <h6 class="card-title fw-bold text-primary mb-2">${product.name}</h6>
                            <p class="card-text text-muted small">${truncatedDescription}</p>
                            <div class="product-category">
                                <small class="text-secondary">
                                    <i class="fas fa-tag me-1"></i>${product.category}
                                </small>
                            </div>
                        </div>
                        <div class="card-footer bg-light border-0 d-flex justify-content-between align-items-center">
                            <span class="product-price fw-bold text-success">${product.price.toFixed(2)} USD</span>
                            <button class="btn btn-primary btn-sm view-details-btn" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#productModal"
                                    data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}'>
                                <i class="fas fa-eye me-1"></i>Ver más
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    }

    // --- INICIALIZACIÓN ---
    function initialize() {
        // Mostrar estado de carga inicialmente
        loadingState.classList.remove('d-none');
        productsGrid.classList.add('d-none');
        emptyState.classList.add('d-none');

        // Simular una pequeña demora para la carga de datos (opcional)
        setTimeout(() => {
            renderProducts(allProducts);
        }, 250); // 250ms de retraso
    }

    initialize();
});
