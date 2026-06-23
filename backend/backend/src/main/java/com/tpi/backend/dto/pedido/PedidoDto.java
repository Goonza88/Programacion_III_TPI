package com.tpi.backend.dto.pedido;

import com.tpi.backend.dto.detallePedido.DetallePedidoDto;
import com.tpi.backend.dto.usuario.UsuarioDto;
import com.tpi.backend.model.Pedido;
import com.tpi.backend.enums.Estado;
import com.tpi.backend.enums.FormaPago;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

public record PedidoDto(
        Long id,
        LocalDate fecha,
        Double total,
        Estado estado,
        FormaPago formaPago,
        UsuarioDto usuario,
        Set<DetallePedidoDto> detalles
) {
    public static PedidoDto toDto(Pedido pedido) {
        return new PedidoDto(
                pedido.getId(),
                pedido.getFecha(),
                pedido.getTotal(),
                pedido.getEstado(),
                pedido.getFormaPago(),
                pedido.getUsuario() != null ?
                        UsuarioDto.toDto(pedido.getUsuario()) : null,
                pedido.getDetalles()
                        .stream()
                        .map(DetallePedidoDto::toDto)
                        .collect(Collectors.toSet())
        );
    }
}
