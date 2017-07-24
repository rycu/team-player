import * as types from '../constants/ActionTypes'
import * as actions from './apiActions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('api actions', () => {

	it('invalidateData should create INVALIDATE_DATA action', () => {
		expect(
			actions.invalidateData('apiData__test')
		).toEqual({
			type: types.INVALIDATE_DATA,
			dataName: 'apiData__test'
		})
	})
})

describe('async api actions', () => {

	afterEach(() => {
		nock.cleanAll()
	})

	it('fetches data if data is not in store', () => {

		Date.now = jest.genMockFunction().mockReturnValue(0);

		nock('https://ryancutter.co.uk')
			.get('/labs/test_data/premierleague_06_07/premElement_types.php')
			.reply(200, ['TEST_DATA'])

		let expectedActions = [
			{"dataName": "apiData__clubs", "type": "REQUEST_DATA"},
			{"dataName": "apiData__clubs", "data_in": ["TEST_DATA"], "receivedAt": 0, "type": "RECEIVE_DATA"}
		]
		let store = mockStore({apiData: {apiData__testX: {isFetching: false, didInvalidate: true}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__clubs', 'premElement_types')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual(expectedActions)
		})
	})

	it('fetches data if isFetching:false & didInvalidate:true', () => {

		nock('https://ryancutter.co.uk')
			.get('/labs/test_data/premierleague_06_07/premElement_types.php')
			.reply(200, ['TEST_DATA'])

		let expectedActions = [
			{"dataName": "apiData__test", "type": "REQUEST_DATA"},
			{"dataName": "apiData__test", "data_in": ["TEST_DATA"], "receivedAt": 0, "type": "RECEIVE_DATA"}
		]
		let store = mockStore({apiData: {apiData__test: {isFetching: false, didInvalidate: true}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__test', 'premElement_types')).then(() => {
		// return of async actions
		expect(store.getActions()).toEqual(expectedActions)
		})
	})


	it('attempts to fetch data and fails due to bad path', () => {

		nock('https://ryancutter.co.uk')
			.get('/labs/test_data/premierleague_06_07/bad_path.php')
			.reply(404)

		let expectedActions = [
			{"dataName": "apiData__clubs", "type": "REQUEST_DATA"},
			{"dataName": "apiData__clubs", "type": "FAILED_DATA"}
		]
		let store = mockStore({apiData: {apiData__testX: {isFetching: false, didInvalidate: true}}})

		return store.dispatch(actions.fetchDataIfNeeded('apiData__clubs', 'bad_path')).then(() => {
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