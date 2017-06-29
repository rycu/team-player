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
		<li className="player-list__row" key={i}>
			<div>{player.first_name} {player.second_name}</div>
			<div>{player.team}</div>
			<div>{player.element_type}</div>
			<div>{player.now_cost}</div>
			<div>{player.creativity}</div>
		</li>
		)}
	</ul>
)

PlayerRowContainer.propTypes = {
  players: PropTypes.array.isRequired
}

export default connect()(PlayerRowContainer)