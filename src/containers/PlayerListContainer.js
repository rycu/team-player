import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import PlayerRows from '../components/PlayerRows'

import { 
  togglePlayerSelect
} from '../actions/selectionActions'


class PlayerListContainer extends Component {
  static propTypes = {
    apiData__players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    rowsPerRender:  PropTypes.number.isRequired
  }

  render() {
    const {
      apiData__players, 
      isFetching, 
      rowsPerRender, 
      apiData__clubs, 
      apiData__positions, 
      filters, 
      selection, 
      actions
    } = this.props
    
    const isEmpty = apiData__players.length === 0

    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div>
              <PlayerRows 
                apiData__players={apiData__players} 
                filters={filters} 
                apiData__positions={apiData__positions} 
                apiData__clubs={apiData__clubs} 
                togglePlayerSelect={actions.togglePlayerSelect} 
                selection={selection}
                rowsPerRender={rowsPerRender}
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
    items: apiData__clubs
  } = apiData['apiData__clubs'] || {
    items: []
  }
  const {
    items: apiData__positions
  } = apiData['apiData__positions'] || {
    items: []
  }
  return {
    filters,
    apiData__clubs,
    apiData__positions,
    selection
  }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ 
      togglePlayerSelect
    }, dispatch)
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PlayerListContainer)

