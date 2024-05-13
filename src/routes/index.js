import { Router } from "express";
import { getUsers,createUser } from '../controllers/index.controller.js';
import { insertarMensaje, createMessage } from '../controllers/mensaje.controller.js';

const router = Router();
// Rutas
router.get('/users/view', getUsers)
router.post('/user/create',(req,res) => createUser(req,res));
router.post('/mensaje/add', (req, res) => insertarMensaje(req,res));

router.post('/messages', createMessage);

export default router;