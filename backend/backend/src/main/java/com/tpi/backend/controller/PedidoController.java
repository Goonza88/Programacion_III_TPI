package com.tpi.backend.controller;

import com.tpi.backend.dto.pedido.PedidoCreate;
import com.tpi.backend.dto.pedido.PedidoDto;
import com.tpi.backend.dto.pedido.PedidoEdit;
import com.tpi.backend.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoDto> save( @RequestBody PedidoCreate pedidoCreate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.save(pedidoCreate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<PedidoDto>> findAll() {
        return ResponseEntity.ok(pedidoService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PedidoDto> update(@RequestBody PedidoEdit pedidoEdit, @PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.update(pedidoEdit, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}