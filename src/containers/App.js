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
import ReactDOM from 'react-dom'


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
  children: PropTypes.object,
  show: PropTypes.bool.isRequired,
}

//Main App component 
class App extends Component {
  static propTypes = {
    apiData__clubs: PropTypes.array.isRequired,
    apiData__positions: PropTypes.array.isRequired,
    apiData__players: PropTypes.array.isRequired,
    isFetchingClub: PropTypes.bool.isRequired,
    isFetchingPosition: PropTypes.bool.isRequired,
    isFetchingPlayers: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  //hide filters by default
  state = {
    showFilters:false
  }

  //dispatch API calls on mount
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDataIfNeeded('apiData__clubs', 'premTeams'))
    dispatch(fetchDataIfNeeded('apiData__positions', 'premElement_types'))
    dispatch(fetchDataIfNeeded('apiData__players', 'premElements'))
  }

  //invalidate and refresh playerList data
  handlePlayerRefreshClick = () => {
    const { dispatch } = this.props
    dispatch(invalidateData('apiData__players'))
    dispatch(fetchDataIfNeeded('apiData__players', 'premElements'))
  }

  //toggle filter view state
  handleFilterViewToggleClick = () => {
    this.setState({showFilters: !this.state.showFilters})
  }

  //Infinite scroll(ish) for PlayerListContainer 
  rowsPerRender = 30
  handlePlayerListScroll = e => {
    let boxHeight = ReactDOM.findDOMNode(this.refs[e.target.id]).clientHeight;
    let offset = (Number(e.target.scrollHeight)-Number(boxHeight));
    if (e.target.scrollTop >= (offset-(offset/10))) {
      this.rowsPerRender += 15; 
      this.forceUpdate();
    }
    return this.rowsPerRender
  }

  //Finally the render
  render() {
    
    const {
      apiData__clubs, 
      isFetchingClub, 
      apiData__positions, 
      isFetchingPosition, 
      apiData__players, 
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
                                 apiData__clubs={apiData__clubs}
                                 apiData__positions={apiData__positions} 
                                 playerRefreshClick={() => this.handlePlayerRefreshClick} 
                                 isFetching={isFetchingPlayers}
                               />
              </FilterSlide>
            </div>

            <div id="filters-toggle">
              <Button
                clickFunc={this.handleFilterViewToggleClick}
                className={"toggle-filter-view-button"}
                text={this.state.showFilters ? 'hide filters' : 'filter players'}
              />
            </div>

            <div
              id="player-list__scroll-box"
              ref="player-list__scroll-box"
              onScroll={this.handlePlayerListScroll} 
              className="player-list" 
              style={{ opacity: isFetchingPlayers ? 0.2 : 1 }}>
                <PlayerListContainer
                  apiData__players={apiData__players} 
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
    items: apiData__clubs
  } = apiData['apiData__clubs'] 
  || {
    isFetching: true,
    items: []
  }

  const {
    isFetching: isFetchingPosition,
    items: apiData__positions
  } = apiData['apiData__positions'] 
  || {
    isFetching: true,
    items: []
  }

  const {
    isFetching: isFetchingPlayers,
    items: apiData__players
  } = apiData['apiData__players'] 
  || {
    isFetching: true,
    items: []
  }
  return {
    apiData__clubs,
    isFetchingClub,
    apiData__positions,
    isFetchingPosition,
    apiData__players,
    isFetchingPlayers
  }
}

export default connect(mapStateToProps)(App)