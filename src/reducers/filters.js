import { ADD_NAME_FILTER, ADD_CLUB_FILTER, ADD_POSITION_FILTER } from '../constants/ActionTypes'

const initialState = 
  {
    filter__name: '',
    filter__club: 0,
    filter__position: ['S','M','D','G']

  };

//ES6 default arguments syntax for state arg
export default function filters(state = initialState, action) {
	switch (action.type) {

		case ADD_NAME_FILTER:

			// using ES6 method Object.assign()
			return Object.assign({}, state, {
				filter__name: action.nameTxt
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
				filter__club: action.clubId
			})


		case ADD_POSITION_FILTER:

			var newPosArr = state.filter__position.slice();

			if(action.checked === false){
				var i = newPosArr.indexOf(action.id);
				if(i !== -1) {
					newPosArr.splice(i, 1);
				}
			}else{
				newPosArr.push(action.id);
			}

			console.log(action.id);

			return Object.assign({}, state, {
				filter__position: newPosArr
			})


		default:
      		return state
	}


}