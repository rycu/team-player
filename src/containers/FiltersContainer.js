import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClub from '../components/FilterByClub';
import FilterByPosition from '../components/FilterByPosition';
import Button from '../components/Button';
import DualRange from '../components/DualRange';

import { 
  updateNameFilter, 
  updateClubFilter, 
  updatePositionFilter, 
  updatePriceFilter,
  updateRankFilter,
  resetFilters
} from '../actions/filterActions'

let filterClass = 'player-filters';

const FiltersContainer = ({filterState, apiData__clubs, apiData__positions, onClick, isFetching, actions}) => (
    <div>

    	<FilterByName 
        className={filterClass +" player-filters__name"}
        nameTxt={filterState.filters__name} 
        updateNameFilter={actions.updateNameFilter} 
        placeholder="Search for player by name"
      />

      <FilterByClub
        className={filterClass +" player-filters__club"}
        apiData__clubs={apiData__clubs}
        clubId={filterState.filters__club} 
        updateClubFilter={actions.updateClubFilter}
      />

      <FilterByPosition
        className={filterClass +" player-filters__position"}
        apiData__positions={apiData__positions}
        positionArr={filterState.filters__position} 
        updatePositionFilter={actions.updatePositionFilter}
      />

      <DualRange
        className={filterClass +" player-filters__price"}
        rangeObj={filterState.filters__price}
        updateRangeFilter={actions.updatePriceFilter}
        min={0} 
        max={150}
        step={0.1}
        gap={10}
        unit={'M'}
      />

      <DualRange
        className={filterClass +" player-filters__rank"}
        rangeObj={filterState.filters__rank} 
        updateRangeFilter={actions.updateRankFilter} 
        min={0} 
        max={10}
        step={0.1}
        gap={0.1}
        unit={''}
      />

      <div>
        <Button
          className={filterClass +" player-filters__reset"}
          clickFunc={actions.resetFilters}
          text={'Reset All Filters'}
        />

        <Button
          className={filterClass +" player-filters__refresh"} 
          clickFunc={onClick()}     
          text={isFetching ? 'Loading...' : 'Refresh Players'}
        />
      </div>

    </div>
)

FiltersContainer.propTypes = {
  filterState: PropTypes.object.isRequired,
  apiData__positions: PropTypes.array.isRequired,
  apiData__clubs: PropTypes.array.isRequired,
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


