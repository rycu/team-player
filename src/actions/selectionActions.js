import * as types from '../constants/ActionTypes'

export const updateTeamName = nameTxt => ({

		type: types.UPDATE_TEAM_NAME, 
		nameTxt	
})

export const selectPlayer = id => ({

		type: types.SELECT_PLAYER, 
		id
})

export const removePlayer = playerId => ({

		type: types.REMOVE_PLAYER, 
		playerId
})