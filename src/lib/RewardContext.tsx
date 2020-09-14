import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IRewardProviderProps {
  children: any
}

export type Reward = {
  name: string
  point: number
}

interface IRewardState {
  rewards: Reward[]
}

export enum RewardActionTypes {
  AddReward = 'ADD_REWARD',
  UpdateReward = 'UPDATE_REWARD',
  DeleteReward = 'DELETE_REWARD',
}

type RewardAction = {
  type: RewardActionTypes
  payload: Reward
}

interface IRewardContext {
  state: IRewardState
  dispatch: Dispatch<RewardAction>
}

const initState: IRewardState = {
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
}

export const RewardContext = createContext<IRewardContext>({
  state: initState,
  dispatch: () => null,
})

const reducer: Reducer<IRewardState, RewardAction> = (state, action) => {
  const { rewards } = state
  switch (action.type) {
    case RewardActionTypes.AddReward:
      return {
        ...state,
        rewards: [...rewards, action.payload],
      }
    default:
      return state
  }
}

export const RewardProvider: FC<IRewardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <RewardContext.Provider value={{ state, dispatch }}>
      {children}
    </RewardContext.Provider>
  )
}
