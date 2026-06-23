package com.tpi.backend.dto.usuario;

import com.tpi.backend.model.Usuario;
import com.tpi.backend.enums.Rol;

public record UsuarioDto(
        Long id,
        String nombre,
        String apellido,
        String celular,
        String email,
        Rol rol
) {
    public static UsuarioDto toDto(Usuario usuario) {
        return new UsuarioDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getCelular(),
                usuario.getEmail(),
                usuario.getRol()
        );
    }
}
