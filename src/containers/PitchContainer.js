import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PitchContainer extends Component {
  static propTypes = {
    //onClick: PropTypes.func.isRequired
  }




  render() {
    //const {filters} = this.props

    //console.log(filters);

    return (
      <div className="pitch">
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {filters} = state
  return {
    filters
  }
}

export default connect(mapStateToProps)(PitchContainer)

