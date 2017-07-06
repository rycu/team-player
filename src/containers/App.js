import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded} from '../actions/apiActions'
import Header from '../components/Header'
import FiltersContainer from './FiltersContainer'
import PlayerListContainer from './PlayerListContainer'

class App extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    clubs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    //isFetching2: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('clubList', 'premTeams'))
    dispatch(fetchDataIfNeeded('positionList', 'premElement_types'))
  }

  render() {
    const {clubs, isFetching, positions, isFetching2} = this.props

    return (
		<div>
			<Header />
			<div style={{ opacity: (isFetching || isFetching2) ? 0.2 : 1 }}>
				<FiltersContainer positions={positions} clubs={clubs} />
				<PlayerListContainer />
			</div>
		</div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData } = state
  
  const {
    isFetching,
    items: clubs
  } = apiData['clubList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching2,
    items: positions
  } = apiData['positionList'] || {
    isFetching: true,
    items: []
  }

  return {
    clubs,
    isFetching,
    positions,
    isFetching2,
  }
}

export default connect(mapStateToProps)(App)