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
    data__players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    rowsPerRender:  PropTypes.number.isRequired
  }

  render() {
    const {
      data__players, 
      isFetching, 
      rowsPerRender, 
      data__clubs, 
      data__positions, 
      filters, 
      selection, 
      actions
    } = this.props
    
    const isEmpty = data__players.length === 0

    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div>
              <PlayerRows 
                data__players={data__players} 
                filters={filters} 
                data__positions={data__positions} 
                data__clubs={data__clubs} 
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
    items: data__clubs
  } = apiData['clubList'] || {
    items: []
  }
  const {
    items: data__positions
  } = apiData['positionList'] || {
    items: []
  }
  return {
    filters,
    data__clubs,
    data__positions,
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

