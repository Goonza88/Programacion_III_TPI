package com.tpi.backend.dto.detallePedido;

public record DetallePedidoCreateSimple(
        Long idProducto,
        int cantidad
) {}