package com.tpi.backend.service.impl;

import com.tpi.backend.dto.detallePedido.DetallePedidoCreate;
import com.tpi.backend.dto.detallePedido.DetallePedidoCreateSimple;
import com.tpi.backend.dto.pedido.PedidoCreate;
import com.tpi.backend.dto.pedido.PedidoDto;
import com.tpi.backend.dto.pedido.PedidoEdit;
import com.tpi.backend.enums.Estado;
import com.tpi.backend.model.Pedido;
import com.tpi.backend.model.Producto;
import com.tpi.backend.model.Usuario;
import com.tpi.backend.repository.PedidoRepository;
import com.tpi.backend.repository.ProductoRepository;
import com.tpi.backend.repository.UsuarioRepository;
import com.tpi.backend.service.PedidoService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PedidoServiceImpl implements PedidoService {
    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public PedidoServiceImpl(PedidoRepository pedidoRepository, UsuarioRepository usuarioRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    public PedidoDto save(PedidoCreate pedidoCreate) {

        Usuario usuario = usuarioRepository.findById(
                pedidoCreate.idUsuario()
        ).orElseThrow(() -> new NullPointerException("No existe el usuario con el id: " + pedidoCreate.idUsuario()));

        Pedido pedido = Pedido.builder()
                .fecha(LocalDate.now())
                .estado(Estado.PENDIENTE)
                .formaPago(pedidoCreate.formaPago())
                .usuario(usuario)
                .build();

        for (DetallePedidoCreateSimple detalle : pedidoCreate.detalles()) {

            Producto producto = productoRepository.findById(
                    detalle.idProducto()
            ).orElseThrow(() -> new NullPointerException("No existe el detalle con el id: " + detalle.idProducto()));

            pedido.addDetallePedido(
                    detalle.cantidad(),
                    producto
            );
        }

        pedido = pedidoRepository.save(pedido);

        return PedidoDto.toDto(pedido);
    }

    @Override
    public PedidoDto findById(Long id) {
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el pedido con el id: " + id));
        return PedidoDto.toDto(pedido);
    }

    @Override
    public PedidoDto update(PedidoEdit pedidoEdit, Long idPedido) {
        Pedido pedido = pedidoRepository.findById(idPedido).orElseThrow(() -> new NullPointerException("No existe el pedido con el id: " + idPedido));
        Usuario usuario = null;
        if (pedidoEdit.idUsuario() != null) {
            usuario = usuarioRepository.findById(pedidoEdit.idUsuario()).orElseThrow(() -> new NullPointerException("No existe el usuario con el id: " + pedidoEdit.idUsuario()));
        }
        pedidoEdit.applyTo(pedido, usuario);
        pedido = pedidoRepository.save(pedido);
        return PedidoDto.toDto(pedido);
    }

    @Override
    public List<PedidoDto> findAll() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        return pedidos.stream().map(PedidoDto::toDto).toList();
    }

    @Override
    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el pedido con el id: " + id));
        pedido.setEliminado(true);
        pedidoRepository.save(pedido);
    }
}
