import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FilterByName from '../components/FilterByName';
import FilterByClub from '../components/FilterByClub';
import FilterByPosition from '../components/FilterByPosition';
import FilterByPrice from '../components/FilterByPrice';

//LATER SET TO ONLY CALL FILTERS
import { updateNameFilter, updateClubFilter, updatePositionFilter, updatePriceFilter} from '../actions'


const FiltersContainer = ({filterState, actions}) => (
    <div>
    	<FilterByName nameTxt={filterState.filters__name} updateNameFilter={actions.updateNameFilter} placeholder="Search for player by name"/>
      <FilterByClub clubId={filterState.filters__club} updateClubFilter={actions.updateClubFilter} />
      <FilterByPosition positionArr={filterState.filters__position} updatePositionFilter={actions.updatePositionFilter} />
      <FilterByPrice priceObj={filterState.filters__price} updatePriceFilter={actions.updatePriceFilter} />
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
    actions: bindActionCreators({ updateNameFilter, updateClubFilter, updatePositionFilter, updatePriceFilter}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(FiltersContainer)


