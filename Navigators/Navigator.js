import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import MainS from '../screens/MainS';
import Pass from '../screens/Pass';
import AppStore from '../screens/AppStore';
import AppInfo from '../screens/AppInfo';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="MainS"
                component={MainS}
            />
            <Stack.Screen
                name="Pass" // Cambia el nombre a "PassW" para que coincida con el nombre del componente
                component={Pass} // Asegúrate de usar "PassW" como nombre del componente
            />

            <Stack.Screen
                name="AppStore" 
                component={AppStore} 
            />

            <Stack.Screen
                name="AppInfo" 
                component={AppInfo} 
            />

            <Stack.Screen
                name="EditProfileScreen" 
                component={EditProfileScreen} 
            />

        </Stack.Navigator>
        
        
    );
}
