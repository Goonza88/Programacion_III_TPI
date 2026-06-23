package com.tpi.backend.dto.producto;

import com.tpi.backend.dto.categoria.CategoriaDto;
import com.tpi.backend.model.Producto;

public record ProductoDto(
        Long id,
        String nombre,
        Double precio,
        String descripcion,
        int stock,
        String imagen,
        boolean disponible,
        CategoriaDto categoria
) {
    public static ProductoDto toDto(Producto producto) {
        return new ProductoDto(
                producto.getId(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getDescripcion(),
                producto.getStock(),
                producto.getImagen(),
                producto.isDisponible(),
                producto.getCategoria() != null ?
                        CategoriaDto.toDto(producto.getCategoria()) : null
        );
    }
}
