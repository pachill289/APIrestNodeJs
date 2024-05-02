// Importar la configuración de la base de datos
require('dotenv').config();
// Conexión postgreSQL
const {Pool} = require('pg')


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: true
})

// Endpoints
const getUsers = async (req,res) => {
    const respuesta = await pool.query('SELECT * FROM users');
    console.log(respuesta.rows);
    res.send('users');
}

const editUser = (req,res) => {
    res.send(`Usuario nro: ${req}`);
}

module.exports = {
    getUsers,
    editUser
}