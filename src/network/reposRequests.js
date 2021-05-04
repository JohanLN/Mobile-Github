import * as axios from 'axios';

export const searchReposByName = async (repoName) => {
    let result;

    await axios.get("https://api.github.com/search/repositories?q=" + repoName + "&per_page=10")
        .then(response => {
            result = response.data.items;
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        return result;
}

export const getSpeceficRepo = async (ownerName, repoName) => {
    let result;

    await axios.get(`https://api.github.com/repos/${ownerName}/${repoName}`)
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        return result;
}

export const getReposContrib = async (ownerName, repoName) => {
    let result;

    await axios.get(`https://api.github.com/repos/${ownerName}/${repoName}/contributors`)
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        return result;
}

export const getReposIssues = async (ownerName, repoName) => {
    let result;

    await axios.get(`https://api.github.com/repos/${ownerName}/${repoName}/issues`)
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        return result;
}