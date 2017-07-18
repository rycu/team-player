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


//Stateless ES6 Function component the slide transition of the filters component
const FilterSlide = ({children, show}) => {

    const duration = 500;
    const defaultStyle = {
      transition: `margin-top ${duration}ms ease-in-out`,
      marginTop: '-260px'
    }
    const transitionStyles = {
      entering: { marginTop: 0 },
      entered:  { marginTop: 0 },
    };

    return(
      <Transition in={show} timeout={duration}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {children}
          </div>
        )}
      </Transition>
    );
}

FilterSlide.propTypes = {
  children: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
}


//Main App component 
class App extends Component {
  static propTypes = {
    data__clubs: PropTypes.array.isRequired,
    data__positions: PropTypes.array.isRequired,
    data__players: PropTypes.array.isRequired,
    isFetchingClub: PropTypes.bool.isRequired,
    isFetchingPosition: PropTypes.bool.isRequired,
    isFetchingPlayers: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  //hide filters as default
  state = {
    showFilters:false
  }

  //dispatch API calls on mount
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('clubList', 'premTeams'))
    dispatch(fetchDataIfNeeded('positionList', 'premElement_types'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  //invalidate and refresh playerList data
  handlePlayerRefreshClick = () => {
    const { dispatch } = this.props
    dispatch(invalidateData('playerList'))
    dispatch(fetchDataIfNeeded('playerList', 'premElements'))
  }

  //toggle filter view state
  handleFilterViewToggleClick = e => {
    this.setState({showFilters: !this.state.showFilters})
  }

  //Infinite scroll(ish) for PlayerListContainer 
  rowsPerRender = 30
  handlePlayerListScroll = e => {
    let boxHeight = document.getElementById(e.target.id).clientHeight;
    let offset = (Number(e.target.scrollHeight)-Number(boxHeight));
    if (e.target.scrollTop >= (offset-(offset/10))) {
      this.rowsPerRender += 15;
      this.forceUpdate();
    }
  }

  //Finally the render
  render() {
    
    const {
      data__clubs, 
      isFetchingClub, 
      data__positions, 
      isFetchingPosition, 
      data__players, 
      isFetchingPlayers
    } = this.props
    
    return (
  		<div>
  			
        <Header />

        <div className="drafts">

          <PitchContainer />

          <div className="player-selection">

            <div  id="player-filters" className={"player-filters"} style={{ opacity: (isFetchingClub || isFetchingPosition) ? 0.2 : 1 }}>
              <FilterSlide show={this.state.showFilters}>
                <FiltersContainer
                  data__clubs={data__clubs}
                  data__positions={data__positions} 
                  onClick={() => this.handlePlayerRefreshClick} 
                  isFetching={isFetchingPlayers}
                />
              </FilterSlide>
            </div>

            <Button
              clickFunc={this.handleFilterViewToggleClick}
              className={"toggle-filter-view-button"}
              text={this.state.showFilters ? 'hide filters' : 'filter players'}
            />

            <div 
              id="scroll-box" 
              onScroll={this.handlePlayerListScroll} 
              className="player-list" 
              style={{ opacity: isFetchingPlayers ? 0.2 : 1 }}>
              <PlayerListContainer 
                data__players={data__players} 
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
    items: data__clubs
  } = apiData['clubList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPosition,
    items: data__positions
  } = apiData['positionList'] || {
    isFetching: true,
    items: []
  }
  const {
    isFetching: isFetchingPlayers,
    items: data__players
  } = apiData['playerList'] || {
    isFetching: true,
    items: []
  }
  return {
    data__clubs,
    isFetchingClub,
    data__positions,
    isFetchingPosition,
    data__players, 
    isFetchingPlayers
  }
}

export default connect(mapStateToProps)(App)