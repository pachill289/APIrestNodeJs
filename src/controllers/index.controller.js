import {sequelize} from '../db/database.js';
import {UserSchema,insercionAutomaticaMongo,userModel} from '../models/Users.js';
// Endpoints asíncronos
const getUsers = async (req,res) => {
    try {
      insercionAutomaticaMongo();
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

const getUsersMongo = async (req, res) => {
  try {
    const users = await userModel.find().sort({ created_at: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await UserSchema.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await UserSchema.findByPk(id);
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

export {getUsers,getUsersMongo,createUser, getUserById}

