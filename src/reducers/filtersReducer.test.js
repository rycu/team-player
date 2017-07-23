import filtersReducer from './filtersReducer'
import * as types from '../constants/ActionTypes'

describe('filters reducer', () => {
	it('should handle initial state', () => {
		expect(
			filtersReducer(undefined, {})
		).toEqual(
			{
				filters__name: '',
				filters__club: 0,
				filters__position: [1, 2, 3, 4],
				filters__price: {lowVal: 10, highVal: 140},
				filters__rank: {lowVal: 0, highVal: 10} 
			}
		)
	})

	it('should handle UPDATE_NAME_FILTER', () => {
		
		//Edit name
		expect(
			filtersReducer({}, {
				type: types.UPDATE_NAME_FILTER,
				nameTxt: 'TEST NAME'
			})
		).toEqual(
			{
				filters__name: 'TEST NAME'
			}
		)

		//Edit name to empty string to ensure unfiltered name is possible
		expect(
			filtersReducer({}, {
				type: types.UPDATE_NAME_FILTER,
				nameTxt: ''
			})
		).toEqual(
			{
				filters__name: ''
			}
		)
	})

	it('should handle UPDATE_CLUB_FILTER', () => {
		
		//Change club
		expect(
			filtersReducer({}, {
				type: types.UPDATE_CLUB_FILTER,
				clubId: 22
			})
		).toEqual(
			{
				filters__club: 22
			}
		)

		//Change club to 0 to ensure unfiltered club is possible
		expect(
			filtersReducer({}, {
				type: types.UPDATE_CLUB_FILTER,
				clubId: 0
			})
		).toEqual(
			{
				filters__club: 0
			}
		)
	})


	it('should handle UPDATE_POSITION_FILTER', () => {
		
		//remove position
		expect(
			filtersReducer({filters__position: ['GPK', 'DEF', 'MID', 'FWD']}, {
				type: types.UPDATE_POSITION_FILTER,
				checked: false,
				id: 'GPK'
			})
		).toEqual(
			{
				filters__position: ['DEF', 'MID', 'FWD']
			}
		)

		//add position
		expect(
			filtersReducer({filters__position: ['GPK', 'DEF', 'MID']}, {
				type: types.UPDATE_POSITION_FILTER,
				checked: true,
				id: 'FWD'
			})
		).toEqual(
			{
				filters__position: ['GPK', 'DEF', 'MID', 'FWD']
			}
		)

	})


	it('should handle UPDATE_PRICE_FILTER', () => {
		
		//change range values
		expect(
			filtersReducer({}, {
				type: types.UPDATE_PRICE_FILTER,
				lowVal: 5,
				highVal: 10
			})
		).toEqual(
			{
				filters__price: {lowVal:5, highVal: 10}
			}
		)
	})


	it('should handle UPDATE_RANK_FILTER', () => {
		
		//change range values
		expect(
			filtersReducer({}, {
				type: types.UPDATE_RANK_FILTER,
				lowVal: 2,
				highVal: 8
			})
		).toEqual(
			{
				filters__rank: {lowVal:2, highVal: 8}
			}
		)
	})

	it('should handle UPDATE_RANK_FILTER', () => {
		
		//change range values
		expect(
			filtersReducer({}, {
				type: types.UPDATE_RANK_FILTER,
				lowVal: 2,
				highVal: 8
			})
		).toEqual(
			{
				filters__rank: {lowVal:2, highVal: 8}
			}
		)
	})


	it('should handle RESET_FILTERS', () => {
		
		//Reset filters to initial state
		expect(
			filtersReducer({}, {
				type: types.RESET_FILTERS
			})
		).toEqual(
			filtersReducer(undefined, {})
		)
	})

})