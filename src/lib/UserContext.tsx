import React, { FC, createContext, Dispatch, useReducer, Reducer } from 'react'

type User = {
  id: string
  name: string
  point: number
}

interface IUserState {
  user: User | null
}

interface IUserProviderProps {
  children: any
}

export enum UserActionTypes {
  SetUser = 'SET_USER',
  IncresePoint = 'INCREASE_POINT',
  DecreasePoint = 'DECREASE_POINT',
}

type UserActionPayload = {
  user: User | null
  point: number
}

type UserAction = {
  type: UserActionTypes
  payload: Partial<UserActionPayload>
}

interface IUserContext {
  state: IUserState
  dispatch: Dispatch<UserAction>
}

const initState: IUserState = {
  user: {
    id: 'uid_1',
    name: 'user_1',
    point: 100,
  },
}

export const UserContext = createContext<IUserContext>({
  state: initState,
  dispatch: () => null,
})

const reducer: Reducer<IUserState, UserAction> = (state, action) => {
  const { user, point } = action.payload
  switch (action.type) {
    case UserActionTypes.SetUser:
      if (user === undefined) break
      return {
        ...state,
        user,
      }

    case UserActionTypes.IncresePoint:
      if (point === undefined || !state.user) break
      return {
        ...state,
        user: {
          ...state.user,
          point: state.user.point + point,
        },
      }

    case UserActionTypes.DecreasePoint:
      if (point === undefined || !state.user) break
      return {
        ...state,
        user: {
          ...state.user,
          point: state.user.point - point,
        },
      }
  }
  return state
}

export const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
