import { Challenge } from '../ChallengeContext'
import {
  reducer,
  initState,
  ConfirmChallengeActionTypes,
} from '../ConfirmChallengeContext'

describe('confirm challenge reducer test', () => {
  it('show modal should be update state', () => {
    const challenge: Challenge = {
      id: '1',
      name: 'Challenge #1',
      point: 100,
    }
    const resultState = reducer(initState, {
      type: ConfirmChallengeActionTypes.ShowModal,
      payload: {
        challenge,
      },
    })

    describe('modal should be visible', () => {
      expect(resultState.modalVisible).toBeTruthy()
    })

    describe('modal should contain challenge detail', () => {
      expect(resultState.challenge).not.toBeNull()
    })
  })

  it('hide modal should be update state', () => {
    const resultState = reducer(initState, {
      type: ConfirmChallengeActionTypes.HideModal,
    })

    describe('modal should be hiden', () => {
      expect(resultState.modalVisible).toBeFalsy()
    })

    describe('modal should not be contain challenge detail', () => {
      expect(resultState.challenge).toBeNull()
    })
  })
})
