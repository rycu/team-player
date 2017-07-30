import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class DualRange extends Component {
	static propTypes = {
		updateRangeFilter: PropTypes.func.isRequired,
		rangeObj: PropTypes.object.isRequired,
		min: PropTypes.number.isRequired, 
		max: PropTypes.number.isRequired,
		step: PropTypes.number.isRequired,
		gap: PropTypes.number.isRequired,
		unit: PropTypes.string
	}

	//Set component state from redux
	state = {
	    lowVal: this.props.rangeObj.lowVal,
	    highVal: this.props.rangeObj.highVal
	}

	componentWillReceiveProps(nextProps){
		//Gets new state from props if updated
		this.setState({
			lowVal: nextProps.rangeObj.lowVal,
			highVal: nextProps.rangeObj.highVal
		})
	}

	//Ensures correct minimum value range is maintained 
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
		}
	}

	//Updates component state 
	updateState(id, value){
		let lowMax = this.props.max-this.props.gap;
		let highMin = this.props.min+this.props.gap;

		if(
			//Only update thumb within limits
			(id === 'low' && value >= this.props.min && value <= lowMax) ||
			(id === 'high' && value >= highMin && value <= this.props.max)
		){
			this.setState({
			[id+'Val']: parseFloat(value),
			})
		}
		this.overlapCorrect(id);
	}

	handleChange = e => {
		this.updateState(e.target.id, e.target.value);
	}

	//Round floating points for steps less than 1
	valueRound(value){
		if (this.props.step<1) {
			return Math.round( value * (1/this.props.step) ) / (1/this.props.step);
		}else{
			return value;
		}
	}

	//Updates redux store
	handleSubmit = e => {
		
		var id = e.target.id;

		//Promise added to wait for overlapCorrect() to complete before store update
		var overlapSubmitPromise = new Promise((resolve, reject) => {
				if(id === 'low' || id === 'high'){
					resolve(this.overlapCorrect(id));
				}else{
					reject(`bad Id (${id}) passed to handleSubmit`);
				}
		})

		overlapSubmitPromise.then(() =>{	
			this.props.updateRangeFilter(
	    		this.valueRound(this.state.lowVal), 
	    		this.valueRound(this.state.highVal)
	    	);
		})
		.catch((err) =>{
			console.log(err);
		});

		return overlapSubmitPromise
	}

	render() {

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		return (
			<div className={"dual-range " + this.props.className}>
				
				{/*SVG used to display out of range areas*/}
				<svg className="dual-range__out-of-range" width="100%" height="100%">
					<rect 
				  		width={((lowVal/this.props.max)*100)+'%'} 
				  		height="100" 
					/>
				</svg>
				<svg className="dual-range__out-of-range" width="100%" height="100%">
					<rect 
				  		width={(100-((highVal/this.props.max))*100)+'%'} 
				  		height="100" 
				  		x={((highVal/this.props.max)*100)+'%'}  
				  	/>
				</svg>

				{/*Lower range slider*/}
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
					onTouchEnd={this.handleSubmit}
				/>

				{/*Higher range slider*/}
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
					onTouchEnd={this.handleSubmit}
				/>

				{/*Output label*/}
				<label className="dual-range__label">{
					this.valueRound(lowVal)+this.props.unit
					} to {
					this.valueRound(highVal)+this.props.unit
				}</label>
			</div>
    	);
	}
}