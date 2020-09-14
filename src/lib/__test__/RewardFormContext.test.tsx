import { validateForm, initState } from '../RewardFormContext'

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
