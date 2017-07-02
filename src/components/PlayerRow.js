import React from 'react';
import PropTypes from 'prop-types'

const PlayerRow = ({players, actions}) => (
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

PlayerRow.propTypes = {
  players: PropTypes.array.isRequired
}

export default PlayerRow