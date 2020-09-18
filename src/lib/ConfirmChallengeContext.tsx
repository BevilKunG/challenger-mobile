import React, { FC, createContext, useReducer, Dispatch, Reducer } from 'react'

import { Challenge } from './ChallengeContext'

interface IConfirmChallengeProviderProps {
  children: any
}

export enum ConfirmChallengeActionTypes {
  ShowModal = 'SHOW_MODAL',
  HideModal = 'HIDE_MODAL',
}

type ConfirmChallengeActionPayload = {
  challenge: Challenge
}

type ConfirmChallengeAction = {
  type: ConfirmChallengeActionTypes
  payload?: ConfirmChallengeActionPayload
}

interface IConfirmChallengeContext {
  state: any
  dispatch: Dispatch<ConfirmChallengeAction>
}

interface IConfirmChallengeState {
  modalVisible: boolean
  challenge: Challenge | null
}

const initState: IConfirmChallengeState = {
  modalVisible: false,
  challenge: null,
}

const reducer: Reducer<IConfirmChallengeState, ConfirmChallengeAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ConfirmChallengeActionTypes.ShowModal:
      if (action.payload === null || action.payload?.challenge === undefined) {
        break
      }
      return {
        ...state,
        modalVisible: true,
        challenge: action.payload.challenge,
      }

    case ConfirmChallengeActionTypes.HideModal:
      return {
        ...state,
        modalVisible: false,
        challenge: null,
      }
  }
  return state
}

export const ConfirmChallengeContext = createContext<IConfirmChallengeContext>({
  state: initState,
  dispatch: () => null,
})

export const ConfirmChallengeProvider: FC<IConfirmChallengeProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <ConfirmChallengeContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfirmChallengeContext.Provider>
  )
}
