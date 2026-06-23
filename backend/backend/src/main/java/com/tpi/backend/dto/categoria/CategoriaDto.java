package com.tpi.backend.dto.categoria;

import com.tpi.backend.model.Categoria;

public record CategoriaDto(
        Long id,
        String nombre,
        String descripcion
) {
    public static CategoriaDto toDto(Categoria categoria) {
        return new CategoriaDto(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion()
        );
    }
}