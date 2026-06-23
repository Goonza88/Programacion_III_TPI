package com.tpi.backend.service.impl;

import com.tpi.backend.dto.categoria.CategoriaCreate;
import com.tpi.backend.dto.categoria.CategoriaDto;
import com.tpi.backend.dto.categoria.CategoriaEdit;
import com.tpi.backend.model.Categoria;
import com.tpi.backend.model.Producto;
import com.tpi.backend.repository.CategoriaRepository ;
import com.tpi.backend.repository.ProductoRepository;
import com.tpi.backend.service.CategoriaService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaRepository, ProductoRepository productoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    public CategoriaDto save(CategoriaCreate categoriaCreate) {
        Categoria categoria = categoriaCreate.toEntity();
        categoria = categoriaRepository.save(categoria);
        return CategoriaDto.toDto(categoria);
    }

    @Override
    public CategoriaDto findById(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el categoria con el id: " + id));
        if (categoria.isEliminado()) {
            throw new NullPointerException("No existe el categoria con el id: " + id);
        }
        return CategoriaDto.toDto(categoria);
    }

    @Override
    public CategoriaDto update(CategoriaEdit categoriaEdit, Long idCategoria) {
        Categoria categoria = categoriaRepository.findById(idCategoria).orElseThrow(() -> new NullPointerException("No existe el categoria con el id: " + idCategoria));
        categoriaEdit.applyTo(categoria);
        categoria = categoriaRepository.save(categoria);
        return CategoriaDto.toDto(categoria);
    }

    @Override
    public List<CategoriaDto> findAll() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return categorias.stream()
                .filter(categoria -> !categoria.isEliminado())
                .map(CategoriaDto::toDto)
                .toList();
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el categoria con el id: " + id));
        categoria.setEliminado(true);

        for (Producto producto : categoria.getProductos()) {
            producto.setEliminado(true);
            productoRepository.save(producto);
        }

        categoriaRepository.save(categoria);
    }
}
