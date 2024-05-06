import { Router } from "express";
import { getUsers } from '../controllers/index.controller.js';

const router = Router();
// Rutas
router.get('/users', getUsers)

export default router;