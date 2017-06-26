import React from 'react';
import PropTypes from 'prop-types'
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//LATER SET TO ONLY CALL FILTERS
// import {
//   temp
// } from '../actions'

const PlayerRowContainer = ({players, actions}) => (
	<ul>
		{players.map((player, i) =>
			<li key={i}>{player.first_name}  {player.second_name} {player.team} {player.element_type} {player.now_cost} {player.creativity} {}</li>
		)}
	</ul>
)

PlayerRowContainer.propTypes = {
  players: PropTypes.array.isRequired
}

export default connect()(PlayerRowContainer)