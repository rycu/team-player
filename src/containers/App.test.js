import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import actions from '../actions/apiActions'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const setup = testProps => {

  let test__store = {
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

  const fullDOM = mount(
    <Provider store={mockStore(test__store)}>
    <App/>
    </Provider>
  )

  const fullDOM_NoApiData = mount(
    <Provider store={mockStore(Object.assign({}, test__store, {apiData:{}}))}>
    <App/>
    </Provider>
  )

  return {
    fullDOM: fullDOM,
    fullDOM_NoApiData: fullDOM_NoApiData
  }
}

describe('containers', () => {

  describe('App', () => {

    it('should render correctly', () => {
      const { fullDOM } = setup()
      expect(fullDOM.length).toBeTruthy()
    })

    it('should render correctly without apiData', () => {
      const { fullDOM_NoApiData } = setup()
      expect(fullDOM_NoApiData.length).toBeTruthy() 
    })

    it('should run handlePlayerRefreshClick on PlayerRefreshClick', () => {
      const { fullDOM } = setup()
      fullDOM.find('.player-filters__refresh').props().onClick()
      expect(fullDOM.length).toBeTruthy()
    })

    it('should run handleFilterViewToggleClick on clickFunc', () => {
      const { fullDOM } = setup()
      expect(fullDOM.find('FilterSlide').props().show).toEqual(false)
      fullDOM.find('#filters-toggle Button').props().clickFunc()
      expect(fullDOM.find('FilterSlide').props().show).toEqual(true)
    })

    describe('Infinite scroll(ish)', () => {

      const { fullDOM } = setup()
      let scrollBoxProps = fullDOM.find('#player-list__scroll-box').props()
      let scrollAt1 = {target: { id:'player-list__scroll-box', scrollHeight:100, scrollTop:1 } }
      let scrollAt90 = {target: { id:'player-list__scroll-box', scrollHeight:100, scrollTop:90 } }

      it('should onScroll of scroll-box run handlePlayerListScroll', () => {
        expect(scrollBoxProps.onScroll(scrollAt1)).toBe(30)
      })

      it('should add 15 to rowsPerRender each time scroll reaches 90%', () => {       
        expect(scrollBoxProps.onScroll(scrollAt90)).toBe(45)
        expect(scrollBoxProps.onScroll(scrollAt1)).toBe(45)
        expect(scrollBoxProps.onScroll(scrollAt90)).toBe(60)
      })
    })


  })
})