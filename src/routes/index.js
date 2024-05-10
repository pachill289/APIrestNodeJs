import { Router } from "express";
import { getUsers,createUser } from '../controllers/index.controller.js';

const router = Router();
// Rutas
router.get('/users', getUsers)
router.post('/users', createUser);

export default router;