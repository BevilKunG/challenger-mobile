import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IRewardFormProvider {
  children: any
}

interface IRewardFormState {
  name: string
  point: number
}

interface IRewardFormContext {
  state?: IRewardFormState
  dispatch?: Dispatch<Partial<IRewardFormState>>
}

export const RewardFormContext = createContext<IRewardFormContext>({})

const reducer: Reducer<IRewardFormState, Partial<IRewardFormState>> = (
  prev,
  current,
) => {
  return {
    ...prev,
    ...current,
  }
}

const initState: IRewardFormState = {
  name: '',
  point: 0,
}

export const RewardFormProvider: FC<IRewardFormProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <RewardFormContext.Provider value={{ state, dispatch }}>
      {children}
    </RewardFormContext.Provider>
  )
}
