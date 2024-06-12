import {DataTypes} from 'sequelize';
import {sequelize} from '../db/database.js';
import {Schema, model} from 'mongoose';

// Mapeo Objeto relacional ORM sequelize
export const UserSchema = sequelize.define('users', {
  created_at: {
    type: DataTypes.DATE,
    defaultValue: () => new Date().toLocaleDateString()
  },
  email: {
    type: DataTypes.STRING(255)
  },
  email_verified_at: {
    type: DataTypes.DATE
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(255)
  },
  name: {
    type: DataTypes.STRING(255)
  },
  lastname: {
    type: DataTypes.STRING(255)
  },
  password: {
    type: DataTypes.STRING(255)
  },
  rememberToken: {
    type: DataTypes.STRING(255)
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: () => new Date().toLocaleDateString()
  }
},{
  timestamps: false
});

// Mapeo Objeto relacional ORM mongoose
export const UserSchemaMongo = new Schema({
    created_at: {
      type: Date,
      default: Date.now
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    email_verified_at: {
      type: Date
    },
    id: {
      type: String,
      required: true,
      unique: true,
      auto: true
    },
    user_name: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lastname:
    {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    remember_token: {
      type: String
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: false
  });
  //creación del modelo
  const userModel = model('User',UserSchemaMongo)
  // Función para la inserción automática de datos desde PostgreSQL
export const insercionAutomaticaMongo = () => {
  // Obtener todos los usuarios actuales de PostgreSQL
  UserSchema.findAll().then(sequelizeUsers => {
    const postgreUsers = sequelizeUsers.map(sequelizeUser => ({
      created_at: sequelizeUser.created_at,
      email: sequelizeUser.email,
      email_verified_at: sequelizeUser.email_verified_at,
      id: sequelizeUser.id,
      user_name: sequelizeUser.username,
      name: sequelizeUser.name,
      lastname: sequelizeUser.lastname,
      password: sequelizeUser.password,
      remember_token: sequelizeUser.remember_token,
      updated_at: sequelizeUser.updated_at
    }));

    // Verificar que se recuperaron todos los usuarios de postgreSQL
    console.log(postgreUsers);

    // Insertar usuarios nuevos en MongoDB
    postgreUsers.forEach(async (postgreUser) => {
      try {
        const usuarioExistente = await userModel.findOne({ email: postgreUser.email });

        if (!usuarioExistente) {
          await userModel.create(postgreUser);
          console.log(`Usuario ${postgreUser.name} insertado`);
        } else {
          console.log(`Usuario ${postgreUser.name} ya existe`);
        }
      } catch (err) {
        console.error(`Error al procesar el usuario ${postgreUser.name}:`, err);
      }
    });

    // Cierra la conexión después de que todos los usuarios han sido procesados
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error al recuperar los datos de la BD relacional:', err);
  });
};


// Interactuar con la base de datos
export {userModel}

