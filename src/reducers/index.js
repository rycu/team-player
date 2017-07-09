import { combineReducers } from 'redux'
import filters from './filtersReducer'
import apiData from './apiDataReducer'
import selection from './selectionReducer'

const rootReducer = combineReducers({
  filters, apiData, selection
})

export default rootReducer