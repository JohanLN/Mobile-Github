import * as axios from 'axios';

export const searchReposByName = async (repoName) => {
    let result;

    await axios.get("https://api.github.com/search/repositories?q=" + repoName + "&per_page=10")
        .then(response => {
            console.log("OK");
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        return result;
}