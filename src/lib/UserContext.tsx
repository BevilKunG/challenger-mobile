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
}

type UserActionPayload = {
  user: User | null
}

type UserAction = {
  type: UserActionTypes
  payload: UserActionPayload
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
  const { user } = action.payload
  switch (action.type) {
    case UserActionTypes.SetUser:
      return {
        ...state,
        user,
      }

    default:
      return state
  }
}

export const UserProvider: FC<IUserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
