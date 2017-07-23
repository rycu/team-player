import { 
	UPDATE_NAME_FILTER, 
	UPDATE_CLUB_FILTER, 
	UPDATE_POSITION_FILTER,
	UPDATE_PRICE_FILTER,
	UPDATE_RANK_FILTER,
	RESET_FILTERS
} from '../constants/ActionTypes'

const initialState = 
  {
    filters__name: '',
    filters__club: 0,
    filters__position: [1, 2, 3, 4],
    filters__price: {lowVal: 10, highVal: 140},
    filters__rank: {lowVal: 0, highVal: 10} 
  };

//ES6 default argument syntax for state
export default function filters(state = initialState, action) {
	switch (action.type) {

		case UPDATE_NAME_FILTER:

			// using ES6 method Object.assign()
			return Object.assign({}, state, {
				filters__name: action.nameTxt
			})


		case UPDATE_CLUB_FILTER:

			return Object.assign({}, state, {
				filters__club: action.clubId
			})


		case UPDATE_POSITION_FILTER:

			var newpositionArr = state.filters__position.slice();

			if(action.checked === false){
				var  i = newpositionArr.indexOf(action.id);
				newpositionArr.splice(i, 1);
			}else{
				newpositionArr.push(action.id);
			}
			
			return Object.assign({}, state, {
				filters__position: newpositionArr
			})

		case UPDATE_PRICE_FILTER:

			return Object.assign({}, state, {
				'filters__price': {lowVal: action.lowVal, highVal: action.highVal} 
			})


		case UPDATE_RANK_FILTER:

			return Object.assign({}, state, {
				'filters__rank': {lowVal: action.lowVal, highVal: action.highVal} 
			})


		case RESET_FILTERS:

			return Object.assign({}, state, 
				initialState 
			)

		default:
      		return state
	}


}