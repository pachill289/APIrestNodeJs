import { Router } from "express";
import { getUsers,getUsersMongo,createUser, getUserById } from '../controllers/index.controller.js';
import { insertarMensaje ,createMessage, getMessages, fetchMessages, getSharedPhotos , getLastMessage, countUnseenMessages, makeSeen, deleteMessage } from '../controllers/mensaje.controller.js';
import { getContacts } from '../controllers/contacts.controller.js';
import { getComunidades, insertarComunidad } from '../controllers/comunidad.controller.js';

const router = Router();
// Rutas Postgre
/**
 * @swagger
 * tags:
 *   name: Rutas PostgreSQL
 *   description: Rutas relacionadas con PostgreSQL.
 */

/**
 * @swagger
 * /users/view:
 *   get:
 *     tags: 
 *       - Rutas PostgreSQL
 *     summary: Obtiene la lista de usuarios.
 *     description: Obtiene la lista de todos los usuarios registrados.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la lista de usuarios.
 *       '500':
 *         description: Error del servidor. Ocurrió un error al intentar obtener la lista de usuarios.
 */
router.get('/users/view', getUsers);

// Ruta MongoDB
/**
 * @swagger
 * tags:
 *   name: Rutas MongoDB
 *   description: Rutas relacionadas con MongoDB.
 */

/**
 * @swagger
 * /users/view:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene la lista de usuarios.
 *     description: Obtiene la lista de todos los usuarios registrados.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la lista de usuarios.
 *       '500':
 *         description: Error del servidor. Ocurrió un error al intentar obtener la lista de usuarios.
 */
router.get('/users/mongo/view', getUsersMongo);

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags: 
 *       - Rutas PostgreSQL
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

/**
 * @swagger
 * /mensaje/add:
 *   post:
 *     tags: 
 *       - Rutas PostgreSQL
 *     summary: Inserta un nuevo mensaje.
 *     description: Inserta un nuevo mensaje con los datos proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_id:
 *                 type: string
 *               to_id:
 *                 type: string
 *               body:
 *                 type: string
 *               attachment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Mensaje insertado exitosamente.
 *       '400':
 *         description: Solicitud incorrecta. Verifique los datos proporcionados.
 *       '500':
 *         description: Error del servidor.
 */
router.post('/mensaje/add', (req, res) => insertarMensaje(req, res));

/**
 * @swagger
 * /community/all:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene todas las comunidades.
 *     description: Retorna una lista de todas las comunidades existentes.
 *     responses:
 *       '200':
 *         description: Lista de comunidades obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   max_number_users:
 *                     type: number
 *                   type_community:
 *                     type: string
 *                   users:
 *                     type: array
 *                     items:
 *                       type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       '500':
 *         description: Error del servidor.
 */
router.get('/community/view', getComunidades);

/**
 * @swagger
 * /community/create:
 *   post:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Crea una nueva comunidad.
 *     description: Crea una nueva comunidad con los datos proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               max_number_users:
 *                 type: number
 *               type_community:
 *                 type: string
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Comunidad creada exitosamente.
 *       '400':
 *         description: Solicitud incorrecta. Verifique los datos proporcionados.
 *       '500':
 *         description: Error del servidor.
 */
router.post('/community/add', (req, res) => insertarComunidad(req, res));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: 
 *       - Rutas PostgreSQL
 *     summary: Obtiene un usuario por ID.
 *     description: Obtiene los datos de un usuario específico mediante su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario que se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Datos del usuario obtenidos exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/user/:id', getUserById);

 

// Rutas MongoDB
/**
 * @swagger
 * tags:
 *   name: Rutas MongoDB
 *   description: Rutas relacionadas con MongoDB.
 */

/**
 * @swagger
 * /message/add:
 *   post:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Crea un nuevo mensaje.
 *     description: Crea un nuevo mensaje con los datos proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_id:
 *                 type: integer
 *               to_id:
 *                 type: integer
 *               body:
 *                 type: string
 *               attachment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Mensaje creado exitosamente.
 *       '500':
 *         description: Error del servidor.
 */
