import "../client/clientHome.css"
import "../../global.css"
import type { Product } from "../../types/product.ts"
import {
    obtenerCarrito,
    agregarAlCarrito,
    aumentarCantidad,
    disminuirCantidad,
    calcularTotal
} from "../cart/cart"

import {
    obtenerCategorias,
    obtenerProductos,
    type CategoriaApi,
    type ProductoApi
} from "../../utils/api.ts";
import {configurarLogout, esAdmin, protegerRuta} from "../../utils/auth.ts";

import { mostrarToast } from "../../utils/toast.ts";

protegerRuta();
configurarLogout();

if (!esAdmin()) {
    document.getElementById("adminNav")?.remove();
}

let categorias: CategoriaApi[] = [];
let productos: ProductoApi[] = [];
let productosActuales: ProductoApi[] = [];

const usuarioGuardado = localStorage.getItem("userData");

if (usuarioGuardado) {
    const { nombre } = JSON.parse(usuarioGuardado);
    const bienvenido = document.getElementById("bienvenido");
    if (bienvenido) {
        bienvenido.textContent = `Bienvenido ${nombre}!`;
    }
}

function mostrarCategoria(producto: ProductoApi): string {
    return producto.categoria ? producto.categoria.nombre : "Sin categoria";
}

function productoParaCarrito(producto: ProductoApi): Product {
    return {
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria ? String(producto.categoria.id) : "",
        imagen: producto.imagen,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        disponible: producto.disponible
    };
}

function renderCategorias(categoriasParaMostrar: CategoriaApi[]) {
    const lista = document.getElementById("lista-categorias")
    if (!lista) return

    lista.innerHTML = "";

    if (categoriasParaMostrar.length === 0) {
        lista.innerHTML = "<p>No hay categorias cargadas</p>";
        return;
    }

    categoriasParaMostrar.forEach(categoria => {
        const item = document.createElement("li")
        item.textContent = categoria.nombre
        item.style.cursor = "pointer"

        item.addEventListener("click", () => {
            const filtrados = productos.filter(producto => producto.categoria?.id === categoria.id)
            mostrarProductos(categoria.nombre, filtrados)
        })

        lista.appendChild(item)
    })
}

function renderProducts(products: ProductoApi[], containerId: string) {
    const contenedor = document.getElementById(containerId)
    if (!contenedor) return

    contenedor.innerHTML = ""

    if (products.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos</p>"
        return
    }

    products.forEach(producto => {
        const articulo = document.createElement("article");

        if (!producto.disponible) {
            articulo.classList.add("noDisponible");
        }

        articulo.innerHTML = `
            <h3>${producto.nombre}</h3>
            <h4>${mostrarCategoria(producto)}</h4>
            <img src="${producto.imagen}" width="250" alt="${producto.nombre}">
            <p>${producto.descripcion}</p>
            <p id="precio">Precio: <strong>${"$" + producto.precio}</strong></p>
            <button class="btn-agregar">Agregar</button>
        `;

        articulo.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.closest(".btn-agregar")) return;
            window.location.href = `../productDetail/productDetail.html?id=${producto.id}`;
        });

        const button = articulo.querySelector(".btn-agregar");
            button?.addEventListener("click", () => {
                if (producto.disponible) {
                    const agregado = agregarAlCarrito(productoParaCarrito(producto));
                    if (agregado) {
                        renderCarrito();
                        mostrarToast(`Producto "${producto.nombre}" agregado al carrito`);
                    }
                } else {
                    mostrarToast(`Producto no disponible`);
                }
        });

        contenedor.appendChild(articulo);
    });
}

const tituloSeccion = document.getElementById("titulo-seccion")
function mostrarProductos(titulo: string, productos: ProductoApi[]) {
    productosActuales = [...productos];
    if (tituloSeccion) {
        tituloSeccion.textContent = titulo
    }
    renderProducts(productos, "contenedor-productos")
}

function obtenerFavoritos(): ProductoApi[] {
    return categorias
        .map(categoria => productos.find(producto => producto.categoria?.id === categoria.id))
        .filter(producto => producto !== undefined);
}

const favoritosBtn = document.getElementById("favoritos")
favoritosBtn?.addEventListener("click", () => {
    mostrarProductos("Productos favoritos", obtenerFavoritos())
})

const catalogoBtn = document.getElementById("catalogo")
catalogoBtn?.addEventListener("click", () => {
    mostrarProductos("Catalogo completo", productos)
})

const form = document.querySelector("form") as HTMLFormElement
const input = document.getElementById("buscarProducto") as HTMLInputElement

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const texto = input.value.toLowerCase().trim()
    if (!texto) return

    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto))

    mostrarProductos(`Busqueda: "${texto}"`, filtrados)
})

const selectOrden = document.getElementById("ordenar") as HTMLSelectElement;

selectOrden.addEventListener("change", () => {
    const productosOrdenados = [...productosActuales];

    switch (selectOrden.value) {
        case "nombre-asc":
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case "nombre-desc":
            productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case "precio-asc":
            productosOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case "precio-desc":
            productosOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        default:
            return;
    }

    mostrarProductos("Productos ordenados", productosOrdenados);
});

function renderCarrito() {
    const carrito = obtenerCarrito()

    const contenedor = document.getElementById("carrito-productos")
    const total = document.getElementById("carrito-total")

    if (!contenedor || !total) return

    contenedor.innerHTML = ""

    carrito.forEach(item => {
        const article = document.createElement("article")

        article.innerHTML = `
            <p id="nombre">${item.product.nombre}</p>
            <p id="controles">
                <button class="restar">-</button>
                x${item.cantidad}
                <button class="sumar">+</button>
            </p>
            <p id="precio"><strong>$${item.product.precio * item.cantidad}</strong></p>
        `

        article.querySelector(".sumar")?.addEventListener("click", () => {
            aumentarCantidad(item.product.id)
            renderCarrito()
        })

        article.querySelector(".restar")?.addEventListener("click", () => {
            disminuirCantidad(item.product.id)
            renderCarrito()
        })

        contenedor.appendChild(article)
    })

    total.textContent = `Total: $${calcularTotal()}`
}

renderCarrito()

const carritoIr = document.getElementById("carrito-ir")
carritoIr?.addEventListener("click", () => {
    window.location.href = "../cart/cart.html"
})

async function cargarDatosDelBackend() {
    const contenedorCategorias = document.getElementById("lista-categorias");
    const contenedorProductos = document.getElementById("contenedor-productos");

    if (contenedorCategorias) {
        contenedorCategorias.innerHTML = "<p>Cargando categorias...</p>";
    }

    if (contenedorProductos) {
        contenedorProductos.innerHTML = "<p>Cargando productos...</p>";
    }

    try {
        categorias = await obtenerCategorias();
        productos = await obtenerProductos();

        renderCategorias(categorias);
        const aleatorios = [...productos].sort(() => Math.random() - 0.5)
        mostrarProductos("Productos random", aleatorios)
    } catch (error) {
        console.error(error);

        const mensaje = `
            <p>No se pudo conectar con el backend.</p>
            <p>Revisa que Spring Boot este corriendo en http://localhost:8080</p>
        `;

        if (contenedorCategorias) {
            contenedorCategorias.innerHTML = mensaje;
        }

        if (contenedorProductos) {
            contenedorProductos.innerHTML = mensaje;
        }
    }
}

void cargarDatosDelBackend();

window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
