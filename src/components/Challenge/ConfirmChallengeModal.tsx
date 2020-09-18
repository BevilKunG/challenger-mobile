import React, { FC, useContext } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'

import {
  ConfirmChallengeActionTypes,
  ConfirmChallengeContext,
} from '../../lib/ConfirmChallengeContext'
import { UserActionTypes, UserContext } from '../../lib/UserContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  transparentBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    opacity: 0.25,
    zIndex: 1,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    width: normalize(250),
    height: normalize(160),
    padding: normalize(10),
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  challengeText: {
    fontSize: 20,
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  pointText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#32CD32',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  submitButton: {
    color: '#147EFB',
  },
})

const TransparentBackground: FC = () => {
  const { state } = useContext(ConfirmChallengeContext)
  if (!state.modalVisible) return null
  return <View style={[styles.transparentBackground]} />
}

export const ConfirmChallengeModal: FC = () => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const { state, dispatch: confirmDispatch } = useContext(
    ConfirmChallengeContext,
  )
  const { modalVisible, challenge } = state
  const closeModal = () => {
    confirmDispatch({
      type: ConfirmChallengeActionTypes.HideModal,
    })
  }

  const onConfirmPress = () => {
    userDispatch({
      type: UserActionTypes.IncresePoint,
      payload: {
        point: challenge.point,
      },
    })
    closeModal()
  }

  const onCancelPress = () => {
    closeModal()
  }

  if (!challenge) return null

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={[styles.container]}>
        <View style={[styles.modalCard]}>
          <View>
            <Text style={[styles.doneText]}>Done Challenge</Text>
          </View>

          <View>
            <Text style={[styles.challengeText]}>{challenge.name}</Text>
            <Text style={[styles.pointText]}>
              {`Will Receive ${challenge.point} Point`}
            </Text>
          </View>

          <View style={[styles.buttonsContainer]}>
            <TouchableOpacity onPress={onCancelPress}>
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirmPress}>
              <Text style={[styles.buttonText, styles.submitButton]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TransparentBackground />
    </Modal>
  )
}
