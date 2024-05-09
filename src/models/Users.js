import {DataTypes} from 'sequelize';
import {sequelize} from '../db/database.js';
import {Schema, model} from 'mongoose';

// Mapeo Objeto relacional ORM sequelize
export const UserSchema = sequelize.define('users',{
    created_at: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING
    },
    email_verified_at: {
        type: DataTypes.DATE
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    remember_token: {
        type: DataTypes.STRING
    },
    updated_at: {
        type: DataTypes.DATE
    }
},
{
    timestamps: false, //esta opción debe estar en false ya que por defecto el ORM crea un updatedAt y createdAt en formato camel case
})

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
    name: {
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
  // Inserción automática de datos desde sequelize
  export const insercionAutomaticaMongo = () => {
    UserSchema.findAll().then(sequelizeUsers => {
      const mongoUsers = sequelizeUsers.map(sequelizeUsers => {
        return {
          created_at: sequelizeUsers.created_at,
          email: sequelizeUsers.email,
          email_verified_at: sequelizeUsers.email_verified_at,
          id: sequelizeUsers.id,
          name: sequelizeUsers.name,
          password: sequelizeUsers.password,
          remember_token: sequelizeUsers.remember_token,
          updated_at: sequelizeUsers.updated_at
        };
      });
      console.log(mongoUsers)
      
    })
   .catch(err => {
      console.error('Error al recuperar los datos de la BD relacional: ', err);
    });
  }
  

const mensajeSchema = new Schema({
    id_mensaje: {
        type: Number,
        required: true,
        
    },
    tipo: String,
    mensaje: String,
    destino: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

// Interactuar con la base de datos
export {userModel}
export const mensajeModel = model('Mensaje',mensajeSchema)

