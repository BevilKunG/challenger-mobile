import React, { FC, useContext } from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import normalize from 'react-native-normalize'

import { TicketCard } from '../../components/Ticket/TicketCard'
import { TicketContext } from '../../lib/TicketContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: normalize(24),
  },
})

const TicketList: FC = () => {
  const { state } = useContext(TicketContext)

  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      {state.tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...{ ticket }} />
      ))}
    </ScrollView>
  )
}

export const Ticket: FC = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <TicketList />
    </SafeAreaView>
  )
}
