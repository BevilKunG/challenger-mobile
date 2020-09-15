import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IRewardProviderProps {
  children: any
}

export type Reward = {
  id: string
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
      id: '1',
      name: 'Reward #1',
      point: 20,
    },
    {
      id: '2',
      name: 'Reward #2',
      point: 40,
    },
    {
      id: '3',
      name: 'Reward #3',
      point: 60,
    },
    {
      id: '4',
      name: 'Reward #4',
      point: 80,
    },
    {
      id: '5',
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
  const { reward, editMode } = action.payload

  switch (action.type) {
    case RewardActionTypes.AddReward:
      if (reward === undefined) break
      return {
        ...state,
        rewards: [...rewards, reward],
      }

    case RewardActionTypes.UpdateReward:
      if (reward === undefined) break
      return {
        ...state,
        rewards: rewards.map((item) => (item.id === reward.id ? reward : item)),
      }

    case RewardActionTypes.DeleteReward:
      if (reward === undefined) break
      return {
        ...state,
        rewards: rewards.filter((item) => item.id !== reward.id),
      }

    case RewardActionTypes.SetEditMode:
      if (editMode === undefined) break
      return {
        ...state,
        editMode,
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
