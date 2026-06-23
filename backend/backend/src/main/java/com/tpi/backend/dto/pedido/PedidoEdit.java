package com.tpi.backend.dto.pedido;

import com.tpi.backend.model.Pedido;
import com.tpi.backend.model.Usuario;
import com.tpi.backend.enums.Estado;
import com.tpi.backend.enums.FormaPago;

import java.time.LocalDate;

public record PedidoEdit(
        LocalDate fecha,
        Estado estado,
        FormaPago formaPago,
        Long idUsuario
) {
    public void applyTo(Pedido pedido, Usuario usuario) {
        if (this.fecha != null) {
            pedido.setFecha(this.fecha);
        }
        if (this.estado != null) {
            pedido.setEstado(this.estado);
        }
        if (this.formaPago != null) {
            pedido.setFormaPago(this.formaPago);
        }
        if (usuario != null) {
            pedido.setUsuario(usuario);
        }
    }
}
