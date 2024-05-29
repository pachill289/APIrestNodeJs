import { Router } from "express";
import { getUsers,createUser, getUserById } from '../controllers/index.controller.js';
import { insertarMensaje, createMessage, getMessages, fetchMessages, getSharedPhotos } from '../controllers/mensaje.controller.js';
import { getContacts } from '../controllers/contacts.controller.js';

const router = Router();
// Rutas Postgre
/**
 * @swagger
 * /users/view:
 *   get:
 *     summary: Obtiene la lista de usuarios.
 *     description: Obtiene la lista de todos los usuarios registrados.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la lista de usuarios.
 *       '500':
 *         description: Error del servidor. Ocurrió un error al intentar obtener la lista de usuarios.
 */
router.get('/users/view', getUsers);
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Datos del nuevo usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *       '500':
 *         description: Error del servidor.
 */
router.post('/user/create',(req,res) => createUser(req,res));
router.post('/mensaje/add', (req, res) => insertarMensaje(req,res));
router.get('/user/:id', getUserById); 

//Rutas Mongo
/**
 * @swagger
 * /message/add:
 *   post:
 *     summary: Crea un nuevo mensaje.
 *     description: Crea un nuevo mensaje con los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Datos del nuevo mensaje.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             from_id:
 *               type: string
 *             to_id:
 *               type: string
 *             body:
 *               type: string
 *             attachment:
 *               type: string
 *     responses:
 *       '201':
 *         description: Mensaje creado exitosamente.
 *       '500':
 *         description: Error del servidor.
 */
router.post('/message/add', createMessage);

router.post('/message/add', createMessage);
router.get('/getMessages', getMessages);
router.get('/fetchMessages/:userId', fetchMessages);
router.get('/getSharedPhotos/:userId', getSharedPhotos);
router.get('/contacts/:userId', getContacts);  // Ruta para obtener contactos

export default router;