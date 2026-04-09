const express = require('express');
const router = express.Router();

// importar servicios de usuarios
const { getUsers, createUser, updateUser, deleteUser } = require('../services/user.service');
// importar modelo User y Examen para futuras rutas
const { User, Examen } = require('../models');

// importamos sequelize para trabajar con transacciones
const { sequelize } = require('../config/sequelize');

// Ruta principal
router.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi servidor</h1>');
});

// Ruta status
router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor funcionando correctamente'
  });
});

// ruta /usuarios GET para obtener todos los usuarios sin password
router.get('/usuarios', async (req, res) => {
  try {
    const users = await getUsers();
    res.json({
      status: 'success',
      message: 'Usuarios obtenidos',
      data: users,
    });
  } catch (error) {
    console.error('Error real en POST /usuarios:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al Obtener usuario',
      detail: error.message,
    });
  }
});

// ruta /usuarios post para crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // validación mínima
    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos obligatorios',
      });
    }

    const newUser = await createUser({ nombre, email, password });

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear usuario',
    });
  }
});

// ruta PUT /usuarios/:id para actualizar un usuario existente (sin cambiar password) por ID
router.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;

    // validamos que el id sea numérico antes de consultar la base
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'El ID debe ser un número válido',
      });
    }

    // validamos que lleguen los datos mínimos para actualizar
    if (!nombre || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Nombre y email son obligatorios para actualizar',
      });
    }

    const updated = await updateUser(id, { nombre, email });

    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado',
      });
    }

    res.json({
      status: 'success',
      message: 'Usuario actualizado',
      data: updated,
    });
  } catch (error) {
    console.error('Error real en PUT /usuarios/:id:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar',
      detail: error.message,
    });
  }
});

// ruta DELETE /usuarios/:id para eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // validamos el id antes de enviar la consulta
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'El ID debe ser un número válido',
      });
    }

    const deleted = await deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado',
      });
    }

    res.json({
      status: 'success',
      message: 'Usuario eliminado',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar',
    });
  }
});

// GET /usuarios-orm ruta que obtiene usuarios usando Sequelize
router.get('/usuarios-orm', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'fecha_creacion'],
      order: [['id', 'ASC']],
    });

    res.json({
      status: 'success',
      message: 'Usuarios obtenidos con ORM',
      data: users,
    });
  } catch (error) {
    console.error('Error real en GET /usuarios-orm:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuarios con ORM',
      detail: error.message,
    });
  }
});

// GET /usuarios-con-examenes obtiene usuarios con sus exámenes asociados
router.get('/usuarios-con-examenes', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'fecha_creacion'],
      include: [
        {
          model: Examen,
          as: 'examenes',
          attributes: ['id', 'tipo_examen', 'fecha_programada', 'estado'],
        },
      ],
      order: [['id', 'ASC']],
    });

    res.json({
      status: 'success',
      message: 'Usuarios con exámenes obtenidos correctamente',
      data: users,
    });
  } catch (error) {
    console.error('Error real en GET /usuarios-con-examenes:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuarios con exámenes',
      detail: error.message,
    });
  }
});

// POST /registro-paciente-examen crea un paciente y su examen inicial en una sola transacción
router.post('/registro-paciente-examen', async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      nombre,
      email,
      password,
      tipo_examen,
      fecha_programada,
      estado
    } = req.body;

    // validamos campos obligatorios de ambas entidades
    if (!nombre || !email || !password || !tipo_examen || !fecha_programada || !estado) {
      await transaction.rollback();

      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos obligatorios para registrar paciente y examen',
      });
    }

    // creamos primero el paciente dentro de la transacción
    const newUser = await User.create(
      {
        nombre,
        email,
        password,
        fecha_creacion: new Date(),
      },
      { transaction }
    );

    // luego creamos el examen asociado a ese paciente
    const newExamen = await Examen.create(
      {
        tipo_examen,
        fecha_programada,
        estado,
        usuario_id: newUser.id,
      },
      { transaction }
    );

    // si ambas operaciones salen bien, confirmamos la transacción
    await transaction.commit();

    res.status(201).json({
      status: 'success',
      message: 'Paciente y examen creados correctamente',
      data: {
        paciente: {
          id: newUser.id,
          nombre: newUser.nombre,
          email: newUser.email,
          fecha_creacion: newUser.fecha_creacion,
        },
        examen: newExamen,
      },
    });
  } catch (error) {
    // si algo falla, hacemos rollback para no dejar datos inconsistentes
    await transaction.rollback();

    console.error('Error real en POST /registro-paciente-examen:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error al registrar paciente y examen',
      detail: error.message,
    });
  }
});

module.exports = router;