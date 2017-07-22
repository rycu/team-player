import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function invalidateData(dataName) {
  return {
    type: types.INVALIDATE_DATA,
    dataName
  }
}

function requestData(dataName) {
  return {
    type: types.REQUEST_DATA,
    dataName
  }
}

function receiveData(json, dataName) {
  return {
    type: types.RECEIVE_DATA,
    dataName,
    data_in: json.map(child => child),
    receivedAt: Date.now()
  }
}

function failedData(dataName) {
  return {
    type: types.FAILED_DATA,
    dataName
  }
}



//thunk action creators

function fetchData(dataName, dataSlug) {
  return dispatch => {
    dispatch(requestData(dataName))
    return fetch(`./api_dummy/${dataSlug}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveData(json, dataName)))
      .catch(function(error) {dispatch(failedData(dataName))})
  }
}

function shouldFetchData(dataName, state) {
  const data = state.apiData[dataName]
  if (!data) {
    return true
  } else if (data.isFetching) {
    return false
  } else {
    return data.didInvalidate
  }
}

export function fetchDataIfNeeded(dataName, dataSlug) {
  return (dispatch, getState) => {
    if (shouldFetchData(dataName, getState())) {
      return dispatch(fetchData(dataName, dataSlug))
    } else {
      return Promise.resolve()
    }
  }
}