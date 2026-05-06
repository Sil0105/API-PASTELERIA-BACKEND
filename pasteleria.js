const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('pasteleria_db', 'root', 'silvana0105', {
  host: 'localhost',
  dialect: 'mysql'
});


const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: DataTypes.STRING,
  precio: DataTypes.FLOAT
});


Usuario.hasMany(Producto);
Producto.belongsTo(Usuario);


app.post('/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});



app.post('/productos', async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

app.get('/productos/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
});

app.put('/productos/:id', async (req, res) => {
  await Producto.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ mensaje: 'Actualizado ✨' });
});

app.delete('/productos/:id', async (req, res) => {
  await Producto.destroy({
    where: { id: req.params.id }
  });
  res.json({ mensaje: 'Eliminado ' });
});

sequelize.sync().then(() => {
  console.log(' Base de datos conectada');
  app.listen(3000, () => {
    console.log(' Servidor corriendo en http://localhost:3000');
  });
});