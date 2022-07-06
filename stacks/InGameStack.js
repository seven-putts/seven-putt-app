import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import GameStatsScreen from '../screens/GameStatsScreen';
import MainGameScreen from '../screens/MainGameScreen';
import PlayGame from '../screens/PlayGameScreen';

const Stack = createNativeStackNavigator();

const InGameStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Play">
        <Stack.Screen name="Play" component={PlayGame} />
        <Stack.Screen name="GameMenu" component={MainGameScreen} />
        <Stack.Screen name="GameStats" component={GameStatsScreen} />
    </Stack.Navigator>
  )
}

export default InGameStack

