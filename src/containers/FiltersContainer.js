import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClub from '../components/FilterByClub';

//LATER SET TO ONLY CALL FILTERS
import * as FilterActions from '../actions'


const FiltersContainer = ({filterState, actions}) => (
    <div>
    	<FilterByName nameTxt={filterState.nameFilter} addNameFilter={actions.addNameFilter} placeholder="Search for player by name"/>
      <FilterByClub clubId={filterState.clubFilter} addClubFilter={actions.addClubFilter} />
    </div>
)

FiltersContainer.propTypes = {
  filterState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  filterState: state.filters
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(FilterActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(FiltersContainer)


