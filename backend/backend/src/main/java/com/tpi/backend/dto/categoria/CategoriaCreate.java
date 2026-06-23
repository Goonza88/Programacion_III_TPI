package com.tpi.backend.dto.categoria;

import com.tpi.backend.model.Categoria;

public record CategoriaCreate(
        String nombre,
        String descripcion
) {
    public Categoria toEntity() {
        return Categoria.builder()
                .nombre(this.nombre)
                .descripcion(this.descripcion)
                .build();
    }
}