package com.tpi.backend.dto.detallePedido;

import com.tpi.backend.dto.producto.ProductoDto;
import com.tpi.backend.model.DetallePedido;

public record DetallePedidoDto(
        Long id,
        int cantidad,
        Double subtotal,
        ProductoDto producto
) {
    public static DetallePedidoDto toDto(DetallePedido detallePedido) {
        return new DetallePedidoDto(
                detallePedido.getId(),
                detallePedido.getCantidad(),
                detallePedido.getSubtotal(),
                detallePedido.getProducto() != null ?
                        ProductoDto.toDto(detallePedido.getProducto()) : null
        );
    }
}
