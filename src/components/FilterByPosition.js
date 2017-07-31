import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByPosition extends Component {
	
	static propTypes = {
		apiData__positions: PropTypes.array.isRequired,
		updatePositionFilter: PropTypes.func.isRequired,
		positionArr: PropTypes.array.isRequired,
		className: PropTypes.string.isRequired
	};

	handleChange = e => {
		this.props.updatePositionFilter(e.target.checked, Number(e.target.id));		
	}

	renderCheckbox(thisVal){

		let {positionArr, apiData__positions} = this.props
		let checked = positionArr.includes(thisVal) ? true : false
		return(
			<li key={thisVal}>
				<label htmlFor={thisVal}>{apiData__positions[thisVal-1].plural_name_short}</label>
				<input type="checkbox" checked={checked} onChange={this.handleChange} id={thisVal}/>
			</li>
		);
	}

	buildPosBoxes(){

		var positions = [];
		this.props.apiData__positions.map((position) =>
			positions.push(position.id)
		)
		var rows = [];
		var self = this;

		positions.forEach(function(thisVal, thisKey){
			rows.push(self.renderCheckbox(thisVal));
		})
		return(
			<ul className={this.props.className}>
				{rows}
			</ul>
		);


	}

	render() {
		return this.buildPosBoxes()
	}
}