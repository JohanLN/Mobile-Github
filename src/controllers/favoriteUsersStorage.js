import AsyncStorage from '@react-native-community/async-storage';

export const storeFavoriteUsers = async (Users) => {
    try {
        await AsyncStorage.setItem('Users', JSON.stringify(Users));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const mergeFavoriteUsers = async (Users) => {
    try {
        await AsyncStorage.mergeItem('Users', JSON.stringify(Users));
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getFavoriteUsers = async () => {
    try {
        const result = await AsyncStorage.getItem('Users');
        return JSON.parse(result);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteFavoriteUsers = async () => {
    try {
        await AsyncStorage.removeItem('Users');
    } catch (error) {
        throw new Error(error.message);
    }
}