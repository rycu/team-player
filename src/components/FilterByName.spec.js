import React from 'react'
import { shallow } from 'enzyme'
import FilterByName from './FilterByName'

// const setup = props => {
//   const component = shallow(
//     <FilterByName {...props} />
//   )

//   return {
//     component: component
//   }
// }


// describe('components', () => {
// 	it('renders', () => {
//     	expect().toEqual()
// 	})
// })

// describe('FilterByName component', () => {
//   it('should render correctly', () => {
//     const { component } = setup({ placeholder: 'Search', nameTxt: "bobby" })
//    	expect(component.placeholder()).toBe('Search')
//   })
// })
// 
// 
// 
// FROM enzyme site //
// it('renders three <Foo /> components', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find(Foo)).to.have.length(3);
//   });
