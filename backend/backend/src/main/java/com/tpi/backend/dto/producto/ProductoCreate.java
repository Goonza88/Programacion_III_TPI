package com.tpi.backend.dto.producto;

import com.tpi.backend.model.Categoria;
import com.tpi.backend.model.Producto;

public record ProductoCreate(
        String nombre,
        Double precio,
        String descripcion,
        int stock,
        String imagen,
        boolean disponible,
        Long idCategoria
) {
    public Producto toEntity(Categoria categoria) {
        return Producto.builder()
                .nombre(this.nombre)
                .precio(this.precio)
                .descripcion(this.descripcion)
                .stock(this.stock)
                .imagen(this.imagen)
                .disponible(this.disponible)
                .categoria(categoria)
                .build();
    }
}
