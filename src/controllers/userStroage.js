import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/User';

export const storeUser = async (user, userRepos) => {
    try {
        console.log(user.githubUser)
        User.githubUser = user.githubUser === undefined || user.githubUser ? true : false;
        User.login = user.login;
        User.repositories = userRepos;
        User.numberOfRepos = user.public_repos;
        User.githubUrl = user.html_url;
        User.followers = user.followers;
        User.bio = user.bio;
        User.avatar = user.avatar_url;
        
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