import { Challenge } from '../ChallengeContext'
import {
  reducer,
  initState,
  ConfirmActionTypes,
  ConfirmTypes,
} from '../ConfirmContext'
import { Reward } from '../RewardContext'

describe('confirm reducer test', () => {
  it('show confirm challenge modal should be update state', () => {
    const challenge: Challenge = {
      id: '1',
      name: 'Challenge #1',
      point: 100,
    }
    const resultState = reducer(initState, {
      type: ConfirmActionTypes.ShowModal,
      payload: {
        confirmType: ConfirmTypes.ConfirmChallenge,
        challenge,
      },
    })

    describe('modal should be visible', () => {
      expect(resultState.modalVisible).toBeTruthy()
    })

    describe('confirm type should not be change', () => {
      expect(resultState.confirmType).toEqual(ConfirmTypes.ConfirmChallenge)
    })

    describe('modal should contain challenge detail', () => {
      expect(resultState.challenge).not.toBeNull()
    })
  })

  it('show confirm reward modal should be update state', () => {
    const reward: Reward = {
      id: '1',
      name: 'Reward #1',
      point: 100,
    }
    const resultState = reducer(initState, {
      type: ConfirmActionTypes.ShowModal,
      payload: {
        confirmType: ConfirmTypes.ConfirmReward,
        reward,
      },
    })

    describe('modal should be visible', () => {
      expect(resultState.modalVisible).toBeTruthy()
    })

    describe('confirm type should not be change', () => {
      expect(resultState.confirmType).toEqual(ConfirmTypes.ConfirmReward)
    })

    describe('modal should contain challenge detail', () => {
      expect(resultState.reward).not.toBeNull()
    })
  })

  it('hide modal should be update state', () => {
    const resultState = reducer(initState, {
      type: ConfirmActionTypes.HideModal,
    })

    describe('modal should be hiden', () => {
      expect(resultState.modalVisible).toBeFalsy()
    })

    describe('modal should not be contain challenge detail', () => {
      expect(resultState.challenge).toBeNull()
    })
  })
})
