package com.tpi.backend.model;

import com.tpi.backend.enums.Rol;
import jakarta.persistence.*;
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
@Table(name = "usuarios")
@ToString(exclude = {"contrasena", "rol", "pedidos"})
@EqualsAndHashCode(callSuper = false, exclude = "pedidos")
public class Usuario extends Base {
    private String nombre;
    private String apellido;
    private String celular;
    private String contrasena;

    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Builder.Default
    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL
    )
    private Set<Pedido> pedidos = new HashSet<>();
}
