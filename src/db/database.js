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
const {MONGO_DB_HOST,MONGO_DB,MONGO_DB_USERNAME,MONGO_DB_PASSWORD} = process.env;
const MONGO_DB_URI = `mongodb+srv://${encodeURIComponent(MONGO_DB_USERNAME)}:${encodeURIComponent(MONGO_DB_PASSWORD)}@${MONGO_DB_HOST}/${MONGO_DB}`;

const mongoDB = async () => {
  const tiempoInicio = new Date();
  await mongoose.connect(MONGO_DB_URI);
  const tiempoFinalizacion = new Date();
  console.log(`La base de datos mongodb se conectó en ${tiempoFinalizacion - tiempoInicio} ms`);
};

//Prueba conexión postgreSQL
const pruebaConexion = async () => {
  const tiempoInicio = new Date();
  try {
    await sequelize.authenticate();
    const tiempoFinalizacion = new Date();
    console.log(`La conexión a la base de datos postgreSQL se estableció correctamente en ${tiempoFinalizacion - tiempoInicio} ms`);
  } catch (error) {
    const tiempoFinalizacion = new Date();
    console.error(`No se pudo establecer la conexión a la base de datos postgreSQL en ${tiempoFinalizacion - tiempoInicio} ms`, error);
  }
};

// ALGORITMO DE CRISTIAN
// Medir tiempo de respuesta
const sequelizeConnect = (() => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log(`Cache: sequelizeConnect(${n})`);
      return cache[n];
    } else {
      console.log(`Resultado: sequelizeConnect(${n})`);
      const startTime = new Date();
      sequelize.authenticate();
      const endTime = new Date();
      cache[n] = endTime - startTime;
      return endTime - startTime;
    }
  }
})();

const mongoConnect = (() => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log(`Cache: mongoConnect(${n})`);
      return cache[n];
    } else {
      console.log(`Resultado: mongoConnect(${n})`);
      const startTime = new Date();
      mongoose.connect(MONGO_DB_URI);
      const endTime = new Date();
      cache[n] = endTime - startTime;
      return endTime - startTime;
    }
  }
})();

// Medir la respuesta por cada conexión de servidor
console.log('~~~~~~~~~~~~~~ TAREA 1 ~~~~~~~~~~~~~~');
console.log(`PostgreSQL tiempo de conexión: ${sequelizeConnect(1)} ms`);
console.log(`MongoDB tiempo de conexión: ${mongoConnect(1)} ms`);

console.log('~~~~~~~~~~~~~~ TAREA 2 ~~~~~~~~~~~~~~');
console.log(`PostgreSQL tiempo de conexión: ${sequelizeConnect(2)} ms`);
console.log(`MongoDB tiempo de conexión: ${mongoConnect(2)} ms`);

// Calcular el promedio por cada respuesta
const numTasks = 2;
const sequelizeTotalTime = sequelizeConnect(1) + sequelizeConnect(2);
const mongoTotalTime = mongoConnect(1) + mongoConnect(2);
const AVG_TIME = sequelizeTotalTime+mongoTotalTime / numTasks;
console.log(AVG_TIME)
export {sequelize,mongoDB, pruebaConexion};