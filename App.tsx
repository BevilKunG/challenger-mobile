import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { Home } from './src/screens/Home'
import { Reward } from './src/screens/Reward'

export type RootStackParamList = {
  Home: any
  Reward: any
}

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reward" component={Reward} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
