import React, { FC, createContext } from 'react'

import { Reward } from '../components/RewardCard'

interface IRewardCardProviderProps {
  children: any
  reward: Reward
}

interface IRewardCardContext {
  reward: Reward | null
}

const initialProps = {
  reward: null,
}

export const RewardCardContext = createContext<Partial<IRewardCardContext>>(
  initialProps,
)

export const RewardCardProvider: FC<IRewardCardProviderProps> = ({
  children,
  reward,
}) => {
  return (
    <RewardCardContext.Provider value={{ reward }}>
      {children}
    </RewardCardContext.Provider>
  )
}
