import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './views/Home';
import test from './views/Test';
import FindUser from './views/FindUser';
import Profile from './views/Profile';
import Login from './views/Login';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FindUserStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const LoginStack = createStackNavigator();

const Navigations = () =>
{
    return(
        <NavigationContainer>
            <LoginStack.Navigator headerMode={"none"} initialRouteName="Login">
                <LoginStack.Screen name="Login" component={Login} />
                <LoginStack.Screen name="Tab" component={TabNavigation}/>
            </LoginStack.Navigator>
        </NavigationContainer>
    )
}

const TabNavigation = ({navigation}) => (
    <Tab.Navigator headerMode={"none"} initialRouteName="Home">
        <Tab.Screen 
            name="FindUser" 
            component={FindUserNavigation} 
            options={{
                tabBarLabel: "Find user",
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="supervised-user-circle" color={color} size={30} />
                )
            }} 
        />
        <Tab.Screen 
            name="Home" 
            component={HomeNavigation} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={30} />
                )
            }} 
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileNavigation} 
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="account-circle" color={color} size={30} />
                )
            }} 
        />
    </Tab.Navigator>
)

const HomeNavigation = ({navigation}) => (
    <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="test" component={test} />
    </HomeStack.Navigator>
)

const FindUserNavigation = ({navigation}) => (
    <FindUserStack.Navigator initialRouteName="FindUser">
        <FindUserStack.Screen name="FindUser" component={FindUser} />
        <FindUserStack.Screen name="test" component={test} />
    </FindUserStack.Navigator>
)

const ProfileNavigation = ({navigation}) => (
    <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="test" component={test} />
    </ProfileStack.Navigator>
)

export default Navigations;