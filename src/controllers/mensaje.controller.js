
import mongoose from 'mongoose';
import {mensajeModel} from '../models/Mensaje.js';
// Controladores
export const insertarMensaje = async (req, res) => {
    const { tipo, mensaje, emisor, destino } = req.body;
  
    // Validaciones
    if (!emisor ||!destino) {
      return res.status(400).json({ error: 'Se deben proporcionar los campos necesarios' });
    }
  
    // Create a new Mensaje document
    const newMensaje = new mensajeModel({
      tipo,
      mensaje,
      emisor: mongoose.Types.ObjectId.createFromHexString(emisor),
      destino: mongoose.Types.ObjectId.createFromHexString(destino)
    });
  
    try {
      const mensaje = await newMensaje.save();
      res.json(mensaje);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear el mensaje' });
    }
  }
