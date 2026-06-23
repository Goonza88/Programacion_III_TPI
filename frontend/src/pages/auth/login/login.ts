import "../../../global.css"
import "../login/login.css"
import { navigate } from "../../../utils/navigate";
import { loginUsuario } from "../../../utils/api.ts";
import { guardarSesion } from "../../../utils/auth.ts";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    try {
        const usuario = await loginUsuario({
            email: inputEmail.value.trim(),
            password: inputPassword.value
        });

        guardarSesion(usuario);

        if (usuario.rol === "ADMIN") {
            navigate("/src/pages/admin/adminHome.html");
        } else {
            navigate("/src/pages/client/clientHome.html");
        }
    } catch (error) {
        console.error(error);
        alert("Usuario o contrasena incorrectos");
    }
});

const btn = document.querySelector<HTMLButtonElement>("#registro");
btn?.addEventListener("click", () => {
    navigate("/src/pages/auth/registro/registro.html");
})

window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});
