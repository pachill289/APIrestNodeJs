// Importar la configuración de la base de datos
import dotenv from "dotenv";
// Conexión postgreSQL
import pkg from 'pg';

dotenv.config()
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: true
})

export default pool;