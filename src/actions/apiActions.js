import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

export function invalidateData() {
  return {
    type: types.INVALIDATE_DATA
  }
}

function requestPlayers() {
  return {
    type: types.REQUEST_PLAYERS
  }
}

function receivePlayers(json) {
  
  return {
    type: types.RECEIVE_PLAYERS,
    players: json.map(child => child),
    receivedAt: Date.now()
  }
}

function fetchPlayers() {
  return dispatch => {
    dispatch(requestPlayers())
    return fetch('./api_dummy/premElements.json')
      .then(response => response.json())
      .then(json => dispatch(receivePlayers(json)))
  }
}

function shouldFetchPlayers(state) {
  const players = state.apiData['playerList']
  if (!players) {
    return true
  } else if (players.isFetching) {
    return false
  } else {
    return players.didInvalidate
  }
}

export function fetchPlayersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPlayers(getState())) {
      return dispatch(fetchPlayers())
    } else {
      return Promise.resolve()
    }
  }
}