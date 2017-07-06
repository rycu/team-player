import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded, invalidateData } from '../actions/apiActions'
import PlayerRow from '../components/PlayerRow'

class apiContainer extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateData('playerList'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  render() {
    const {players, isFetching, filters} = this.props
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
          : <div className="player-list" style={{ opacity: isFetching ? 0.2 : 1 }}>
              <PlayerRow players={players} filters={filters}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData, filters } = state
  const {
    isFetching,
    items: players
  } = apiData['playerList'] || {
    isFetching: true,
    items: []
  }

  return {
    players,
    isFetching,
    filters
  }
}

export default connect(mapStateToProps)(apiContainer)

