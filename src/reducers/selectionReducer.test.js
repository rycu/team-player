import selectionReducer from './selectionReducer'
import * as types from '../constants/ActionTypes'

describe('filters reducer', () => {
	it('should handle initial state', () => {
		expect(
			selectionReducer(undefined, {})
		).toEqual(
			{
				selection__name: 'MY WINNING XI',
				selection__players: [],
				selection__purse: 500,
				selection__spent: 0,
			}
		)
	})

	it('should handle UPDATE_TEAM_NAME', () => {
		
		//Edit name
		expect(
			selectionReducer({}, {
				type: types.UPDATE_TEAM_NAME,
				nameTxt: 'TEST NAME'
			})
		).toEqual(
			{
				selection__name: 'TEST NAME'
			}
		)

	})
	
	it('should handle TOGGLE_PLAYER_SELECT', () => {
		
		//Add player
		expect(
			selectionReducer({selection__players: [1, 2, 3]}, {
				type: types.TOGGLE_PLAYER_SELECT,
				id: 4
			})
		).toEqual(
			{
				selection__players: [1, 2, 3, 4]
			}
		)

		//Remove player
		expect(
			selectionReducer({selection__players: [1, 2, 3, 4]}, {
				type: types.TOGGLE_PLAYER_SELECT,
				id: 3
			})
		).toEqual(
			{
				selection__players: [1, 2, 4]
			}
		)

	})



})

