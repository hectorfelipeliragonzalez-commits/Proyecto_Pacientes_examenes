/* Script para tabla usuarios */
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Script para tabla examenes */
CREATE TABLE examenes (
  id SERIAL PRIMARY KEY,
  tipo_examen TEXT NOT NULL,
  fecha_programada DATE NOT NULL,
  estado TEXT NOT NULL,
  usuario_id INTEGER NOT NULL,

  CONSTRAINT fk_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);
