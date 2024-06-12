import express from "express";
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.js';
import cors from 'cors';
import {pruebaConexion, sequelize, mongoDB} from './db/database.js';
import {communityModel} from './models/Comunidad.js';
import mongoose from 'mongoose';

import router from './routes/index.js';
import './models/Users.js';

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
  
  // Middleware para habilitar CORS con las opciones definidas
  app.use(cors(corsOptions));

// Middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Web API NodeJs ver 1.1');
});

app.get('/health', (req, res) => {
    res.send('El servicio es saludable')
});

// Definir rutas
app.use(router);

// Conexión a la base de datos
async function main() {
    /* sincronizar cambios mongo
    const db = mongoose.connection;
    db.once('open', async () => {
    try {
        await communityModel.syncIndexes();
        console.log('Modelo sincronizado con éxito');
    } catch (error) {
        console.error('Error al sincronizar el modelo:', error);
    }
    });
    */
    //await sequelize.sync({alter: true});
}
main();

export default app;
