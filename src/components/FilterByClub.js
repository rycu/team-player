import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class FilterByClub extends Component {
	static propTypes = {
		updateClubFilter: PropTypes.func.isRequired,
		clubId: PropTypes.number,
		clubs: PropTypes.array.isRequired
	};

	handleChange = e => {
		const clubId = e.target.value.trim()
	    this.props.updateClubFilter(Number(clubId));
	}

	render() {
		let {clubId, clubs} = this.props;

		return (
			<div className={this.props.className}>
				<select 
					value={clubId}
					onChange={this.handleChange}
				>
					<option value='' key="0">All Premier League Clubs</option>
					{clubs.map((club) =>
						<option value={club.id} key={club.id}>{club.name}</option>
					)}
				</select>
			</div>
    	);
	}
}