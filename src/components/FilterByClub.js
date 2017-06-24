import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	static propTypes = {
		updateClubFilter: PropTypes.func.isRequired,
		clubId: PropTypes.number
	};

	handleChange = e => {
		const clubId = e.target.value.trim()
	    this.props.updateClubFilter(Number(clubId));
	}

	render() {
		let clubId = this.props.clubId;
		return (
			<div className={this.props.className}>
				<select 
					value={clubId}
					onChange={this.handleChange}
				>
					<option value='0'>select a club</option>
					<option value='1'>club a</option>
					<option value='2'>club b</option>
				</select>
			</div>
    	);
	}
}


