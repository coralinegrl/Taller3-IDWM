import { Octokit } from '@octokit/rest';
const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const getUserRepos = (req, res) => {
    octokit.repos.listForUser({
        username: req.params.username
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener los repositorios');
    });
};

const getRepoCommits = (req, res) => {
    const { username, repo } = req.params;

    octokit.repos.listCommits({
        owner: username,
        repo: repo
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error al obtener los commits');
    });
};

export { getUserRepos, getRepoCommits }
