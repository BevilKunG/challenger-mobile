import { validateForm, initState, reducer } from '../RewardFormContext'

describe('validateForm function testing', () => {
  it('init form state should be false', () => {
    expect(validateForm(initState)).toBeFalsy()
  })

  it('reward name should not be empty', () => {
    expect(validateForm({ name: '', point: 100 })).toBeFalsy()
  })

  it('reward point should not be 0', () => {
    expect(validateForm({ name: 'Reward #1', point: 0 })).toBeFalsy()
  })

  it('correct reward name and point should be pass', () => {
    expect(validateForm({ name: 'Reward #1', point: 100 })).toBeTruthy()
  })
})

describe('reward form reducer testing', () => {
  it('empty current state, state should not be change', () => {
    expect(reducer(initState, {})).toEqual(initState)
  })

  it('reward name should be update', () => {
    expect(reducer(initState, { name: 'Reward #1' })).toEqual({
      ...initState,
      name: 'Reward #1',
    })
  })

  it('reward point should be update', () => {
    expect(reducer(initState, { point: 100 })).toEqual({
      ...initState,
      point: 100,
    })
  })

  it('reward name and point should be update', () => {
    expect(reducer(initState, { name: 'Reward #1', point: 100 })).toEqual({
      ...initState,
      name: 'Reward #1',
      point: 100,
    })
  })
})
