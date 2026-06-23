package com.tpi.backend.dto.detallePedido;

import com.tpi.backend.model.DetallePedido;
import com.tpi.backend.model.Pedido;
import com.tpi.backend.model.Producto;

public record DetallePedidoCreate(
        int cantidad,
        Double subtotal,
        Long idProducto,
        Long idPedido
) {
    public DetallePedido toEntity(Producto producto, Pedido pedido) {
        return DetallePedido.builder()
                .cantidad(this.cantidad)
                .subtotal(this.cantidad * producto.getPrecio())
                .producto(producto)
                .pedido(pedido)
                .build();
    }
}
