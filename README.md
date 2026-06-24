# Food Store

Aplicación web de gestión y venta de alimentos desarrollada como Trabajo Práctico Integrador para Programación III.
Es la culminación de todos los trabajos prácticos anteriores, en el cuál intenté reutilizar lo más posible los códigos para respetar lo ya hecho.

## Tecnologías Utilizadas

### Backend

- Java 17
- Spring Boot 4.1.0
- Spring Data JPA
- Hibernate
- H2 Database
- PostgreSQL
- Lombok
- Swagger / OpenAPI

### Frontend

- TypeScript
- Vite
- HTML5
- CSS3

## Instalación

### Backend

1. Abrir la carpeta `backend`
2. Ejecutar en bash:

```bash
./gradlew bootRun
```

O desde IntelliJ ejecutar la clase:

```text
BackendApplication
```

El backend quedará disponible en:

```text
http://localhost:8080
```

#### Swagger

```text
http://localhost:8080/swagger-ui/index.html
```

#### Consola H2

```text
http://localhost:8080/h2-console
```

### Frontend

1. Abrir la carpeta `frontend`
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar:

```bash
npm run dev
```

4. Abrir:

```text
http://localhost:5173
```

## Base de Datos

Durante el desarrollo se utiliza H2 en modo archivo.
El proyecto también incluye soporte para PostgreSQL.

### Configuración

```properties
spring.datasource.url=jdbc:h2:file:./data/backendtest
spring.datasource.username=sa
spring.datasource.password=
```

Al iniciar la aplicación se cargan automáticamente:

- Usuario Admin
- Categorías
- Productos
- Pedidos de ejemplo

## Funcionalidades

### Cliente

- Registro
- Inicio de sesión
- Visualización de productos
- Filtrado por:
- - Categorías
- - Favoritos de la gente
- - Ordenamientos
- - Catalogo completo
- - Buscador
- Carrito de compras
- Consulta de pedidos realizados

### Administrador

- Gestión de categorías (visualización, edición, eliminación y creación)
- Gestión de productos (visualización, edición, eliminación y creación)
- Gestión de pedidos (visualización, edición de estado)
- Visualización de resumen rápido

## Seguridad

- Contraseñas almacenadas utilizando SHA-256
- Validación de datos en backend
- Control de acceso por roles

## Repositorio

 [Repositorio GitHub](https://github.com/Goonza88/Programacion_III_TPI)

## Video

[Video demostrativo](https://www.youtube.com/watch?v=VjAnVoU31L8)

## Autor

**Gonzalo Barrios**
