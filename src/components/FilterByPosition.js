import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	
	static propTypes = {
		addPositionFilter: PropTypes.func.isRequired,
		posArr: PropTypes.array
	};

	handleChange = e => {
		this.props.addPositionFilter(e.target.checked, e.target.id);		
	}

	renderCheckbox(thisVal){

		var checked;

		if(this.props.posArr){
	      checked = this.props.posArr.includes(thisVal) ? true : false
	    }

		return(
			<li key={thisVal}>
				<label htmlFor={thisVal}>{thisVal}</label>
				<input type="checkbox" checked={checked} onChange={this.handleChange} id={thisVal}/>
			</li>
		);
	}

	buildPosBoxes(){

		var positions = ['S','M','D','G'];
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
			<div className="player-filter__position">
				{this.buildPosBoxes()}
			</div>
    	);
	}
}