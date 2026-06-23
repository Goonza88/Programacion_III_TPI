package com.tpi.backend.dto.pedido;

import com.tpi.backend.dto.detallePedido.DetallePedidoCreateSimple;
import com.tpi.backend.enums.FormaPago;
import java.util.List;

public record PedidoCreate(
        FormaPago formaPago,
        Long idUsuario,
        List<DetallePedidoCreateSimple> detalles
) {}