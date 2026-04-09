const fs = require('fs');  // importamos File System para manejar archivos
const path = require('path'); // Importamos Path para manejar rutas

// ruta al archivo log.txt
const logPath = path.join(__dirname, '../../logs/log.txt'); // Ajusta la ruta según tu estructura de carpetas

// función para guardar logs
const saveLog = (ruta) => {

    console.log("LOG EJECUTADO:", ruta); // 👈 DEBUG

  // obtener fecha y hora actual
  const now = new Date();

  const log = `${now.toLocaleString()} - Ruta: ${ruta}\n`;

  // escribir en el archivo sin borrar lo anterior
  fs.appendFile(logPath, log, (err) => {
    if (err) {
      console.error('Error al escribir log:', err);
    }
  });
};

module.exports = { saveLog };