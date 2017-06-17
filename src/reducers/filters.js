import { 
	UPDATE_NAME_FILTER, 
	UPDATE_CLUB_FILTER, 
	UPDATE_POSITION_FILTER, 
	UPDATE_DUAL_RANGE_FILTER
} from '../constants/ActionTypes'

const initialState = 
  {
    filters__name: '',
    filters__club: 0,
    filters__position: ['Striker','Midfielder','Defender','Goalkeeper'],
    filters__price: {lowVal: 5, highVal: 20},
    filters__rank: {lowVal: 20, highVal: 100} 
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

			var newpositionArr = state.filters__position.slice();

			if(action.checked === false){
				var i = newpositionArr.indexOf(action.id);
				if(i !== -1) {
					newpositionArr.splice(i, 1);
				}
			}else{
				newpositionArr.push(action.id);
			}

			console.log(action.id);

			return Object.assign({}, state, {
				filters__position: newpositionArr
			})


		case UPDATE_DUAL_RANGE_FILTER:

			var lowVal = action.lowVal;
			var highVal = action.highVal;

			return Object.assign({}, state, {
				['filters__'+action.componentId]: {lowVal: lowVal, highVal: highVal} 
			})


		default:
      		return state
	}


}