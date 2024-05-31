import express from "express";
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.js';
import {pruebaConexion, sequelize, mongoDB} from './db/database.js';
import router from './routes/index.js';
import './models/Users.js';

const app = express();

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
    // await sequelize.sync({alter: true});
}
main();

export default app;
