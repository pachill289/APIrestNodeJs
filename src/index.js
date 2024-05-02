require('dotenv').config();
const express = require('express')
const app = express();

// middlewares
// Entender el formato JSON
app.use(express.json());
// Entender datos de formularios sin tomar en cuenta datos de imágenes
app.use(express.urlencoded({extended: false}));

// definir rutas en index.js (servidor)
app.use(require('./routes/index'));


app.listen(process.env.PORT);
console.log(`Servidor escuchando en el puerto: ${process.env.PORT}`);
