const { saveLog } = require('../services/log.service');

// middleware
const logMiddleware = (req, res, next) => {

  // guardar la ruta accedida
  saveLog(req.originalUrl);

  // continuar con la ejecución
  next();
};

module.exports = logMiddleware;