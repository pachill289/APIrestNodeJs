import {sequelize} from '../db/database.js';
import {UserSchema} from '../models/Users.js';
// Endpoints asíncronos
const getUsers = async (req,res) => {
    try {
      const users = await UserSchema.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export {getUsers}

