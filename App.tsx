import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { ConfirmModal } from './src/components/ConfirmModal'
import { ChallengeProvider } from './src/lib/ChallengeContext'
import { ConfirmProvider } from './src/lib/ConfirmContext'
import { RewardProvider } from './src/lib/RewardContext'
import { UserProvider } from './src/lib/UserContext'
import { Challenge } from './src/screens/Challenge/Challenge'
import { ChallengeForm } from './src/screens/Challenge/ChallengeForm'
import { Home } from './src/screens/Home'
import { Reward } from './src/screens/Reward/Reward'
import { RewardForm } from './src/screens/Reward/RewardForm'
import { Ticket } from './src/screens/Ticket/Ticket'

export type RootBottomTabParamList = {
  Home: any
  Reward: any
  Challenge: any
  Ticket: any
}

export type RootStackParamList = {
  Reward: any
  RewardForm: any
  Challenge: any
  ChallengeForm: any
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
          options={{ title: 'Reward Form' }}
        />
      </Stack.Navigator>
    </RewardProvider>
  )
}

const ChallengeTab = () => {
  return (
    <ChallengeProvider>
      <Stack.Navigator initialRouteName="Challenge">
        <Stack.Screen
          name="Challenge"
          component={Challenge}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChallengeForm"
          component={ChallengeForm}
          initialParams={{ challenge: null }}
          options={{ title: 'Challenge Form' }}
        />
      </Stack.Navigator>
    </ChallengeProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <ConfirmProvider>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Challenge" component={ChallengeTab} />
            <Tab.Screen name="Reward" component={RewardTab} />
            <Tab.Screen name="Ticket" component={Ticket} />
          </Tab.Navigator>

          <ConfirmModal />
        </ConfirmProvider>
      </UserProvider>
    </NavigationContainer>
  )
}
