import { reducer, initState, UserActionTypes } from '../UserContext'

describe('user reducer test', () => {
  it('set null to user, user should be null', () => {
    const resultState = reducer(initState, {
      type: UserActionTypes.SetUser,
      payload: {
        user: null,
      },
    })

    expect(resultState.user).toBeNull()
  })

  it('set user, user state should be update', () => {
    const user = {
      id: 'uid_1',
      name: 'user_1',
      point: 100,
    }

    const resultState = reducer(initState, {
      type: UserActionTypes.SetUser,
      payload: {
        user,
      },
    })

    expect(resultState.user).toEqual(user)
  })

  it('increase point, point state should be update', () => {
    const user = {
      id: 'uid_1',
      name: 'user_1',
      point: 100,
    }
    const point = 200

    const prevState = {
      ...initState,
      user,
    }

    describe('user should not be null when increase point', () => {
      const resultState = reducer(prevState, {
        type: UserActionTypes.IncresePoint,
        payload: {
          point,
        },
      })
      expect(resultState.user).not.toBeNull()
    })

    describe('point state should not be negative', () => {
      const resultState = reducer(prevState, {
        type: UserActionTypes.IncresePoint,
        payload: {
          point,
        },
      })
      if (resultState.user) {
        expect(resultState.user.point).not.toBeLessThan(0)
      }
    })

    describe('point state should be correct', () => {
      const resultState = reducer(prevState, {
        type: UserActionTypes.IncresePoint,
        payload: {
          point,
        },
      })
      if (resultState.user) {
        expect(resultState.user.point).toEqual(user.point + point)
      }
    })
  })

  it('decrease point, point state should be update', () => {
    const user = {
      id: 'uid_1',
      name: 'user_1',
      point: 200,
    }

    const prevState = {
      ...initState,
      user,
    }

    describe('user should not be null when decrease point', () => {
      const point = 100
      const resultState = reducer(prevState, {
        type: UserActionTypes.DecreasePoint,
        payload: {
          point,
        },
      })
      expect(resultState.user).not.toBeNull()
    })

    describe('point state should not be negative', () => {
      const point = 100
      const resultState = reducer(prevState, {
        type: UserActionTypes.DecreasePoint,
        payload: {
          point,
        },
      })
      if (resultState.user) {
        expect(resultState.user.point).not.toBeLessThan(0)
      }
    })

    describe('point state should be correct', () => {
      const point = 100
      const resultState = reducer(prevState, {
        type: UserActionTypes.DecreasePoint,
        payload: {
          point,
        },
      })
      if (resultState.user) {
        expect(resultState.user.point).toEqual(user.point - point)
      }
    })

    describe('decreasing point equal user point, updated point should be 0', () => {
      const point = user.point
      const resultState = reducer(prevState, {
        type: UserActionTypes.DecreasePoint,
        payload: {
          point,
        },
      })
      if (resultState.user) {
        expect(resultState.user.point).toEqual(0)
      }
    })
  })
})
