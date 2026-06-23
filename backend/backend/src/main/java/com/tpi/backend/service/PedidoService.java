package com.tpi.backend.service;

import com.tpi.backend.dto.pedido.PedidoCreate;
import com.tpi.backend.dto.pedido.PedidoDto ;
import com.tpi.backend.dto.pedido.PedidoEdit ;

import java.util.List;

public interface PedidoService {
    PedidoDto save(PedidoCreate pedidoCreate);
    public PedidoDto findById(Long id);
    public PedidoDto update(PedidoEdit pedidoEdit, Long idPedido);
    public List<PedidoDto> findAll();
    public void delete(Long id);
}
