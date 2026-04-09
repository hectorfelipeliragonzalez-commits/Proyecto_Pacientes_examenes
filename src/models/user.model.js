const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

// definimos el modelo User en base a la tabla real "usuarios"
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',     // nombre real de tu tabla en PostgreSQL
    timestamps: false,         // desactiva createdAt y updatedAt automáticos
  }
);

module.exports = User;