import { 
	UPDATE_TEAM_NAME,
	TOGGLE_PLAYER_SELECT
} from '../constants/ActionTypes'

const initialState = 
  {
    selection__name: 'MY WINNING XI',
    selection__players: [],
    selection__purse: 500,
    selection__spent: 0,

  };

export default function selection(state = initialState, action) {
	switch (action.type) {

		case UPDATE_TEAM_NAME:

			return Object.assign({}, state, {
				selection__name: action.nameTxt
			})


		case TOGGLE_PLAYER_SELECT:

			var newplayersArr = state.selection__players.slice();

			if(newplayersArr.includes(action.id) === true){
				var  i= newplayersArr.indexOf(action.id);
				newplayersArr.splice(i, 1);
			}else{
				newplayersArr.push(action.id);
			}
			
			return Object.assign({}, state, {
				selection__players: newplayersArr
			})


		default:
      		return state
	}


}