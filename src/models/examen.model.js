const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

// modelo que representa la tabla real "examenes"
const Examen = sequelize.define(
  'Examen',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_examen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_programada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'examenes',
    timestamps: false,
  }
);

module.exports = Examen;