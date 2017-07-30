import React from 'react'
import { shallow, mount } from 'enzyme'
import DualRange from './DualRange'

const setup = testProps => {

	const props = Object.assign({
		updateRangeFilter: jest.fn(),
		rangeObj: {lowVal:1, highVal: 9},
		min: 0, 
		max: 10,
		step: 1,
		gap: 1,
		unit: 'TEST UNIT'
	}, testProps)

	const output = shallow(<DualRange {...props} />);
	const fullDOM = mount(<DualRange {...props} />);

	return {
		props: props,
		output: output,
		fullDOM: fullDOM
	}
}

describe('components', () => {
  describe('DualRange', () => {
    
    it('should render correctly', () => {
    	const { output, props } = setup()
    	expect(output.node.type).toBe('div')
 		expect(output.props.placeholder).toBe(props.placeholder)
    })

 
 	it('should update state on input change', () => {
 
    	const { output, fullDOM } = setup()
    	fullDOM.find('#low').simulate('change', { target: { id:'low', value: '5' }})
    	fullDOM.find('#high').simulate('change', { target: { id:'high', value: '6' }})
    	expect(fullDOM.state().lowVal).toBe(5)
    	expect(fullDOM.state().highVal).toBe(6)
    })


    it('should call updateRangeFilter on onMouseUp, onKeyUp & onTouchEnd', () => {

		const {output, props } = setup()

		expect.assertions(1);

		let onMouseUpPromise = new Promise((resolve, reject) => {
				resolve(output.find('#low').node.props.onMouseUp({target: { id:'low' } }))
		})
		let onKeyUpPromise = new Promise((resolve, reject) => {
				resolve(output.find('#low').node.props.onKeyUp({target: { id:'low' } }))
		})
		let onTouchEndPromise = new Promise((resolve, reject) => {
				resolve(output.find('#low').node.props.onTouchEnd({target: { id:'low' } }))
		})

		return Promise.all([onMouseUpPromise, onKeyUpPromise, onTouchEndPromise]).then(() => {
			expect(props.updateRangeFilter).toBeCalledWith(1, 9)
		})
	
    })

    it('should fail overlapSubmitPromice when ID other than low or high provided',  () => {
   		const { fullDOM } = setup()
		expect.assertions(1);
		let args = { target: { id:'BAD_ID', value: '5' }}
		return expect(fullDOM.node.handleSubmit(args)).rejects.toEqual("bad Id (BAD_ID) passed to handleSubmit");
    })

    it('should leave the componant state unchanged if values are outside min/max props', () => {
    	const { fullDOM } = setup()
    	fullDOM.node.updateState('low', '-1')
    	fullDOM.node.updateState('high', '11')
    	expect(fullDOM.state().lowVal).toBe(1)
    	expect(fullDOM.state().highVal).toBe(9)
    });

    it('should prevent high/low overlap and favour the used input (high)', () => {
		const { output, props } = setup()
		output.setState({lowVal: 3, highVal: 2})
		expect.assertions(1);
		let onMouseUpPromise = new Promise((resolve, reject) => {
				resolve(output.find('#high').node.props.onMouseUp({target: { id:'high' } }))
		})
		return onMouseUpPromise.then(() => {
			expect(props.updateRangeFilter).toBeCalledWith(1, 2)
		})
    })

    it('should prevent high/low overlap and favour the used input (low)', () => {
		const { output, props } = setup()
		output.setState({lowVal: 3, highVal: 2})
		expect.assertions(1);
		let onMouseUpPromise = new Promise((resolve, reject) => {
				resolve(output.find('#low').node.props.onMouseUp({target: { id:'low' } }))
		})
		return onMouseUpPromise.then(() => {
			expect(props.updateRangeFilter).toBeCalledWith(3, 4)
		})
    })

    it('should round if step is < 1', () => {
		const { output } = setup()
		output.setProps({ step: 0.1, rangeObj: {lowVal:'1.11111', highVal: '9.99999'} });
		output.update();
		expect(output.find('.dual-range__label').text()).toBe('1.1TEST UNIT to 10TEST UNIT')
    })


  })

})

