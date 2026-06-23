package com.tpi.backend.service;

import com.tpi.backend.dto.categoria.CategoriaCreate;
import com.tpi.backend.dto.categoria.CategoriaDto;
import com.tpi.backend.dto.categoria.CategoriaEdit;

import java.util.List;

public interface CategoriaService {
    public CategoriaDto save(CategoriaCreate categoriaCreate);
    public CategoriaDto findById(Long id);
    public CategoriaDto update(CategoriaEdit categoriaEdit, Long idCategoria);
    public List<CategoriaDto> findAll();
    public void deleteById(Long id);
}
