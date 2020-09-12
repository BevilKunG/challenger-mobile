import React, { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

type Reward = {
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
    backgroundColor: '#32CD32',
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: 8,
  },
  getRewardText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})

export const RewardCard: FC<IRewardCardProps> = ({ reward }) => {
  return (
    <View style={[styles.rewardCardContainer]}>
      <View style={[styles.rewardImage]} />
      <View style={[styles.detailContainer]}>
        <Text style={[styles.rewardName]}>{reward.name}</Text>
        <Text style={[styles.rewardPoint]}>{`${reward.point} points`}</Text>
        <TouchableOpacity style={[styles.getRewardButton]}>
          <Text style={[styles.getRewardText]}>แลก</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
