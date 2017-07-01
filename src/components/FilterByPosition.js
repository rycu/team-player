import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	
	static propTypes = {
		updatePositionFilter: PropTypes.func.isRequired,
		positionArr: PropTypes.array
	};

	handleChange = e => {
		this.props.updatePositionFilter(e.target.checked, e.target.id);		
	}

	renderCheckbox(thisVal){

		var checked;

		if(this.props.positionArr){
	      checked = this.props.positionArr.includes(thisVal) ? true : false
	    }

		return(
			<li key={thisVal}>
				<label htmlFor={thisVal}>{thisVal}</label>
				<input type="checkbox" checked={checked} onChange={this.handleChange} id={thisVal}/>
			</li>
		);
	}

	buildPosBoxes(){

		var positions = [];
		this.props.positions.map((position) =>
			positions.push(position.plural_name_short)
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