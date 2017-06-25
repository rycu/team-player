import { combineReducers } from 'redux'
import filters from './filters'
import apiData from './apiData'

const rootReducer = combineReducers({
  filters, apiData
})

export default rootReducer