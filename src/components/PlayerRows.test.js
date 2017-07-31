import React from 'react'
import { shallow, mount } from 'enzyme'
import PlayerRows from './PlayerRows'


const setup = testProps => {

	const props = Object.assign({
		apiData__players: [
			{id:1, first_name:'first_name1', second_name:'second_name1', web_name:'web_name1', element_type:1, team:1, now_cost:50, ict_index:5},
			{id:2, first_name:'first_name2', second_name:'second_name2', web_name:'web_name2', element_type:2, team:2, now_cost:100, ict_index:10}
		],
		apiData__positions: [{id:1, plural_name_short:'pos1'},{id:2, plural_name_short:'pos2'}],
		apiData__clubs: [{id:1, short_name:'club1'},{id:2, short_name:'club2'}],
		togglePlayerSelect: jest.fn(),
		rowsPerRender: 10,
		filters: {
			filters__name: '',
			filters__club: 0,
			filters__position: [1, 2, 3, 4],
			filters__price: {lowVal: 10, highVal: 140},
			filters__rank: {lowVal: 0, highVal: 10} 
		},
		selection: {selection__players: []}

	}, testProps)

	const output = shallow(<PlayerRows {...props} />);
	const fullDOM = mount(<PlayerRows {...props} />);

	return {
		props: props,
		output: output,
		fullDOM: fullDOM
	}
}

describe('components', () => {
  
  describe('PlayerRows', () => {
    
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.node.type).toBe('ul')
    })

	it('should not render more rows than rowsPerRender prop states', () => {
    	const { output } = setup()
    	output.setProps({ rowsPerRender: 1 });
		output.update();
    	expect(output.node.props.children.length).toBe(1);
    })

    it('should call togglePlayerSelect on handleSelectPlayer', () => {
		const { output, props } = setup()
		output.find('[selectPlayer]').node.props.selectPlayer()
		expect(props.togglePlayerSelect).toBeCalledWith(1)
	})

  	it('should modify row when selected', () => {
		const { fullDOM } = setup()
		fullDOM.setProps({ selection: {selection__players: [1]}})
		fullDOM.update()
		expect(fullDOM.find('.player-list__row--selected').length).toBe(1)
		expect(fullDOM.find('.player-list__row--selected button').text()).toBe('-')
	})    

    it('should replace bad ASCII chars in names', () => {
		const { fullDOM } = setup()
		expect(fullDOM.node.charFix('plÃ¥yÃ©r Ã±Ã¥mÃ©')).toEqual('plåyér ñåmé');
	})

	it('should shorten name to web_name when full name over 17 chars', () => {
		const { fullDOM } = setup()
		//over 17 chars		
		expect(fullDOM.node.displayName('first_name1', 'second_name1', 'web_name1')).toEqual('web_name1*');
		//under 17 chars	
		expect(fullDOM.node.displayName('first__1', 'second_1', 'web_name1')).toEqual('first__1 second_1');
	})

	it('should return an empty string when NaN is provided', () => {
		const {fullDOM} = setup()
		expect(fullDOM.node.fabricateRank('NaN', 20)).toBe('')
		expect(fullDOM.node.fabricateForm('NaN')).toBe('')
	})	

	//filters
	//
	it('should filter by name', () => {
		const { output, props } = setup()
		let newFilters = Object.assign({}, props, {
			filters: {...props.filters, filters__name: 'first_name1'}
		})
		output.setProps({ filters: newFilters.filters })
		output.update()
		expect(output.node.props.children.length).toBe(1)
	})

	it('should filter by club', () => {
		const { output, props } = setup()
		let newFilters = Object.assign({}, props, {
			filters: {...props.filters, filters__club: 1}
		})
		output.setProps({ filters: newFilters.filters })
		output.update()
		expect(output.node.props.children.length).toBe(1)
	})

	it('should filter by position', () => {
		const { output, props } = setup()
		let newFilters = Object.assign({}, props, {
			filters: {...props.filters, filters__position: [1,3,4]}
		})
		output.setProps({ filters: newFilters.filters })
		output.update()
		expect(output.node.props.children.length).toBe(1)
	})

	it('should filter by price', () => {
		const { output, props } = setup()
		let newFilters = Object.assign({}, props, {
			filters: {...props.filters, filters__price:  {lowVal: 10, highVal: 80}}
		})
		output.setProps({ filters: newFilters.filters })
		output.update()
		expect(output.node.props.children.length).toBe(1)
	})

	it('should filter by rank', () => {
		const { output, props } = setup()
		let newFilters = Object.assign({}, props, {
			filters: {...props.filters, filters__rank:  {lowVal: 0, highVal: 4}}
		})
		output.setProps({ filters: newFilters.filters })
		output.update()
		expect(output.node.props.children.length).toBe(1)
	})


  })

})

