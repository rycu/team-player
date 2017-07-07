import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded, invalidateData} from '../actions/apiActions'
import Header from '../components/Header'
import FiltersContainer from './FiltersContainer'
import PlayerListContainer from './PlayerListContainer'

class App extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    clubs: PropTypes.array.isRequired,
    isFetchingClub: PropTypes.bool.isRequired,
    isFetchingPosition: PropTypes.bool.isRequired,
    isFetchingPlayers: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('clubList', 'premTeams'))
    dispatch(fetchDataIfNeeded('positionList', 'premElement_types'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  handlePlayerRefreshClick = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(invalidateData('playerList'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  render() {
    const {clubs, isFetchingClub, positions, isFetchingPosition, players, isFetchingPlayers} = this.props

    return (
		<div>
			<Header />
			<div style={{ opacity: (isFetchingClub || isFetchingPosition) ? 0.2 : 1 }}>
				<FiltersContainer positions={positions} clubs={clubs} />
			</div>
			<PlayerListContainer players={players} isFetching={isFetchingPlayers} onClick={() => this.handlePlayerRefreshClick}/>

		</div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData } = state
  
  const {
    isFetching: isFetchingClub,
    items: clubs
  } = apiData['clubList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPosition,
    items: positions
  } = apiData['positionList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPlayers,
    items: players
  } = apiData['playerList'] || {
    isFetching: true,
    items: []
  }
  return {
    clubs,
    isFetchingClub,
    positions,
    isFetchingPosition,
    players, 
    isFetchingPlayers
  }
}

export default connect(mapStateToProps)(App)