import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rewardContainer: {
    flex: 1,
  },
  rewardListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const RewardList: FC = () => {
  return (
    <View style={[styles.rewardListContainer]}>
      <Text>RewardList</Text>
    </View>
  )
}

export const Reward: FC = () => {
  return (
    <View style={[styles.rewardContainer]}>
      <RewardList />
    </View>
  )
}
