
import mongoose from 'mongoose';
import {mensajeModel, messageModel} from '../models/Mensaje.js';
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


  const createMessage = async (req, res) => {
    try {
        const { from_id, to_id, body, attachment } = req.body;
        const message = await messageModel.create({
            from_id, to_id, body, attachment
        });
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  };

  const getMessages = async (req, res) => {
    try {
      const messages = await messageModel.find();
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const fetchMessages = async (req, res) => {
    try {
        const userId = req.params.userId;

        const messages = await messageModel.find({
            $or: [
                { from_id: parseInt(userId) }, { to_id: parseInt(userId) }
            ]
        });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
  };


  export const getSharedPhotos = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const messages = await messageModel.find({
        $or: [
          { from_id: parseInt(userId) }, 
          { to_id: parseInt(userId) }
        ]
      });
  
      const photos = messages
        .map(message => message.attachment)
        .filter(attachment => {
          try {
            const parsedAttachment = JSON.parse(attachment);
            return parsedAttachment && parsedAttachment.new_name;
          } catch (error) {
            return false;
          }
        })
        .map(attachment => JSON.parse(attachment).new_name);
  
      res.json(photos);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  export const getLastMessage = async (req, res) => {
    try {
        const userId = req.params.userId;

        const messages = await messageModel.find({
            $or: [
                { from_id: parseInt(userId) },
                { to_id: parseInt(userId) }
            ]
        }).sort({ created_at: -1 }).limit(1); // Ordenar por fecha de creación descendente y limitar a 1

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
  };

  export { createMessage, getMessages }