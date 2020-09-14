import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { RewardProvider } from './src/lib/RewardContext'
import { Home } from './src/screens/Home'
import { Reward } from './src/screens/Reward/Reward'
import { RewardNew } from './src/screens/Reward/RewardNew'

export type RootBottomTabParamList = {
  HomeTab: any
  RewardTab: any
}

export type RootStackParamList = {
  Reward: any
  RewardNew: any
}

const Tab = createBottomTabNavigator<RootBottomTabParamList>()
const Stack = createStackNavigator<RootStackParamList>()

const RewardTab = () => {
  return (
    <RewardProvider>
      <Stack.Navigator initialRouteName="Reward">
        <Stack.Screen
          name="Reward"
          component={Reward}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RewardNew"
          component={RewardNew}
          options={{ title: 'Add New Reward' }}
        />
      </Stack.Navigator>
    </RewardProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeTab">
        <Tab.Screen name="HomeTab" component={Home} />
        <Tab.Screen name="RewardTab" component={RewardTab} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
