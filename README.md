📄 README.md
# Backend Pacientes y Exámenes 🏥

Este proyecto consiste en la construcción de un backend utilizando Node.js y Express, enfocado en la gestión de pacientes y sus exámenes médicos. La aplicación permite realizar operaciones CRUD, trabajar con una base de datos PostgreSQL y además incorpora el uso de Sequelize como ORM, junto con relaciones entre entidades y manejo de transacciones.

La idea principal fue partir desde lo más básico (servidor con Express y archivos planos) e ir evolucionando el proyecto hasta conectar una base de datos real y aplicar conceptos más avanzados como relaciones y transacciones.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- dotenv
- nodemon

---

## 📁 Estructura del proyecto

El proyecto está organizado de forma modular:


src/
├── config/ # Configuración de conexión a base de datos (pg y Sequelize)
├── middlewares/ # Middleware (logs)
├── models/ # Modelos Sequelize y relaciones
├── routes/ # Definición de rutas
└── services/ # Lógica de acceso a datos (SQL manual)


Además incluye:

- `logs/` → registro de accesos
- `public/` → archivos estáticos
- `sql/` → scripts de base de datos

---

## 🧠 Funcionalidades principales

### CRUD de usuarios (pacientes)
- Crear usuario
- Obtener usuarios
- Actualizar usuario
- Eliminar usuario

### ORM con Sequelize
- Consulta de usuarios usando modelo
- Comparación entre SQL manual y ORM

### Relaciones
- Un usuario puede tener múltiples exámenes
- Implementado con `hasMany` y `belongsTo`

### Transacciones
- Registro de paciente + examen en una sola operación
- Uso de `commit` y `rollback` para asegurar consistencia

### Logs
- Registro de accesos a rutas en archivo plano (`log.txt`)

---

## 🗄️ Base de datos

Se utiliza PostgreSQL con dos tablas principales:

### usuarios
- id
- nombre
- email
- password
- fecha_creacion

### examenes
- id
- tipo_examen
- fecha_programada
- estado
- usuario_id (clave foránea)

Relación:

usuarios (1) ──── (N) examenes


---

## ⚙️ Configuración del entorno

1. Clonar el repositorio

2. Crear archivo `.env` a partir de `.env.example`

3. Completar las variables:


PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=proyecto_backend


---

## ▶️ Instalación y ejecución

Instalar dependencias:


npm install


Ejecutar en modo desarrollo:


npm run dev


---

## 🔌 Endpoints principales

### Usuarios (SQL manual)

- `GET /usuarios`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`

---

### ORM (Sequelize)

- `GET /usuarios-orm`

---

### Relaciones

- `GET /usuarios-con-examenes`

---

### Transacción

- `POST /registro-paciente-examen`

Ejemplo de body:

```json
{
  "nombre": "María González",
  "email": "maria@test.com",
  "password": "1234",
  "tipo_examen": "Ecografia abdominal",
  "fecha_programada": "2026-04-20",
  "estado": "pendiente"
}
📌 Comentario personal

Este proyecto fue desarrollado de forma progresiva, partiendo desde un servidor básico hasta llegar a una arquitectura más completa con base de datos, ORM, relaciones y transacciones.

Uno de los principales aprendizajes fue entender la diferencia entre trabajar con consultas SQL directamente y utilizar un ORM como Sequelize, además de cómo manejar la consistencia de datos mediante transacciones.

📎 Notas finales
El archivo .env no está incluido por seguridad
Se incluye .env.example para facilitar la configuración
La base de datos puede recrearse usando el script en /sql

---

# 🧠 Por qué este README está bien

- suena natural (no robótico)
- explica lo que hiciste realmente
- conecta con el proceso del curso
- menciona lo importante (ORM, relaciones, transacciones)
- está listo para GitHub o entrega

---

# 👉 Siguiente paso

Si quieres dejarlo aún más completo, puedo ayudarte a:

- agregar **capturas bien ubicadas**
- ajustar el README según la rúbrica exacta de tu curso
- o hacerlo más “defendible” para presentación oral