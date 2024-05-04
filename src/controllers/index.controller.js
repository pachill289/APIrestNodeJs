
import pool from "../db/index.js";
// Endpoints asíncronos
const getUsers = async (req,res) => {
    const respuesta = await pool.query('SELECT * FROM users');
    console.log(respuesta.rows);
    res.send(`Usuarios: ${respuesta.rows}`);
}

const editUser = (req,res) => {
    res.send(`Usuario nro: ${req}`);
}

export {getUsers,editUser}

