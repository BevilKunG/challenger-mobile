import { faPlus, faEdit, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import { RewardCard } from '../../components/RewardCard'
import { RewardActionTypes, RewardContext } from '../../lib/RewardContext'

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
          <RewardCard key={reward.name} {...{ reward }} />
        ))}
      </View>
    </ScrollView>
  )
}

const RewardHeader: FC = () => {
  const { state, dispatch } = useContext(RewardContext)
  const navigation = useNavigation<RewardStackProp>()

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
    <View style={[styles.headerContainer]}>
      <Text style={[styles.headerBrand]}>Challenge</Text>
      <View style={[styles.headerMenu]}>
        {!state.editMode ? (
          <TouchableOpacity onPress={onAddPress}>
            <FontAwesomeIcon icon={faPlus} size={18} />
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon icon={faPlus} size={18} color="#d3d3d3" />
        )}

        {!state.editMode ? (
          <TouchableOpacity onPress={onEditPress}>
            <FontAwesomeIcon icon={faEdit} size={18} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onCancelEditPress}>
            <FontAwesomeIcon icon={faBan} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
    <View style={[styles.rewardContainer]}>
      <RewardHeader />
      <RewardList />
    </View>
  )
}
