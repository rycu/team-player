import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import actions from '../actions/apiActions'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const setup = testProps => {

  //const mockOnClick = () => jest.fn(); 

  let store = mockStore(
    {
      filters: {
        filters__name: '',
        filters__club: 0,
        filters__position: [1, 2, 3, 4],
        filters__price: {lowVal: 10, highVal: 140},
        filters__rank: {lowVal: 0, highVal: 10} 
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
        },
        apiData__players:{
          isFetching: false,
          didInvalidate: false, 
          items:[
            {id:1, first_name:'first_name1', second_name:'second_name1', web_name:'web_name1', element_type:1, team:1, now_cost:50, ict_index:5},
            {id:2, first_name:'first_name2', second_name:'second_name2', web_name:'web_name2', element_type:2, team:2, now_cost:100, ict_index:10}
          ]
        }
      },
      selection:{
        selection__name: 'MY WINNING XI',
        selection__players: [],
        selection__purse: 500,
        selection__spent: 0
      }
    }
  )

  const props = Object.assign({
    apiData__clubs: [],
    apiData__positions: [],
    apiData__players: [],
    isFetchingClub: false,
    isFetchingPosition: false,
    isFetchingPlayers: false,
    lastUpdated: 1234567890,
    dispatch: jest.fn(),
    actions: {...actions},
  }, testProps)

  const fullDOM = mount(
    <Provider store={store}>
    <App {...props}  />
    </Provider>
  )

  return {
    props: props,
    fullDOM: fullDOM,
    store: store
  }
}

describe('containers', () => {

  describe('App', () => {

    it('should render correctly', () => {
      const { fullDOM, props, store} = setup()
      //console.log(fullDOM.node)
      expect(fullDOM.length).toBeTruthy();
      //expect(fullDOM.props()).toEqual(Object.assign({}, props, {store}))
    })

    //ADAPT FOR getElementById
    // it('should onScroll of scroll-box run handlePlayerListScroll and add 15 to rowsPerRender each time scroll reaches 90%', () => {
    //   const { fullDOM } = setup()
    //   let scrollBoxProps = fullDOM.find('#scroll-box').props()
    //   let scrollAt1 = {target: { ref:'scroll-box', scrollHeight:100, scrollTop:1 } }
    //   let scrollAt90 = {target: { ref:'scroll-box', scrollHeight:100, scrollTop:90 } }
    //   expect(scrollBoxProps.onScroll(scrollAt1)).toBe(30)
    //   expect(scrollBoxProps.onScroll(scrollAt90)).toBe(45)
    //   expect(scrollBoxProps.onScroll(scrollAt1)).toBe(45)
    //   expect(scrollBoxProps.onScroll(scrollAt90)).toBe(60)
    // })

    it('should run handleFilterViewToggleClick onClick', () => {
      const { fullDOM } = setup()
      expect(fullDOM.find('FilterSlide').props().show).toEqual(false)
      fullDOM.find('#filters-toggle Button').props().clickFunc()
      fullDOM.update()
      expect(fullDOM.find('FilterSlide').props().show).toEqual(true)
    })

    it('should run handlePlayerRefreshClick onClick', () => {
      const { fullDOM } = setup()
      fullDOM.find('FiltersContainer').props().onClick()
      //NOT FIREING handlePlayerRefreshClick
      console.log(fullDOM.find('FiltersContainer').props().onClick())
    })



  })
})