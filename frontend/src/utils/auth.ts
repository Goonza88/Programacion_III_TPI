import type { AuthResponse } from "./api.ts";
import type { user } from "../types/user.ts";

export function guardarSesion(usuario: AuthResponse) {
    const sesionAnterior = obtenerSesion();

    if (!sesionAnterior || sesionAnterior.email !== usuario.email) {
        localStorage.removeItem("carrito");
    }

    const userData: user = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        loggedIn: true,
        role: usuario.rol === "ADMIN" ? "admin" : "client"
    };

    localStorage.setItem("userData", JSON.stringify(userData));
}

export function obtenerSesion(): user | null {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
}

export function esAdmin(): boolean {
    return obtenerSesion()?.role === "admin";
}

export function estaLogueado(): boolean {
    return obtenerSesion()?.loggedIn === true;
}

export function cerrarSesion() {
    localStorage.removeItem("userData");
    localStorage.removeItem("carrito");
}

export function protegerRuta() {
    if (!estaLogueado()) {
        window.location.replace("/src/pages/auth/login/login.html");
    }
}

export function protegerAdmin() {
    if (!estaLogueado()) {
        window.location.replace("/src/pages/auth/login/login.html");
        return;
    }

    if (!esAdmin()) {
        window.location.replace("/src/pages/client/clientHome.html");
    }
}

export function configurarLogout() {
    document.querySelectorAll("[data-logout]").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            cerrarSesion();
            window.location.replace("/src/pages/auth/login/login.html");
        });
    });
}
