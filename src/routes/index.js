import { Router } from "express";
import { getUsers,createUser, getUserById } from '../controllers/index.controller.js';
import { insertarMensaje, createMessage, getMessages, fetchMessages, getSharedPhotos } from '../controllers/mensaje.controller.js';

const router = Router();
// Rutas Postgre
router.get('/users/view', getUsers)
router.post('/user/create',(req,res) => createUser(req,res));
router.post('/mensaje/add', (req, res) => insertarMensaje(req,res));
router.get('/user/:id', getUserById); 

//Rutas Mongo
router.post('/message/add', createMessage);
router.get('/getMessages', getMessages);
router.get('/fetchMessages/:userId', fetchMessages);
router.get('/getSharedPhotos/:userId', getSharedPhotos);

export default router;