import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import {
  ConfirmActionTypes,
  ConfirmContext,
  ConfirmTypes,
} from '../../lib/ConfirmContext'
import {
  RewardActionTypes,
  RewardContext,
  Reward,
} from '../../lib/RewardContext'
import { UserContext } from '../../lib/UserContext'

interface IRewardCardProps {
  reward: Reward
}

type RewardStackProp = StackNavigationProp<RootStackParamList, 'Reward'>

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
    marginVertical: normalize(10),
  },
  rewardCardContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 2,
  },
  rewardImage: {
    height: normalize(120),
    backgroundColor: '#708090',
  },
  detailContainer: {
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
  rewardButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: 8,
  },
  rewardButtonText: {
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
  editButton: {
    backgroundColor: '#eed202',
  },
  deleteButton: {
    backgroundColor: '#f32013',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 9999,
    padding: normalize(6),
    marginTop: normalize(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const GetRewardButton: FC<IRewardCardProps> = ({ reward }) => {
  const { state: userState } = useContext(UserContext)
  const { user } = userState
  const { dispatch } = useContext(ConfirmContext)

  const onGetPress = () => {
    dispatch({
      type: ConfirmActionTypes.ShowModal,
      payload: {
        confirmType: ConfirmTypes.ConfirmReward,
        reward,
      },
    })
  }

  if (user && user.point >= reward.point) {
    return (
      <TouchableOpacity
        style={[styles.rewardButton, styles.availableButton]}
        onPress={onGetPress}
      >
        <Text style={[styles.rewardButtonText]}>แลก</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.rewardButton, styles.unavailableButton]}>
      <Text style={[styles.rewardButtonText]}>แลก</Text>
    </View>
  )
}

const EditRewardButton: FC<IRewardCardProps> = ({ reward }) => {
  const navigation = useNavigation<RewardStackProp>()

  const onEditPress = () => {
    navigation.push('RewardForm', { reward })
  }

  return (
    <TouchableOpacity
      style={[styles.rewardButton, styles.editButton]}
      onPress={onEditPress}
    >
      <Text style={[styles.rewardButtonText]}>แก้ไข</Text>
    </TouchableOpacity>
  )
}

const DeleteRewardButton: FC<IRewardCardProps> = ({ reward }) => {
  const { state, dispatch } = useContext(RewardContext)

  const onDeletePress = () => {
    dispatch({
      type: RewardActionTypes.DeleteReward,
      payload: {
        reward,
      },
    })
  }

  if (!state.editMode) return null

  return (
    <TouchableOpacity style={[styles.deleteButton]} onPress={onDeletePress}>
      <FontAwesomeIcon icon={faMinus} color="#ffffff" size={12} />
    </TouchableOpacity>
  )
}

export const RewardCard: FC<IRewardCardProps> = ({ reward }) => {
  const { state } = useContext(RewardContext)
  return (
    <View style={styles.container}>
      <View style={[styles.rewardCardContainer]}>
        <View style={[styles.rewardImage]} />
        <View style={[styles.detailContainer]}>
          <Text style={[styles.rewardName]}>{reward.name}</Text>
          <Text style={[styles.rewardPoint]}>{`${reward.point} points`}</Text>
          {!state.editMode ? (
            <GetRewardButton {...{ reward }} />
          ) : (
            <EditRewardButton {...{ reward }} />
          )}
        </View>
      </View>

      <DeleteRewardButton {...{ reward }} />
    </View>
  )
}
