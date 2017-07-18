import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByName extends Component {
	
	static propTypes = {
		updateNameFilter: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		nameTxt: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		placeholder: "Search"
	};

	state = {
	    nameTxt: this.props.nameTxt
	}

	handleChange = e => {
	    const nameTxt = e.target.value.trim();
	    this.props.updateNameFilter(nameTxt);
	}

	render() {
		let {placeholder, nameTxt, className} = this.props
		
		return (
			<div className={className}>

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


