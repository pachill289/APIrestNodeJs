import { UserSchema } from '../models/Users.js';
import { messageModel } from '../models/Mensaje.js';

export const getContacts = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Obtener todos los mensajes enviados o recibidos por el usuario
    const messages = await messageModel.find({
      $or: [
        { from_id: userId },
        { to_id: userId }
      ]
    });

    // Extraer los IDs de los contactos
    const contactIds = Array.from(new Set(messages.map(msg => {
      return msg.from_id == userId ? msg.to_id : msg.from_id;
    })));

    // Obtener los detalles de los contactos desde PostgreSQL
    const contacts = await UserSchema.findAll({
      where: {
        id: contactIds
      }
    });

    // Formatear los resultados
    const data = contacts.map(contact => {
      const { created_at, email, email_verified_at, id, name, password, rememberToken, updated_at, avatar } = contact;
      return {
        created_at,
        email,
        email_verified_at,
        id,
        name,
        password,
        rememberToken,
        updated_at,
        max_created_at: messages
          .filter(msg => msg.from_id == contact.id || msg.to_id == contact.id)
          .map(msg => new Date(msg.created_at))
          .sort((a, b) => b - a)[0].toISOString(),
        avatar
      };
    });

    res.json({
      current_page: 1,
      data,
      first_page_url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=1`,
      from: 1,
      last_page: 1,
      last_page_url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=1`,
      links: [
        {
          url: null,
          label: "&laquo; Previous",
          active: false
        },
        {
          url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=1`,
          label: "1",
          active: true
        },
        {
          url: null,
          label: "Next &raquo;",
          active: false
        }
      ],
      next_page_url: null,
      path: `${req.protocol}://${req.get('host')}${req.baseUrl}`,
      per_page: 30,
      prev_page_url: null,
      to: data.length,
      total: data.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los contactos' });
  }
};
