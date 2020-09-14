import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export const RewardNew: FC = () => {
  const [time, setTime] = useState(moment().format('h:mm:ss a'))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('h:mm:ss a'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{time}</Text>
    </View>
  )
}