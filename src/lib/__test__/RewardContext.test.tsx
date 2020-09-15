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

  it('update reward should be update state', () => {
    const { rewards } = initState
    const reward: Reward = {
      id: '1',
      name: 'Reward #1',
      point: 20,
    }

    const notContainRewardID = !rewards.find(({ id }) => id === reward.id)

    const prevState = {
      ...initState,
      rewards: notContainRewardID
        ? [...rewards, reward]
        : rewards.map((item) => (item.id === reward.id ? reward : item)),
    }

    describe('update reward name should be update state', () => {
      expect(
        reducer(prevState, {
          type: RewardActionTypes.UpdateReward,
          payload: {
            reward: {
              ...reward,
              name: 'Reward #2',
            },
          },
        }),
      ).toEqual({
        ...prevState,
        rewards: rewards.map((item) =>
          item.id === reward.id
            ? {
                ...reward,
                name: 'Reward #2',
              }
            : item,
        ),
      })
    })

    describe('update reward point should be update state', () => {
      expect(
        reducer(prevState, {
          type: RewardActionTypes.UpdateReward,
          payload: {
            reward: {
              ...reward,
              point: 100,
            },
          },
        }),
      ).toEqual({
        ...prevState,
        rewards: rewards.map((item) =>
          item.id === reward.id
            ? {
                ...reward,
                point: 100,
              }
            : item,
        ),
      })
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
