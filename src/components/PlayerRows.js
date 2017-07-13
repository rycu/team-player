import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '../components/Button';



const Row = ({playerId, fullName, cost, club, position, rank, form, selected , selectPlayer}) => (

	<li 
		className={selected ? "player-list__row player-list__row--selected" : "player-list__row"} 
		key={playerId} 
	>
		<div>{'£'+(cost)+'m'}</div>
		<div className={"player-list__name-field"}>{fullName}</div>
		<div>{club}</div>
		<div>{position}</div>	
		<div>{rank}</div>
		<div>{form}</div>
		<Button
			clickFunc={selectPlayer}
			text={selected ? '-' : '+'}
		/>
	</li> 

)

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
						<Row 
							key={i}
							playerId={player.id}
							fullName={player.first_name + ' ' + player.second_name}
							cost={player.now_cost}
							club={clubs[player.team-1].short_name}
							position={positions[player.element_type-1].plural_name_short}
							rank={rank} 
							form={form}
							selected={this.playerSelected(selection__players, player.id)} 
							selectPlayer = {() => this.handleClick(player.id)}
						/> : null
					}
				)}
			</ul>
		)
	}
}