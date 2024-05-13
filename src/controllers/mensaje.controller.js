import {mensajeModel} from '../models/Mensaje.js';
// Controladores
export const insertarMensaje = async (req,res) => {

const { id_mensaje, tipo, mensaje, emisor, destino } = req.body;
// Validaciones
if (!id_mensaje ||!emisor ||!destino) {
    return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new Mensaje document
    const newMensaje = new Mensaje({
    id_mensaje,
    tipo,
    mensaje,
    emisor: mongoose.Types.ObjectId(emisor),
    destino: mongoose.Types.ObjectId(destino)
    });

    // Save the document to the database
    newMensaje.save((err, mensaje) => {
    if (err) {
        return res.status(500).json({ error: 'Error inserting mensaje' });
    }
    res.json(mensaje);
    });
}
