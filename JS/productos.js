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
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.55)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "20px";
  overlay.style.boxSizing = "border-box";
  overlay.style.zIndex = "1000";

  const contenido = document.createElement("div");
  contenido.style.backgroundColor = "#f7ebe5";
  contenido.style.borderRadius = "20px";
  contenido.style.padding = "24px";
  contenido.style.maxWidth = "750px";
  contenido.style.width = "100%";
  contenido.style.position = "relative";
  contenido.style.display = "flex";
  contenido.style.flexWrap = "wrap";
  contenido.style.gap = "24px";
  contenido.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.25)";

  const botonCerrar = document.createElement("button");
  botonCerrar.type = "button";
  botonCerrar.textContent = "✕";
  botonCerrar.setAttribute("aria-label", "Cerrar");
  botonCerrar.style.position = "absolute";
  botonCerrar.style.top = "12px";
  botonCerrar.style.right = "12px";
  botonCerrar.style.background = "transparent";
  botonCerrar.style.border = "none";
  botonCerrar.style.fontSize = "20px";
  botonCerrar.style.cursor = "pointer";
  botonCerrar.style.color = "#5b3d36";

  const contenedorImagen = document.createElement("div");
  contenedorImagen.style.flex = "1 1 280px";
  contenedorImagen.style.display = "flex";
  contenedorImagen.style.justifyContent = "center";
  contenedorImagen.style.alignItems = "center";

  const imagen = document.createElement("img");
  imagen.alt = "";
  imagen.style.width = "100%";
  imagen.style.maxWidth = "280px";
  imagen.style.borderRadius = "12px";
  imagen.style.objectFit = "cover";

  contenedorImagen.appendChild(imagen);

  const contenedorTexto = document.createElement("div");
  contenedorTexto.style.flex = "1 1 280px";
  contenedorTexto.style.display = "flex";
  contenedorTexto.style.flexDirection = "column";
  contenedorTexto.style.justifyContent = "space-between";
  contenedorTexto.style.gap = "16px";

  const titulo = document.createElement("h3");
  titulo.style.margin = "0";
  titulo.style.color = "#5b3d36";

  const descripcion = document.createElement("p");
  descripcion.textContent = "Espacio para información detallada del producto.";
  descripcion.style.minHeight = "160px";
  descripcion.style.margin = "0";
  descripcion.style.color = "#4a2f2a";
  descripcion.style.lineHeight = "1.5";

  const precio = document.createElement("p");
  precio.style.margin = "0";
  precio.style.fontWeight = "600";
  precio.style.color = "#4a2f2a";

  const botonCarrito = document.createElement("button");
  botonCarrito.type = "button";
  botonCarrito.textContent = "Agregar al carrito";
  botonCarrito.style.alignSelf = "flex-start";
  botonCarrito.style.padding = "10px 18px";
  botonCarrito.style.backgroundColor = "#b78273";
  botonCarrito.style.color = "#fff";
  botonCarrito.style.border = "none";
  botonCarrito.style.borderRadius = "20px";
  botonCarrito.style.cursor = "pointer";

  contenedorTexto.appendChild(titulo);
  contenedorTexto.appendChild(descripcion);
  contenedorTexto.appendChild(precio);
  contenedorTexto.appendChild(botonCarrito);

  contenido.appendChild(botonCerrar);
  contenido.appendChild(contenedorImagen);
  contenido.appendChild(contenedorTexto);

  overlay.appendChild(contenido);

  botonCerrar.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function (evento) {
    if (evento.target === overlay) {
      overlay.style.display = "none";
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
  modalProducto.overlay.style.display = "flex";
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

  botonInfo.addEventListener("click", function () {
    mostrarModalProducto(producto);
  });

  const botonAgregar = document.createElement("button");
  botonAgregar.type = "button";
  botonAgregar.textContent = "Agregar al carrito";
  botonAgregar.className = "boton-agregar-carrito";
  botonAgregar.style.marginTop = "12px";

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
