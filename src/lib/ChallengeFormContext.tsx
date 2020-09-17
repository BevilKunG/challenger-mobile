import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

interface IChallengeFormState {
  name: string
  point: number
}

interface IChallengeFormContext {
  state: IChallengeFormState
  dispatch: Dispatch<Partial<IChallengeFormState>>
}

interface IChallengeFormProviderProps {
  children: any
}

type ValidateForm = (state: IChallengeFormState) => boolean

export const initState: IChallengeFormState = {
  name: '',
  point: 0,
}

export const ChallengeFormContext = createContext<IChallengeFormContext>({
  state: initState,
  dispatch: () => null,
})

export const reducer: Reducer<
  IChallengeFormState,
  Partial<IChallengeFormState>
> = (prev, current) => {
  return {
    ...prev,
    ...current,
  }
}

export const ChallengeFormProvider: FC<IChallengeFormProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <ChallengeFormContext.Provider value={{ state, dispatch }}>
      {children}
    </ChallengeFormContext.Provider>
  )
}

export const validateForm: ValidateForm = ({ name, point }) => {
  const nameNotEmpty = /^.+$/g.test(name)
  const pointOnlyNumber = !isNaN(point)
  const pointGreaterThanZero = point > 0

  return nameNotEmpty && pointOnlyNumber && pointGreaterThanZero
}
