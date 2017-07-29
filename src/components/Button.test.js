import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

const setup = testProps => {

	const props = Object.assign({
		clickFunc: jest.fn(),
		className: 'test_btn_class',
		text: 'test_btn_name'
	}, testProps)

	const output = shallow(<Button {...props} />);
	
	return {
		props: props,
		output: output.node
	}
}

describe('components', () => {
  describe('Button', () => {
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.type).toBe('button')
 		expect(output.props.className).toBe(props.className)
    })

    it('should call clickFunc on click', () => {
      const { output, props } = setup()
      output.props.onClick()
      expect(props.clickFunc).toBeCalled()
    })

  })
})

