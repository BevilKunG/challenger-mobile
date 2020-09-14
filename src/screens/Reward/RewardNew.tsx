import React, { FC, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import normalize from 'react-native-normalize'

import {
  RewardFormProvider,
  RewardFormContext,
} from '../../lib/RewardFormContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(36),
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: normalize(22),
  },
  fieldContainer: {
    marginVertical: normalize(10),
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: normalize(10),
  },
  textInput: {
    height: normalize(40),
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: normalize(4),
    borderRadius: normalize(4),
  },
})

const RewardForm: FC = () => {
  const { state, dispatch } = useContext(RewardFormContext)
  if (!state || !dispatch) return null

  return (
    <View style={[styles.formContainer]}>
      <View style={[styles.fieldContainer]}>
        <Text style={[styles.label]}>Reward Name</Text>
        <TextInput
          style={[styles.textInput]}
          placeholder="Reward Name"
          onChangeText={(name) => dispatch({ name })}
          value={state.name}
        />
      </View>

      <View style={[styles.fieldContainer]}>
        <Text style={[styles.label]}>Point</Text>
        <TextInput
          style={[styles.textInput]}
          keyboardType="numeric"
          placeholder="Point"
          onChangeText={(point) => dispatch({ point: parseInt(point) })}
          value={`${state.point}`}
        />
      </View>

      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export const RewardNew: FC = () => {
  return (
    <View style={[styles.container]}>
      <RewardFormProvider>
        <RewardForm />
      </RewardFormProvider>
    </View>
  )
}
