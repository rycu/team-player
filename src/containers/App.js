import React from 'react'
import Header from '../components/Header'
import FiltersContainer from './FiltersContainer'
import PlayerListContainer from './PlayerListContainer'

const App = () => (
  <div>
    <Header />
    <FiltersContainer />
    <PlayerListContainer />
  </div>
)

export default App