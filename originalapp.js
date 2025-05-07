// Variables iniciales
let precioZarate = 3500; // Precio para orígenes que incluyen "Zárate"
let precioCampana = 2500; // Precio para orígenes que incluyen "Campana"
// Array para simular 60 asientos disponibles (posición 0 corresponde al asiento 1)
let asientosDisponibles = Array(60).fill(true);

/**
 * Función para seleccionar un asiento.
 * Marca el asiento como ocupado si está disponible.
 * @param {number} asiento - Número de asiento (1-60)
 * @returns {boolean} - true si el asiento se reservó, false si ya estaba ocupado.
 */
function seleccionarAsiento(asiento) {
  if (asientosDisponibles[asiento - 1]) {
    asientosDisponibles[asiento - 1] = false;
    return true;
  } else {
    return false;
  }
}

/**
 * Función para calcular el precio en función del origen.
 * @param {string} origen - Texto con el origen seleccionado.
 * @returns {number|null} - Precio correspondiente o null si el origen es inválido.
 */
function calcularPrecio(origen) {
  if (origen.includes("Zárate")) {
    return precioZarate;
  } else if (origen.includes("Campana")) {
    return precioCampana;
  } else {
    return null;
  }
}

/**
 * Función para guardar el ticket en localStorage usando JSON.
 * @param {object} ticket - Objeto con los datos del ticket.
 */
function guardarTicket(ticket) {
  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

/**
 * Función para mostrar mensajes de confirmación o error en el DOM.
 * @param {string} mensaje - Texto a mostrar.
 * @param {boolean} [esError=false] - true si es error, false si es confirmación.
 */
function mostrarMensaje(mensaje, esError = false) {
  const divMensaje = document.getElementById("mensaje-final");
  divMensaje.textContent = mensaje;
  divMensaje.style.color = esError ? "red" : "green";
}

// Mostrar/ocultar la sección de datos de tarjeta según el método de pago seleccionado
document.getElementById("medio-pago").addEventListener("change", function () {
  const medioPago = this.value;
  const datosTarjetaDiv = document.getElementById("datos-tarjeta");
  if (medioPago === "Tarjeta de crédito" || medioPago === "Tarjeta de débito") {
    datosTarjetaDiv.style.display = "block";
    // Se pueden agregar atributos required a los campos
    document
      .getElementById("numero-tarjeta")
      .setAttribute("required", "required");
    document
      .getElementById("nombre-tarjeta")
      .setAttribute("required", "required");
    document.getElementById("vencimiento").setAttribute("required", "required");
    document.getElementById("clave").setAttribute("required", "required");
  } else {
    datosTarjetaDiv.style.display = "none";
    document.getElementById("numero-tarjeta").removeAttribute("required");
    document.getElementById("nombre-tarjeta").removeAttribute("required");
    document.getElementById("vencimiento").removeAttribute("required");
    document.getElementById("clave").removeAttribute("required");
  }
});

// Evento para procesar la compra de pasaje al enviar el formulario
document
  .getElementById("formulario-compra")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir recarga de página

    // Obtener los datos del formulario
    const origen = document.getElementById("origen").value;
    const horario = document.getElementById("horario").value;
    const asiento = parseInt(document.getElementById("asiento").value);
    const nombre = document.getElementById("nombrecompleto").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const medioPago = document.getElementById("medio-pago").value;

    // Validar que el número de asiento esté entre 1 y 60
    if (asiento < 1 || asiento > 60) {
      mostrarMensaje(
        "Número de asiento inválido. Debe ser entre 1 y 60.",
        true
      );
      return;
    }

    // Verificar disponibilidad del asiento
    if (!seleccionarAsiento(asiento)) {
      mostrarMensaje(
        "El asiento ya está ocupado. Por favor seleccione otro.",
        true
      );
      return;
    }

    // Calcular el precio en función del origen
    const precio = calcularPrecio(origen);
    if (precio === null) {
      mostrarMensaje("Origen no válido.", true);
      return;
    }

    // Construir el objeto ticket
    let ticket = {
      origen: origen,
      horario: horario,
      asiento: asiento,
      nombre: nombre,
      dni: dni,
      telefono: telefono,
      email: email,
      medioPago: medioPago,
      precio: precio,
    };

    // Si el medio de pago es tarjeta, obtener los datos de la tarjeta
    if (
      medioPago === "Tarjeta de crédito" ||
      medioPago === "Tarjeta de débito"
    ) {
      const numeroTarjeta = document.getElementById("numero-tarjeta").value;
      const nombreTarjeta = document.getElementById("nombre-tarjeta").value;
      const vencimiento = document.getElementById("vencimiento").value;
      // En este ejemplo, por seguridad, no se almacena la clave.
      if (!numeroTarjeta || !nombreTarjeta || !vencimiento) {
        mostrarMensaje(
          "Por favor, complete todos los datos de la tarjeta.",
          true
        );
        return;
      }
      ticket.numeroTarjeta = numeroTarjeta;
      ticket.nombreTarjeta = nombreTarjeta;
      ticket.vencimiento = vencimiento;
    }

    // Guardar el ticket en el localStorage
    guardarTicket(ticket);

    // Mostrar mensaje de confirmación con los detalles
    mostrarMensaje(`Pasaje comprado con éxito!
Detalles:
Origen: ${origen} | Horario: ${horario} | Asiento: ${asiento} | Precio: $${precio}
Se envió confirmación a: ${email}`);

    // Reiniciar el formulario y ocultar la sección de datos de tarjeta
    this.reset();
    document.getElementById("datos-tarjeta").style.display = "none";
  });
