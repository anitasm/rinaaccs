(function () {
  const listaCarrito = document.getElementById('carrito-lista');
  const mensajeVacio = document.getElementById('carrito-vacio');
  const totalElemento = document.getElementById('carrito-total');
  const botonComprar = document.querySelector('.carrito__comprar');
  const STORAGE_KEY = 'rinaaccs_carrito';

  if (!listaCarrito || !mensajeVacio || !totalElemento || !botonComprar) {
    return;
  }

  const catalogo = crearCatalogo();
  let carrito = cargarCarrito();

  renderizarCarrito();

  document.addEventListener('click', function (evento) {
    const boton = evento.target.closest('[data-action="agregar-carrito"]');

    if (!boton) {
      return;
    }

    const idProducto = boton.dataset.productId;

    if (!idProducto || !catalogo[idProducto]) {
      return;
    }

    agregarProductoAlCarrito(idProducto);
  });

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
      const datosParseados = JSON.parse(datosGuardados);
      if (Array.isArray(datosParseados)) {
        return datosParseados.filter(function (item) {
          return item && item.id && typeof item.cantidad === 'number';
        });
      }
      return [];
    } catch (error) {
      console.warn('No se pudo recuperar el carrito almacenado.', error);
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

  function renderizarCarrito() {
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
      mensajeVacio.hidden = false;
      listaCarrito.hidden = true;
      totalElemento.textContent = '0';
      botonComprar.disabled = true;
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

      const nombre = document.createElement('span');
      nombre.className = 'carrito__item-nombre';
      nombre.textContent = producto.nombre;

      const cantidad = document.createElement('p');
      cantidad.className = 'carrito__item-cantidad';
      cantidad.textContent = 'Cantidad: ' + item.cantidad;

      const precio = document.createElement('p');
      precio.className = 'carrito__item-precio';
      precio.textContent = '$' + (producto.precio * item.cantidad).toLocaleString('es-AR');

      elemento.appendChild(nombre);
      elemento.appendChild(cantidad);
      elemento.appendChild(precio);

      listaCarrito.appendChild(elemento);
    });

    totalElemento.textContent = calcularTotal().toLocaleString('es-AR');
    botonComprar.disabled = false;
  }
})();