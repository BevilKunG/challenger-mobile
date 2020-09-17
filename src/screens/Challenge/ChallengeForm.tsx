import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FC, useContext, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'
import normalize from 'react-native-normalize'

import { RootStackParamList } from '../../../App'
import {
  ChallengeContext,
  ChallengeActionTypes,
} from '../../lib/ChallengeContext'
import {
  ChallengeFormContext,
  ChallengeFormProvider,
  initState,
  validateForm,
} from '../../lib/ChallengeFormContext'

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
  updateButton: {
    color: '#eed202',
  },
})

type ChallengeFormStackProp = StackNavigationProp<
  RootStackParamList,
  'ChallengeForm'
>

type ChallengeFormRouteProp = RouteProp<RootStackParamList, 'ChallengeForm'>

const Form: FC = () => {
  const navigation = useNavigation<ChallengeFormStackProp>()
  const route = useRoute<ChallengeFormRouteProp>()
  const { state: challengeState, dispatch: challengeDispatch } = useContext(
    ChallengeContext,
  )
  const { state: formState, dispatch: formDispatch } = useContext(
    ChallengeFormContext,
  )

  useEffect(() => {
    if (route?.params?.challenge) formDispatch(route.params.challenge)
  }, [route?.params?.challenge])

  const resetForm = () => {
    formDispatch(initState)
  }

  const submitForm = (type: ChallengeActionTypes) => {
    if (validateForm(formState)) {
      const id = !route?.params?.challenge
        ? `${challengeState.challenges.length + 1}`
        : route.params.challenge.id

      challengeDispatch({
        type,
        payload: {
          challenge: {
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

  const onSubmitPress = () => {
    submitForm(ChallengeActionTypes.AddChallenge)
  }

  const onUpdatePress = () => {
    submitForm(ChallengeActionTypes.UpdateChallenge)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.formContainer]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={[styles.fieldContainer]}>
            <Text style={[styles.label]}>Challenge Name</Text>
            <TextInput
              style={[styles.textInput]}
              placeholder="Challenge Name"
              onChangeText={(name) => {
                formDispatch({ name })
              }}
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

            {!challengeState.editMode ? (
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

export const ChallengeForm = () => {
  return (
    <View style={[styles.container]}>
      <ChallengeFormProvider>
        <Form />
      </ChallengeFormProvider>
    </View>
  )
}
