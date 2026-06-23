package com.tpi.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categorias")
@ToString(exclude = "productos")
@EqualsAndHashCode(callSuper = false)
public class Categoria extends Base {
    private String nombre;
    private String descripcion;
    @Builder.Default
    @OneToMany(mappedBy = "categoria")
    private Set<Producto> productos = new HashSet<>();
}