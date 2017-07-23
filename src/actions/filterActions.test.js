import * as types from '../constants/ActionTypes'
import * as actions from './filterActions'

describe('filter actions', () => {

	it('updateNameFilter should create UPDATE_NAME_FILTER action', () => {
		expect(
			actions.updateNameFilter('TEST NAME')
		).toEqual({
			type: types.UPDATE_NAME_FILTER, 
			nameTxt: 'TEST NAME'
		})
	})

	it('updateClubFilter should create UPDATE_CLUB_FILTER action', () => {
		expect(
			actions.updateClubFilter(22)
		).toEqual({
			type: types.UPDATE_CLUB_FILTER, 
			clubId: 22
		})
	})

	it('updatePositionFilter should create UPDATE_POSITION_FILTER action', () => {
		expect(
			actions.updatePositionFilter(false, 'TEST_POSITION_ID')
		).toEqual({
			type: types.UPDATE_POSITION_FILTER, 
			checked: false,
			id: 'TEST_POSITION_ID'
		})
	})

	it('updatePriceFilter should create UPDATE_PRICE_FILTER action', () => {
		expect(
			actions.updatePriceFilter(5, 10)
		).toEqual({
			type: types.UPDATE_PRICE_FILTER, 
			lowVal: 5,
			highVal: 10
		})
	})

	it('updateRankFilter should create UPDATE_RANK_FILTER action', () => {
		expect(
			actions.updateRankFilter(2, 8)
		).toEqual({
			type: types.UPDATE_RANK_FILTER, 
			lowVal: 2,
			highVal: 8
		})
	})

	it('resetFilters should create RESET_FILTERS action', () => {
		expect(
			actions.resetFilters()
		).toEqual({
			type: types.RESET_FILTERS
		})
	})
})