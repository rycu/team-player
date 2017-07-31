import React from 'react'
import { shallow } from 'enzyme'
import IconLogo from './IconLogo'

const output = shallow(<IconLogo/>)
//console.log(output)

describe('components', () => {
  describe('IconLogo', () => {
    it('should render correctly', () => {
   		expect(output.node.type).toBe('svg')
    })

    it('should render default props if none given', () => {
    	expect(output.find('[fill]').node.props.fill).toBe('white');
    })

    it('should render given props', () => {
    	output.setProps({ FillColor: 'lime' });
		  output.update();
    	expect(output.find('[fill]').node.props.fill).toBe('lime');
    })
  })
})