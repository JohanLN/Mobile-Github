import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/User';

export const storeUser = async (user, userRepos) => {
    try {
        User.githubUser = user.githubUser === undefined ? true : true;
        User.login = user.login;
        User.myRepositories = userRepos;
        User.numberOfRepos = user.public_repos;
        User.myGithubUrl = user.html_url;
        User.myFollowers = user.followers;
        User.myBio = user.bio;
        User.myAvatar = user.avatar_url;
        
        await AsyncStorage.setItem('User', JSON.stringify(User));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const mergeUsers = async (newUser) => {
    try {
        await AsyncStorage.mergeItem('User', JSON.stringify(newUser));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUser = async () => {
    try {
        const result = await AsyncStorage.getItem('User');
        return JSON.parse(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteUser = async () => {
    try {
        await AsyncStorage.removeItem('User');
    } catch (error) {
        throw new Error(error.message);
    }
}