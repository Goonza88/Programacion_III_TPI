import type { Rol } from "./rol";

export interface user {
    id: number;
    nombre: string;
    email: string;
    loggedIn: boolean;
    role: Rol;
}
