import "../cart/cart.css"
import "../../global.css"
import type { CartItem, Product } from "../../types/product.ts"
import { mostrarToast } from "../../utils/toast.ts";
import {
    crearPedido,
    type DetallePedidoCreate,
    editarProducto, editarUsuario,
    obtenerProductoPorId,
    type PedidoCreate
} from "../../utils/api.ts";
import {configurarLogout, esAdmin, obtenerSesion, protegerRuta} from "../../utils/auth.ts";

protegerRuta();
configurarLogout();

if (!esAdmin()) {
    document.getElementById("adminNav")?.remove();
}

export function obtenerCarrito(): CartItem[] {
    const data = localStorage.getItem("carrito")
    return data ? JSON.parse(data) : []
}

export function guardarCarrito(carrito: CartItem[]) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

export function agregarAlCarrito(producto: Product, cantidad = 1): boolean {
    const carrito = obtenerCarrito()
    const existente = carrito.find(i => i.product.id === producto.id)
    const cantidadActual = existente ? existente.cantidad : 0
    const nuevaCantidad = cantidadActual + cantidad

    if (!producto.disponible || producto.stock <= 0) {
        mostrarToast("Producto no disponible")
        return false
    }

    if (cantidad <= 0) {
        mostrarToast("La cantidad debe ser mayor a 0")
        return false
    }

    if (nuevaCantidad > producto.stock) {
        mostrarToast(`Solo hay ${producto.stock} unidades disponibles`)
        return false
    }

    if (existente) {
        existente.cantidad = nuevaCantidad
        existente.product = producto
    } else {
        carrito.push({ product: producto, cantidad })
    }

    guardarCarrito(carrito)
    return true
}

export function aumentarCantidad(id: number): boolean {
    const carrito = obtenerCarrito()
    const item = carrito.find(i => i.product.id === id)

    if (!item) return false

    if (item.cantidad >= item.product.stock) {
        mostrarToast(`Solo hay ${item.product.stock} unidades disponibles`)
        return false
    }

    item.cantidad++
    guardarCarrito(carrito)
    return true
}

export function disminuirCantidad(id: number) {
    let carrito = obtenerCarrito()
    const item = carrito.find(i => i.product.id === id)

    if (!item) return

    item.cantidad--

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => i.product.id !== id)
    }

    guardarCarrito(carrito)
}

export function calcularTotal(): number {
    const carrito = obtenerCarrito()

    return carrito.reduce((acc, item) => {
        return acc + item.product.precio * item.cantidad
    }, 0)
}

async function actualizarStockBackend(carrito: CartItem[]): Promise<void> {
    for (const item of carrito) {
        const productoActual = await obtenerProductoPorId(item.product.id)

        if (item.cantidad > productoActual.stock) {
            throw new Error(`No hay stock suficiente de ${productoActual.nombre}`)
        }

        const nuevoStock = productoActual.stock - item.cantidad

        await editarProducto(productoActual.id, {
            stock: nuevoStock,
            disponible: nuevoStock > 0
        })
    }
}

function renderCarrito() {
    const carrito = obtenerCarrito()

    const contenedor = document.getElementById("carrito-productos")
    const total = document.getElementById("carrito-total")

    if (!contenedor || !total) return

    contenedor.innerHTML = ""

    if (carrito.length == 0) {
        contenedor.innerHTML = "No hay productos en el carrito."
    }

    carrito.forEach(item => {
        const article = document.createElement("article")

        article.innerHTML = `
            <div id="carritoInfo">
                <h3>${item.product.nombre}</h3>
                <p>${item.product.descripcion}</p>
                <p>Precio unitario: $${item.product.precio}</p>
                <p>Stock disponible: ${item.product.stock}</p>
                <div class="controles">
                    <button class="restar">-</button>
                    <span>x${item.cantidad}</span>
                    <button class="sumar">+</button>
                </div>
                <p><strong>Total: $${item.product.precio * item.cantidad}</strong></p>
            </div>
            <img src="${item.product.imagen}" alt="${item.product.nombre}">
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

    total.textContent = `$${calcularTotal()}`
}

function eventosCarrito() {
    const btnPagar = document.getElementById("pagar")
    btnPagar?.addEventListener("click", async () => {
        const carrito = obtenerCarrito()

        if (carrito.length === 0) {
            mostrarToast("El carrito esta vacio. Agrega productos antes de continuar")
            return
        }

        const panel = document.getElementById("panel");
        if (panel) {
            panel.style.display = "block"
        }

        btnPagar.style.display = "none"
    })

    const final = document.getElementById("final")
    const btnEliminar = document.getElementById("eliminar")
    btnEliminar?.addEventListener("click", () => {
        const carrito = obtenerCarrito()

        if (carrito.length === 0) {
            mostrarToast("El carrito esta vacio.")
            return
        }

        if (final) {
            final.style.display = "block"

            const si = document.getElementById("si")
            const no = document.getElementById("no")

            si?.addEventListener("click", () => {
                mostrarToast("Carrito eliminado")
                localStorage.removeItem("carrito")
                renderCarrito()
                final.style.display = "none"
            })

            no?.addEventListener("click", () => {
                final.style.display = "none"
            })
        }
    })
}

const formCarrito = document.getElementById("formCarrito") as HTMLFormElement;
formCarrito?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const carrito = obtenerCarrito()
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const telefono = String(formData.get("telefono") || "").trim();
    const direccion = String(formData.get("direccion") || "").trim();
    const formaPago = String(formData.get("metodo") || "").trim();

    if (!telefono) {
        alert("El telefono no es valido");
        return;
    }
    if (!direccion) {
        alert("La direccion no es valida");
        return;
    }
    if (!formaPago) {
        alert("El metodo no es valido");
        return;
    }

    const btnPagar = document.getElementById("pagar");
    const panel = document.getElementById("panel");
    if (!panel) { return }

    if (!btnPagar) { return }

    const detalles: DetallePedidoCreate[] = carrito.map(item => ({
        idProducto: item.product.id,
        cantidad: item.cantidad
    }));

    const usuarioActual = obtenerSesion();

    if (!usuarioActual) {
        alert("El usuario no esta logeado");
        return;
    }

    const idUsuario = usuarioActual.id;

    const pedido: PedidoCreate = {
        formaPago,
        idUsuario,
        detalles
    };

    try {
        await actualizarStockBackend(carrito)
        await crearPedido(pedido)
        await editarUsuario(idUsuario, {celular: telefono, apellido: direccion});
        mostrarToast(`Gracias por tu compra! El pedido sera enviado a ${direccion}.`);
        localStorage.removeItem("carrito")
        panel.style.display = "none"
        btnPagar.style.display = "block"
        renderCarrito()
    } catch (error) {
        console.error(error)
        mostrarToast(error instanceof Error ? error.message : "No se pudo confirmar la compra")
    }
});

renderCarrito()
eventosCarrito()

window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
})
