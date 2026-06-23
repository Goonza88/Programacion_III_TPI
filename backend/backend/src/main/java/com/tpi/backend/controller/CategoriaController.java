package com.tpi.backend.controller;

import com.tpi.backend.dto.categoria.CategoriaCreate;
import com.tpi.backend.dto.categoria.CategoriaDto;
import com.tpi.backend.dto.categoria.CategoriaEdit;
import com.tpi.backend.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaDto> save(@RequestBody CategoriaCreate categoriaCreate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.save(categoriaCreate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDto>> findAll() {
        return ResponseEntity.ok(categoriaService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CategoriaDto> update(@RequestBody CategoriaEdit categoriaEdit, @PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.update(categoriaEdit, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoriaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
