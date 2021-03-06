import {
  INVALIDATE_DATA,
  REQUEST_DATA,
  RECEIVE_DATA,
  FAILED_DATA
} from '../constants/ActionTypes'

function prepStateUpdate(
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
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data_in,
        lastUpdated: action.receivedAt
      })
    default: //FAILED_DATA
      return Object.assign({}, state, {
        isFetching: false
      })
  }
}

export default function apiData(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATA:
    case RECEIVE_DATA:
    case REQUEST_DATA:
    case FAILED_DATA:
      //console.log(action);
      return Object.assign({}, state, {
        [action.dataName]: prepStateUpdate(state[action.dataName], action)
      })
    default:
      return state
  }
}