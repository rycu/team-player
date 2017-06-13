import { UPDATE_NAME_FILTER, UPDATE_CLUB_FILTER, UPDATE_POSITION_FILTER } from '../constants/ActionTypes'

const initialState = 
  {
    filters__name: '',
    filters__club: 0,
    filters__position: ['Striker','Midfielder','Defender','Goalkeeper']

  };

//ES6 default arguments syntax for state arg
export default function filters(state = initialState, action) {
	switch (action.type) {

		case UPDATE_NAME_FILTER:

			// using ES6 method Object.assign()
			return Object.assign({}, state, {
				filters__name: action.nameTxt
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

		case UPDATE_CLUB_FILTER:

			return Object.assign({}, state, {
				filters__club: action.clubId
			})


		case UPDATE_POSITION_FILTER:

			var newPosArr = state.filters__position.slice();

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
				filters__position: newPosArr
			})


		default:
      		return state
	}


}