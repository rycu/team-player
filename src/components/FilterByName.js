import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByName extends Component {
	
	static propTypes = {
		//updateNameFilter: PropTypes.func.isRequired,
		nameTxt: PropTypes.string,
		placeholder: PropTypes.string
	};

	static defaultProps = {
		placeholder: "Search"
	};

	state = {
	    nameTxt: this.props.nameTxt || ''
	}

	handleChange = e => {
	    const nameTxt = e.target.value.trim();
	    this.props.updateNameFilter(nameTxt);
	}

	render() {
		let placeholder = this.props.placeholder;
		let nameTxt = this.props.nameTxt;
		//console.log(nameTxt);
		return (
			<div className={this.props.className}>

				<input 
					type="text" 
					placeholder={placeholder}
					value={nameTxt}
					onChange={this.handleChange}
				/>

			</div>
    	);
	}
}


