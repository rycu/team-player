import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Button extends Component {
	static propTypes = {
		clickFunc: PropTypes.func.isRequired,
		clubId: PropTypes.number
	}

	handleClick = e => {
	    this.props.clickFunc();
	}

	render() {
		return (
			<div className={this.props.class}>
				<button
					onClick={() => this.handleClick()}
				>
				{this.props.text}
				</button>
			</div>
    	);
	}
}


