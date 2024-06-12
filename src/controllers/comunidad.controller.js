import mongoose from 'mongoose';
import {communityModel} from '../models/Comunidad.js';
// Controlador comunidad
const getComunidades = async (req, res) => {
    try {
      const communities = await communityModel.find().sort({ created_at: -1 });
      res.status(200).json(communities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const insertarComunidad = async (req, res) => {
    try {
        const { name, max_number_users, type_community, users } = req.body;

        // Validación de datos
        if (!name || !max_number_users || !type_community || !users) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear nueva comunidad
        const newCommunity = new communityModel({
            name,
            max_number_users,
            type_community,
            users
        });

        // Guardar en la base de datos
        await newCommunity.save();

        res.status(201).json(newCommunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la comunidad' });
    }
}

export {getComunidades,insertarComunidad}