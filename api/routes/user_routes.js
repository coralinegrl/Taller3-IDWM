import { Router } from "express";
import { addUser, authUser } from "../controllers/user_controller.js";

const router = Router()

router.post('/', addUser)
router.post('/login', authUser)

export { router }