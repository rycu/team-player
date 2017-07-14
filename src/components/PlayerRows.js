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


	charFix (stringIn = "HÃ©ctor BellerÃ­n"){
		//replace ascii chars
		var charRelation = [
			['Ã©', 'é'],
			['Ã–', 'Ö'],
			['Ã¡', 'á'],
			['Ãµ' , 'õ'],
			['Ã³' , 'ó'],
			['Ã±' , 'ñ'],
			['Ã¶' , 'ö'],
			['Ã¥' , 'å'],
			['Ã¸' , 'ø'],
			['Ãº' , 'ú'],
			['Ã¼' , 'ü'],
			['Ã«' , 'ë'],
			['Ã¯' , 'ï'],
			['Ã' , 'í'],
		]
		let found = stringIn.match("[^ -~]");
		let stringOut = stringIn;
		if(found){
			charRelation.forEach(function(e) {
				let rx = new RegExp(e[0],"gi");
				stringOut = stringOut.replace(rx, e[1]);
			})
		}
		return stringOut
	}

	render() {

		const {players, rowsPerRender, clubs, positions} = this.props;
		const { selection__players } = this.props.selection

		return(
			<ul>
				{players.map((player, i) => {
					// made up rank out of 10 (approx)
					let rank =  Math.round(((Number(player.ict_index)+Number(player.now_cost*15))/225)*10)/10;
					rank = isNaN(rank) ? '' : rank
					// made up form out of 10 (approx)
					let form =  Math.round((player.ict_index/50)*10)/10;
					form = isNaN(form) ? '' : form
					
					 
					//replace really long names with short ones.
					let fullName = player.first_name + ' ' + player.second_name
					if(fullName.length > 17){
						fullName = player.web_name+'*'
					}

					//THIS DONT WORK. STEP CONDITIONS TO ENSURE ROW QUOTA IS MET
					return (this.displayRow(player, rank) && i <= rowsPerRender) ? 
						
						<Row 
							key={i}
							playerId={player.id}
							fullName={this.charFix(fullName)}
							cost={player.now_cost}
							club={clubs[player.team-1].short_name}
							position={positions[player.element_type-1].plural_name_short}
							rank={rank} 
							form={form}
							selected={this.playerSelected(selection__players, player.id)} 
							selectPlayer = {() => this.handleClick(player.id)}
						/> : null
					
				})}
			</ul>
		)
	}
}