document.addEventListener('DOMContentLoaded', () => {
  // 1) Validar datos
  if (!window.TOOLS_DATA || !Array.isArray(window.TOOLS_DATA.sections)) {
    console.error('TOOLS_DATA no disponible o con formato incorrecto');
    return;
  }

  // 2) Aplanar todos los productos
  const allProducts = [];
  window.TOOLS_DATA.sections.forEach(section => {
    // caso: section.tools[].products
    if (Array.isArray(section.tools)) {
      section.tools.forEach(tool => {
        if (Array.isArray(tool.products)) {
          tool.products.forEach(p =>
            allProducts.push({
              ...p,
              category: section.category,
              subcategory: tool.subcategory
            })
          );
        }
      });
    }
    // caso: section.products
    if (Array.isArray(section.products)) {
      section.products.forEach(p =>
        allProducts.push({
          ...p,
          category: section.category,
          subcategory: section.category
        })
      );
    }
  });

  // 3) Referencias al DOM
  const searchInput        = document.getElementById('searchInput');
  const clearSearchBtn     = document.getElementById('clearSearch');
  const minPriceInput      = document.getElementById('minPrice');
  const maxPriceInput      = document.getElementById('maxPrice');
  const sortBySelect       = document.getElementById('sortBy');
  const clearAllFiltersBtn = document.getElementById('clearAllFilters');
  const clearCategoriesBtn = document.getElementById('clearCategories');
  const categoryContainer  = document.getElementById('categoryFilters');
  const productsGrid       = document.getElementById('productsGrid');
  const productCountSpan   = document.getElementById('productCount');

  // 4) Helper para truncar texto
  const truncate = (txt, max) =>
    txt.length > max ? txt.slice(0, max) + '…' : txt;

  // 5) Renderizar checkboxes de categorías
  const categories = Array.from(
    new Set(allProducts.map(p => p.category))
  ).sort();
  categories.forEach(cat => {
    const safeId = 'cat-' + cat.replace(/\s+/g, '-').toLowerCase();
    categoryContainer.insertAdjacentHTML('beforeend', `
      <div class="form-check">
        <input
          class="form-check-input category-checkbox"
          type="checkbox"
          value="${cat}"
          id="${safeId}"
        >
        <label class="form-check-label" for="${safeId}">
          ${cat}
        </label>
      </div>`
    );
  });

  // 6) Renderizar productos
  function renderProducts(list) {
    productCountSpan.textContent = list.length;
    productsGrid.innerHTML = '';

    if (!list.length) {
      productsGrid.innerHTML = `
        <div class="col">
          <p class="text-muted">No hay productos.</p>
        </div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    list.forEach(p => {
      // precio con fallback
      const priceText = (p.price != null)
        ? p.price.toFixed(2) + ' USD'
        : '--';

      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card h-100 product-card">
          <img
            src="${p.url || '/' + p.image}"
            onerror="this.src='/assets/images/placeholder-product.png';"
            class="card-img-top product-image"
            alt="${p.sku}"
            loading="lazy"
          >
          <div class="card-body d-flex flex-column">
            <h6 class="card-title fw-bold text-primary mb-2">${p.sku}</h6>
            <p class="card-text text-muted small mb-2">
              ${truncate(p.description, 80)}
            </p>
            <small class="text-secondary mt-auto">
              <i class="fas fa-tag me-1"></i>${p.category}
            </small>
          </div>
          <div class="card-footer bg-light border-0 d-flex justify-content-between">
            <span class="fw-bold text-success">${priceText}</span>
            <button
              class="btn btn-primary btn-sm view-details-btn"
              data-bs-toggle="modal"
              data-bs-target="#productModal"
              data-product='${JSON.stringify(p).replace(/'/g,"&apos;")}'
            >
              <i class="fas fa-eye me-1"></i>Ver más
            </button>
          </div>
        </div>`;
      frag.appendChild(col);
    });
    productsGrid.appendChild(frag);
  }

  // 7) Filtrar y ordenar
  function applyFiltersAndSort() {
    let filtered = allProducts.slice();

    // a) búsqueda
    const term = searchInput.value.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter(p =>
        p.sku.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term)
      );
    }

    // b) categorías
    const checkedCats = Array.from(
      document.querySelectorAll('.category-checkbox:checked')
    ).map(cb => cb.value);
    if (checkedCats.length) {
      filtered = filtered.filter(p =>
        checkedCats.includes(p.category)
      );
    }

    // c) rango de precio
    const min = parseFloat(minPriceInput.value);
    if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
    const max = parseFloat(maxPriceInput.value);
    if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);

    // d) orden
    switch (sortBySelect.value) {
      case 'sku-asc':
        filtered.sort((a,b) => a.sku.localeCompare(b.sku));
        break;
      case 'sku-desc':
        filtered.sort((a,b) => b.sku.localeCompare(a.sku));
        break;
      case 'price-asc':
        filtered.sort((a,b) => (a.price||0) - (b.price||0));
        break;
      case 'price-desc':
        filtered.sort((a,b) => (b.price||0) - (a.price||0));
        break;
    }

    renderProducts(filtered);
  }

  // 8) Listeners
  searchInput.addEventListener('input',   applyFiltersAndSort);
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    applyFiltersAndSort();
  });

  document.querySelectorAll('.category-checkbox')
    .forEach(cb => cb.addEventListener('change', applyFiltersAndSort));

  minPriceInput.addEventListener('input', applyFiltersAndSort);
  maxPriceInput.addEventListener('input', applyFiltersAndSort);
  sortBySelect.addEventListener('change',  applyFiltersAndSort);

  clearCategoriesBtn.addEventListener('click', () => {
    document.querySelectorAll('.category-checkbox')
      .forEach(cb => cb.checked = false);
    applyFiltersAndSort();
  });

  clearAllFiltersBtn.addEventListener('click', () => {
    // limpia TODO
    searchInput.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortBySelect.value = 'sku-asc';
    document.querySelectorAll('.category-checkbox')
      .forEach(cb => cb.checked = false);
    applyFiltersAndSort();
  });

  // 9) Inicializar
  renderProducts(allProducts);
});