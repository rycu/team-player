import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClub from '../components/FilterByClub';
import FilterByPosition from '../components/FilterByPosition';

import DualRange from '../components/DualRange';

//LATER SET TO ONLY CALL FILTERS
import { 
  updateNameFilter, 
  updateClubFilter, 
  updatePositionFilter, 
  updateDualRangeFilter
} from '../actions'


const FiltersContainer = ({filterState, actions}) => (
    <div>

    	<FilterByName 
        nameTxt={filterState.filters__name} 
        updateNameFilter={actions.updateNameFilter} 
        placeholder="Search for player by name"
      />

      <FilterByClub 
        clubId={filterState.filters__club} 
        updateClubFilter={actions.updateClubFilter} 
      />

      <FilterByPosition 
        positionArr={filterState.filters__position} 
        updatePositionFilter={actions.updatePositionFilter} 
      />

      <DualRange 
        componentId={'price'}
        rangeObj={filterState.filters__price} 
        updateRangeFilter={actions.updateDualRangeFilter}
        min={0} 
        max={20}
        step={0.1}
        gap={2}
        unit={'M'}
      />

      <DualRange 
        componentId={'rank'}
        rangeObj={filterState.filters__rank} 
        updateRangeFilter={actions.updateDualRangeFilter}
        min={0} 
        max={100}
        step={1}
        gap={10}
        unit={''}
      />

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
    actions: bindActionCreators({ 
      updateNameFilter, 
      updateClubFilter, 
      updatePositionFilter, 
      updateDualRangeFilter
    }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(FiltersContainer)


