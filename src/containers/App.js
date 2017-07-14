import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchDataIfNeeded, invalidateData} from '../actions/apiActions'
import Header from '../components/Header'
import FiltersContainer from './FiltersContainer'
import PlayerListContainer from './PlayerListContainer'
import PitchContainer from './PitchContainer'
import Button from '../components/Button'
import Transition from 'react-transition-group/Transition'


class FilterSlide extends Component {

  render(){

    const duration = 500;

    const defaultStyle = {
      transition: `margin-top ${duration}ms ease-in-out`,
      marginTop: '-250px'
    }

    const transitionStyles = {
      entering: { marginTop: 0 },
      entered:  { marginTop: 0 },
    };

    return(

      <Transition in={this.props.in} timeout={duration}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {this.props.children}
          </div>
        )}
      </Transition>
    );
  }
}


class App extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    clubs: PropTypes.array.isRequired,
    isFetchingClub: PropTypes.bool.isRequired,
    isFetchingPosition: PropTypes.bool.isRequired,
    isFetchingPlayers: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('clubList', 'premTeams'))
    dispatch(fetchDataIfNeeded('positionList', 'premElement_types'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  handlePlayerRefreshClick = () => {
    const { dispatch } = this.props
    dispatch(invalidateData('playerList'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  handleFilterViewToggleClick = e => {
    this.setState({show: !this.state.show})
  }

  rowsPerRender = 30

  handlePlayerListScroll = e => {

    //INFINITE SCROLL

    let boxHeight = document.getElementById(e.target.id).clientHeight;
    let offset = (Number(e.target.scrollHeight)-Number(boxHeight));

    if (e.target.scrollTop >= (offset-(offset/10))) {
      this.rowsPerRender += 15;
      this.forceUpdate();
    }
  }

  state = {
  show:false
  }

  render() {
    const {clubs, isFetchingClub, positions, isFetchingPosition, players, isFetchingPlayers} = this.props

    return (
		<div>

			<Header />

      <div className="drafts">

        <PitchContainer />

        <div className="player-selection">

          <div  id="player-filters" className={"player-filters"} style={{ opacity: (isFetchingClub || isFetchingPosition) ? 0.2 : 1 }}>
            <FilterSlide in={this.state.show}>
              <FiltersContainer
                positions={positions} 
                clubs={clubs} 
                onClick={() => this.handlePlayerRefreshClick} 
                isFetching={isFetchingPlayers}
              />
            </FilterSlide>
          </div>
          <Button
            clickFunc={this.handleFilterViewToggleClick}
            className={"toggle-filter-view-button"}
            text={this.state.show ? 'hide filters' : 'filter players'}
          />
          <div 
            id="scroll-box" 
            onScroll={this.handlePlayerListScroll} 
            className="player-list" 
            style={{ opacity: isFetchingPlayers ? 0.2 : 1 }}>
            <PlayerListContainer 
              players={players} 
              isFetching={isFetchingPlayers}
              rowsPerRender={this.rowsPerRender}
            />
          </div>
          <div>
            STATS
          </div>

        </div>

      </div>
		</div>
    )
  }
}

const mapStateToProps = state => {
  const { apiData } = state
  
  const {
    isFetching: isFetchingClub,
    items: clubs
  } = apiData['clubList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPosition,
    items: positions
  } = apiData['positionList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPlayers,
    items: players
  } = apiData['playerList'] || {
    isFetching: true,
    items: []
  }
  return {
    clubs,
    isFetchingClub,
    positions,
    isFetchingPosition,
    players, 
    isFetchingPlayers
  }
}

export default connect(mapStateToProps)(App)