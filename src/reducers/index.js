import { combineReducers } from 'redux'
import filters from './filtersReducer'
import apiData from './apiDataReducer'

const rootReducer = combineReducers({
  filters, apiData
})

export default rootReducer