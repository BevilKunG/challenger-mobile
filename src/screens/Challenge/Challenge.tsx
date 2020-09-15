import React, { FC } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import normalize from 'react-native-normalize'

import { Header } from '../../components/Header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(36),
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: normalize(24),
  },
  challengeListContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
})

const challenges = [
  {
    id: '1',
    name: 'Challenge #1',
    point: 1,
  },
  {
    id: '2',
    name: 'Challenge #2',
    point: 1,
  },
  {
    id: '3',
    name: 'Challenge #3',
    point: 1,
  },
]

const ChallengeList: FC = () => {
  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      <View style={[styles.challengeListContainer]}>
        {/* {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...{ challenge }} />
        ))} */}
      </View>
    </ScrollView>
  )
}

const ChallengeHeader: FC = () => {
  const onAddPress = () => {}

  const onEditPress = () => {}

  const onCancelEditPress = () => {}

  return (
    <Header
      {...{ onAddPress, onEditPress, onCancelEditPress, editMode: false }}
    />
  )
}

export const Challenge: FC = () => {
  return (
    <View style={[styles.container]}>
      <ChallengeHeader />
      <ChallengeList />
    </View>
  )
}
