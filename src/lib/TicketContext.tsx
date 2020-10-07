import React, { FC, createContext, useReducer, Reducer, Dispatch } from 'react'

export type Ticket = {
  id: string
  name: string
}

interface ITicketState {
  tickets: Ticket[]
}

type TicketActionPayload = {
  ticket: Ticket
}

export enum TicketActionTypes {
  AddTicket = 'ADD_TICKET',
  DeleteTicket = 'DELETE_TICKET',
}

type TicketAction = {
  type: TicketActionTypes
  payload: TicketActionPayload
}

interface ITicketContext {
  state: ITicketState
  dispatch: Dispatch<TicketAction>
}

interface ITicketProviderProp {
  children: any
}

const reducer: Reducer<ITicketState, TicketAction> = (state, action) => {
  const { tickets } = state
  switch (action.type) {
    case TicketActionTypes.AddTicket:
      return {
        ...state,
        tickets: [...tickets, action.payload.ticket],
      }

    case TicketActionTypes.DeleteTicket:
      return {
        ...state,
        tickets: tickets.filter(({ id }) => id !== action.payload.ticket.id),
      }

    default:
      return state
  }
}

const initState: ITicketState = {
  tickets: [],
}

export const TicketContext = createContext<ITicketContext>({
  state: initState,
  dispatch: () => null,
})

export const TicketProvider: FC<ITicketProviderProp> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  )
}
