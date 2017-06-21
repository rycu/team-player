import React from 'react';
//import PropTypes from 'prop-types'
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//LATER SET TO ONLY CALL FILTERS
// import {
//   temp
// } from '../actions'

const PlayerRowContainer = ({playerListState, actions}) => (
    <div>
      <p>API ROWS MAPPED TO HERE</p>
    </div>
)

// PlayerRowContainer.propTypes = {

// }


export default connect()(PlayerRowContainer)
