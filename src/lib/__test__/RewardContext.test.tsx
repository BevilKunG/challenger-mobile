import { reducer, initState, RewardActionTypes, Reward } from '../RewardContext'

describe('reward shared reducer testing', () => {
  it('add reward should be add reward in rewards state', () => {
    const { rewards } = initState
    const reward: Reward = {
      name: 'Reward #1',
      point: 100,
    }

    expect(
      reducer(initState, {
        type: RewardActionTypes.AddReward,
        payload: {
          reward,
        },
      }),
    ).toEqual({
      ...initState,
      rewards: [...rewards, reward],
    })
  })
})
