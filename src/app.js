import express from "express";
import {pruebaConexion,sequelize,mongoDB} from './db/database.js';
import router from './routes/index.js';
import './models/Users.js';
const app = express();
// middlewares
// Entender el formato JSON
app.use(express.json());
// Entender datos de formularios sin tomar en cuenta datos de imágenes
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.send('Web API NodeJs ver 1.1')
})

// definir rutas en index.js (servidor)
app.use(router);
//pruebaConexion();
async function main ()
{
    //await sequelize.sync({alter: true})
}
main();
export default app;