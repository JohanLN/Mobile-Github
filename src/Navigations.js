import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import Home from './views/Home';
import FindUser from './views/FindUser';
import Profile from './views/Profile';
import Login from './views/Login';
import RepositoryView from './views/RepositoryView';
import UserView from './views/UserView';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FindUserStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const LoginStack = createStackNavigator();

const MyDarkTheme = {
    dark: true,
    colors: {
        background: '#1e242f',
        clickableText: "#4b6d9b",
        text: '#98C1D9',
        border: '#4b6d9b',
        important: '#EE6C4D',
        card: '#202632'
    }
}

const MyLightTheme = {
    dark: false,
    colors: {
        background: '#E8EAEE',
        clickableText: "#4b6d9b",
        text: '#839EC3',
        border: '#4b6d9b',
        important: '#EE6C4D',
        card: '#DCDFE5'
    }
}

let selectedTheme;

const Navigations = () =>
{
    const scheme = useColorScheme();
    selectedTheme = scheme === 'dark' ? MyDarkTheme : MyLightTheme

    return(
        <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyLightTheme}>
            <LoginStack.Navigator headerMode={"none"} initialRouteName="Login">
                <LoginStack.Screen name="Login" component={Login} />
                <LoginStack.Screen name="Tab" component={TabNavigation}/>
            </LoginStack.Navigator>
        </NavigationContainer>
    )
}

const TabNavigation = ({navigation}) => (
    <Tab.Navigator 
        headerMode={"none"}
        initialRouteName="Home"
        tabBarOptions={{
            activeTintColor: '#EE6C4D',
            activeBackgroundColor: selectedTheme.background,
            inactiveBackgroundColor: selectedTheme.background,
            inactiveTintColor: '#4b6d9b'
        }}>
        <Tab.Screen 
            name="FindUser" 
            component={FindUserNavigation} 
            options={{
                tabBarLabel: "Find user",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="supervised-user-circle" color={color} size={30} />
                )
            }} 
        />
        <Tab.Screen 
            name="Home" 
            component={HomeNavigation} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="home" color={color} size={30} />
                )
            }} 
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileNavigation} 
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="account-circle" color={color} size={30} />
                )
            }} 
        />
    </Tab.Navigator>
)

const HomeNavigation = ({navigation}) => (
    <HomeStack.Navigator headerMode={"none"} initialRouteName="Home">
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="RepositoryView" component={RepositoryView} />
    </HomeStack.Navigator>
)

const FindUserNavigation = ({navigation}) => (
    <FindUserStack.Navigator headerMode={"none"} initialRouteName="FindUser">
        <FindUserStack.Screen name="FindUser" component={FindUser} />
        <FindUserStack.Screen name="UserView" component={UserView} />
    </FindUserStack.Navigator>
)

const ProfileNavigation = ({navigation}) => (
    <ProfileStack.Navigator headerMode={"none"} initialRouteName="Profile">
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="RepositoryView" component={RepositoryView} />
    </ProfileStack.Navigator>
)

export default Navigations;