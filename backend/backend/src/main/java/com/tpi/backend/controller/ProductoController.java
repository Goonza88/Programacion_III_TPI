package com.tpi.backend.controller;

import com.tpi.backend.dto.producto.ProductoCreate;
import com.tpi.backend.dto.producto.ProductoDto;
import com.tpi.backend.dto.producto.ProductoEdit;
import com.tpi.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoDto> save(@RequestBody ProductoCreate productoCreate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.save(productoCreate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductoDto>> findAll() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductoDto> update(@RequestBody ProductoEdit productoEdit, @PathVariable Long id) {
        return ResponseEntity.ok(productoService.update(productoEdit, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
