import React from 'react'
import { shallow } from 'enzyme'
import FilterByPosition from './FilterByPosition'

const setup = testProps => {

	const props = Object.assign({
		updatePositionFilter: jest.fn(),
		apiData__positions: [{id:1}],
		positionArr: [1,2,3],
		className: 'test_pos_class'
	}, testProps)

	const output = shallow(<FilterByPosition {...props} />);

	return {
		props: props,
		output: output
	}
}

describe('components', () => {
  describe('FilterByPosition', () => {
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.node.type).toBe('ul')
 		expect(output.node.props.className).toBe(props.className)
 		expect(output.node.props.placeholder).toBe(props.placeholder)
    })

 
    it('should call updatePositionFilter on change', () => {
		const { output, props } = setup()
		output.find('[type="checkbox"]').node.props.onChange({target: { checked: false, id:1 } })
		expect(props.updatePositionFilter).toBeCalledWith(false, 1)
    })

  })
})

