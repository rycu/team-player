import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByPrice extends Component {
	static propTypes = {
		updatePriceFilter: PropTypes.func.isRequired,
		priceObj: PropTypes.object
	}

	state = {
	    lowVal: this.props.priceObj.lowVal,
	    highVal: this.props.priceObj.highVal
	}

	overlapCorrect(id){

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		if(id === 'low' && (lowVal > highVal)) {
			this.setState({ 
				highVal: lowVal
			})
		}else if(id === 'high' && (highVal < lowVal)){
			this.setState({ 
				lowVal: highVal
			})
		}

		return {highVal: highVal, lowVal: lowVal}
	}

	updateState(id, value){
		this.setState({ 
				[id+'Val']: parseFloat(value)
		})
		this.overlapCorrect(id);
	}

	handleChange = e => {
		this.updateState(e.target.id, e.target.value);
	}

	handleSubmit = e => {
	    this.props.updatePriceFilter(e.target.id, this.overlapCorrect(e.target.id));
	}

	render() {

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;
		// WORK OUT HOW TO PRIORITISE REDUX CHANGES  

		return (
			<div className="player-filters__price">
				<input 
					id="low" 
					type="range" 
					min="0" 
					max="20" 
					step="0.1"
					value={lowVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>
				
				<input 
					id="high" 
					type="range" 
					min="0" 
					max="20" 
					step="0.1"
					value={highVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>
			</div>
    	);
	}
}


