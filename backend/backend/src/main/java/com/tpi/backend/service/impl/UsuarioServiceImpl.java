package com.tpi.backend.service.impl;

import com.tpi.backend.dto.usuario.UsuarioCreate;
import com.tpi.backend.dto.usuario.UsuarioDto;
import com.tpi.backend.dto.usuario.UsuarioEdit;
import com.tpi.backend.model.Usuario;
import com.tpi.backend.repository.UsuarioRepository;
import com.tpi.backend.service.UsuarioService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UsuarioDto save(UsuarioCreate usuarioCreate) {
        Usuario usuario = usuarioCreate.toEntity();
        usuario = usuarioRepository.save(usuario);
        return UsuarioDto.toDto(usuario);
    }

    @Override
    public UsuarioDto findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el usuario con el id: " + id));
        return UsuarioDto.toDto(usuario);
    }

    @Override
    public UsuarioDto findByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("No existe el usuario con mail: " + email));
        return UsuarioDto.toDto(usuario);
    }

    @Override
    public UsuarioDto update(UsuarioEdit usuarioEdit, Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(() -> new NullPointerException("No existe el usuario con el id: " + idUsuario));
        usuarioEdit.applyTo(usuario);
        usuario = usuarioRepository.save(usuario);
        return UsuarioDto.toDto(usuario);
    }

    @Override
    public List<UsuarioDto> findAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(UsuarioDto::toDto).toList();
    }

    @Override
    public void delete(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new NullPointerException("No existe el usuario con el id: " + id));
        usuario.setEliminado(true);
        usuarioRepository.save(usuario);
    }
}
