import "../../../global.css"
import "../registro/registro.css"
import "../login/login.css"

import { navigate } from "../../../utils/navigate";
import { registrarUsuario } from "../../../utils/api.ts";
import { guardarSesion } from "../../../utils/auth.ts";

const form = document.querySelector<HTMLFormElement>("#registro");

function emailValido(email: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

form?.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const formElement = event.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const nombre = String(formData.get("nombre") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!nombre) {
        alert("El nombre es obligatorio");
        return;
    }

    if (!emailValido(email)) {
        alert("El email no es valido");
        return;
    }

    if (password.length < 6) {
        alert("La contrasena debe tener al menos 6 caracteres");
        return;
    }

    try {
        const usuario = await registrarUsuario({ nombre, email, password });
        guardarSesion(usuario);
        navigate("/src/pages/client/clientHome.html");
    } catch (error) {
        console.error(error);
        alert("No se pudo registrar el usuario");
    }
});

const btn = document.querySelector<HTMLButtonElement>("#login");
btn?.addEventListener("click", () => {
    navigate("/src/pages/auth/login/login.html");
});

window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
