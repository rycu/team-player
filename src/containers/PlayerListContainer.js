import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PlayerRow from '../components/PlayerRow'

import { 
  selectPlayer
} from '../actions/selectionActions'



class PlayerListContainer extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {players, isFetching, clubs, positions, filters, selection, actions} = this.props
    const isEmpty = players.length === 0

    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div>
              <PlayerRow 
                players={players} 
                filters={filters} 
                positions={positions} 
                clubs={clubs} 
                selectPlayer={actions.selectPlayer} 
                selection={selection}
              />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {filters, apiData, selection} = state

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
    positions,
    selection
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ 
      selectPlayer
    }, dispatch)
})


export default connect(
  mapStateToProps, 
  mapDispatchToProps

  )(PlayerListContainer)

