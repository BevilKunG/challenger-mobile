import { reducer, initState, RewardActionTypes, Reward } from '../RewardContext'

describe('reward shared reducer testing', () => {
  it('add reward should be add reward in rewards state', () => {
    const { rewards } = initState
    const reward: Reward = {
      id: '1',
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

  it('edit mode state should be equal edit mode in action payload', () => {
    expect(
      reducer(initState, {
        type: RewardActionTypes.SetEditMode,
        payload: {
          editMode: true,
        },
      }),
    ).toEqual({
      ...initState,
      editMode: true,
    })

    expect(
      reducer(initState, {
        type: RewardActionTypes.SetEditMode,
        payload: {
          editMode: false,
        },
      }),
    ).toEqual({
      ...initState,
      editMode: false,
    })
  })
})
