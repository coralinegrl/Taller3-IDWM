const express = require('express');
const router = express.Router();
const { getDizkm8Repositories } = require('./github_controller');

// Ruta para obtener todos los repositorios de Dizkm8
router.get('/repos/Dizkm8', async (req, res) => { 
  try {
    console.log("Obteniendo repositorios de Dizkm8");
    const repositories = await getDizkm8Repositories();
    res.json(repositories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los repositorios de Dizkm8' });
  }
});

// Ruta para obtener los commits de un repositorio específico
router.get('/repos/:owner/:repo/commits', async (req, res) => { // Agrega "/" al principio
  const owner = req.params.owner;
  const repo = req.params.repo;
  
  try {
    // Realiza la solicitud a la API de GitHub para obtener los commits
    const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner,
        repo,
        headers: {
        'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    res.json(commits.data);
    
    res.json({ message: 'Implementa la lógica para obtener los commits aquí' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los commits' });
  }
});

module.exports = router;
