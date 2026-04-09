// importamos pool de pg para manejar conexiones a PostgreSQL
const { Pool } = require('pg');

// creamos un pool de conexiones a PostgreSQL usando las variables de entorno
// el pool nos permite reutilizar conexiones y manejar múltiples solicitudes de manera eficiente
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// función para conectar a la base de datos y verificar la conexión
const connectDB = async () => {
  try {
    // si todo está correcto, el pool se conectará a PostgreSQL y mostrará un mensaje de éxito
    await pool.connect();
    console.log('🟢 Conectado a PostgreSQL');

  } catch (error) {
    console.error('🔴 Error de conexión a PostgreSQL:', error.message);
  }
};

// exportamos el pool y la función de conexión para usarlos en otras partes de la aplicación
module.exports = {
  pool,
  connectDB,
};