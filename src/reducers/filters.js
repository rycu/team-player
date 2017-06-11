import { ADD_NAME_FILTER, ADD_CLUB_FILTER } from '../constants/ActionTypes'

const initialState = 
  {
    nameFilter: '',
    clubFilter: 0,
  };

//ES6 default arguments syntax for state arg
export default function filters(state = initialState, action) {
	switch (action.type) {

		case ADD_NAME_FILTER:

			// using ES6 method Object.assign()
			return Object.assign({}, state, {
				nameFilter: action.nameTxt
			})

			// return
			// 	{
			// 		nameFilter: action.text
			// 	}, ...state
			// 

			// return 
			// ...state,
			// 	{
			// 		nameFilter: action.text
			// 	}
			// 

		case ADD_CLUB_FILTER:

			return Object.assign({}, state, {
				clubFilter: action.clubId
			})


		default:
      		return state
	}


}