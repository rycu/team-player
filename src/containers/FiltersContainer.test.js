import React from 'react'
import { shallow, mount} from 'enzyme'
import FiltersContainer from './FiltersContainer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

import actions from '../actions/filterActions'

const mockStore = configureStore()

const setup = testProps => {

  const mockOnClick = () => jest.fn(); 

  const props = Object.assign({
    filterState: {
      filters__name: '',
      filters__club: 0,
      filters__position: [1, 2, 3, 4],
      filters__price: {lowVal: 10, highVal: 140},
      filters__rank: {lowVal: 0, highVal: 10} 
    },
    apiData__positions: [{id:1, plural_name_short:'pos1'},{id:2, plural_name_short:'pos2'}],
    apiData__clubs: [{id:1, short_name:'club1'},{id:2, short_name:'club2'}],
    onClick: mockOnClick,
    isFetching: false,
    actions: {}
  }, testProps)

  let store = mockStore({filters: {
      filters__name: '',
      filters__club: 0,
      filters__position: [1, 2, 3, 4],
      filters__price: {lowVal: 10, highVal: 140},
      filters__rank: {lowVal: 0, highVal: 10} 
    }})

  const fullDOM = mount(<FiltersContainer {...props} store={store} />)
  
  return {
    props: props,
    fullDOM: fullDOM,
    store: store
  }
}

describe('containers', () => {

  describe('FiltersContainer', () => {

    it('should render correctly', () => {
      const { fullDOM, props, store} = setup()
      //console.log(fullDOM.node)
      expect(fullDOM.props()).toEqual(Object.assign({}, props, {store}))
    })

    it('should display loading when isFetching is true', () => {
      const { fullDOM } = setup()
      expect(fullDOM.find('.player-filters__refresh').text()).toBe('Refresh Players')
      fullDOM.setProps({isFetching: true})
      fullDOM.update()
      expect(fullDOM.find('.player-filters__refresh').text()).toBe('Loading...')

    })
  })
})