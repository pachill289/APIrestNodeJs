import { Router } from "express";
import { getUsers,editUser } from '../controllers/index.controller.js';

const router = Router();

router.get('/users', getUsers)
router.get('/user', editUser)

export default router;