import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import { RewardContext, RewardActionTypes } from '../../lib/RewardContext'
import {
  RewardFormProvider,
  RewardFormContext,
  initState,
  validateForm,
} from '../../lib/RewardFormContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingVertical: normalize(36),
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: normalize(40),
  },
  buttonText: {
    fontSize: 16,
  },
  submitButton: {
    color: '#147EFB',
  },
})

type RewardNewStackProp = StackNavigationProp<RootStackParamList, 'RewardNew'>

const RewardForm: FC = () => {
  const navigation = useNavigation<RewardNewStackProp>()

  const { dispatch: rewardsDispatch } = useContext(RewardContext)

  const { state: formState, dispatch: formDispatch } = useContext(
    RewardFormContext,
  )

  const resetForm = () => {
    formDispatch(initState)
  }

  const onCancelPress = () => {
    resetForm()
    navigation.goBack()
  }

  const onSubmitPress = () => {
    if (validateForm(formState)) {
      rewardsDispatch({
        type: RewardActionTypes.AddReward,
        payload: formState,
      })
      resetForm()
      navigation.goBack()
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.formContainer]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={[styles.fieldContainer]}>
            <Text style={[styles.label]}>Reward Name</Text>
            <TextInput
              style={[styles.textInput]}
              placeholder="Reward Name"
              onChangeText={(name) => formDispatch({ name })}
              value={formState.name}
            />
          </View>

          <View style={[styles.fieldContainer]}>
            <Text style={[styles.label]}>Point</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType="numeric"
              placeholder="Point"
              onChangeText={(text) => {
                if (text.length === 0) formDispatch({ point: 0 })
                else if (/^[0-9]*$/g.test(text)) {
                  formDispatch({ point: parseInt(text) })
                }
              }}
              value={`${formState.point}`}
            />
          </View>

          <View style={[styles.buttonsContainer]}>
            <TouchableOpacity onPress={onCancelPress}>
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmitPress}>
              <Text style={[styles.buttonText, styles.submitButton]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
