import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

const output = shallow(<Header/>)
//console.log(output)

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
    	expect(output.node.type).toBe('header')
		expect(output.node.props.className).toBe('header')
    })
  })
})