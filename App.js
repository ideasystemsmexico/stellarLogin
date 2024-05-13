import React from 'react';
import {Text,View,Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigators/Navigator'
import 'react-native-gesture-handler';


export default function App(){
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
    
  )
}