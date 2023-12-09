// import axios from 'axios';

// const getGithubCommits = async (req, res) => {
//     const username = req.params.username; // O como determinarías a qué perfil acceder
//     const githubToken = process.env.GITHUB_TOKEN;

//     try {
//         const response = await axios.get(`https://api.github.com/repos/${username}/repo-name/commits`, {
//             headers: { 'Authorization': `token ${githubToken}` }
//         });

//         res.json(response.data);
//     } catch (error) {
//         res.status(500).send({ message: 'Error al obtener los commits de GitHub' });
//     }
// };

// export default getGithubCommits;
