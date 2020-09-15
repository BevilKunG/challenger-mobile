import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IRewardFormProviderProps {
  children: any
}

export interface IRewardFormState {
  name: string
  point: number
}

interface IRewardFormContext {
  state: IRewardFormState
  dispatch: Dispatch<Partial<IRewardFormState>>
}

type ValidateForm = (state: IRewardFormState) => boolean

export const reducer: Reducer<IRewardFormState, Partial<IRewardFormState>> = (
  prev,
  current,
) => {
  return {
    ...prev,
    ...current,
  }
}

export const initState: IRewardFormState = {
  name: '',
  point: 0,
}

export const RewardFormContext = createContext<IRewardFormContext>({
  state: initState,
  dispatch: () => null,
})

export const RewardFormProvider: FC<IRewardFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <RewardFormContext.Provider value={{ state, dispatch }}>
      {children}
    </RewardFormContext.Provider>
  )
}

export const validateForm: ValidateForm = ({ name, point }) => {
  const nameNotEmpty = /^.+$/g.test(name)
  const pointOnlyNumber = !isNaN(point)
  const pointGreaterThanZero = point > 0

  return nameNotEmpty && pointOnlyNumber && pointGreaterThanZero
}
