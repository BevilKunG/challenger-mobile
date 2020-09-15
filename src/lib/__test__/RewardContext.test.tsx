import { reducer, initState, RewardActionTypes, Reward } from '../RewardContext'

describe('reward shared reducer testing', () => {
  it('add reward should be update state', () => {
    const { rewards } = initState
    const reward: Reward = {
      id: `${rewards.length + 1}`,
      name: 'Reward #1',
      point: 100,
    }
    const resultState = reducer(initState, {
      type: RewardActionTypes.AddReward,
      payload: {
        reward,
      },
    })

    expect(resultState.rewards).toContain(reward)
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
      const resultState = reducer(prevState, {
        type: RewardActionTypes.UpdateReward,
        payload: {
          reward: {
            ...reward,
            name: 'Reward #2',
          },
        },
      })

      expect(resultState.rewards.find((item) => item.id === reward.id)).toEqual(
        {
          ...reward,
          name: 'Reward #2',
        },
      )
    })

    describe('update reward point should be update state', () => {
      const resultState = reducer(prevState, {
        type: RewardActionTypes.UpdateReward,
        payload: {
          reward: {
            ...reward,
            point: 100,
          },
        },
      })

      expect(resultState.rewards.find((item) => item.id === reward.id)).toEqual(
        {
          ...reward,
          point: 100,
        },
      )
    })
  })

  it('delete reward should be update state', () => {
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

    const resultState = reducer(prevState, {
      type: RewardActionTypes.DeleteReward,
      payload: {
        reward,
      },
    })

    expect(resultState.rewards).not.toContain(reward)
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
