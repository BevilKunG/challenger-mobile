import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

export type Challenge = {
  id: string
  name: string
  point: number
}

export enum ChallengeActionTypes {
  AddChallenge = 'ADD_CHALLENGE',
  UpdateChallenge = 'UPDATE_CHALLENGE',
  DeleteChallenge = 'DELETE_CHALLENGE',
  SetEditMode = 'SET_EDIT_MODE',
}

type ChallengeActionPayload = {
  challenge: Challenge
  editMode: EditMode
}

type ChallengeAction = {
  type: ChallengeActionTypes
  payload: Partial<ChallengeActionPayload>
}

interface IChallengeContext {
  state: IChallengeState
  dispatch: Dispatch<ChallengeAction>
}

type EditMode = boolean

interface IChallengeState {
  challenges: Challenge[]
  editMode: EditMode
}

interface IChallengeProviderProp {
  children: any
}

export const initState: IChallengeState = {
  challenges: [
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
  ],
  editMode: false,
}

export const ChallengeContext = createContext<IChallengeContext>({
  state: initState,
  dispatch: () => null,
})

export const reducer: Reducer<IChallengeState, ChallengeAction> = (
  state,
  action,
) => {
  const { challenges } = state
  const { challenge, editMode } = action.payload
  switch (action.type) {
    case ChallengeActionTypes.AddChallenge:
      if (challenge === undefined) break
      return {
        ...state,
        challenges: [...challenges, challenge],
      }

    case ChallengeActionTypes.UpdateChallenge:
      if (challenge === undefined) break
      return {
        ...state,
        challenges: challenges.map((item) =>
          item.id === challenge.id ? challenge : item,
        ),
      }

    case ChallengeActionTypes.DeleteChallenge:
      if (challenge === undefined) break
      return {
        ...state,
        challenges: challenges.filter((item) => item.id !== challenge.id),
      }

    case ChallengeActionTypes.SetEditMode:
      if (editMode === undefined) break
      return {
        ...state,
        editMode,
      }
  }
  return state
}

export const ChallengeProvider: FC<IChallengeProviderProp> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <ChallengeContext.Provider value={{ state, dispatch }}>
      {children}
    </ChallengeContext.Provider>
  )
}
