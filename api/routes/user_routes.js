import { Router } from "express";
import { addUser, authUser } from "../controllers/user_controller.js";
import getGithubCommits from '../controllers/githubController.js';

const router = Router()


router.post('/', addUser)
router.post('/login', authUser)
router.get('/github/:username/commits', verifyToken, getGithubCommits);

export { router }