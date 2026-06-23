import "../pedidos/pedidos.css"
import "../../global.css"
import {
    obtenerPedidos,
    type PedidoApi
} from "../../utils/api.ts";
import {configurarLogout, esAdmin, obtenerSesion, protegerRuta} from "../../utils/auth.ts";

if (!esAdmin()) {
    document.getElementById("adminNav")?.remove();
}

protegerRuta();
configurarLogout();

function renderPedidos(pedidos: PedidoApi[]) {
    const contenedor = document.getElementById("container-pedidos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron pedidos</p>";
        return;
    }

    pedidos.forEach(pedido => {
        const articulo = document.createElement("article");

        articulo.innerHTML = `
                <div id="info">
                    <p>Id: ${pedido.id}</p>
                    <p>Fecha: ${pedido.fecha}</p>
                    <p>Metodo de pago: ${pedido.formaPago}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <p>Total pagado: <strong>${"$" + pedido.total}</strong></p>
                    <button class="btnMostrar">Mostrar pedido completo</button>
                </div>
                <div class="mostrarProductos oculto"></div>
        `;


            const btnMostrar = articulo.querySelector(".btnMostrar");
            btnMostrar?.addEventListener("click", async () => {
                const mostrarPedidos = articulo.querySelector(".mostrarProductos");
                if (!mostrarPedidos) return;

                mostrarPedidos.innerHTML = "";
                mostrarPedidos.classList.remove("oculto")

                mostrarPedidos.innerHTML = `
                    <p>Direccion: ${pedido.usuario.apellido}</p>
                    <p>Celular: ${pedido.usuario.celular}</p>
                    <p>Productos:</p>
                    <ul>
                        ${pedido.detalles.map(detalle => `
                            <li>
                                ${detalle.producto.nombre} x${detalle.cantidad} ($${detalle.subtotal})
                            </li>
                        `).join("")}
                    </ul>
                    <button class="btnOcultar">Ocultar</button>
                `;

                const btnOcultar = articulo.querySelector(".btnOcultar");
                btnOcultar?.addEventListener("click", async () => {
                    mostrarPedidos.innerHTML = "";
                    mostrarPedidos.classList.add("oculto")
                })
            })
        contenedor.appendChild(articulo);
    });
}

const usuarioActual = obtenerSesion();
const idUsuario = usuarioActual?.id;

async function cargarDatosDelBackend() {
    const contenedorPedidos = document.getElementById("container-pedidos");

    if (contenedorPedidos) {
        contenedorPedidos.innerHTML = "<p>Cargando pedidos...</p>";
    }

    try {
        const pedidos = await obtenerPedidos();

        const misPedidos = pedidos.filter(
            pedido => pedido.usuario.id === idUsuario
        );

        renderPedidos(misPedidos);
    } catch (error) {
        console.error(error);

        const mensaje = `
            <p>No se pudo conectar con el backend.</p>
            <p>Revisa que Spring Boot este corriendo en http://localhost:8080</p>
        `;

        if (contenedorPedidos) {
            contenedorPedidos.innerHTML = mensaje;
        }
    }
}

void cargarDatosDelBackend();

window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
})
