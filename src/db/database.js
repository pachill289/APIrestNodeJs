// Importar la configuración de la base de datos
import dotenv from 'dotenv';
// ORM sequelize
import {Sequelize} from 'sequelize';
// ORM mongodb
import mongoose from 'mongoose';
// Driver postgreSQL, uso de bd sin ORM
import pkg from 'pg';

// Configuración de la conenexión a la base de datos postgreSQL con sequelize
dotenv.config()
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
            }
        }
    }
)
// Configuración de la conexión a la base de datos mongoDB y prueba de conexión
const {MONGO_DB_HOST,MONGO_DB} = process.env;
const MONGO_DB_URI = `mongodb://${MONGO_DB_HOST}/${MONGO_DB}`;

const mongoDB = async () => mongoose.connect(MONGO_DB_URI);
mongoDB()
.then(db => console.log('La base de datos mongodb esta conectada'))
.catch(err => console.log(`Error en la conexión a la base de datos mongodb: ${err}`));

//Prueba conexión postgreSQL
const pruebaConexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('La conexión a la base de datos postgreSQL se ha establecido correctamente.');
      } catch (error) {
        console.error('No se pudo establecer la conexión a la base de datos postgreSQL', error);
      }
}

export {sequelize,mongoDB, pruebaConexion};