---
layout: base.njk
title: "contacto"
---

<link rel="stylesheet" href="/css/style.css">

<div class="container my-5">
  <h1 class="text-center text-uppercase mb-4" style="color: #ff4500; letter-spacing: 1px;">
    Contáctanos
  </h1>

  <div class="contact-container">
    <!-- IZQUIERDA: Formulario -->
    <div class="contact-form">
      <form id="contactForm" action="/contacto/" method="POST" novalidate>
        <div class="mb-3">
          <label for="name" class="form-label fw-semibold">Nombre *</label>
          <input type="text" id="name" name="name" class="form-control" placeholder="Tu nombre" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">Correo electrónico *</label>
          <input type="email" id="email" name="email" class="form-control" placeholder="Tu email" required>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label fw-semibold">Teléfono *</label>
          <input type="tel" id="phone" name="phone" class="form-control" placeholder="Tu teléfono" required>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label fw-semibold">Mensaje</label>
          <textarea id="message" name="message" class="form-control" rows="5" placeholder="Escribe tu mensaje…"></textarea>
        </div>
        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" id="privacy" name="privacy" required>
          <label class="form-check-label" for="privacy">
            He leído y acepto el <a href="/aviso-privacidad/" target="_blank">aviso de privacidad</a> *
          </label>
        </div>
        <button type="submit" class="btn btn-primary w-100 py-2">Enviar</button>
      </form>
    </div>

    <!-- DERECHA: Info + Mapa -->
    <div class="contact-info-map">
      <div class="info-card">
        <h3 class="fw-semibold mb-3" style="color: #ff4500;">Nuestros Datos</h3>
        <p class="mb-2"><strong>Teléfonos:</strong><br>
          <a href="tel:+523123456789">+52 312 345 6789</a><br>
          <a href="tel:+523987654321">+52 398 765 4321</a>
        </p>
        <p class="mb-2"><strong>Email:</strong><br>
          <a href="mailto:ventas@heemsa.com.mx">ventas@heemsa.com.mx</a>
        </p>
        <p class="mb-0"><strong>Horarios:</strong><br>
          Lun–Vie: 9:00–14:00, 16:00–19:00<br>
          Sáb: 9:00–14:00<br>
          Dom: Cerrado
        </p>
      </div>
      <div class="map-card">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.48436502345!2d-101.57026088465131!3d21.74567128563522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a3aae7213c4af%3A0x35943ca3b7a087c9!2sHEEMSA!5e0!3m2!1ses-419!2smx!4v1691325705847!5m2!1ses-419!2smx"
          allowfullscreen="" loading="lazy">
        </iframe>
      </div>
    </div>
  </div>
</div>