(function () {
  const listaCarrito = document.getElementById('carrito-lista');
  const mensajeVacio = document.getElementById('carrito-vacio');
  const totalElemento = document.getElementById('carrito-total');
  const botonComprar = document.querySelector('.carrito__comprar');
  const checkoutSeccion = document.getElementById('carrito-checkout');
  const checkoutForm = document.getElementById('carrito-form');
  const medioPagoSelect = document.getElementById('medio-pago');
  const totalResumen = document.getElementById('carrito-total-resumen');
  const descuentoElemento = document.getElementById('carrito-descuento');
  const descuentoValor = document.getElementById('carrito-descuento-valor');
  const mensajeConfirmacion = document.getElementById('carrito-confirmacion');
  const carritoSeccion = document.getElementById('seccion-carrito');
  const carritoBurbuja = document.querySelector('.carrito-burbuja');
  const STORAGE_KEY = 'rinaaccs_carrito';
  let resaltadoTimeout = null;

  if (!listaCarrito || !mensajeVacio || !totalElemento || !botonComprar) {
    return;
  }

  const catalogo = crearCatalogo();
  let carrito = cargarCarrito();

  renderizarCarrito();

    if (carritoBurbuja && carritoSeccion) {
    carritoBurbuja.addEventListener('click', function () {
      carritoSeccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      resaltarCarrito();
    });
  }

  document.addEventListener('click', function (evento) {
    const botonAgregar = evento.target.closest('[data-action="agregar-carrito"]');

    if (botonAgregar) {
      const idProducto = botonAgregar.dataset.productId;

      if (!idProducto || !catalogo[idProducto]) {
        return;
      }

      agregarProductoAlCarrito(idProducto);
      return;
    }

    const botonEliminar = evento.target.closest('[data-action="eliminar-carrito"]');

    if (botonEliminar) {
      const idProducto = botonEliminar.dataset.productId;

      if (!idProducto) {
        return;
      }

      eliminarProductoDelCarrito(idProducto);
    }
  });

  botonComprar.addEventListener('click', function () {
    if (!checkoutSeccion || carrito.length === 0) {
      return;
    }

    checkoutSeccion.hidden = false;
    if (mensajeConfirmacion) {
      mensajeConfirmacion.hidden = true;
    }
    actualizarTotales();

    if (typeof checkoutSeccion.scrollIntoView === 'function') {
      checkoutSeccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  if (medioPagoSelect) {
    medioPagoSelect.addEventListener('change', actualizarTotales);
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (evento) {
      evento.preventDefault();

      if (carrito.length === 0) {
        return;
      }

      if (mensajeConfirmacion) {
        mensajeConfirmacion.hidden = false;
      }

      if (checkoutForm) {
        checkoutForm.reset();
      }

      actualizarTotales();
    });
  }

  function crearCatalogo() {
    const colecciones = [];

    if (typeof datosPulseras !== 'undefined') {
      colecciones.push(...datosPulseras);
    }

    if (typeof datosCollares !== 'undefined') {
      colecciones.push(...datosCollares);
    }

    return colecciones.reduce(function (acumulador, producto) {
      acumulador[producto.id] = producto;
      return acumulador;
    }, {});
  }

  function cargarCarrito() {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);

    if (!datosGuardados) {
      return [];
    }

    try {
      return JSON.parse(datosGuardados);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      return [];
    }
  }

  function guardarCarrito() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }

  function agregarProductoAlCarrito(idProducto) {
    const existente = carrito.find(function (item) {
      return item.id === idProducto;
    });

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({
        id: idProducto,
        cantidad: 1
      });
    }

    guardarCarrito();
    renderizarCarrito();
    resaltarCarrito();
  }

  function eliminarProductoDelCarrito(idProducto) {
    carrito = carrito.filter(function (item) {
      return item.id !== idProducto;
    });

    guardarCarrito();
    renderizarCarrito();
  }

  function calcularTotal() {
    return carrito.reduce(function (total, item) {
      const producto = catalogo[item.id];
      if (!producto) {
        return total;
      }

      return total + producto.precio * item.cantidad;
    }, 0);
  }

  function actualizarTotales() {
    const total = calcularTotal();

    totalElemento.textContent = total.toLocaleString('es-AR');

    if (!totalResumen) {
      return;
    }

    let descuento = 0;

    if (medioPagoSelect && medioPagoSelect.value === 'transferencia') {
      descuento = total * 0.15;
    }

    if (descuentoElemento && descuentoValor) {
      if (descuento > 0) {
        descuentoElemento.hidden = false;
        descuentoValor.textContent = descuento.toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      } else {
        descuentoElemento.hidden = true;
        descuentoValor.textContent = '0';
      }
    }

    const totalConDescuento = Math.max(total - descuento, 0);

    totalResumen.textContent = totalConDescuento.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function resaltarCarrito() {
    if (!carritoSeccion) {
      return;
    }

    carritoSeccion.classList.add('carrito--resaltado');

    if (resaltadoTimeout) {
      window.clearTimeout(resaltadoTimeout);
    }

    resaltadoTimeout = window.setTimeout(function () {
      carritoSeccion.classList.remove('carrito--resaltado');
      resaltadoTimeout = null;
    }, 1200);
  }

  function renderizarCarrito() {
    listaCarrito.innerHTML = '';

    if (mensajeConfirmacion) {
      mensajeConfirmacion.hidden = true;
    }

    if (carrito.length === 0) {
      mensajeVacio.hidden = false;
      listaCarrito.hidden = true;
      totalElemento.textContent = '0';
      botonComprar.disabled = true;
      if (checkoutSeccion) {
        checkoutSeccion.hidden = true;
      }
      if (checkoutForm) {
        checkoutForm.reset();
      }
      actualizarTotales();
      return;
    }

    mensajeVacio.hidden = true;
    listaCarrito.hidden = false;

    carrito.forEach(function (item) {
      const producto = catalogo[item.id];

      if (!producto) {
        return;
      }

      const elemento = document.createElement('li');
      elemento.className = 'carrito__item';

      const info = document.createElement('div');
      info.className = 'carrito__item-info';

      const nombre = document.createElement('span');
      nombre.className = 'carrito__item-nombre';
      nombre.textContent = producto.nombre;

      const cantidad = document.createElement('p');
      cantidad.className = 'carrito__item-cantidad';
      cantidad.textContent = 'Cantidad: ' + item.cantidad;

      const precio = document.createElement('p');
      precio.className = 'carrito__item-precio';
      precio.textContent = '$' + (producto.precio * item.cantidad).toLocaleString('es-AR');

      info.appendChild(nombre);
      info.appendChild(cantidad);
      info.appendChild(precio);

      const eliminar = document.createElement('button');
      eliminar.type = 'button';
      eliminar.className = 'carrito__item-eliminar';
      eliminar.dataset.action = 'eliminar-carrito';
      eliminar.dataset.productId = item.id;
      eliminar.textContent = 'Eliminar';

      elemento.appendChild(info);
      elemento.appendChild(eliminar);

      listaCarrito.appendChild(elemento);
    });

    botonComprar.disabled = false;
    actualizarTotales();
  }
})();