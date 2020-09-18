import React, { FC, useContext } from 'react'
import { View, Text } from 'react-native'

import { UserContext } from '../lib/UserContext'

export const Home: FC = () => {
  const { state } = useContext(UserContext)
  console.log(state)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  )
}
