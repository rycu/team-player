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

	handleSubmit = e => {
	    const nameTxt = e.target.value.trim()
	    if (e.which === 13) {
	      this.props.updateNameFilter(nameTxt);
	    }

	}

	handleChange = e => {
		this.setState({ nameTxt: e.target.value })
		//console.log(e.target.value);
		//console.log(this.props);
	}

	render() {
		let placeholder = this.props.placeholder;
		let nameTxt = this.state.nameTxt;
		//console.log(nameTxt);
		return (
			<div className="player-filters__name">

				<input 
					type="text" 
					placeholder={placeholder}
					value={nameTxt}
					onChange={this.handleChange}
					onKeyDown={this.handleSubmit}
				/>

			</div>
    	);
	}
}


