import {sequelize} from '../db/database.js';
import {UserSchema,insercionAutomaticaMongo,userModel} from '../models/Users.js';
// Endpoints asíncronos
const getUsers = async (req,res) => {
    try {
      const usuariosMongo = insercionAutomaticaMongo();
      const users = await UserSchema.findAll();
      userModel.find()
      .then(us => {
        console.log(us);
      })
      .catch(err => {
        console.error(err);
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export {getUsers}

