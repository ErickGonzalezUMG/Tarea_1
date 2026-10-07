require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

conectarDB();

app.use('/api/auth', authRoutes);
app.use('/api/recursos', productoRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});