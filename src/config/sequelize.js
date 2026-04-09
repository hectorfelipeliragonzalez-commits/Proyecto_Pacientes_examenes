const { Sequelize } = require('sequelize');

// creamos una instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // evita que Sequelize llene la consola con SQL
  }
);

// función para comprobar la conexión con Sequelize
const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado a PostgreSQL con Sequelize');
  } catch (error) {
    console.error('🔴 Error de conexión con Sequelize:', error.message);
  }
};

module.exports = {
  sequelize,
  connectSequelize,
};