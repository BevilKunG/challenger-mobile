import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IRewardProviderProps {
  children: any
}

export type Reward = {
  name: string
  point: number
}

type EditMode = boolean

interface IRewardState {
  rewards: Reward[]
  editMode: boolean
}

export enum RewardActionTypes {
  AddReward = 'ADD_REWARD',
  UpdateReward = 'UPDATE_REWARD',
  DeleteReward = 'DELETE_REWARD',
  SetEditMode = 'SET_EDIT_MODE',
}

type RewardActionPayload = {
  reward: Reward
  editMode: EditMode
}

type RewardAction = {
  type: RewardActionTypes
  payload: Partial<RewardActionPayload>
}

interface IRewardContext {
  state: IRewardState
  dispatch: Dispatch<RewardAction>
}

export const initState: IRewardState = {
  rewards: [
    {
      name: 'Reward #1',
      point: 20,
    },
    {
      name: 'Reward #2',
      point: 40,
    },
    {
      name: 'Reward #3',
      point: 60,
    },
    {
      name: 'Reward #4',
      point: 80,
    },
    {
      name: 'Reward #5',
      point: 120,
    },
  ],
  editMode: false,
}

export const RewardContext = createContext<IRewardContext>({
  state: initState,
  dispatch: () => null,
})

export const reducer: Reducer<IRewardState, RewardAction> = (state, action) => {
  const { rewards } = state
  switch (action.type) {
    case RewardActionTypes.AddReward:
      if (action.payload.reward === undefined) break
      return {
        ...state,
        rewards: [...rewards, action.payload.reward],
      }

    case RewardActionTypes.SetEditMode:
      if (action.payload.editMode === undefined) break
      return {
        ...state,
        editMode: action.payload.editMode,
      }
  }
  return state
}

export const RewardProvider: FC<IRewardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <RewardContext.Provider value={{ state, dispatch }}>
      {children}
    </RewardContext.Provider>
  )
}
