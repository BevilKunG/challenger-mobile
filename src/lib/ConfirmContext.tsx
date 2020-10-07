import React, { FC, createContext, useReducer, Dispatch, Reducer } from 'react'

import { Challenge } from './ChallengeContext'
import { Reward } from './RewardContext'
import { Ticket } from './TicketContext'

interface IConfirmProviderProp {
  children: any
}

export enum ConfirmActionTypes {
  ShowModal = 'SHOW_MODAL',
  HideModal = 'HIDE_MODAL',
}

export enum ConfirmTypes {
  ConfirmChallenge = 'CONFIRM_CHALLENGE',
  ConfirmReward = 'CONFIRM_REWARD',
  ConfirmTicket = 'CONFIRM_TICKET',
}

type ConfirmActionPayload = {
  confirmType: ConfirmTypes
  challenge?: Challenge
  reward?: Reward
  ticket?: Ticket
}

type ConfirmAction = {
  type: ConfirmActionTypes
  payload?: ConfirmActionPayload
}

interface IConfirmState {
  modalVisible: boolean
  confirmType: ConfirmTypes | null
  challenge: Challenge | null
  reward: Reward | null
  ticket: Ticket | null
}

interface IConfirmContext {
  state: IConfirmState
  dispatch: Dispatch<ConfirmAction>
}

export const initState: IConfirmState = {
  modalVisible: false,
  confirmType: null,
  challenge: null,
  reward: null,
  ticket: null,
}

export const reducer: Reducer<IConfirmState, ConfirmAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ConfirmActionTypes.ShowModal:
      if (
        action.payload === null ||
        (action.payload?.challenge === undefined &&
          action.payload?.reward === undefined &&
          action.payload?.ticket === undefined)
      ) {
        break
      }
      return {
        ...state,
        modalVisible: true,
        ...action.payload,
      }

    case ConfirmActionTypes.HideModal:
      return initState
  }
  return state
}

export const ConfirmContext = createContext<IConfirmContext>({
  state: initState,
  dispatch: () => null,
})

export const ConfirmProvider: FC<IConfirmProviderProp> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <ConfirmContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfirmContext.Provider>
  )
}
