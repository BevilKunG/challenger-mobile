import React, { FC } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

import { RewardCard } from '../components/RewardCard'

const styles = StyleSheet.create({
  rewardContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingVertical: normalize(36),
    paddingHorizontal: normalize(24),
  },
  rewardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})

const rewards = [
  {
    name: 'Reward #1',
    point: 20,
  },
  {
    name: 'Reward #2',
    point: 40,
  },
  {
    name: 'Reward #3',
    point: 60,
  },
  {
    name: 'Reward #4',
    point: 80,
  },
]

const RewardList: FC = () => {
  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      <View style={[styles.rewardListContainer]}>
        {rewards.map((reward) => (
          <RewardCard key={reward.name} {...{ reward }} />
        ))}
      </View>
    </ScrollView>
  )
}

export const Reward: FC = () => {
  return (
    <View style={[styles.rewardContainer]}>
      <RewardList />
    </View>
  )
}
