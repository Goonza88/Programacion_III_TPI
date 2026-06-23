import "../productDetail/productDetail.css"
import "../../global.css"

import { agregarAlCarrito } from "../cart/cart.ts";
import { mostrarToast } from "../../utils/toast.ts";
import { obtenerProductoPorId, type ProductoApi } from "../../utils/api.ts";
import type { Product } from "../../types/product.ts";
import { configurarLogout, protegerRuta } from "../../utils/auth.ts";

protegerRuta();
configurarLogout();

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const contenedor = document.getElementById("producto");

if (!contenedor) throw new Error("Contenedor no encontrado");

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

function renderProducto(producto: ProductoApi) {
    const estaDisponible = producto.disponible && producto.stock > 0;

    contenedor!.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <section id="info">
            <h1>${producto.nombre}</h1>
            <p>${producto.descripcion}</p>
            <p> ${estaDisponible ? 
                `<strong>Producto disponible.</strong> (Stock: ${producto.stock})` 
                : `<strong>Producto no disponible</strong>`}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <label for="cantidad"><strong>Cantidad: </strong><input
                id="cantidad"
                type="number"
                class="${estaDisponible ? "" : "noDisponible"}"
                min="1"
                max="${producto.stock}"
                value="${estaDisponible ? 1 : 0}"
                ${estaDisponible ? "" : "disabled"}
            ></label>
            <button class="btn-agregar ${estaDisponible ? "" : "noDisponible"}" ${estaDisponible ? "" : "disabled"}>Agregar</button>
        </section>
    `;

    const button = contenedor!.querySelector(".btn-agregar");
    const inputCantidad = document.getElementById("cantidad") as HTMLInputElement | null;

    inputCantidad?.addEventListener("input", () => {
        const cantidad = Number(inputCantidad.value);

        if (cantidad > producto.stock) {
            inputCantidad.value = String(producto.stock);
            mostrarToast(`Solo hay ${producto.stock} unidades disponibles`);
        }

        if (cantidad < 1) {
            inputCantidad.value = "1";
        }
    });

    button?.addEventListener("click", () => {
        const cantidad = Number(inputCantidad?.value);
        const agregado = agregarAlCarrito(productoParaCarrito(producto), cantidad);

        if (agregado) {
            mostrarToast(`Producto "${producto.nombre}" agregado al carrito`);
        }
    });
}

async function cargarProducto() {
    if (!id) {
        contenedor!.innerHTML = "<p>Producto no encontrado</p>";
        return;
    }

    contenedor!.innerHTML = "<p>Cargando producto...</p>";

    try {
        const producto = await obtenerProductoPorId(id);
        renderProducto(producto);
    } catch (error) {
        console.error(error);
        contenedor!.innerHTML = `
            <p>Producto no encontrado</p>
            <p>Revisa que Spring Boot este corriendo en http://localhost:8080</p>
        `;
    }
}

void cargarProducto();

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
