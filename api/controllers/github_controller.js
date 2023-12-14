import { Octokit } from '@octokit/core';


const { Octokit } = require('octokit');

// Crea una instancia de Octokit con tu token de GitHub
const octokit = new Octokit({
  auth: 'GITHUB_ACCESS_TOKEN'
});

// Función para obtener la lista de repositorios de Dizkm8
async function getDizkm8Repositories() {
    try {
      // Realiza la solicitud a la API de GitHub para obtener todos los repositorios de Dizkm8
      const response = await octokit.request('GET /users/Dizkm8/repos');
  
      // Procesa y devuelve la lista de repositorios
      return response.data;
    } catch (error) {
      throw error;
    }
}

// Función para obtener los commits de un repositorio
async function getCommits(owner, repo) {
  try {
    // Realiza la solicitud a la API de GitHub para obtener los commits
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner,
      repo,
    });

    // Procesa y devuelve la lista de commits
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDizkm8Repositories,
  getCommits,
};
