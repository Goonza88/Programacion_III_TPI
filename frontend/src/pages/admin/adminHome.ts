import "../admin/adminHome.css"
import "../../global.css"
import {
    obtenerCategorias,
    obtenerProductos,
    crearCategoria,
    type CategoriaApi,
    type ProductoApi, crearProducto, eliminarProducto, eliminarCategoria, editarProducto, editarCategoria,
    type PedidoApi, obtenerPedidos, editarPedido
} from "../../utils/api.ts";
import { configurarLogout, protegerAdmin } from "../../utils/auth.ts";

protegerAdmin();
configurarLogout();

const paneles = document.querySelectorAll(".panel");

let categorias: CategoriaApi[] = [];
let productos: ProductoApi[] = [];
let pedidos: PedidoApi[] = [];

function mostrarPanel(id: string): void {
    paneles.forEach(panel => panel.classList.remove("activo"));

    const panelSeleccionado = document.getElementById(id);

    if (panelSeleccionado) {
        panelSeleccionado.classList.add("activo");
    }
}

document.getElementById("irDash")?.addEventListener("click", () => {
    mostrarPanel("panelAdmin");
});

document.getElementById("irCate")?.addEventListener("click", () => {
    mostrarPanel("panelCate");
});

document.getElementById("irProd")?.addEventListener("click", () => {
    mostrarPanel("panelPro");
});

document.getElementById("irPedi")?.addEventListener("click", () => {
    mostrarPanel("panelPedi");
});

document.getElementById("btnCate")?.addEventListener("click", () => {
    mostrarPanel("panelCate");
});

document.getElementById("btnProd")?.addEventListener("click", () => {
    mostrarPanel("panelPro");
});

document.getElementById("btnDisp")?.addEventListener("click", () => {
    mostrarPanel("panelPro");
});

document.getElementById("btnPedi")?.addEventListener("click", () => {
    mostrarPanel("panelPedi");
});

document.getElementById("btnAgregarCategoria")?.addEventListener("click", () => {
    mostrarPanel("agregarCategoria");
})

document.getElementById("btnAgregarProducto")?.addEventListener("click", () => {
    mostrarPanel("agregarProducto");
})

function mostrarCantidad(productos: ProductoApi[], categorias: CategoriaApi[], pedidos: PedidoApi[]) {
    const cantProductos = productos.length;
    const cantCategorias = categorias.length;
    const cantPedidos = pedidos.length;
    const cantDisponibles = productos.filter(producto => producto.disponible).length;
    const ingresos = pedidos.reduce((total, pedido) => total + pedido.total, 0);
    const cantPendientes = pedidos.filter(pedido => pedido.estado == "PENDIENTE").length;
    const cantConfirmados = pedidos.filter(pedido => pedido.estado == "CONFIRMADO").length;
    const cantTerminados = pedidos.filter(pedido => pedido.estado == "TERMINADO").length;

    const contenedorProductos = document.getElementById("cantProductos");
    const contenedorDisponibles = document.getElementById("cantDisponibles");
    const contenedorCategorias = document.getElementById("cantCategorias");
    const contenedorPedidos = document.getElementById("cantPedidos");
    const contenedorIngresos = document.getElementById("ingresos");
    const contenedorPendientes = document.getElementById("pedPen");
    const contenedorConfirmados = document.getElementById("pedCon");
    const contenedorTerminados = document.getElementById("pedTer");

    if (contenedorDisponibles) {
        contenedorDisponibles.textContent = String(cantDisponibles);
    }

    if (contenedorProductos) {
        contenedorProductos.textContent = String(cantProductos);
    }

    if (contenedorCategorias) {
        contenedorCategorias.textContent = String(cantCategorias);
    }

    if (contenedorPedidos) {
        contenedorPedidos.textContent = String(cantPedidos);
    }

    if (contenedorIngresos) {
        contenedorIngresos.textContent = String("$" + ingresos);
    }

    if (contenedorPendientes) {
        contenedorPendientes.textContent = String(cantPendientes);
    }

    if (contenedorConfirmados) {
        contenedorConfirmados.textContent = String(cantConfirmados);
    }

    if (contenedorTerminados) {
        contenedorTerminados.textContent = String(cantTerminados);
    }

}

