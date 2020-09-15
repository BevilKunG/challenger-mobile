import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { RewardProvider } from './src/lib/RewardContext'
import { Home } from './src/screens/Home'
import { Reward } from './src/screens/Reward/Reward'
import { RewardForm } from './src/screens/Reward/RewardForm'

export type RootBottomTabParamList = {
  Home: any
  Reward: any
}

export type RootStackParamList = {
  Reward: any
  RewardForm: any
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
          name="RewardForm"
          component={RewardForm}
          initialParams={{ reward: null }}
          options={{ title: 'Add New Reward' }}
        />
      </Stack.Navigator>
    </RewardProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reward" component={RewardTab} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
