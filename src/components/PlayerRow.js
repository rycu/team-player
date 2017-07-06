import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class PlayerRow extends Component {
	
	static propTypes = {
		players: PropTypes.array.isRequired
	}

	displayRow(player){



		const { //filters__name, 
				filters__club, 
				//filters__position, 
				//filters__price, 
				//filters__rank 
			} = this.props.filters

		//console.log(this.props.apiData.positionList.items[filters__position].plural_name_short);

		if(player.team !== filters__club && filters__club !== 0){
			return ' player-list__row--hidden';
		}

		// if(filters__position.includes(player.element_type)){
		// 	return ' player-list__row--hidden';
		// }

		return '';

	}

	render() {
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