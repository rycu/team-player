import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClub from '../components/FilterByClub';
import FilterByPosition from '../components/FilterByPosition';

//LATER SET TO ONLY CALL FILTERS
import { addNameFilter, addClubFilter, addPositionFilter} from '../actions'


const FiltersContainer = ({filterState, actions}) => (
    <div>
    	<FilterByName nameTxt={filterState.filter__name} addNameFilter={actions.addNameFilter} placeholder="Search for player by name"/>
      <FilterByClub clubId={filterState.filter__club} addClubFilter={actions.addClubFilter} />
      <FilterByPosition posArr={filterState.filter__position} addPositionFilter={actions.addPositionFilter} />
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
    actions: bindActionCreators({ addNameFilter, addClubFilter, addPositionFilter}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(FiltersContainer)


