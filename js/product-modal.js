// /js/product-modal.js
document.addEventListener('DOMContentLoaded', () => {
  const modalEl   = document.getElementById('productModal');
  const modalBody = document.getElementById('productModalBody');
  const bsModal   = new bootstrap.Modal(modalEl);

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.view-details-btn');
    if (!btn) return;
    const p = JSON.parse(btn.dataset.product);

   // … dentro del listener de click …
modalBody.innerHTML = `
  <div class="row g-4">
    <!-- Columna de imagen -->
    <div class="col-12 col-md-5 text-center">
      <img src="${p.url || '/' + p.image}"
           onerror="this.src='/assets/images/placeholder-product.png';"
           alt="${p.sku}"
           class="img-fluid rounded detail-img">
    </div>
    <!-- Columna de info -->
    <div class="col-12 col-md-7 d-flex flex-column">
      <h4 class="fw-bold mb-2">${p.sku}</h4>
      <div class="detail-desc mb-3 flex-grow-1">
        ${p.description}
      </div>
      <ul class="list-unstyled mb-4">
        <li><strong>Categoría:</strong> ${p.category}</li>
        <li><strong>Subcategoría:</strong> ${p.subcategory}</li>
        <li><strong>Precio:</strong> ${p.price.toFixed(2)} USD</li>
        ${p.code?`<li><strong>Código:</strong> ${p.code}</li>`:``}
      </ul>
      <div>
        <a href="/contacto" class="btn btn-primary w-100">
          <i class="fas fa-envelope me-1"></i>Solicitar cotización
        </a>
      </div>
    </div>
  </div>`;
    bsModal.show();
  });
});