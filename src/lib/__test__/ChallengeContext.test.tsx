import {
  reducer,
  initState,
  ChallengeActionTypes,
  Challenge,
} from '../ChallengeContext'

describe('challenge shared reducer testing', () => {
  it('add challenge should be update state', () => {
    const { challenges } = initState
    const challenge: Challenge = {
      id: `${challenges.length + 1}`,
      name: 'Challenge #1',
      point: 100,
    }
    const resultState = reducer(initState, {
      type: ChallengeActionTypes.AddChallenge,
      payload: {
        challenge,
      },
    })

    expect(resultState.challenges).toContain(challenge)
  })

  it('update challenge should be update state', () => {
    const { challenges } = initState
    const challenge: Challenge = {
      id: '1',
      name: 'Challenge #1',
      point: 20,
    }

    const notContainRewardID = !challenges.find(({ id }) => id === challenge.id)

    const prevState = {
      ...initState,
      challenges: notContainRewardID
        ? [...challenges, challenge]
        : challenges.map((item) =>
            item.id === challenge.id ? challenge : item,
          ),
    }

    describe('update challenge name should be update state', () => {
      const resultState = reducer(prevState, {
        type: ChallengeActionTypes.UpdateChallenge,
        payload: {
          challenge: {
            ...challenge,
            name: 'Challenge #2',
          },
        },
      })

      expect(
        resultState.challenges.find((item) => item.id === challenge.id),
      ).toEqual({
        ...challenge,
        name: 'Challenge #2',
      })
    })

    describe('update challenge point should be update state', () => {
      const resultState = reducer(prevState, {
        type: ChallengeActionTypes.UpdateChallenge,
        payload: {
          challenge: {
            ...challenge,
            point: 100,
          },
        },
      })

      expect(
        resultState.challenges.find((item) => item.id === challenge.id),
      ).toEqual({
        ...challenge,
        point: 100,
      })
    })
  })

  it('delete challenge should be update state', () => {
    const { challenges } = initState
    const challenge: Challenge = {
      id: '1',
      name: 'Challenge #1',
      point: 20,
    }

    const notContainRewardID = !challenges.find(({ id }) => id === challenge.id)

    const prevState = {
      ...initState,
      challenges: notContainRewardID
        ? [...challenges, challenge]
        : challenges.map((item) =>
            item.id === challenge.id ? challenge : item,
          ),
    }

    const resultState = reducer(prevState, {
      type: ChallengeActionTypes.DeleteChallenge,
      payload: {
        challenge,
      },
    })

    expect(resultState.challenges).not.toContain(challenge)
  })

  it('edit mode state should be equal edit mode in action payload', () => {
    expect(
      reducer(initState, {
        type: ChallengeActionTypes.SetEditMode,
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
        type: ChallengeActionTypes.SetEditMode,
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
