import apiDataReducer, {prepStateUpdate} from './apiDataReducer'
import * as types from '../constants/ActionTypes'

describe('filters reducer', () => {


	it('should handle initial state', () => {
		expect(
			apiDataReducer(undefined, {})
		).toEqual(
			{}
		)
	})


	it('should handle INVALIDATE_DATA', () => {
		
		expect(
			apiDataReducer({}, {
				type: types.INVALIDATE_DATA,
				dataName: 'apiData__test'
			})
		).toEqual(
			{
				"apiData__test": {"didInvalidate": true, "isFetching": false, "items": []}
			}
		)
	})

	it('should handle REQUEST_DATA', () => {
	
		expect(
			apiDataReducer({}, {
				type: types.REQUEST_DATA,
				dataName: 'apiData__test'
			})
		).toEqual(
			{
				"apiData__test": {"didInvalidate": false, "isFetching": true, "items": []}
			}
		)
	})


	it('should handle RECEIVE_DATA', () => {
	
		expect(
			apiDataReducer({}, {
				type: types.RECEIVE_DATA,
				dataName: 'apiData__test',
				data_in: {data: true},
    			receivedAt: 1500813189291
			})
		).toEqual(
			{
				"apiData__test": {"didInvalidate": false, "isFetching": false, "items": {data: true}, "lastUpdated": 1500813189291}
			}
		)
	})

		it('should handle FAILED_DATA', () => {
	
		expect(
			apiDataReducer({}, {
				type: types.FAILED_DATA,
				dataName: 'apiData__test'
			})
		).toEqual(
			{
				"apiData__test": {"didInvalidate": false, "isFetching": false, "items": []}
			}
		)
	})


	it('should handle REQUEST_DATA', () => {
	
		expect(
			apiDataReducer({}, {
				type: types.REQUEST_DATA,
				dataName: 'apiData__test'
			})
		).toEqual(
			{
				"apiData__test": {"didInvalidate": false, "isFetching": true, "items": []}
			}
		)
	})
	
})

