import * as types from '../constants/ActionTypes'

//Action creator (func)
export const updateNameFilter = nameTxt => (
		
		//Action (obj)
		{ 
			//Action type (type: required prop)
			type: types.UPDATE_NAME_FILTER, 
			nameTxt
		}
)

export const updateClubFilter = clubId => ({ 

			type: types.UPDATE_CLUB_FILTER, 
			clubId
})

export const updatePositionFilter = (checked, id) => ({ 
			
			type: types.UPDATE_POSITION_FILTER, 
			checked,
			id
})

export const updatePriceFilter = (componentId, lowVal, highVal) => ({ 
			
			type: types.UPDATE_PRICE_FILTER, 
			componentId,
			lowVal,
			highVal
})

export const updateRankFilter = (componentId, lowVal, highVal) => ({ 
			
			type: types.UPDATE_RANK_FILTER, 
			componentId,
			lowVal,
			highVal
})

export const resetFilters = () => ({ 
			
			type: types.RESET_FILTERS, 
})
