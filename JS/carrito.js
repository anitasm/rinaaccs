const carrito = [
  { nombre: 'Pulsera artesanal', precio: 1500, cantidad: 1 },
  { nombre: 'Pulsera artesanal', precio: 1500, cantidad: 1 }
];

function calcularTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].precio * items[i].cantidad;
  }
  return total;
}

function confirmarCompra() {
  const confirmar = confirm('¿Deseas finalizar la compra?');
  if (confirmar) {
    let subtotal = calcularTotal(carrito);
    let totalConIva = subtotal * 1.21;

    const metodoPago = prompt('¿Cuál es tu método de pago? (transferencia/otro)');
    let totalFinal = totalConIva;

    if (metodoPago && metodoPago.toLowerCase() === 'transferencia') {
      totalFinal *= 0.85;
      alert('Se aplicó un 15% de descuento por pago con transferencia.');
    }

    alert('Total a pagar: $' + totalFinal.toFixed(2) + ' (con 21% de IVA aplicado)');
    console.log('Subtotal:', subtotal);
    console.log('Total con IVA:', totalConIva);
    console.log('Método de pago:', metodoPago);
    console.log('Total final:', totalFinal);
  } else {
    console.log('El proceso de compra fue cancelado.');
  }
}
