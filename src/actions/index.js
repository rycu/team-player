import * as types from '../constants/ActionTypes'

//ACTION CREATOR (func)
export const addNameFilter = nameTxt => (
		
		//ACTION (obj)
		{ 
			//ACTION TYPE (requied prop, val sting)
			type: types.ADD_NAME_FILTER, 
			nameTxt 
		}
)

export const addClubFilter = clubId => ({ 
			
			type: types.ADD_CLUB_FILTER, 
			clubId

})