const formCategoria = document.getElementById("formCategoria") as HTMLFormElement;
formCategoria?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const nombre = String(formData.get("nombre") || "").trim();
    const descripcion = String(formData.get("descripcion") || "").trim();

    if (!nombre) {
        alert("El nombre no es valido");
        return;
    }
    if (!descripcion) {
        alert("La descripcion no es valida");
        return;
    }

    try {
        const nuevaCategoria = await crearCategoria({ nombre, descripcion });
        categorias.push(nuevaCategoria);
        renderCategorias(categorias);
        mostrarCantidad(productos, categorias, pedidos);
        formElement.reset();
        mostrarPanel("panelCate");
    } catch (error) {
        console.error(error);
        alert("No se pudo registrar la categoria.");
    }
});

const formProducto = document.getElementById("formProducto") as HTMLFormElement;
formProducto?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const nombre = String(formData.get("nombre") || "").trim();
    const precio = Number(String(formData.get("precio") || "").trim());
    const descripcion = String(formData.get("descripcion") || "").trim();
    const stock = Number(String(formData.get("stock") || "").trim());
    const imagen = String(formData.get("imagen") || "").trim();
    const idCategoria = Number(String(formData.get("idCategoria") || "").trim());
    const disponible = stock > 0;

    if (!nombre) {
        alert("El nombre no es valido");
        return;
    }
    if (Number.isNaN(precio) || precio < 0) {
        alert("El precio no es valido");
        return;
    }
    if (!descripcion) {
        alert("La descripcion no es valida");
        return;
    }
    if (Number.isNaN(stock) || stock < 0) {
        alert("El stock no es valido");
        return;
    }
    if (!imagen) {
        alert("La imagen no es valida");
        return;
    }
    if (Number.isNaN(idCategoria) || !categorias.some(categoria => categoria.id === idCategoria)) {
        alert("La categoria no es valida");
        return;
    }

    try {
        const nuevoProducto = await crearProducto({ nombre, precio, descripcion, stock, imagen, disponible, idCategoria });
        productos.push(nuevoProducto);
        renderProducts(productos);
        renderCategorias(categorias);
        mostrarCantidad(productos, categorias, pedidos);
        formElement.reset();
        mostrarPanel("panelPro");
    } catch (error) {
        console.error(error);
        alert("No se pudo registrar el producto.");
    }
});

