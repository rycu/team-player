import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded} from '../actions/apiActions'
import FilterByClub from '../components/FilterByClub'

class FilterByClubContainer extends Component {
  static propTypes = {
    clubs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('clubList', 'premTeams'))
    //TEAM FEED NOT WORKING AND clubs is undefined 
    //
    
  }

  render() {
    const {clubs, isFetching, clubId, updateClubFilter, className} = this.props

    return (
      <div style={{ opacity: isFetching ? 0.2 : 1 }}>
        <FilterByClub 
          clubs={clubs} 
          clubId={clubId} 
          updateClubFilter={updateClubFilter}
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
    items: clubs
  } = apiData['clubList'] || {
    isFetching: true,
    items: []
  }

  return {
    clubs,
    isFetching
  }
}

export default connect(mapStateToProps)(FilterByClubContainer)

