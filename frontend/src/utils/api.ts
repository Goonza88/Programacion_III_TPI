const API_URL = "http://localhost:8080";

export interface CategoriaApi {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface ProductoApi {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    categoria: CategoriaApi | null;
}

export interface UsuarioApi {
    id: number;
    nombre: string;
    apellido: string;
    celular: string;
    email: string;
    rol: string;
}

export interface DetallePedidoApi {
    id: number;
    cantidad: number;
    subtotal: number;
    producto: ProductoApi;
}

export interface PedidoApi {
    id: number;
    fecha: string;
    total: number;
    estado: string;
    formaPago: string;
    usuario: UsuarioApi;
    detalles: DetallePedidoApi[];
}

export interface CategoriaCreate {
    nombre: string;
    descripcion: string;
}

export interface ProductoCreate {
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    idCategoria: number;
}

export interface DetallePedidoCreate {
    idProducto: number;
    cantidad: number;
}

export interface PedidoCreate {
    formaPago: string;
    idUsuario: number;
    detalles: DetallePedidoCreate[];
}

export interface AuthResponse {
    id: number;
    nombre: string;
    email: string;
    rol: "ADMIN" | "USUARIO";
}

export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UsuarioEdit {
    nombre?: string;
    apellido?: string;
    celular?: string;
    contrasena?: string;
    email?: string;
    rol?: string;
}

export interface PedidoEdit {
    fecha?: string;
    estado?: string;
    formaPago?: string;
    idUsuario?: number;
}

async function pedirDatos<T>(endpoint: string, opciones?: RequestInit): Promise<T> {
    const respuesta = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...opciones,
    });

    if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }

    if (respuesta.status === 204) {
        return undefined as T;
    }

    return respuesta.json();
}

export function obtenerCategorias(): Promise<CategoriaApi[]> {
    return pedirDatos<CategoriaApi[]>("/categorias");
}

export function crearCategoria(categoria: CategoriaCreate): Promise<CategoriaApi> {
    return pedirDatos<CategoriaApi>("/categorias", {
        method: "POST",
        body: JSON.stringify(categoria),
    });
}

export function editarCategoria(id: number, categoria: Partial<CategoriaCreate>): Promise<CategoriaApi> {
    return pedirDatos<CategoriaApi>(`/categorias/${id}`, {
        method: "PATCH",
        body: JSON.stringify(categoria),
    });
}

export function eliminarCategoria(id: number): Promise<void> {
    return pedirDatos<void>(`/categorias/${id}`, {
        method: "DELETE",
    });
}

export function obtenerProductos(): Promise<ProductoApi[]> {
    return pedirDatos<ProductoApi[]>("/productos");
}

export function obtenerProductoPorId(id: number): Promise<ProductoApi> {
    return pedirDatos<ProductoApi>(`/productos/${id}`);
}

export function crearProducto(producto: ProductoCreate): Promise<ProductoApi> {
    return pedirDatos<ProductoApi>("/productos", {
        method: "POST",
        body: JSON.stringify(producto),
    });
}

export function editarProducto(id: number, producto: Partial<ProductoCreate>): Promise<ProductoApi> {
    return pedirDatos<ProductoApi>(`/productos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(producto),
    });
}

export function eliminarProducto(id: number): Promise<void> {
    return pedirDatos<void>(`/productos/${id}`, {
        method: "DELETE",
    });
}

export function registrarUsuario(datos: RegisterRequest): Promise<AuthResponse> {
    return pedirDatos<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(datos),
    });
}

export function loginUsuario(datos: LoginRequest): Promise<AuthResponse> {
    return pedirDatos<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(datos),
    });
}

export function obtenerUsuarios(): Promise<UsuarioApi[]> {
    return pedirDatos<UsuarioApi[]>("/usuarios");
}

export function editarUsuario(id: number, usuario: UsuarioEdit): Promise<UsuarioApi> {
    return pedirDatos<UsuarioApi>(`/usuarios/${id}`, {
        method: "PATCH",
        body: JSON.stringify(usuario),
    });
}

export function crearPedido(pedido: PedidoCreate): Promise<PedidoApi> {
    return pedirDatos<PedidoApi>("/pedidos", {
        method: "POST",
        body: JSON.stringify(pedido),
    });
}

export function obtenerPedidos(): Promise<PedidoApi[]> {
    return pedirDatos<PedidoApi[]>("/pedidos");
}

export function obtenerPedidoPorId(id: number): Promise<PedidoApi> {
    return pedirDatos<PedidoApi>(`/pedidos/${id}`);
}

export function editarPedido(id: number, pedido: PedidoEdit): Promise<PedidoApi> {
    return pedirDatos<PedidoApi>(`/pedidos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(pedido),
    });
}