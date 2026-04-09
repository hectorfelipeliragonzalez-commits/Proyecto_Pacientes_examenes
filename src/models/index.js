const User = require('./user.model');
const Examen = require('./examen.model');

// un usuario puede tener muchos exámenes
User.hasMany(Examen, {
  foreignKey: 'usuario_id',
  as: 'examenes',
});

// un examen pertenece a un usuario
Examen.belongsTo(User, {
  foreignKey: 'usuario_id',
  as: 'usuario',
});

module.exports = {
  User,
  Examen,
};