import React from 'react'
import { shallow } from 'enzyme'
import DualRange from './DualRange'

const setup = testProps => {

	const props = Object.assign({
		updateRangeFilter: jest.fn(),
		rangeObj: {lowVal:1, highVal: 9},
		min: 0, 
		max: 10,
		step: 1,
		gap: 1,
		unit: 'TEST UNIT',
		className: 'test_range_class'
	}, testProps)

	const output = shallow(<DualRange {...props} />);

	return {
		props: props,
		output: output
	}
}

describe('components', () => {
  describe('DualRange', () => {
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.node.type).toBe('div')
 		expect(output.props.placeholder).toBe(props.placeholder)
    })

 
 	//async component test required
    it('should call updateRangeFilter on change', () => {
		//const { output, props } = setup()

		//console.log(output.find('#low').node.props);
		//output.find('#low').node.props.onMouseUp({target: { id:'low' } })
		//expect(props.updateRangeFilter).toBeCalledWith('low')
    })

  })
})

