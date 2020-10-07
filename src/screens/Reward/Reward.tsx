import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import { Header } from '../../components/Header'
import { RewardCard } from '../../components/Reward/RewardCard'
import { RewardActionTypes, RewardContext } from '../../lib/RewardContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})

type RewardStackProp = StackNavigationProp<RootStackParamList, 'Reward'>

const RewardList: FC = () => {
  const {
    state: { rewards },
  } = useContext(RewardContext)
  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      <View style={[styles.rewardListContainer]}>
        {rewards.map((reward) => (
          <RewardCard key={reward.id} {...{ reward }} />
        ))}
      </View>
    </ScrollView>
  )
}

const RewardHeader: FC = () => {
  const { state, dispatch } = useContext(RewardContext)
  const navigation = useNavigation<RewardStackProp>()

  const { editMode } = state
  const onAddPress = () => {
    navigation.push('RewardForm')
  }

  const onEditPress = () => {
    dispatch({
      type: RewardActionTypes.SetEditMode,
      payload: {
        editMode: true,
      },
    })
  }

  const onCancelEditPress = () => {
    dispatch({
      type: RewardActionTypes.SetEditMode,
      payload: {
        editMode: false,
      },
    })
  }

  return (
    <Header {...{ onAddPress, onEditPress, onCancelEditPress, editMode }} />
  )
}

export const Reward: FC = () => {
  const { dispatch } = useContext(RewardContext)

  useEffect(() => {
    dispatch({
      type: RewardActionTypes.SetEditMode,
      payload: {
        editMode: false,
      },
    })
  }, [])

  return (
    <SafeAreaView style={[styles.container]}>
      <RewardHeader />
      <RewardList />
    </SafeAreaView>
  )
}
