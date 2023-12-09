import { Router } from "express";
import { addUser, authUser } from "../controllers/user_controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { updateUserProfile } from "../controllers/user_controller.js";
import { updateUserPassword } from '../controllers/user_controller.js';
// import getGithubCommits from '../controllers/githubController.js';

const router = Router()


router.post('/', addUser) //register
router.post('/login', authUser) //login
// router.get('/github/:username/commits', verifyToken, getGithubCommits);
router.put('/profile', verifyToken, updateUserProfile); //editar perfil
router.put('/update-password', verifyToken, updateUserPassword); //editar contraseña
// router.post('/logout') //logout



export { router }