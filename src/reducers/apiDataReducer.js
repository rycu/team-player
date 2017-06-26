import {
  INVALIDATE_DATA,
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS
} from '../constants/ActionTypes'

function players(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_DATA:
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

export default function apiData(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATA:
    case RECEIVE_PLAYERS:
    case REQUEST_PLAYERS:
      return Object.assign({}, state, {
        playerList: players(state["playerList"], action)
      })
    default:
      return state
  }
}

//The real world example goes even further, showing how to create a reducer factory for parameterized pagination reducers.