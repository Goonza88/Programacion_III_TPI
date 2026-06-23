import type { Icategoria } from "../types/categoria"

interface ProductMock {
    id: number
    nombre: string
    categoria: string
    imagen: string
    descripcion: string
    precio: number
}

export const PRODUCTS: ProductMock[] = [
    {
        id: 1,
        nombre: "Hamburguesa Clasica",
        categoria: "1",
        imagen: "../../assets/hamburguesa.png",
        descripcion: "Hamburguesa de 150gr con bacon, pan artesanal, cheddar, cebolla y huevo frito",
        precio: 15500
    },
    {
        id: 2,
        nombre: "Pizza Mozzarella",
        categoria: "2",
        imagen: "../../assets/pizza.png",
        descripcion: "Pizza casera hecha en horno de barro, con salsa de tomate y abundante mozzarella",
        precio: 26500,
    },
    {
        id: 3,
        nombre: "Papas con Cheddar",
        categoria: "4",
        imagen: "../../assets/papas.png",
        descripcion: "Papas fritas a la francesa con cheddar y bañada con condimentos a eleccion",
        precio: 8000,
    },
    {
        id: 4,
        nombre: "Gaseosas",
        categoria: "3",
        imagen: "../../assets/bebidas.png",
        descripcion: "Bebida de 500ml a elección (Coca Cola, Sprite, Fanta, Etc.)",
        precio: 2500,
    },
    {
        id: 5,
        nombre: "Ensalada César",
        categoria: "5",
        imagen: "../../assets/ensalada.png",
        descripcion: "Ensalada con lechuga, pollo, crutones y aderezo César",
        precio: 12000
    },
    {
        id: 6,
        nombre: "Hamburguesa Doble",
        categoria: "1",
        imagen: "../../assets/doble.png",
        descripcion: "Hamburguesa doble(150gr), doble bacon, doble cheddar, cebolla y huevo frito",
        precio: 15500
    },
    {
        id: 7,
        nombre: "Pizza Napolitana",
        categoria: "2",
        imagen: "../../assets/napolitana.png",
        descripcion: "Pizza con salsa de tomate, mozzarella, tomate en rodajas y aceitunas",
        precio: 26500,
    },
    {
        id: 8,
        nombre: "Papas Belgas",
        categoria: "4",
        imagen: "../../assets/belgas.png",
        descripcion: "Cortes gruesos que se fríen dos veces para lograr una textura crujiente",
        precio: 8000,
    },
    {
        id: 9,
        nombre: "Cervezas",
        categoria: "3",
        imagen: "../../assets/cervezas.png",
        descripcion: "Latas de cerveza de 500ml a elección (Heineken, Corona, Budweiser, Etc.)",
        precio: 2500,
    },
    {
        id: 10,
        nombre: "Ensalada Griega",
        categoria: "5",
        imagen: "../../assets/griega.png",
        descripcion: "Ensalada de tomate, pepino, queso feta y aceitunas, sin lechuga",
        precio: 12000
    },
    {
        id: 11,
        nombre: "Hamburguesa Vegana",
        categoria: "1",
        imagen: "../../assets/vegana.png",
        descripcion: "Hamburguesa de 150gr de legumbres, con lechuga, tomate y cebolla",
        precio: 15500
    },
    {
        id: 12,
        nombre: "Pizza Pepperoni",
        categoria: "2",
        imagen: "../../assets/pepperoni.png",
        descripcion: "Pizza casera a la piedra con salsa de tomate, mozzarella y abundante pepperoni",
        precio: 26500,
    },
    {
        id: 13,
        nombre: "Papas Rusticas",
        categoria: "4",
        imagen: "../../assets/rusticas.png",
        descripcion: "Corte irregular o en media luna y con una textura más gruesa, condimento a eleccion",
        precio: 8000,
    },
    {
        id: 14,
        nombre: "Agua Mineral",
        categoria: "3",
        imagen: "../../assets/agua.png",
        descripcion: "Bebida de 500ml sin gas o con gas a elección",
        precio: 2500,
    },
    {
        id: 15,
        nombre: "Ensalada Rusa",
        categoria: "5",
        imagen: "../../assets/rusa.png",
        descripcion: "Ensalada con papa, zanahoria, arvejas y mayonesa",
        precio: 12000
    }
];

export function getCategories(): Icategoria[] {
    return [
        { id: "1", nombre: "Hamburguesas" },
        { id: "2", nombre: "Pizzas" },
        { id: "3", nombre: "Bebidas" },
        { id: "4", nombre: "Papas Fritas" },
        { id: "5", nombre: "Ensaladas" },
    ]
}
