import * as types from '../constants/ActionTypes'

export const updateTeamName = nameTxt => ({

		type: types.UPDATE_TEAM_NAME, 
		nameTxt	
})

export const togglePlayerSelect = id => ({

		type: types.TOGGLE_PLAYER_SELECT, 
		id
})