import { combineReducers } from 'redux'
import {
  SELECT_PLAYER_LIST,
  INVALIDATE_PLAYER_LIST,
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS
} from '../constants/ActionTypes'

function selectedPlayerList(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_PLAYER_LIST:
      return action.playerList
    default:
      return state
  }
}

function players(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_PLAYER_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_PLAYERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_PLAYERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.players,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function playersByPlayerList(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_PLAYER_LIST:
    case RECEIVE_PLAYERS:
    case REQUEST_PLAYERS:
      return Object.assign({}, state, {
        [action.playerList]: players(state[action.playerList], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  playersByPlayerList,
  selectedPlayerList
})

export default rootReducer

//The real world example goes even further, 
//showing how to create a reducer factory for parameterized pagination reducers.
//