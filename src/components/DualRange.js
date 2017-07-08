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

	//SET COMPONENT STATE FROM REDUX
	state = {
	    lowVal: this.props.rangeObj.lowVal,
	    highVal: this.props.rangeObj.highVal
	}

	componentWillReceiveProps(nextProps){
		//GETS NEW STATE FROM PROPS IF UPDATED
			this.setState({
				lowVal: nextProps.rangeObj.lowVal,
				highVal: nextProps.rangeObj.highVal
			})
	}

	//ENSURES CORRECT MINIMUM VALUE RANGE IS MAINTAINED 
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
	}

	//UPDATES COMPONENT STATE 
	updateState(id, value){
		let lowMax = this.props.max-this.props.gap;
		let highMin = this.props.min+this.props.gap;

		if(
			//ONLY UPDATE THUMB WITHIN LIMITS
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
		this.updateState(e.target.id, e.target.value, e.target.dataset.siblingvalue);
	}

	//ROUND FLOATING POINTS FOR STEPS LESS THAN 1
	valueRound(value){
		if (this.props.step<1) {
			return Math.round( value * (1/this.props.step) ) / (1/this.props.step);
		}else{
			return value;
		}
	}

	//UPDATES REDUX STORE
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
	    		this.valueRound(this.state.lowVal), 
	    		this.valueRound(this.state.highVal)
	    	);
		})
		.catch((err) =>{
			console.log(err);
		});
	}

	render() {

		let lowVal = this.state.lowVal;
		let highVal = this.state.highVal;

		return (
			<div className={"dual-range " + this.props.className}>
				
				{/*SVG USED TO DISPLAY OUT OF RANGE AREAS*/}
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

				{/*LOWER RANGE SLIDER*/}
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

				{/*HIGHER RANGE SLIDER*/}
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

				{/*OUTPUT LABEL*/}
				<label className="dual-range__label">{
					this.valueRound(lowVal)+this.props.unit
					} to {
					this.valueRound(highVal)+this.props.unit
				}</label>
			</div>
    	);
	}
}