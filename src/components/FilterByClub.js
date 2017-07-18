import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	
	static propTypes = {
		updateClubFilter: PropTypes.func.isRequired,
		clubId: PropTypes.number.isRequired,
		data__clubs: PropTypes.array.isRequired,
		className: PropTypes.string
	};

	handleChange = e => {
		const clubId = e.target.value.trim()
	    this.props.updateClubFilter(Number(clubId));
	}

	render() {
		let {clubId, data__clubs, className} = this.props;

		return (
			<div className={className}>
				<select 
					value={clubId}
					onChange={this.handleChange}
				>
					<option value='' key="0">All Premier League Clubs</option>
					{data__clubs.map((club) =>
						<option value={club.id} key={club.id}>{club.name}</option>
					)}
				</select>
			</div>
    	);
	}
}