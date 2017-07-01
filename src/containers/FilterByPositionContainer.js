import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded} from '../actions/apiActions'
import FilterByPosition from '../components/FilterByPosition'

class FilterByPositionContainer extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('positionList', 'premElement_types'))
  }

  render() {
    const {positions, isFetching, positionArr, updatePositionFilter, className} = this.props

    return (
      <div style={{ opacity: isFetching ? 0.2 : 1 }}>
        <FilterByPosition 
          positions={positions}
          positionArr={positionArr} 
          updatePositionFilter={updatePositionFilter}
          className={className}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData } = state
  const {
    isFetching,
    items: positions
  } = apiData['positionList'] || {
    isFetching: true,
    items: []
  }

  return {
    positions,
    isFetching
  }
}

export default connect(mapStateToProps)(FilterByPositionContainer)

