import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByPrice extends Component {
	static propTypes = {
		//updatePriceFilter: PropTypes.func.isRequired,
		priceObj: PropTypes.object
	}

	state = {
	    lowVal: this.props.priceObj.lowVal,
	    highVal: this.props.priceObj.highVal
	}

	overlapCorrect(id){

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		if(id === 'low' && (lowVal >= highVal)) {
			this.setState({ 
				highVal: lowVal
			})
		}else if(id === 'high' && (highVal <= lowVal)){
			this.setState({ 
				lowVal: highVal
			})
		}
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
	    
		//Add overlapCorrect to reducer to ensure no errors
	    this.overlapCorrect(e.target.id);
	    
	    console.log(this.state);
	    
	    if(this.state.lowVal > this.state.highVal){
	    	console.log('OVERLAP ERROR');
	    }

	    //this.props.updatePriceFilter(e.target.low, e.target.high);
	    //console.log('SUB: '+e.target.value);

	    
	}

	render() {

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;


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


