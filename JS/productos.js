const listaPulseras = document.getElementById("pulseras");
const listaCollares = document.getElementById("collares");

const datosPulseras = [
  {
    id: "pulsera_triple-cristalrosa",
    nombre: "Cristal Rosa Triple",
    precio: 5500,
    descripcionCorta: "Pulsera con cristales rosa en triple vuelta.",
    imagen: "../assets/imagen-dos.jpeg"
  },
  {
    id: "pulsera_cadena-cristal",
    nombre: "Cadena y Cristal",
    precio: 7800,
    descripcionCorta: "Pulsera combinada con cadena y cristal central.",
    imagen: "../assets/imagen-tres.jpeg"
  },
  {
    id: "pulsera_doble-blancoybronce",
    nombre: "Blanco y Bronce Doble",
    precio: 5000,
    descripcionCorta: "Doble vuelta en tonos blanco y bronce.",
    imagen: "../assets/imagen-cuatro.jpeg"
  },
  {
    id: "pulsera_simple-ojoturco",
    nombre: "Ojo Turco Simple",
    precio: 6300,
    descripcionCorta: "Pulsera protectora con dije de ojo turco.",
    imagen: "../assets/imagen-cinco.jpeg"
  },
  {
    id: "pulsera_piedra-natural",
    nombre: "Piedra Natural",
    precio: 9700,
    descripcionCorta: "Pulsera de piedras naturales seleccionadas.",
    imagen: "../assets/imagen-seis.jpeg"
  },
  {
    id: "pulsera_piedra-combinada",
    nombre: "Piedra Combinada",
    precio: 9500,
    descripcionCorta: "Combinación de piedras naturales y cristales.",
    imagen: "../assets/imagen-ocho.jpeg"
  }
];

const datosCollares = [
  {
    id: "collar_rojo",
    nombre: "Collar Rojo",
    precio: 7200,
    descripcionCorta: "Collar con cuentas rojizas y dije central.",
    imagen: "../assets/collaruno.jpg"
  },
  {
    id: "collar_blanco",
    nombre: "Collar Blanco",
    precio: 6900,
    descripcionCorta: "Diseño en tonos blancos y detalles metálicos.",
   
    imagen: "../assets/collardos.jpg"
  },
  {
    id: "collar_doblegancho",
    nombre: "Collar Doble Gancho",
    precio: 7600,
    descripcionCorta: "Doble capa con cierre regulable y dijes.",
    imagen: "../assets/collartres.jpg"
  },
  {
    id: "collar_infinito",
    nombre: "Collar Infinito",
    precio: 7500,
    descripcionCorta: "Collar con dije infinito y cuentas neutras.",
    imagen: "../assets/collarcuatro.jpg"
  }
];

const inventarioProductos = [];

const modalProducto = crearModalProducto();

function crearModalProducto() {
  const overlay = document.createElement("div");
  overlay.id = "modal-producto";
  overlay.className = "modal-producto";

  const contenido = document.createElement("div");
  contenido.className = "modal-producto__contenido";

  const botonCerrar = document.createElement("button");
  botonCerrar.type = "button";
  botonCerrar.textContent = "✕";
  botonCerrar.setAttribute("aria-label", "Cerrar");
  botonCerrar.className = "modal-producto__cerrar";

  const contenedorImagen = document.createElement("div");
  contenedorImagen.className = "modal-producto__media";

  const imagen = document.createElement("img");
  imagen.alt = "";
  imagen.className = "modal-producto__imagen";

  contenedorImagen.appendChild(imagen);

  const contenedorTexto = document.createElement("div");
  contenedorTexto.className = "modal-producto__detalle";

  const titulo = document.createElement("h3");
  titulo.className = "modal-producto__titulo";

  const descripcion = document.createElement("p");
  descripcion.textContent = "Espacio para información detallada del producto.";
  descripcion.className = "modal-producto__descripcion";

  const precio = document.createElement("p");
  precio.className = "modal-producto__precio";

  const botonCarrito = document.createElement("button");
  botonCarrito.type = "button";
  botonCarrito.textContent = "Agregar al carrito";
  botonCarrito.className = "modal-producto__boton";

  contenedorTexto.appendChild(titulo);
  contenedorTexto.appendChild(descripcion);
  contenedorTexto.appendChild(precio);
  contenedorTexto.appendChild(botonCarrito);

  contenido.appendChild(botonCerrar);
  contenido.appendChild(contenedorImagen);
  contenido.appendChild(contenedorTexto);

  overlay.appendChild(contenido);

  botonCerrar.addEventListener("click", function () {
    overlay.classList.remove("is-active");
    });

  overlay.addEventListener("click", function (evento) {
    if (evento.target === overlay) {
      overlay.classList.remove("is-active");
    }
  });

  document.body.appendChild(overlay);

  return {
    overlay: overlay,
    imagen: imagen,
    titulo: titulo,
    precio: precio,
    botonCarrito: botonCarrito
  };
}

function mostrarModalProducto(producto) {
  modalProducto.imagen.src = producto.imagen;
  modalProducto.imagen.alt = producto.nombre + " ampliado";
  modalProducto.titulo.textContent = producto.nombre;
  modalProducto.precio.textContent = "Precio: $" + producto.precio;
  modalProducto.botonCarrito.textContent = "Agregar al carrito";
  modalProducto.botonCarrito.dataset.productId = producto.id;
  modalProducto.botonCarrito.dataset.action = "agregar-carrito";
  modalProducto.overlay.classList.add("is-active");
}

function crearTarjetaProducto(producto, listaDestino) {
  if (!listaDestino) {
    return;
  }

  inventarioProductos.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio
  });

  const item = document.createElement("li");
  item.id = producto.id;

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const titulo = document.createElement("h4");
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcionCorta;

  const precio = document.createElement("p");
  precio.textContent = "Precio: $" + producto.precio;

  const botonInfo = document.createElement("button");
  botonInfo.type = "button";
  botonInfo.textContent = "Más información";
  botonInfo.className = "boton-producto boton-producto--info";

  botonInfo.addEventListener("click", function () {
    mostrarModalProducto(producto);
  });

  const botonAgregar = document.createElement("button");
  botonAgregar.type = "button";
  botonAgregar.textContent = "Agregar al carrito";
  botonAgregar.className = "boton-producto boton-producto--carrito";
  botonAgregar.dataset.productId = producto.id;
  botonAgregar.dataset.action = "agregar-carrito";

  item.appendChild(imagen);
  item.appendChild(titulo);
  item.appendChild(descripcion);
  item.appendChild(precio);
  item.appendChild(botonInfo);
  item.appendChild(botonAgregar);

  listaDestino.appendChild(item);
}

for (let i = 0; i < datosPulseras.length; i++) {
  crearTarjetaProducto(datosPulseras[i], listaPulseras);
}

for (let j = 0; j < datosCollares.length; j++) {
  crearTarjetaProducto(datosCollares[j], listaCollares);
}