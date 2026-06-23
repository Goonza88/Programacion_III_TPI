package com.tpi.backend;

import com.tpi.backend.enums.Rol;
import com.tpi.backend.model.Categoria;
import com.tpi.backend.model.Producto;
import com.tpi.backend.model.Usuario;
import com.tpi.backend.repository.CategoriaRepository;
import com.tpi.backend.repository.PedidoRepository;
import com.tpi.backend.repository.ProductoRepository;
import com.tpi.backend.repository.UsuarioRepository;
import com.tpi.backend.enums.Estado;
import com.tpi.backend.enums.FormaPago;
import com.tpi.backend.model.Pedido;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(
			CategoriaRepository categoriaRepository,
			ProductoRepository productoRepository,
			UsuarioRepository usuarioRepository,
			PedidoRepository pedidoRepository
	) {
		return args -> {
			Usuario admin = Usuario.builder()
					.nombre("Admin")
					.apellido("Avenida Rivadavia 1324")
					.celular("2284102938")
					.email("admin@email.com")
					.contrasena("8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918")
					.rol(Rol.ADMIN)
					.build();

			usuarioRepository.save(admin);

			Categoria hamburguesas = Categoria.builder()
					.nombre("Hamburguesas")
					.descripcion("Hamburguesas artesanales con distintos ingredientes")
					.build();

			Categoria pizzas = Categoria.builder()
					.nombre("Pizzas")
					.descripcion("Pizzas caseras y a la piedra")
					.build();

			Categoria bebidas = Categoria.builder()
					.nombre("Bebidas")
					.descripcion("Bebidas frias para acompanar la comida")
					.build();

			Categoria papasFritas = Categoria.builder()
					.nombre("Papas Fritas")
					.descripcion("Papas fritas y guarniciones")
					.build();

			Categoria ensaladas = Categoria.builder()
					.nombre("Ensaladas")
					.descripcion("Ensaladas frescas y livianas")
					.build();

			categoriaRepository.saveAll(List.of(
					hamburguesas,
					pizzas,
					bebidas,
					papasFritas,
					ensaladas
			));

			Producto hamburguesaClasica = crearProducto(
					"Hamburguesa Clasica",
					14500.0,
					"Hamburguesa de 150gr con bacon, pan artesanal, cheddar, cebolla y huevo frito",
					12,
					"../../assets/hamburguesa.png",
					hamburguesas
			);

			Producto pizzaMozzarella = crearProducto(
					"Pizza Mozzarella",
					21800.0,
					"Pizza casera hecha en horno de barro, con salsa de tomate y abundante mozzarella",
					10,
					"../../assets/pizza.png",
					pizzas
			);

			Producto gaseosas = crearProducto(
					"Gaseosas",
					2600.0,
					"Bebida de 500ml a eleccion: Coca Cola, Sprite, Fanta, entre otras",
					30,
					"../../assets/bebidas.png",
					bebidas
			);

			Producto papasConCheddar = crearProducto(
					"Papas con Cheddar",
					8900.0,
					"Papas fritas a la francesa con cheddar y condimentos a eleccion",
					16,
					"../../assets/papas.png",
					papasFritas
			);

			Producto hamburguesaDoble = crearProducto(
					"Hamburguesa Doble",
					18900.0,
					"Hamburguesa doble de 150gr, doble bacon, doble cheddar, cebolla y huevo frito",
					8,
					"../../assets/doble.png",
					hamburguesas
			);

			Producto hamburguesaVegana = crearProducto(
					"Hamburguesa Vegana",
					17200.0,
					"Hamburguesa de 150gr de legumbres, con lechuga, tomate y cebolla",
					0,
					"../../assets/vegana.png",
					hamburguesas
			);

			Producto pizzaNapolitana = crearProducto(
					"Pizza Napolitana",
					24600.0,
					"Pizza con salsa de tomate, mozzarella, tomate en rodajas y aceitunas",
					7,
					"../../assets/napolitana.png",
					pizzas
			);

			Producto pizzaPepperoni = crearProducto(
					"Pizza Pepperoni",
					27900.0,
					"Pizza casera a la piedra con salsa de tomate, mozzarella y abundante pepperoni",
					0,
					"../../assets/pepperoni.png",
					pizzas
			);

			Producto cervezas = crearProducto(
					"Cervezas",
					4200.0,
					"Latas de cerveza de 500ml a eleccion: Heineken, Corona, Budweiser, entre otras",
					20,
					"../../assets/cervezas.png",
					bebidas
			);

			Producto aguaMineral = crearProducto(
					"Agua Mineral",
					1800.0,
					"Bebida de 500ml sin gas o con gas a eleccion",
					0,
					"../../assets/agua.png",
					bebidas
			);

			Producto papasBelgas = crearProducto(
					"Papas Belgas",
					7600.0,
					"Cortes gruesos que se frien dos veces para lograr una textura crujiente",
					11,
					"../../assets/belgas.png",
					papasFritas
			);

			Producto papasRusticas = crearProducto(
					"Papas Rusticas",
					8200.0,
					"Corte irregular o en media luna, con textura mas gruesa y condimento a eleccion",
					0,
					"../../assets/rusticas.png",
					papasFritas
			);

			Producto ensaladaCesar = crearProducto(
					"Ensalada Cesar",
					11800.0,
					"Ensalada con lechuga, pollo, crutones y aderezo Cesar",
					9,
					"../../assets/ensalada.png",
					ensaladas
			);

			Producto ensaladaGriega = crearProducto(
					"Ensalada Griega",
					13200.0,
					"Ensalada de tomate, pepino, queso feta y aceitunas, sin lechuga",
					6,
					"../../assets/griega.png",
					ensaladas
			);

			Producto ensaladaRusa = crearProducto(
					"Ensalada Rusa",
					9700.0,
					"Ensalada con papa, zanahoria, arvejas y mayonesa",
					0,
					"../../assets/rusa.png",
					ensaladas
			);

			productoRepository.saveAll(List.of(
					hamburguesaClasica,
					hamburguesaDoble,
					hamburguesaVegana,
					pizzaMozzarella,
					pizzaNapolitana,
					pizzaPepperoni,
					gaseosas,
					cervezas,
					aguaMineral,
					papasConCheddar,
					papasBelgas,
					papasRusticas,
					ensaladaCesar,
					ensaladaGriega,
					ensaladaRusa
			));

			Pedido pedido1 = Pedido.builder()
					.fecha(LocalDate.now().minusDays(4))
					.estado(Estado.PENDIENTE)
					.formaPago(FormaPago.EFECTIVO)
					.usuario(admin)
					.build();

			pedido1.addDetallePedido(1, hamburguesaClasica);
			pedido1.addDetallePedido(2, gaseosas);

			Pedido pedido2 = Pedido.builder()
					.fecha(LocalDate.now().minusDays(3))
					.estado(Estado.CONFIRMADO)
					.formaPago(FormaPago.TARJETA)
					.usuario(admin)
					.build();

			pedido2.addDetallePedido(1, pizzaMozzarella);
			pedido2.addDetallePedido(1, cervezas);

			Pedido pedido3 = Pedido.builder()
					.fecha(LocalDate.now().minusDays(2))
					.estado(Estado.CANCELADO)
					.formaPago(FormaPago.TRANSFERENCIA)
					.usuario(admin)
					.build();

			pedido3.addDetallePedido(2, hamburguesaDoble);
			pedido3.addDetallePedido(1, papasConCheddar);

			Pedido pedido4 = Pedido.builder()
					.fecha(LocalDate.now().minusDays(1))
					.estado(Estado.TERMINADO)
					.formaPago(FormaPago.EFECTIVO)
					.usuario(admin)
					.build();

			pedido4.addDetallePedido(1, pizzaNapolitana);
			pedido4.addDetallePedido(2, aguaMineral);

			pedidoRepository.saveAll(List.of(
					pedido1,
					pedido2,
					pedido3,
					pedido4
			));
		};
	}

	private Producto crearProducto(
			String nombre,
			Double precio,
			String descripcion,
			int stock,
			String imagen,
			Categoria categoria
	) {
		return Producto.builder()
				.nombre(nombre)
				.precio(precio)
				.descripcion(descripcion)
				.stock(stock)
				.imagen(imagen)
				.disponible(stock > 0)
				.categoria(categoria)
				.build();
	}
}
