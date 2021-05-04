import AsyncStorage from '@react-native-community/async-storage';

export const storeFavoriteRepos = async (repos) => {
    try {
        await AsyncStorage.setItem('Repos', JSON.stringify(repos));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const mergeFavoriteRepos = async (repos) => {
    try {
        await AsyncStorage.mergeItem('Repos', JSON.stringify(repos));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getFavoriteRepos = async () => {
    try {
        const result = await AsyncStorage.getItem('Repos');
        return JSON.parse(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteFavoriteRepos = async () => {
    try {
        await AsyncStorage.removeItem('Repos');
    } catch (error) {
        throw new Error(error.message);
    }
}