import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import { ChallengeCard } from '../../components/Challenge/ChallengeCard'
import { Header } from '../../components/Header'
import {
  ChallengeContext,
  ChallengeActionTypes,
} from '../../lib/ChallengeContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(36),
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: normalize(24),
  },
})

type ChallengeStackProp = StackNavigationProp<RootStackParamList, 'Challenge'>

const ChallengeList: FC = () => {
  const { state } = useContext(ChallengeContext)
  return (
    <ScrollView style={[styles.scrollViewContainer]}>
      <View>
        {state.challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...{ challenge }} />
        ))}
      </View>
    </ScrollView>
  )
}

const ChallengeHeader: FC = () => {
  const {
    state: { editMode },
    dispatch,
  } = useContext(ChallengeContext)

  const navigation = useNavigation<ChallengeStackProp>()

  const onAddPress = () => {
    // navigation.push('ChallengeForm')
  }

  const onEditPress = () => {
    dispatch({
      type: ChallengeActionTypes.SetEditMode,
      payload: {
        editMode: true,
      },
    })
  }

  const onCancelEditPress = () => {
    dispatch({
      type: ChallengeActionTypes.SetEditMode,
      payload: {
        editMode: false,
      },
    })
  }

  return (
    <Header {...{ onAddPress, onEditPress, onCancelEditPress, editMode }} />
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
