package com.tpi.backend.dto.usuario;

import com.tpi.backend.enums.Rol;
import com.tpi.backend.model.Usuario;

public record UsuarioEdit(
        String nombre,
        String apellido,
        String celular,
        String contrasena,
        String email,
        Rol rol
) {
    public void applyTo(Usuario usuario) {
        if (this.nombre != null) {
            usuario.setNombre(this.nombre);
        }
        if (this.apellido != null) {
            usuario.setApellido(this.apellido);
        }
        if (this.celular != null) {
            usuario.setCelular(this.celular);
        }
        if (this.contrasena != null) {
            usuario.setContrasena(this.contrasena);
        }
        if (this.email != null) {
            usuario.setEmail(this.email);
        }
        if (this.rol != null) {
            usuario.setRol(this.rol);
        }
    }
}
