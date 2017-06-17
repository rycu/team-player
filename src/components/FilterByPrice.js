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

	instanceProps = {

		min: 0, 
		max: 20,
		step: 0.1,
		gap: 2

	}

	overlapCorrect(id){

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		if(id === 'low' && ((lowVal+this.instanceProps.gap) > highVal)) {
			this.setState({ 
				lowVal: lowVal,
				highVal: lowVal+this.instanceProps.gap
			})
		}else if(id === 'high' && ((highVal-this.instanceProps.gap) < lowVal)){
			this.setState({ 
				highVal: highVal,
				lowVal: highVal-this.instanceProps.gap
			})
		}else if (id !== 'low' && id !== 'high'){
			console.log('overlapCorrect bad ID: '+ id);
		}
		//return {highVal: highVal, lowVal: lowVal}
		
	}

	updateState(id, value){

		let lowMax = this.instanceProps.max-this.instanceProps.gap;
		let highMin = this.instanceProps.min+this.instanceProps.gap;
		
		if(
			(id === 'low' && value >= this.instanceProps.min && value <= lowMax) ||
			(id === 'high' && value >= highMin && value <= this.instanceProps.max)
			){
			this.setState({ 
					[id+'Val']: parseFloat(value)
			})
		}


		this.overlapCorrect(id);
	}

	handleChange = e => {
		this.updateState(e.target.id, e.target.value);
	}

	handleSubmit = e => {
		
		let id = e.target.id;

		//PROMICE ADDED TO WAIT FOR overlapCorrect() TO COMPLEATE BEFORE STORE UPDATE
		let overlapSubmitPromice = new Promise((resolve, reject) => {
				resolve(this.overlapCorrect(id));
				reject('overlapCorrect Failed');
		})

		overlapSubmitPromice.then(() =>{	
			this.props.updatePriceFilter(
	    		id, 
	    		this.state.lowVal, 
	    		this.state.highVal
	    	);
		})
		.catch((err) =>{
			console.log(err);
		});
	}

	lableRound(value){
		return Math.round( value * 10 ) / 10;
	}

	render() {

		//console.log(this.test);

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		return (
			<div className="player-filters__price">
				<input 
					id="low" 
					type="range" 
					min={this.instanceProps.min} 
					max={this.instanceProps.max} 
					step={this.instanceProps.step}
					value={lowVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>
				
				<input 
					id="high" 
					type="range" 
					min={this.instanceProps.min} 
					max={this.instanceProps.max} 
					step={this.instanceProps.step} 
					value={highVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>

				<label>{this.lableRound(lowVal)}M to {this.lableRound(highVal)}M</label>

			</div>
    	);
	}
}


