import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlayerRow from '../components/PlayerRow'

class apiContainer extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    //onClick: PropTypes.func.isRequired
  }

  render() {
    const {players, isFetching, clubs, positions, filters} = this.props
    const isEmpty = players.length === 0

    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div className="player-list" style={{ opacity: isFetching ? 0.2 : 1 }}>
              <PlayerRow players={players} filters={filters} positions={positions} clubs={clubs}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {filters, apiData} = state

  const {
    items: clubs
  } = apiData['clubList'] || {
    items: []
  }
  const {
    items: positions
  } = apiData['positionList'] || {
    items: []
  }

  return {
    filters,
    clubs,
    positions
  }
}

export default connect(mapStateToProps)(apiContainer)

