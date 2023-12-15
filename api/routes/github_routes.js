import { getUserRepos, getRepoCommits } from '../controllers/github_controller.js';
import { Router } from "express";
const router = Router()


// Ruta para obtener repositorios de un usuario
router.get('/repos/:username', getUserRepos);

// Ruta para obtener commits de un repositorio específico
router.get('/commits/:username/:repo', getRepoCommits);

export { router }
