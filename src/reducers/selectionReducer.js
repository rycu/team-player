import { 
	UPDATE_TEAM_NAME,
	SELECT_PLAYER, 
	REMOVE_PLAYER
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

		case SELECT_PLAYER:

			var newplayersArr1 = state.selection__players.slice();
			
			newplayersArr1.push(action.id);
			
			return Object.assign({}, state, {
				selection__players: newplayersArr1
			})


		case REMOVE_PLAYER:

			var newplayersArr2 = state.selection__players.slice();

			var  i= newplayersArr2.indexOf(action.id);
			if(i !== -1) {
				newplayersArr2.splice(i, 1);
			}
			
			return Object.assign({}, state, {
				selection__players: newplayersArr2
			})

		default:
      		return state
	}


}