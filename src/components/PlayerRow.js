import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '../components/Button';

export default class PlayerRow extends Component {
	
	static propTypes = {
		players: PropTypes.array.isRequired,
		togglePlayerSelect: PropTypes.func.isRequired,
		rowsPerRender: PropTypes.number.isRequired
	}

	displayRow(player, rank){

		const { filters__name, 
				filters__club, 
				filters__position, 
				filters__price, 
				filters__rank 
			} = this.props.filters

		let playerName = player.first_name + ' ' + player.second_name; 

		if(!playerName.toLowerCase().includes(filters__name.toLowerCase())){
			return false;
		}

		if(!filters__position.includes(player.element_type)){
			return false;
		}

		if(player.team !== filters__club && filters__club !== 0){
			return false;
		}

		if(player.now_cost < filters__price.lowVal || player.now_cost > filters__price.highVal){
			return false;
		}

		if(rank < filters__rank.lowVal || rank > filters__rank.highVal){
			return false;
		}

		return true;

	}

	playerSelected(selection__players, playerId){
		return 	selection__players.includes(playerId) ? true : false;
	}

	handleClick = (id) => {
		this.props.togglePlayerSelect(Number(id));
	}

	render() {

		const {players, rowsPerRender, clubs, positions} = this.props;
		const { selection__players } = this.props.selection

		return(
			<ul>
				{players.map((player, i) => {
					// made up rank out of 10 (approx)
					let rank =  Math.round(((Number(player.ict_index)+Number(player.now_cost*15))/225)*10)/10;
					// made up form out of 10 (approx)
					let form =  Math.round((player.ict_index/50)*10)/10;


					return (this.displayRow(player, rank) && i <= rowsPerRender) ?

			 			<li 
			 				className={this.playerSelected(selection__players, player.id) ? "player-list__row player-list__row--selected" : "player-list__row"} 
			 				key={player.id} 
			 			>
							
							<div>{'£'+(player.now_cost)+'m'}</div>
							<div className={"player-list__name-field"}>{player.first_name} {player.second_name}</div>
							<div>{clubs[player.team-1].short_name}</div>
							<div>{positions[player.element_type-1].plural_name_short}</div>	
							<div>{rank}</div>
							<div>{form}</div>
							<Button
 						    	clickFunc={() => this.handleClick(player.id)}
 						    	//className={filterClass +" player-filters__reset"}
 						    	text={''}
 						    />
						
						</li> 
					: null
					}
				)}
			</ul>
		)
	}
}