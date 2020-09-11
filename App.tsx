import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View, Text, Button } from 'react-native'

type RootStackParamList = {
  Home: any
  Second: any
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Second" onPress={() => navigation.push('Second')} />
    </View>
  )
}

const SecondScreen = () => {
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Second" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
