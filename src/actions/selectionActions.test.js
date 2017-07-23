import * as types from '../constants/ActionTypes'
import * as actions from './selectionActions'

describe('selection actions', () => {

	it('updateTeamName should create UPDATE_TEAM_NAME action', () => {
		expect(
			actions.updateTeamName('TEST NAME')
		).toEqual({
			type: types.UPDATE_TEAM_NAME,
			nameTxt: 'TEST NAME'
		})
	})

	it('togglePlayerSelect should create TOGGLE_PLAYER_SELECT action', () => {
		expect(
			actions.togglePlayerSelect('TEST_PLAYER_ID')
		).toEqual({
			type: types.TOGGLE_PLAYER_SELECT,
			id: 'TEST_PLAYER_ID'
		})
	})

})