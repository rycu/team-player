import React from 'react'
import { mount, shallow } from 'enzyme'
import PlayerListContainer from './PlayerListContainer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

const setup = testProps => { 

  let store = mockStore({
    filters: {
      filters__name: '',
      filters__club: 0,
      filters__position: [1, 2, 3, 4],
      filters__price: { lowVal: 10, highVal: 140 },
      filters__rank: { lowVal: 0, highVal: 10 },
    },
    apiData:{
      apiData__clubs:{
        isFetching: false,
        didInvalidate: false, 
        items:[{id:1, short_name:'club1'},{id:2, short_name:'club2'}]
      },
      apiData__positions:{
        isFetching: false,
        didInvalidate: false, 
        items:[{id:1, plural_name_short:'pos1'},{id:2, plural_name_short:'pos2'}]
      }
    },
    selection:{
      selection__name: 'MY WINNING XI',
      selection__players: [],
      selection__purse: 500,
      selection__spent: 0
    }
  })

  const props = Object.assign({
    apiData__players: [{id:1, first_name:'first_name1', second_name:'second_name1', web_name:'web_name1', element_type:1, team:1, now_cost:50, ict_index:5},
          {id:2, first_name:'first_name2', second_name:'second_name2', web_name:'web_name2', element_type:2, team:2, now_cost:100, ict_index:10}],
    isFetching: false,
    rowsPerRender:  30
  }, testProps)

  const fullDOM = mount(<PlayerListContainer {...props} store={store} />)
  
  return {
    props: props,
    fullDOM: fullDOM,
    store: store
  }
}

describe('containers', () => {

  describe('PlayerListContainer', () => {

    it('should render correctly', () => {
      const { fullDOM, props, store} = setup()
      expect(fullDOM.length).toBeTruthy();
      expect(fullDOM.props()).toEqual(Object.assign({}, props, {store}))
    })

    it('should display Loading... msg when apiData__players is Emtpy & Fetching', () => {
      const { fullDOM } = setup()
      fullDOM.setProps({apiData__players: [], isFetching: true})
      expect(fullDOM.find('#playerList h2').text()).toEqual('Loading...')
    })

    it('should display No Data Found 😭 msg when apiData__players is Emtpy & !Fetching', () => {
      const { fullDOM } = setup()
      fullDOM.setProps({apiData__players: []})
      expect(fullDOM.find('#playerList h2').text()).toEqual('No Data Found 😭')
    })

  })
})