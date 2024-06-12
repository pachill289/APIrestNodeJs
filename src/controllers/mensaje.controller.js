
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
      const messages = await messageModel.find().sort({ created_at: -1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const fetchMessages = async (req, res) => {
    try {
        const authUserId = parseInt(req.params.authUserId);
        const userId = parseInt(req.params.userId);

        const messages = await messageModel.find({
            $or: [
                { from_id: authUserId, to_id: userId },
                { from_id: userId, to_id: authUserId }
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
        const authUserId = req.params.authUserId;

        const messages = await messageModel.find({
            $or: [
                { from_id: authUserId, to_id: userId },
                { from_id: userId, to_id: authUserId }
            ]
        }).sort({ created_at: -1 }).limit(1);

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
  };

  export const countUnseenMessages = async (req, res) => {
    try {
        const { authUserId, contactUserId } = req.params;

        console.log(`Counting unseen messages from ${contactUserId} to ${authUserId}`);

        // Contar mensajes no vistos enviados por el contacto al usuario autenticado
        const unseenMessagesCount = await messageModel.countDocuments({
            from_id: contactUserId,
            to_id: authUserId,
            seen: false
        });

        console.log(`Unseen messages count: ${unseenMessagesCount}`);

        res.json({ unseenMessagesCount });
    } catch (error) {
        console.error('Error counting unseen messages:', error);
        res.status(500).json({ error: error.message });
    }
  };

  // En el controlador de mensajes
  const makeSeen = async (req, res) => {
    const authUserId = req.params.authUserId;
    const userId = req.params.userId;
    try {
        // Marcar todos los mensajes no vistos del usuario con el ID dado como vistos
        await messageModel.updateMany({
            from_id: parseInt(userId),
            to_id: parseInt(authUserId),
            seen: false
        }, {
            $set: {
                seen: true
            }
        });
  
        // Envía una respuesta
        res.status(200).json({ status: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al marcar los mensajes como vistos' });
    }
  };  

  export const deleteMessage = async (req, res) => {
    const messageId = req.params.messageId;

    try {
        const message = await messageModel.findByIdAndDelete(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Mensaje no encontrado' });
        }
        res.status(200).json({ message: 'Mensaje eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al eliminar el mensaje' });
    }
};

  export { createMessage, getMessages, makeSeen }