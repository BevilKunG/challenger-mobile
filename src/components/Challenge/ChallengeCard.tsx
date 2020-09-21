import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import {
  ChallengeActionTypes,
  ChallengeContext,
} from '../../lib/ChallengeContext'
import {
  ConfirmContext,
  ConfirmActionTypes,
  ConfirmTypes,
} from '../../lib/ConfirmContext'

interface IChallengeCardProps {
  challenge: any
}

type ChallengeStackProp = StackNavigationProp<RootStackParamList, 'Challenge'>

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
    marginVertical: normalize(10),
  },
  challengeCardContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(10),
  },
  detailContainer: {
    padding: normalize(16),
    justifyContent: 'center',
  },
  challengeName: {
    fontSize: 20,
    marginBottom: normalize(4),
  },
  challengePoint: {
    fontSize: 16,
    marginBottom: normalize(8),
  },
  challengeButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: 8,
  },
  challengeButtonText: {
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
  checkIcon: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#147EFB',
    padding: normalize(5),
  },
})

const DoneChallengeButton: FC<IChallengeCardProps> = ({ challenge }) => {
  const { dispatch } = useContext(ConfirmContext)
  const onDonePress = () => {
    dispatch({
      type: ConfirmActionTypes.ShowModal,
      payload: {
        confirmType: ConfirmTypes.ConfirmChallenge,
        challenge,
      },
    })
  }
  return (
    <TouchableOpacity style={[styles.checkIcon]} onPress={onDonePress}>
      <FontAwesomeIcon icon={faCheck} color="#147EFB" />
    </TouchableOpacity>
  )
}

const EditChallengeButton: FC<IChallengeCardProps> = ({ challenge }) => {
  const navigation = useNavigation<ChallengeStackProp>()
  const onEditPress = () => {
    navigation.push('ChallengeForm', {
      challenge,
    })
  }

  return (
    <TouchableOpacity
      style={[styles.challengeButton, styles.editButton]}
      onPress={onEditPress}
    >
      <Text style={[styles.challengeButtonText]}>แก้ไข</Text>
    </TouchableOpacity>
  )
}

const DeleteChallengeButton: FC<IChallengeCardProps> = ({ challenge }) => {
  const { dispatch, state } = useContext(ChallengeContext)
  const onDeletePress = () => {
    dispatch({
      type: ChallengeActionTypes.DeleteChallenge,
      payload: {
        challenge,
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

export const ChallengeCard: FC<IChallengeCardProps> = ({ challenge }) => {
  const { state } = useContext(ChallengeContext)

  return (
    <View style={styles.container}>
      <View style={[styles.challengeCardContainer]}>
        <View style={[styles.detailContainer]}>
          <Text style={[styles.challengeName]}>{challenge.name}</Text>
          <Text
            style={[styles.challengePoint]}
          >{`${challenge.point} points`}</Text>
        </View>
        <View>
          {!state.editMode ? (
            <DoneChallengeButton {...{ challenge }} />
          ) : (
            <EditChallengeButton {...{ challenge }} />
          )}
        </View>
      </View>

      <DeleteChallengeButton {...{ challenge }} />
    </View>
  )
}
