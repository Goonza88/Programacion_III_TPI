export interface Product {
    id: number
    nombre: string
    categoria: string
    imagen: string
    descripcion: string
    precio: number
    stock: number
    disponible: boolean
}

export interface CartItem {
    product: Product
    cantidad: number
}

