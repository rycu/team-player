import React from 'react'
import { shallow, mount } from 'enzyme'
import FilterByPosition from './FilterByPosition'

const setup = testProps => {

	const props = Object.assign({
		updatePositionFilter: jest.fn(),
		apiData__positions: [{id:1},{id:2},{id:3},{id:4}],
		positionArr: [1,2,3,4],
		className: 'test_pos_class'
	}, testProps)

	const output = shallow(<FilterByPosition {...props} />);
	const fullDOM = mount(<FilterByPosition {...props} />);
	return {
		props: props,
		output: output,
		fullDOM: fullDOM
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

    it('should uncheck positons not in positionArr prop', () => {
		const { fullDOM, props } = setup()
		fullDOM.setProps({positionArr:[1,2,3]})
		fullDOM.node.renderCheckbox(4)
   	})

  })

})

