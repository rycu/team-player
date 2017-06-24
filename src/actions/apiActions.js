import * as types from '../constants/ActionTypes'

import fetch from 'isomorphic-fetch'
//Be aware that any fetch polyfill assumes a Promise polyfill is already present. 


export function selectPlayerList(playerList) {
  return {
    type: types.SELECT_PLAYER_LIST,
    playerList
  }
}

export function invalidatePlayerList(playerList) {
  return {
    type: types.INVALIDATE_PLAYER_LIST,
    playerList
  }
}

function requestPlayers(playerList) {
  return {
    type: types.REQUEST_PLAYERS,
    playerList
  }
}

function receivePlayers(playerList, json) {
  return {
    type: types.RECEIVE_PLAYERS,
    playerList,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPlayers(playerList) {
  return dispatch => {
    dispatch(requestPlayers(playerList))
    return fetch(`https://www.reddit.com/r/${playerList}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePlayers(playerList, json)))
  }
}

function shouldFetchPlayers(state, playerList) {
  const posts = state.playersByPlayerList[playerList]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPlayersIfNeeded(playerList) {
	return (dispatch, getState) => {
		if (shouldFetchPlayers(getState(), playerList)) {
			return dispatch(fetchPlayers(playerList))
		} else {
			return Promise.resolve()
		}
	}
}