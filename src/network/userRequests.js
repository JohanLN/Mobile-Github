import * as axios from 'axios';

export const searchtUsersByName = async (username) => {
    let result;

    await axios.get("https://api.github.com/search/users?q=" + username + "&per_page=10")
        .then(response => {
            result = response.data.items;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
    return result;
}

export const getSpeceficUser = async (username) => {
    let result;

    await axios.get("https://api.github.com/users/" + username)
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
    return result;
}

export const getUserRepos = async (username) => {
    let result;

    await axios.get("https://api.github.com/users/" + username + "/repos")
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
    return result;
}

export const getUserFollowers = async (username) => {
    let result;

    await axios.get("https://api.github.com/users/" + username + "/followers")
        .then(response => {
            result = response.data;
        })
        .catch((err) => {
            throw new Error(err.message);
        })
    return result;
}