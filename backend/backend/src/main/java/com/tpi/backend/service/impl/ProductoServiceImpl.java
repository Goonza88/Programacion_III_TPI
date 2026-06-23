package com.tpi.backend.service.impl;

import com.tpi.backend.dto.producto.ProductoCreate;
import com.tpi.backend.dto.producto.ProductoDto;
import com.tpi.backend.dto.producto.ProductoEdit;
import com.tpi.backend.model.Categoria;
import com.tpi.backend.model.Producto;
import com.tpi.backend.repository.CategoriaRepository;
import com.tpi.backend.repository.ProductoRepository;
import com.tpi.backend.service.ProductoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public ProductoDto save(ProductoCreate productoCreate) {
        Categoria categoria = categoriaRepository.findById(productoCreate.idCategoria()).orElseThrow(() -> new NullPointerException("No existe el categoria con el id: " + productoCreate.idCategoria()));
        Producto producto = productoCreate.toEntity(categoria);
        producto.setDisponible(producto.getStock() > 0);
        producto = productoRepository.save(producto);
        return ProductoDto.toDto(producto);
    }

    @Override
    public ProductoDto findById(Long id) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el producto: " + id));
        return ProductoDto.toDto(producto);
    }

    @Override
    public ProductoDto update(ProductoEdit productoEdit, Long idProducto) {
        Producto producto = productoRepository.findById(idProducto).orElseThrow(() -> new NullPointerException("No existe el producto: " + idProducto));
        Categoria categoria = null;
        if (productoEdit.idCategoria() != null) {
            categoria = categoriaRepository.findById(productoEdit.idCategoria()).orElseThrow(() -> new NullPointerException("No existe el categoria con el id: " + productoEdit.idCategoria()));
        }
        productoEdit.applyTo(producto, categoria);
        producto.setDisponible(producto.getStock() > 0);
        producto = productoRepository.save(producto);
        return ProductoDto.toDto(producto);
    }

    @Override
    public List<ProductoDto> findAll() {
        List<Producto> productos = productoRepository.findAll();
        return productos.stream()
                .filter(producto -> !producto.isEliminado())
                .map(ProductoDto::toDto)
                .toList();
    }

    @Override
    public void delete(Long id) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el producto: " + id));
        producto.setEliminado(true);
        productoRepository.save(producto);
    }
}
