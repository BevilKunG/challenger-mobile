import React, { FC, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'

import {
  ConfirmActionTypes,
  ConfirmContext,
  ConfirmTypes,
} from '../../lib/ConfirmContext'
import {
  Ticket,
  TicketActionTypes,
  TicketContext,
} from '../../lib/TicketContext'

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(5),
    marginVertical: normalize(10),
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(30),
  },
  ticketName: {
    fontSize: 20,
  },
  ticketButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderRadius: 8,
    backgroundColor: '#32CD32',
  },
  ticketButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})

interface ITicketCardProp {
  ticket: Ticket
}

export const TicketCard: FC<ITicketCardProp> = ({ ticket }) => {
  const { dispatch } = useContext(ConfirmContext)

  const onUsePress = () => {
    dispatch({
      type: ConfirmActionTypes.ShowModal,
      payload: {
        confirmType: ConfirmTypes.ConfirmTicket,
        ticket,
      },
    })
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.cardContainer]}>
        <Text style={[styles.ticketName]}>{ticket.name}</Text>
        <TouchableOpacity style={[styles.ticketButton]} onPress={onUsePress}>
          <Text style={[styles.ticketButtonText]}>Use</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
