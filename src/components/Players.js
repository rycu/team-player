import React from 'react'
import PropTypes from 'prop-types'

const Players = ({players}) => (

  <ul>
    {players.map((player, i) =>
      <li key={i}>{player.web_name}</li>
    )}
  </ul>
)

Players.propTypes = {
  players: PropTypes.array.isRequired
}

export default Players
