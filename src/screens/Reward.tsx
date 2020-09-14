import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { FC } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import normalize from 'react-native-normalize'

import { RewardCard } from '../components/RewardCard'

const styles = StyleSheet.create({
  rewardContainer: {
    flex: 1,
    paddingVertical: normalize(36),
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: normalize(24),
  },
  rewardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(16),
  },
  headerBrand: {
    flex: 4,
    fontSize: 24,
    fontWeight: '700',
  },
  headerMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
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

const RewardHeader: FC = () => {
  return (
    <View style={[styles.headerContainer]}>
      <Text style={[styles.headerBrand]}>Challenge</Text>
      <View style={[styles.headerMenu]}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon icon={faPlus} size={18} />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesomeIcon icon={faEdit} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const Reward: FC = () => {
  return (
    <View style={[styles.rewardContainer]}>
      <RewardHeader />
      <RewardList />
    </View>
  )
}
