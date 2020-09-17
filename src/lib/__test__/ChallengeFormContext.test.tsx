import { validateForm, initState, reducer } from '../ChallengeFormContext'

describe('validateForm function testing', () => {
  it('init form state should be false', () => {
    expect(validateForm(initState)).toBeFalsy()
  })

  it('challenge name should not be empty', () => {
    expect(validateForm({ name: '', point: 100 })).toBeFalsy()
  })

  it('challenge point should not be 0', () => {
    expect(validateForm({ name: 'Challenge #1', point: 0 })).toBeFalsy()
  })

  it('correct challenge name and point should be pass', () => {
    expect(validateForm({ name: 'Challenge #1', point: 100 })).toBeTruthy()
  })
})

describe('challenge form reducer testing', () => {
  it('empty current state, state should not be change', () => {
    expect(reducer(initState, {})).toEqual(initState)
  })

  it('challenge name should be update', () => {
    expect(reducer(initState, { name: 'Challenge #1' })).toEqual({
      ...initState,
      name: 'Challenge #1',
    })
  })

  it('challenge point should be update', () => {
    expect(reducer(initState, { point: 100 })).toEqual({
      ...initState,
      point: 100,
    })
  })

  it('challenge name and point should be update', () => {
    expect(reducer(initState, { name: 'Challenge #1', point: 100 })).toEqual({
      ...initState,
      name: 'Challenge #1',
      point: 100,
    })
  })
})
