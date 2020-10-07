import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'

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
  },
  ticketName: {
    fontSize: 20,
  },
})

export const TicketCard: FC = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.cardContainer]}>
        <Text style={[styles.ticketName]}>Ticket #1</Text>
      </View>
    </View>
  )
}
