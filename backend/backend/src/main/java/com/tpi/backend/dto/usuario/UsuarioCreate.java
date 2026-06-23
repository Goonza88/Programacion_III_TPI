package com.tpi.backend.dto.usuario;

import com.tpi.backend.enums.Rol;
import com.tpi.backend.model.Usuario;

public record UsuarioCreate(
        String nombre,
        String apellido,
        String celular,
        String contrasena,
        String email,
        Rol rol
) {
    public Usuario toEntity() {
        return Usuario.builder()
                .nombre(this.nombre)
                .apellido(this.apellido)
                .email(this.email)
                .celular(this.celular)
                .contrasena(this.contrasena)
                .rol(this.rol)
                .build();
    }
}
