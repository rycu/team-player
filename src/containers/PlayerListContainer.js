import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchPlayersIfNeeded, invalidateData } from '../actions/apiActions'
import PlayerRowContainer from './PlayerRowContainer'

class apiContainer extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPlayersIfNeeded())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateData())
    dispatch(fetchPlayersIfNeeded())
  }

  render() {
    const {players, isFetching} = this.props
    const isEmpty = players.length === 0

    return (
      <div>
        <p>
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.2 : 1 }}>
              <PlayerRowContainer players={players} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData } = state
  const {
    isFetching,
    items: players
  } = apiData['playerList'] || {
    isFetching: true,
    items: []
  }

  return {
    players,
    isFetching
  }
}

export default connect(mapStateToProps)(apiContainer)

