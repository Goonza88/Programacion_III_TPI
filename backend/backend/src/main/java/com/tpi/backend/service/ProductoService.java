package com.tpi.backend.service;

import com.tpi.backend.dto.producto.ProductoCreate;
import com.tpi.backend.dto.producto.ProductoDto;
import com.tpi.backend.dto.producto.ProductoEdit;

import java.util.List;

public interface ProductoService {
    public ProductoDto save(ProductoCreate productoCreate);
    public ProductoDto findById(Long id);
    public ProductoDto update(ProductoEdit productoEdit, Long idProducto);
    public List<ProductoDto> findAll();
    public void delete(Long id);
}
