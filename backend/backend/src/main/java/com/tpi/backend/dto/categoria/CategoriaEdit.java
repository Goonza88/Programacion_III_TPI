package com.tpi.backend.dto.categoria;

import com.tpi.backend.model.Categoria;

public record CategoriaEdit(
        String nombre,
        String descripcion
) {
    public void applyTo(Categoria categoria) {
        if (this.nombre != null ) {
            categoria.setNombre(this.nombre);
        }
        if (this.descripcion != null ) {
            categoria.setDescripcion(this.descripcion);
        }
    }
}
