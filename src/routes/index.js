import { Router } from "express";
import { getUsers,createUser } from '../controllers/index.controller.js';
import { insertarMensaje, createMessage } from '../controllers/mensaje.controller.js';
import { getMessages, fetchMessages } from '../controllers/mensaje.controller.js';

const router = Router();
// Rutas
router.get('/users/view', getUsers)
router.post('/user/create',(req,res) => createUser(req,res));
router.post('/mensaje/add', (req, res) => insertarMensaje(req,res));

router.post('/messages', createMessage);

router.get('/getMessages', getMessages);  // Nueva ruta

router.get('/fetchMessages/:userId', fetchMessages);

export default router;