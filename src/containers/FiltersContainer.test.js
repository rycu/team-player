import React from 'react'
import { mount, shallow } from 'enzyme'
import FiltersContainer from './FiltersContainer'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

const setup = testProps => {

  const mockOnClick = () => jest.fn(); 

  let store = mockStore({filters: {
      filters__name: '',
      filters__club: 0,
      filters__position: [1, 2, 3, 4],
      filters__price: {lowVal: 10, highVal: 140},
      filters__rank: {lowVal: 0, highVal: 10} 
    }})

  const props = Object.assign({
    apiData__positions: [],
    apiData__clubs: [],
    playerRefreshClick: mockOnClick,
    isFetching: false,
  }, testProps)

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
      expect(fullDOM.length).toBeTruthy();
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