import React, { FC, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

import { RewardCardContext, RewardCardProvider } from '../lib/RewardCardContext'

export type Reward = {
  name: string
  point: number
}

interface IRewardCardProps {
  reward: Reward
}

const styles = StyleSheet.create({
  rewardCardContainer: {
    flex: 1,
    height: normalize(300),
  },
  rewardImage: {
    flex: 2,
    backgroundColor: '#708090',
    borderRadius: 8,
  },
  detailContainer: {
    flex: 1,
    padding: normalize(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardName: {
    fontSize: 20,
    marginBottom: normalize(4),
  },
  rewardPoint: {
    fontSize: 18,
    marginBottom: normalize(8),
  },
  getRewardButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: 8,
  },
  getRewardText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  availableButton: {
    backgroundColor: '#32CD32',
  },
  unavailableButton: {
    backgroundColor: '#696969',
  },
})

const GetRewardButton: FC = () => {
  const userPoint = 50
  const { reward } = useContext(RewardCardContext)

  if (reward && userPoint >= reward.point) {
    return (
      <TouchableOpacity
        style={[styles.getRewardButton, styles.availableButton]}
      >
        <Text style={[styles.getRewardText]}>แลก</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.getRewardButton, styles.unavailableButton]}>
      <Text style={[styles.getRewardText]}>แลก</Text>
    </View>
  )
}

export const RewardCard: FC<IRewardCardProps> = ({ reward }) => {
  return (
    <RewardCardProvider {...{ reward }}>
      <View style={[styles.rewardCardContainer]}>
        <View style={[styles.rewardImage]} />
        <View style={[styles.detailContainer]}>
          <Text style={[styles.rewardName]}>{reward.name}</Text>
          <Text style={[styles.rewardPoint]}>{`${reward.point} points`}</Text>
          <GetRewardButton />
        </View>
      </View>
    </RewardCardProvider>
  )
}
