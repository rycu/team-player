import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class dualRange extends Component {
	static propTypes = {
		updateRangeFilter: PropTypes.func.isRequired,
		rangeObj: PropTypes.object.isRequired,
		componentId: PropTypes.string.isRequired,
		min: PropTypes.number.isRequired, 
		max: PropTypes.number.isRequired,
		step: PropTypes.number.isRequired,
		gap: PropTypes.number.isRequired,
		unit: PropTypes.string
	}

	state = {
	    lowVal: this.props.rangeObj.lowVal,
	    highVal: this.props.rangeObj.highVal
	}

	overlapCorrect(id){

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		if(id === 'low' && ((lowVal+this.props.gap) > highVal)) {
			this.setState({ 
				lowVal: lowVal,
				highVal: lowVal+this.props.gap
			})
		}else if(id === 'high' && ((highVal-this.props.gap) < lowVal)){
			this.setState({ 
				highVal: highVal,
				lowVal: highVal-this.props.gap
			})
		}else if (id !== 'low' && id !== 'high'){
			console.log('overlapCorrect bad ID: '+ id);
		}
		//return {highVal: highVal, lowVal: lowVal}
		
	}

	updateState(id, value){

		let lowMax = this.props.max-this.props.gap;
		let highMin = this.props.min+this.props.gap;
		
		if(
			(id === 'low' && value >= this.props.min && value <= lowMax) ||
			(id === 'high' && value >= highMin && value <= this.props.max)
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
			this.props.updateRangeFilter(
	    		this.props.componentId,
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

		

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		

		return (
			<div className={"dual-range player-filters__" + this.props.componentId}>
				
				<svg className="dual-range__out-of-range" width="100%" height="100%">
				  <rect width={((lowVal/this.props.max)*100)+'%'} height="100" />
				</svg>

				<svg className="dual-range__out-of-range" width="100%" height="100%">
				  <rect width={(100-((highVal/this.props.max))*100)+'%'} height="100" x={((highVal/this.props.max)*100)+'%'}  />
				</svg>

				<input className="dual-range__inputs"
					id="low" 
					type="range" 
					min={this.props.min} 
					max={this.props.max} 
					step={this.props.step}
					value={lowVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>	
				<input className="dual-range__inputs"
					id="high" 
					type="range" 
					min={this.props.min} 
					max={this.props.max} 
					step={this.props.step} 
					value={highVal}
					onChange={this.handleChange} 
					onMouseUp={this.handleSubmit}
					onKeyUp={this.handleSubmit}
				/>

				<label className="dual-range__label">{this.lableRound(lowVal)+this.props.unit} to {this.lableRound(highVal)+this.props.unit}</label>

			</div>
    	);
	}
}


