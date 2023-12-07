# Arquitectura_Programacion_Sistemas_Internet_P4

# API REST con Express, Deno y MongoDB para la gestión de empleados y empresas

Este repositorio contiene una API REST desarrollada con Express, Deno y MongoDB para la gestión eficiente de empleados y empresas. La aplicación se enfoca en proporcionar operaciones CRUD (Create, Read, Update, Delete) para tres entidades principales: Empresas, Trabajadores y Tareas.

## Modelo de datos
La aplicación gestiona tres colecciones principales en la base de datos:

- **Empresa:** Representa una entidad empresarial.
- **Trabajador:** Define la información de cada empleado.
- **Tarea:** Contiene detalles sobre las tareas asignadas a los trabajadores, con estados como "TO DO", "In Progress", "In Test" y "Closed".

## Endpoints disponibles

### Obtener datos
- `GET /worker/:id`: Obtiene los detalles del trabajador correspondiente al ID.
- `GET /business/:id`: Obtiene los detalles de la empresa según el ID.
- `GET /task/:id`: Obtiene los detalles de la tarea según el ID.
- `GET /worker`: Obtiene todos los trabajadores.
- `GET /business`: Obtiene todas las empresas.
- `GET /task`: Obtiene todas las tareas.

### Crear datos
- `POST /worker`: Crea un nuevo trabajador.
- `POST /business`: Crea una nueva empresa.
- `POST /task`: Crea una nueva tarea.

### Eliminar datos
- `DELETE /worker/:id`: Elimina el trabajador correspondiente al ID.
- `DELETE /business/:id`: Elimina la empresa correspondiente al ID.
- `DELETE /task/:id`: Elimina la tarea correspondiente al ID.

### Actualizar datos
- `PUT /business/:id/fire/:workerId`: Despide al trabajador asociado al ID de la empresa.
- `PUT /business/:id/hire/:workerId`: Contrata al trabajador asociado al ID de la empresa.
- `PUT /task/:id?status=x`: Actualiza el estado de una tarea.

## Consideraciones importantes
- **Límites de datos:** Se establecen límites para el número máximo de trabajadores por empresa y tareas por trabajador.
- **Manejo de estado:** Se espera un manejo adecuado de los estados de las tareas y su eliminación al alcanzar el estado "Closed".
