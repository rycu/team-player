import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '../components/Button';

//Presentational Component for Row using simple ES6 lambda function (kept separate for easy styling)
const Row = ({playerId,fullName, cost, club, position, rank, form, selected , selectPlayer}) => (

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
		data__players: PropTypes.array.isRequired,
		togglePlayerSelect: PropTypes.func.isRequired,
		rowsPerRender: PropTypes.number.isRequired
	}

	//Checks to see if the row should be displayed under the current filter conditions
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

	//checks to see if player is selected for the team 
	playerSelected(selection__players, playerId){
		return 	selection__players.includes(playerId) ? true : false;
	}

	//pushes player selection request along to redux
	handleSelectPlayer = (id) => {
		this.props.togglePlayerSelect(Number(id));
	}

	//replaces bad ASCII chars from data source
	charFix (stringIn){
		var charRelation = [['Ã©', 'é'],['Ã–', 'Ö'],['Ã¡', 'á'],['Ãµ', 'õ'],['Ã³', 'ó'],['Ã±', 'ñ'],['Ã¶', 'ö'],['Ã¥', 'å'],['Ã¸', 'ø'],['Ãº', 'ú'],['Ã¼', 'ü'],['Ã«', 'ë'],['Ã¯' , 'ï'],['Ã' , 'í']]
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

	//replace really long names with short ones.
	displayName(first_name, second_name, web_name){

		let fullName = first_name + ' ' + second_name
		return fullName.length < 18 ? fullName : web_name+'*'
	}

	// made up rank out of 10 (approx)
	fabricateRank(ict_index, now_cost){
		let rank = Math.round(((Number(ict_index)+Number(now_cost*15))/225)*10)/10;
		return isNaN(rank) ? '' : rank
	}

	// made up form out of 10 (approx)
	fabricateForm(ict_index){
		let form = Math.round((ict_index/50)*10)/10;
		return isNaN(form) ? '' : form
	}

	render() {

		const {data__players, rowsPerRender, data__clubs, data__positions} = this.props;
		const { selection__players } = this.props.selection

		//returns new array of Rows from filtering players array, slicing it to the rowsPerRender value and mapping
		return(
			<ul>
				{data__players.filter((player) => {
					return this.displayRow(player, this.fabricateRank(player.ict_index, player.now_cost))
				}).slice(0, rowsPerRender).map((player) => {
					return <Row 
						key={player.id}
						playerId={player.id}
						fullName={
							this.charFix(
								this.displayName(
									player.first_name, 
									player.second_name,
									player.web_name
								) 
							)
						}
						cost={player.now_cost}
						club={data__clubs[player.team-1].short_name}
						position={data__positions[player.element_type-1].plural_name_short}
						rank={this.fabricateRank(player.ict_index, player.now_cost)} 
						form={this.fabricateForm(player.ict_index)}
						selected={this.playerSelected(selection__players, player.id)} 
						selectPlayer = {() => this.handleSelectPlayer(player.id)}
					/>
				})}
			</ul>
		)
	}
}