router.post('/message/add', createMessage);

/**
 * @swagger
 * /getMessages:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene todos los mensajes.
 *     description: Obtiene la lista de todos los mensajes.
 *     responses:
 *       '200':
 *         description: Lista de mensajes obtenida exitosamente.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/getMessages', getMessages);

/**
 * @swagger
 * /fetchMessages/{authUserId}/{userId}:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene los mensajes entre dos usuarios específicos.
 *     description: Obtiene los mensajes enviados entre dos usuarios específicos mediante sus IDs.
 *     parameters:
 *       - name: authUserId
 *         in: path
 *         required: true
 *         description: ID del usuario autenticado.
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del otro usuario cuyos mensajes se desean obtener.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de mensajes obtenida exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/fetchMessages/:authUserId/:userId', fetchMessages);



/**
 * @swagger
 * /getSharedPhotos/{userId}:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene las fotos compartidas por un usuario específico.
 *     description: Obtiene las fotos compartidas por un usuario específico mediante su ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario cuyas fotos compartidas se desean obtener.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Fotos obtenidas exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/getSharedPhotos/:userId', getSharedPhotos);

/**
 * @swagger
 * /getContacts/{userId}:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene los contactos de un usuario específico.
 *     description: Obtiene la lista de contactos de un usuario específico mediante su ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario cuyos contactos se desean obtener.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de contactos obtenida exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/getContacts/:userId', getContacts);

/**
 * @swagger
 * /getLastMessage/{authUserId}/{userId}:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Obtiene el último mensaje entre dos usuarios específicos.
 *     description: Obtiene el último mensaje enviado entre dos usuarios específicos mediante sus IDs.
 *     parameters:
 *       - name: authUserId
 *         in: path
 *         required: true
 *         description: ID del usuario autenticado.
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del otro usuario cuyo último mensaje se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Último mensaje obtenido exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/getLastMessage/:authUserId/:userId', getLastMessage);

/**
 * @swagger
 * /countUnseenMessages/{authUserId}/{contactUserId}:
 *   get:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Cuenta los mensajes no vistos entre dos usuarios específicos.
 *     description: Obtiene la cantidad de mensajes no vistos enviados por un usuario específico al usuario autenticado.
 *     parameters:
 *       - name: authUserId
 *         in: path
 *         required: true
 *         description: ID del usuario autenticado.
 *         schema:
 *           type: string
 *       - name: contactUserId
 *         in: path
 *         required: true
 *         description: ID del contacto cuyos mensajes no vistos se desean contar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cantidad de mensajes no vistos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unseenMessagesCount:
 *                   type: integer
 *                   example: 5
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
router.get('/countUnseenMessages/:authUserId/:contactUserId', countUnseenMessages);

/**
 * @swagger
 * /makeSeen/{authUserId}/{userId}/seen:
 *   put:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Marca los mensajes como vistos.
 *     description: Marca todos los mensajes no vistos del usuario con el ID dado como vistos.
 *     parameters:
 *       - in: path
 *         name: authUserId
 *         description: ID del usuario autenticado.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         description: ID del usuario cuyos mensajes se marcarán como vistos.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensajes marcados como vistos correctamente.
 *       500:
 *         description: Error al marcar los mensajes como vistos.
 */
router.put('/makeSeen/:authUserId/:userId/seen', makeSeen);

/**
 * @swagger
 * /deleteMessage/{messageId}:
 *   delete:
 *     tags: 
 *       - Rutas MongoDB
 *     summary: Elimina un mensaje por su ID.
 *     description: Elimina el mensaje con el ID dado.
 *     parameters:
 *       - in: path
 *         name: messageId
 *         description: ID del mensaje a eliminar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mensaje eliminado correctamente.
 *       404:
 *         description: Mensaje no encontrado.
 *       500:
 *         description: Error al eliminar el mensaje.
 */
router.delete('/deleteMessage/:messageId', deleteMessage);

export default router;