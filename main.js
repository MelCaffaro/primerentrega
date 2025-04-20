// Variables iniciales

let precioZarate = 3500; // Precio desde puntos de partida que incluyen "Zárate"
let precioCampana = 2500; // Precio desde puntos de partida que incluyen "Campana"
let asientosDisponibles = Array(60).fill(true); // Array para simular asientos disponibles

// Función para seleccionar asiento
function seleccionarAsiento(asiento) {
  if (asientosDisponibles[asiento - 1]) {
    asientosDisponibles[asiento - 1] = false; // Marca el asiento como ocupado
    return true; // Asiento disponible y reservado
  } else {
    return false; // Asiento ocupado
  }
}

// Función para calcular precio según origen
function calcularPrecio(origen) {
  if (origen.includes("Zárate")) {
    return precioZarate; // Precio para Zárate
  } else if (origen.includes("Campana")) {
    return precioCampana; // Precio para Campana
  } else {
    alert("Origen no válido.");
    return null; // Error en origen
  }
}

// Función principal para comprar pasaje
function comprarPasaje() {
  let origen = prompt(
    "Seleccione su punto de origen:\n- Hospital de Zárate\n- Terminal de Zárate\n- Zárate calle Mitre y Lavalle\n- Rotonda de Zárate\n- Siderca en Campana\n- Centro de Campana\n- Parador La Carmela en Campana"
  );
  let horario = prompt(
    "Seleccione horario del micro:\n- 08:00 AM\n- 12:00 PM\n- 16:00 PM\n- 20:00 PM\n- 00:00 PM"
  );
  let asiento = parseInt(prompt("Seleccione un asiento (1-60):"));

  // Verificar asiento disponible
  if (asiento < 1 || asiento > 60) {
    alert("Número de asiento inválido.");
    return;
  }
  if (!seleccionarAsiento(asiento)) {
    alert("El asiento ya está ocupado. Por favor seleccione otro.");
    return;
  }

  // Calcular precio
  let precio = calcularPrecio(origen);
  if (precio === null) return; // Si el origen es inválido, termina la función

  let nombre = prompt("Ingrese su nombre completo:");
  let dni = prompt("Ingrese su DNI:");
  let telefono = prompt("Ingrese su número de teléfono:");
  let email = prompt("Ingrese su email:");
  let medioPago = prompt(
    "Seleccione medio de pago:\n- Tarjeta de crédito\n- Tarjeta de débito"
  );

  // Verificar datos de pago
  if (medioPago === "Tarjeta de crédito" || medioPago === "Tarjeta de débito") {
    let numeroTarjeta = prompt("Ingrese el número de tarjeta:");
    let nombreTarjeta = prompt("Ingrese el nombre como figura en la tarjeta:");
    let fechaVencimiento = prompt("Ingrese la fecha de vencimiento (MM/AA):");
    let claveBancaria = prompt("Ingrese la clave bancaria:");
    // Confirmación de compra
    alert(
      "Pasaje comprado con éxito!\nDetalles:\n- Origen: ${origen}\n- Horario: ${horario}\n- Asiento: ${asiento}\n- Precio: $${precio}\nLe llegará al email: ${email}."
    );
  } else {
    alert("Medio de pago no válido.");
    return;
  }

  // Confirmación de compra
  alert(
    "Pasaje comprado con éxito!\nDetalles:\n- Origen: ${origen}\n- Horario: ${horario}\n- Asiento: ${asiento}\n- Precio: $${precio}\nLe llegará al email: ${email}."
  );
}
