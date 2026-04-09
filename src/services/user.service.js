const { pool } = require('../config/db');

// obtiene todos los usuarios (sin password)
const getUsers = async () => {
    // la consulta SQL para obtener los usuarios sin el campo password
  const query = `
    SELECT id, nombre, email, fecha_creacion
    FROM usuarios
    ORDER BY id ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// crea un nuevo usuario
const createUser = async ({ nombre, email, password }) => {
  const query = `
    INSERT INTO usuarios (nombre, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, nombre, email, fecha_creacion;
  `;
  const values = [nombre, email, password];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// actualiza un usuario existente (sin cambiar password)
const updateUser = async (id, { nombre, email }) => {
  const query = `
    UPDATE usuarios
    SET nombre = $1, email = $2
    WHERE id = $3
    RETURNING id, nombre, email, fecha_creacion;
  `;
  const values = [nombre, email, id];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

// elimina un usuario por su ID
const deleteUser = async (id) => {
  const query = `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING id;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};


module.exports = { getUsers, createUser, updateUser, deleteUser };