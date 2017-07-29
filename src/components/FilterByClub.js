import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	
	static propTypes = {
		updateClubFilter: PropTypes.func.isRequired,
		clubId: PropTypes.number.isRequired,
		apiData__clubs: PropTypes.array.isRequired,
		className: PropTypes.string
	};

	handleChange = e => {
		const clubId = e.target.value
	    this.props.updateClubFilter(Number(clubId));
	}

	render() {
		let {clubId, apiData__clubs, className} = this.props;

		return (
			<select 
				className={className}
				value={clubId}
				onChange={this.handleChange}
			>
				<option value='' key="0">All Premier League Clubs</option>
				{apiData__clubs.map((club) =>
					<option value={club.id} key={club.id}>{club.name}</option>
				)}
			</select>
    	);
	}
}