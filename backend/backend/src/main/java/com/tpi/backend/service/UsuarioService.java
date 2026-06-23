package com.tpi.backend.service;

import com.tpi.backend.dto.usuario.UsuarioCreate;
import com.tpi.backend.dto.usuario.UsuarioDto;
import com.tpi.backend.dto.usuario.UsuarioEdit;

import java.util.List;

public interface UsuarioService {
    public UsuarioDto save(UsuarioCreate usuarioCreate);
    public UsuarioDto findById(Long id);
    public UsuarioDto findByEmail(String email);
    public UsuarioDto update(UsuarioEdit usuarioEdit, Long idUsuario);
    public List<UsuarioDto> findAll();
    public void delete(Long id);
}
