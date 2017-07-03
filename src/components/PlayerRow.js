import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class PlayerRow extends Component {
	
	static propTypes = {
		players: PropTypes.array.isRequired
	}

	displayRow(player){

		if(player.first_name === 'David'){
			return '';
		}else{
			return ' player-list__row--hidden';
		}

		
	}

	render() {

		console.log(this.props);

		return(
			<ul>
				{this.props.players.map((player, i) =>
				<li className={"player-list__row" + this.displayRow(player)} key={i}>
					<div>{player.first_name} {player.second_name}</div>
					<div>{player.team}</div>
					<div>{player.element_type}</div>
					<div>{player.now_cost}</div>
					<div>{player.creativity}</div>
				</li>
				)}
			</ul>
		)
	}
}

// const PlayerRow = ({players, actions}) => (
// 	<ul>
// 		{players.map((player, i) =>
// 		<li className="player-list__row" key={i}>
// 			<div>{player.first_name} {player.second_name}</div>
// 			<div>{player.team}</div>
// 			<div>{player.element_type}</div>
// 			<div>{player.now_cost}</div>
// 			<div>{player.creativity}</div>
// 		</li>
// 		)}
// 	</ul>
// )

// PlayerRow.propTypes = {
//   players: PropTypes.array.isRequired
// }

// export default PlayerRow