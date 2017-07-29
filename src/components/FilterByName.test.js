import React from 'react'
import { shallow } from 'enzyme'
import FilterByName from './FilterByName'

const setup = testProps => {

	const props = Object.assign({
		updateNameFilter: jest.fn(),
		nameTxt: 'TEST NAME',
		placeholder: 'TEST PLACEHOLDER',
		className: 'test_name_class'
	}, testProps)

	const output = shallow(<FilterByName {...props} />);
	
	return {
		props: props,
		output: output.node
	}
}

describe('components', () => {
  describe('FilterByName', () => {
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.type).toBe('input')
 		expect(output.props.className).toBe(props.className)
 		expect(output.props.placeholder).toBe(props.placeholder)
    })

    it('should call updateNameFilter on change', () => {
      const { output, props } = setup()
      output.props.onChange({target: { value: props.nameTxt } })
      expect(props.updateNameFilter).toBeCalledWith(props.nameTxt)
    })

  })
})

