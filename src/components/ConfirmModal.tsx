import React, { FC, useContext } from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'

import { Challenge } from '../lib/ChallengeContext'
import {
  ConfirmActionTypes,
  ConfirmContext,
  ConfirmTypes,
} from '../lib/ConfirmContext'
import { Reward } from '../lib/RewardContext'
import { TicketContext, TicketActionTypes, Ticket } from '../lib/TicketContext'
import { UserActionTypes, UserContext } from '../lib/UserContext'

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
  itemName: {
    fontSize: 20,
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  pointText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  receivePoint: {
    color: '#32CD32',
  },
  payPoint: {
    color: '#f32013',
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

interface IConfirmChallengeContentProp {
  challenge: Challenge
  onCancelPress: () => void
  closeModal: () => void
}

interface IConfirmRewardContentProp {
  reward: Reward
  onCancelPress: () => void
  closeModal: () => void
}

interface IConfirmTicketContentProp {
  ticket: Ticket
  onCancelPress: () => void
  closeModal: () => void
}

const TransparentBackground: FC = () => {
  const { state } = useContext(ConfirmContext)
  if (!state.modalVisible) return null
  return <View style={[styles.transparentBackground]} />
}

const ConfirmChallengeContent: FC<IConfirmChallengeContentProp> = ({
  challenge,
  onCancelPress,
  closeModal,
}) => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const onConfirmPress = () => {
    if (challenge) {
      userDispatch({
        type: UserActionTypes.IncresePoint,
        payload: {
          point: challenge.point,
        },
      })
      closeModal()
    }
  }

  return (
    <>
      <View>
        <Text style={[styles.doneText]}>Done Challenge</Text>
      </View>

      <View>
        <Text style={[styles.itemName]}>{challenge.name}</Text>
        <Text style={[styles.pointText, styles.receivePoint]}>
          {`Will Receive ${challenge.point} Point`}
        </Text>
      </View>

      <View style={[styles.buttonsContainer]}>
        <TouchableOpacity onPress={onCancelPress}>
          <Text style={[styles.buttonText]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onConfirmPress}>
          <Text style={[styles.buttonText, styles.submitButton]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const ConfirmRewardContent: FC<IConfirmRewardContentProp> = ({
  reward,
  onCancelPress,
  closeModal,
}) => {
  const { dispatch: userDispatch } = useContext(UserContext)
  const { dispatch: ticketDispatch } = useContext(TicketContext)
  const onConfirmPress = () => {
    if (reward) {
      ticketDispatch({
        type: TicketActionTypes.AddTicket,
        payload: {
          ticket: {
            id: 'ticket-id',
            name: reward.name,
          },
        },
      })

      userDispatch({
        type: UserActionTypes.DecreasePoint,
        payload: {
          point: reward.point,
        },
      })

      closeModal()
    }
  }

  return (
    <>
      <View>
        <Text style={[styles.doneText]}>Get Reward</Text>
      </View>

      <View>
        <Text style={[styles.itemName]}>{reward.name}</Text>
        <Text style={[styles.pointText, styles.payPoint]}>
          {`Will Pay ${reward.point} Point`}
        </Text>
      </View>

      <View style={[styles.buttonsContainer]}>
        <TouchableOpacity onPress={onCancelPress}>
          <Text style={[styles.buttonText]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onConfirmPress}>
          <Text style={[styles.buttonText, styles.submitButton]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const ConfirmTicketContent: FC<IConfirmTicketContentProp> = ({
  ticket,
  onCancelPress,
  closeModal,
}) => {
  const { dispatch: ticketDispatch } = useContext(TicketContext)
  const onConfirmPress = () => {
    if (ticket) {
      ticketDispatch({
        type: TicketActionTypes.DeleteTicket,
        payload: {
          ticket,
        },
      })

      closeModal()
    }
  }

  return (
    <>
      <View>
        <Text style={[styles.doneText]}>Use Ticket</Text>
      </View>

      <View>
        <Text style={[styles.itemName]}>{ticket.name}</Text>
      </View>

      <View style={[styles.buttonsContainer]}>
        <TouchableOpacity onPress={onCancelPress}>
          <Text style={[styles.buttonText]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onConfirmPress}>
          <Text style={[styles.buttonText, styles.submitButton]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const ConfirmContent: FC = () => {
  const { state, dispatch: confirmDispatch } = useContext(ConfirmContext)
  const { confirmType, challenge, reward, ticket } = state

  const closeModal = () => {
    confirmDispatch({
      type: ConfirmActionTypes.HideModal,
    })
  }

  const onCancelPress = () => {
    closeModal()
  }

  switch (confirmType) {
    case ConfirmTypes.ConfirmChallenge: {
      if (!challenge) break
      return (
        <ConfirmChallengeContent
          {...{ challenge, onCancelPress, closeModal }}
        />
      )
    }

    case ConfirmTypes.ConfirmReward: {
      if (!reward) break
      return <ConfirmRewardContent {...{ reward, onCancelPress, closeModal }} />
    }

    case ConfirmTypes.ConfirmTicket: {
      if (!ticket) break
      return <ConfirmTicketContent {...{ ticket, onCancelPress, closeModal }} />
    }
  }
  return null
}

export const ConfirmModal: FC = () => {
  const { state } = useContext(ConfirmContext)
  const { modalVisible } = state

  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={[styles.container]}>
        <View style={[styles.modalCard]}>
          <ConfirmContent />
        </View>
      </View>

      <TransparentBackground />
    </Modal>
  )
}
