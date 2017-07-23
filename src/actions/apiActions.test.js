import * as types from '../constants/ActionTypes'
import * as actions from './apiActions'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('api actions', () => {

	it('invalidateData should create INVALIDATE_DATA action', () => {
		expect(
			actions.invalidateData('apiData__test')
		).toEqual({
			type: types.INVALIDATE_DATA,
			dataName: 'apiData__test'
		})
	})

	it('receiveData should create RECEIVE_DATA action', () => {
		
		Date.now = jest.genMockFunction().mockReturnValue(0);

		expect(
			actions.receiveData('apiData__test', ['TEST_DATA'])
		).toEqual({

			type: types.RECEIVE_DATA,
			dataName: 'apiData__test',
			data_in: ['TEST_DATA'],
    		receivedAt: 0
		})
	})
	
})

describe('async api actions', () => {

	const middlewares = [thunk]
	const mockStore = configureStore(middlewares)

	it('fetches data if data is not in store', () => {
		let expectedActions = [
			{"dataName": "apiData__clubs", "type": "REQUEST_DATA"},
			{"dataName": "apiData__clubs", "type": "FAILED_DATA"}
		]
		let store = mockStore({apiData: {apiData__testX: {isFetching: false, didInvalidate: true}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__clubs', 'premTeams')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it('fetches data if isFetching:false & didInvalidate:true', () => {
		let expectedActions = [
			{"dataName": "apiData__test", "type": "REQUEST_DATA"},
			{"dataName": "apiData__test", "type": "FAILED_DATA"}
		]
		let store = mockStore({apiData: {apiData__test: {isFetching: false, didInvalidate: true}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__test', 'testSlug')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it('prevents fetch as didInvalidate:false', () => {
		let store = mockStore({apiData: {apiData__test: {isFetching: false, didInvalidate: false}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__test', 'testSlug')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual([])
		})
	})

	it('prevents fetch as isFetching:true', () => {
		let store = mockStore({apiData: {apiData__test: {isFetching: true, didInvalidate: false}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__test', 'testSlug')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual([])
		})
	})
})

