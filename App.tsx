import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
