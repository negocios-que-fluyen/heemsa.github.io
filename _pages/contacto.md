---
layout: base.njk
title: "Contacto"
---

<!-- <h2>Formulario de Contacto</h2>
<form action="https://formspree.io/f/your_form_id" method="POST">
    <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="name" name="name" required>
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea class="form-control" id="message" name="message" rows="3" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
 -->

  <section class="contact-form-section">
        <h1 class="align-self-center">Contáctanos</h1>
        <form id="contact-form">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="nombre"
              placeholder="*Nombre"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" name="email" id="email" placeholder="*Email" />
          </div>
          <input
            type="hidden"
            name="_subject"
            value="[Heemsa web] Nuevo mensaje de contacto"
          />
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input
              type="text"
              name="telefono"
              id="phone"
              placeholder="*Teléfono"
              required
            />
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              name="mensaje"
              placeholder="Mensaje"
            ></textarea>
          </div>
          <div class="form-group">
            <label class="checkbox-container">
              <input type="checkbox" id="privacy" required />
              <span>He leído y acepto el <a id="privacy-policy" target="_blank">aviso de privacidad</a>.</span>
            </label>
          </div>
          <input
            type="hidden"
            name="_next"
            value="https://heemsa.com/contacto"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <button type="submit" class="submit-btn">Enviar</button>
        </form>
      </section>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 my-2">
      <section
        class="contact-info-section d-flex flex-column justify-content-center"
      >
        <h1 class="align-self-center">HEEMSA</h1>
        <p class="align-self-center">
          Venta de herramientas automotrices, ¡contáctanos!
        </p>
        <div class="contact-info">
          <h3>Nos ubicamos en:</h3>
          <p id="address"></p>
          <p id="address2"></p>

          <h3>Teléfonos</h3>
          <p id="phones"></p>
          <p id="whatsapp"></p>

          <h3>Email:</h3>
          <p><a id="emailContact"></a></p>

          <h3>Horarios:</h3>
          <p>
            <strong>Lun - Vie:</strong> 9:00 - 14:00, 16:00 - 19:00<br />
            <strong>Sábado:</strong> 9:00 - 14:00<br />
            <strong>Domingo:</strong> Cerrado
          </p>
        </div>
      </section>
    </div>
  </div>
  <div class="row py-2">
    <div class="col-lg-12 col-md-12 col-sm-12 my-2">
      <section class="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.1507730044955!2d-102.28763732492338!3d20.0021857814026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e0daf206805%3A0xd0c76bffc01abdda!2sHeemsa!5e0!3m2!1ses-419!2smx!4v1736917631108!5m2!1ses-419!2smx"
          width="100%"
          height="350"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>