import React from 'react'
import { shallow } from 'enzyme'
import FilterByClub from './FilterByClub'

const setup = testProps => {

	const props = Object.assign({
		updateClubFilter: jest.fn(),
		clubId: 1,
		apiData__clubs: [{id:1}],
		className: 'test_club_class'
	}, testProps)

	const output = shallow(<FilterByClub {...props} />);
	
	return {
		props: props,
		output: output.node
	}
}


describe('components', () => {
  describe('FilterByClub', () => {
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.type).toBe('select')
 		expect(output.props.className).toBe(props.className)
    })

    it('should call updateClubFilter on change', () => {
      const { output, props } = setup()
      output.props.onChange({target: { value: 10 } })
      expect(props.updateClubFilter).toBeCalledWith(10)
    })

  })
})