function renderCategorias(categoriasParaMostrar: CategoriaApi[]) {
    const lista = document.getElementById("container-categorias");
    if (!lista) return;

    lista.innerHTML = "";

    if (categoriasParaMostrar.length === 0) {
        lista.innerHTML = "<p>No hay categorias cargadas</p>";
        return;
    }

    categoriasParaMostrar.forEach(categoria => {
        const articulo = document.createElement("article");

        const primerProducto = productos.find(
            producto => producto.categoria?.id === categoria.id
        );

        articulo.innerHTML = `
            <p>${categoria.id}</p>
            ${
            primerProducto
                ? `<img src="${primerProducto.imagen}" width="120" alt="${categoria.nombre}">`
                : `<div>Sin imagen</div>`
            }
            <h3>${categoria.nombre}</h3>
            <p>${categoria.descripcion}</p>
            <button class="btnEditar">Editar</button>
            <button class="btnEliminar">Eliminar</button>
        `;

        const btnEditar = articulo.querySelector(".btnEditar");
        btnEditar?.addEventListener("click", () => {
                articulo.innerHTML = `
                    <p>${categoria.id}</p>
                ${
                    primerProducto
                        ? `<img src="${primerProducto.imagen}" width="120" alt="${categoria.nombre}">`
                        : `<div>Sin imagen</div>`
                }
                <input id="nombre" type="text" value="${categoria.nombre}">
                <input id="descripcion" type="text" value="${categoria.descripcion}">
                <button class="btnGuardar">Guardar</button>
                <button class="btnCancelar">Cancelar</button>
            `;

            const btnGuardar = articulo.querySelector(".btnGuardar");
            btnGuardar?.addEventListener("click", async () => {
                const nombre = (articulo.querySelector("#nombre") as HTMLInputElement).value;
                const descripcion = (articulo.querySelector("#descripcion") as HTMLInputElement).value;

                try {
                    await editarCategoria(categoria.id, { nombre, descripcion })
                    categorias = await obtenerCategorias();
                    renderCategorias(categorias);
                } catch (error) {
                    console.error(error);
                    alert("No se pudo editar el producto");
                }
            })

            const btnCancelar = articulo.querySelector(".btnCancelar");
            btnCancelar?.addEventListener("click", () => {
                renderCategorias(categorias);
            })
        });

        const btnEliminar = articulo.querySelector(".btnEliminar");
        btnEliminar?.addEventListener("click", async () => {
            const confirmar = confirm(`¿Eliminar ${categoria.nombre}?`);
            if (!confirmar) return;

            try {
                await eliminarCategoria(categoria.id);
                categorias = categorias.filter(c => c.id !== categoria.id);
                productos = productos.filter(producto => producto.categoria?.id !== categoria.id);
                renderCategorias(categorias);
                renderProducts(productos);
                mostrarCantidad(productos, categorias, pedidos);
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar la categoria");
            }
        });

        lista.appendChild(articulo);
    });
}

function mostrarCategoria(producto: ProductoApi): string {
    return producto.categoria ? producto.categoria.nombre : "Sin categoria";
}

