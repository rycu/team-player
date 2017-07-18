import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Button extends Component {
	
	static propTypes = {
		clickFunc: PropTypes.func.isRequired,
		className: PropTypes.string,
		text: PropTypes.string
	}

	handleClick = e => {
	    this.props.clickFunc();
	}

	render() {
		return (
			<div className={this.props.className}>
				<button
					onClick={() => this.handleClick()}
				>
				{this.props.text}
				</button>
			</div>
    	);
	}
}


