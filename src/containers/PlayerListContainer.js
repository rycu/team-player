import React from 'react';
//import PropTypes from 'prop-types'
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayerRowContainer from './PlayerRowContainer'

//LATER SET TO ONLY CALL FILTERS
// import { 
//   temp
// } from '../actions/apiActions'


const PlayerListContainer = ({playerListState, actions}) => (
    <div>
      <p>API DUMP GOES HERE</p>
      <PlayerRowContainer />
    </div>
)

// PlayerListContainer.propTypes = {

// }


export default connect()(PlayerListContainer)