function renderProducts(products: ProductoApi[]) {
    const contenedor = document.getElementById("container-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (products.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos</p>";
        return;
    }

    products.forEach(producto => {
        const articulo = document.createElement("article");

        articulo.innerHTML = `
            <p>${producto.id}</p>
            <img src="${producto.imagen}" width="120" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <h4>${mostrarCategoria(producto)}</h4>
            <p>${producto.descripcion}</p>
            <p>${producto.stock}</p>
            <p>${producto.disponible? "Disponible" : "No Disponible"}</p>
            <p><strong>${"$" + producto.precio}</strong></p>
            <button class="btnEditar">Editar</button>
            <button class="btnEliminar">Eliminar</button>
        `;

        const btnEditar = articulo.querySelector(".btnEditar");
        btnEditar?.addEventListener("click", () => {
            articulo.innerHTML = `
                <p>${producto.id}</p>
                <img src="${producto.imagen}" width="120" alt="${producto.nombre}">
                <input id="nombre" type="text" value="${producto.nombre}">
                <input id="categoria" type="number" value="${producto.categoria?.id}">
                <input id="descripcion" type="text" value="${producto.descripcion}">
                <input id="stock" type="number" value="${producto.stock}">
                <p>${producto.disponible? "Disponible" : "No Disponible"}</p>
                <input id="precio" type="number" value="${producto.precio}">
                <button class="btnGuardar">Guardar</button>
                <button class="btnCancelar">Cancelar</button>
            `;

            const btnGuardar = articulo.querySelector(".btnGuardar");
            btnGuardar?.addEventListener("click", async () => {
                const nombre = (articulo.querySelector("#nombre") as HTMLInputElement).value;
                const descripcion = (articulo.querySelector("#descripcion") as HTMLInputElement).value;
                const idCategoria = Number((articulo.querySelector("#categoria") as HTMLInputElement).value);
                const stock = Number((articulo.querySelector("#stock") as HTMLInputElement).value);
                const precio = Number((articulo.querySelector("#precio") as HTMLInputElement).value);

                try {
                    await editarProducto(producto.id, { nombre, descripcion, idCategoria, stock, precio })
                    productos = await obtenerProductos();
                    renderProducts(productos);
                } catch (error) {
                    console.error(error);
                    alert("No se pudo editar el producto");
                }
            })

            const btnCancelar = articulo.querySelector(".btnCancelar");
            btnCancelar?.addEventListener("click", () => {
                renderProducts(productos);
            })
        });

        const btnEliminar = articulo.querySelector(".btnEliminar");
        btnEliminar?.addEventListener("click", async () => {
            const confirmar = confirm(`¿Eliminar ${producto.nombre}?`);
            if (!confirmar) return;

            try {
                await eliminarProducto(producto.id);
                productos = productos.filter(p => p.id !== producto.id);
                renderProducts(productos);
                mostrarCantidad(productos, categorias, pedidos);
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar el producto");
            }
        });
        contenedor.appendChild(articulo);
    });
}

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
                    <p>${pedido.id}</p>
                    <p>${pedido.usuario.id}</p>
                    <p>${pedido.fecha}</p>
                    <p>${pedido.formaPago}</p>
                    <p>${pedido.usuario.apellido}</p>
                    <p>${pedido.usuario.celular}</p>
                    <p>${pedido.estado}</p>
                    <p><strong>${"$" + pedido.total}</strong></p>
                    <button class="btnMostrar">Mostrar Productos</button>
                    <button class="btnEstado">Cambiar Estado</button>
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

        const btnEstado = articulo.querySelector(".btnEstado");
        btnEstado?.addEventListener("click", async () => {

            articulo.innerHTML = `
                <div id="info">
                    <p>${pedido.id}</p>
                    <p>${pedido.usuario.id}</p>
                    <p>${pedido.fecha}</p>
                    <p>${pedido.formaPago}</p>
                    <p>${pedido.usuario.apellido}</p>
                    <p>${pedido.usuario.celular}</p>
                    <select id="estado" name="estado">
                        <option value="">Nuevo Estado </option>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="CONFIRMADO">Confirmado</option>
                        <option value="CANCELADO">Cancelado</option>
                        <option value="TERMINADO">Terminado</option>
                    </select>
                    <p><strong>${"$" + pedido.total}</strong></p>
                    <button class="btnConfirmar">Confirmar cambio</button>
                    <button class="btnCancelar">Cancelar</button>
                </div>
                <div class="mostrarProductos oculto"></div>
             `;

            const btnConfirmar = articulo.querySelector(".btnConfirmar");
            btnConfirmar?.addEventListener("click", async () => {
                const estado = (articulo.querySelector("#estado") as HTMLInputElement).value;

                if (estado == "") {
                    renderPedidos(pedidos)
                } else {
                    try {
                        await editarPedido(pedido.id, { estado })
                        pedidos = await obtenerPedidos();
                        renderPedidos(pedidos);
                        mostrarCantidad(productos, categorias, pedidos);
                    } catch (error) {
                        console.error(error);
                        alert("No se pudo editar el pedido");
                    }
                }
            })

            const btnCancelar = articulo.querySelector(".btnCancelar");
            btnCancelar?.addEventListener("click", async () => {
                renderPedidos(pedidos);
            })

        })

        contenedor.appendChild(articulo);
    });
}

async function cargarDatosDelBackend() {
    const contenedorCategorias = document.getElementById("container-categorias");
    const contenedorProductos = document.getElementById("container-productos");
    const contenedorPedidos = document.getElementById("container-pedidos");

    if (contenedorPedidos) {
        contenedorPedidos.innerHTML = "<p>Cargando pedidos...</p>";
    }

    if (contenedorCategorias) {
        contenedorCategorias.innerHTML = "<p>Cargando categorias...</p>";
    }

    if (contenedorProductos) {
        contenedorProductos.innerHTML = "<p>Cargando productos...</p>";
    }

    try {
        categorias = await obtenerCategorias();
        productos = await obtenerProductos();
        pedidos = await obtenerPedidos();

        renderPedidos(pedidos);
        renderCategorias(categorias);
        renderProducts(productos);
        mostrarCantidad(productos, categorias, pedidos);
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
    document.body.style.opacity = "1";
});

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
