import React, { FC } from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import normalize from 'react-native-normalize'

import { TicketCard } from '../../components/Ticket/TicketCard'

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
  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      <TicketCard />
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
