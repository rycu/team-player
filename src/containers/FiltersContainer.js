import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClubContainer from './FilterByClubContainer';
import FilterByClub from '../components/FilterByClub';
import FilterByPosition from '../components/FilterByPosition';
import Button from '../components/Button';
import DualRange from '../components/DualRange';

//LATER SET TO ONLY CALL FILTERS
import { 
  updateNameFilter, 
  updateClubFilter, 
  updatePositionFilter, 
  updatePriceFilter,
  updateRankFilter,
  resetFilters
} from '../actions/filterActions'

let filterClass = 'player-filters';

const FiltersContainer = ({filterState, actions}) => (
    <div>

    	<FilterByName 
        nameTxt={filterState.filters__name} 
        updateNameFilter={actions.updateNameFilter} 
        placeholder="Search for player by name"
        className={filterClass +" player-filters__name"}
      />


      <FilterByClubContainer 
        clubId={filterState.filters__club} 
        updateClubFilter={actions.updateClubFilter}
        className={filterClass +" player-filters__club"}
      />

      <FilterByPosition 
        positionArr={filterState.filters__position} 
        updatePositionFilter={actions.updatePositionFilter}
        className={filterClass +" player-filters__position"}
      />

      <DualRange 
        componentId={'price'}
        rangeObj={filterState.filters__price}
        updateRangeFilter={actions.updatePriceFilter}
        className={filterClass +" player-filters__price"}
        min={0} 
        max={20}
        step={0.1}
        gap={2}
        unit={'M'}
        siblingValue={0}
      />

      <DualRange 
        componentId={'rank'}
        rangeObj={filterState.filters__rank} 
        updateRangeFilter={actions.updateRankFilter}
        className={filterClass +" player-filters__rank"}
        min={0} 
        max={100}
        step={1}
        gap={10}
        unit={''}
      />

      <Button
        clickFunc={actions.resetFilters}
        className={filterClass +" player-filters__reset"}
        text={'Reset All Filters'}
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
      updatePriceFilter,
      updateRankFilter,
      resetFilters
    }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(FiltersContainer)


