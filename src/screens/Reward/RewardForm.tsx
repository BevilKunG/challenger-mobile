import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext, useEffect } from 'react'
import {
  View,
  SafeAreaView,
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
    backgroundColor: 'white',
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
  updateButton: {
    color: '#eed202',
  },
})

type RewardFormStackProp = StackNavigationProp<RootStackParamList, 'RewardForm'>
type RewardFormRouteProp = RouteProp<RootStackParamList, 'RewardForm'>

const Form: FC = () => {
  const navigation = useNavigation<RewardFormStackProp>()
  const route = useRoute<RewardFormRouteProp>()

  const { state: rewardState, dispatch: rewardDispatch } = useContext(
    RewardContext,
  )

  const { state: formState, dispatch: formDispatch } = useContext(
    RewardFormContext,
  )

  useEffect(() => {
    if (route?.params?.reward) formDispatch(route.params.reward)
  }, [route?.params?.reward])

  const resetForm = () => {
    formDispatch(initState)
  }

  const submitForm = (type: RewardActionTypes) => {
    if (validateForm(formState)) {
      const id = !route?.params?.reward
        ? `${rewardState.rewards.length + 1}`
        : route.params.reward.id

      rewardDispatch({
        type,
        payload: {
          reward: {
            ...formState,
            id,
          },
        },
      })
      resetForm()
      navigation.goBack()
    }
  }

  const onCancelPress = () => {
    resetForm()
    navigation.goBack()
  }

  const onSubmitPress = () => submitForm(RewardActionTypes.AddReward)

  const onUpdatePress = () => submitForm(RewardActionTypes.UpdateReward)

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

            {!rewardState.editMode ? (
              <TouchableOpacity onPress={onSubmitPress}>
                <Text style={[styles.buttonText, styles.submitButton]}>
                  Submit
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onUpdatePress}>
                <Text style={[styles.buttonText, styles.updateButton]}>
                  Update
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export const RewardForm: FC = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <RewardFormProvider>
        <Form />
      </RewardFormProvider>
    </SafeAreaView>
  )
}
