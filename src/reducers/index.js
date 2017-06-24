import { combineReducers } from 'redux'
import filters from './filters'
import playerList__reducers from './playerList__reducers'

const rootReducer = combineReducers({
  filters, playerList__reducers
})

export default rootReducer