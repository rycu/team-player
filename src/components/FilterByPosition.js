import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	
	static propTypes = {
		data__positions: PropTypes.array.isRequired,
		updatePositionFilter: PropTypes.func.isRequired,
		positionArr: PropTypes.array.isRequired
	};

	handleChange = e => {
		this.props.updatePositionFilter(e.target.checked, Number(e.target.id));		
	}

	renderCheckbox(thisVal){

		let {positionArr, data__positions} = this.props
		let checked = positionArr.includes(thisVal) ? true : false

		return(
			<li key={thisVal}>
				<label htmlFor={thisVal}>{data__positions[thisVal-1].plural_name_short}</label>
				<input type="checkbox" checked={checked} onChange={this.handleChange} id={thisVal}/>
			</li>
		);
	}

	buildPosBoxes(){

		var positions = [];
		this.props.data__positions.map((position) =>
			positions.push(position.id)
		)
		var rows = [];
		var self = this;

		positions.forEach(function(thisVal, thisKey){
			rows.push(self.renderCheckbox(thisVal));
		})
		return(
			<ul>
				{rows}
			</ul>
		);


	}

	render() {
		return (
			<div className={this.props.className}>
				{this.buildPosBoxes()}
			</div>
    	);
	}
}