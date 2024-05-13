import { Router } from "express";
import { getUsers,createUser } from '../controllers/index.controller.js';
import { insertarMensaje } from '../controllers/mensaje.controller.js';

const router = Router();
// Rutas
router.get('/users/view', getUsers)
router.post('/user/create',(req,res) => createUser(req,res));
router.post('/mensaje/add', (req, res) => insertarMensaje(req,res));

export default router;