// Importa dotenv y ejecuta su método config()
require('dotenv').config(); // Esto carga las variables del archivo .env dentro de process.env

// Importa Express para crear el servidor
const express = require('express');

// Crea una instancia (app) de la aplicación Express
const app = express();

//importar conexión a la base de datos
const { connectDB } = require('./src/config/db');

const { connectSequelize } = require('./src/config/sequelize');

// Conecta a la base de datos usando Sequelize
connectSequelize();

// Conecta a la base de datos
connectDB();


const logMiddleware = require('./src/middlewares/log.middleware'); // Importa el middleware de logs

app.use(logMiddleware); // este middleware se ejecutará en todas las rutas, registrando cada acceso

app.use(express.static('public')); // importa archivos estáticos desde la carpeta 'public'

app.use(express.json()); // para parsear JSON en el cuerpo de las solicitudes

// Obtiene el puerto desde las variables de entorno (.env)
const PORT = process.env.PORT || 3000; // Si no existe, usa 3000 como valor por defecto

// importar rutas
const mainRoutes = require('./src/routes/main.routes');

// usar rutas
app.use('/', mainRoutes);

// Inicia el servidor y lo pone a escuchar en el puerto definido
    // Recibe dos parámetros:
        // 1. El puerto
        // 2. Una función callback que se ejecuta cuando el servidor arranca correctamente
app.listen(PORT, () => {

  // Muestra un mensaje en consola indicando que el servidor está funcionando
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});