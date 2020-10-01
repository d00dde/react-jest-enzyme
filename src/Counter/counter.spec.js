import React from 'react';
import Counter from './counter';

const shallowCounter = (props) => shallow(<Counter {...props} />);

describe('Counter component:', () => {
  let component, instance;
  beforeEach(() => {
    component = shallowCounter();
    instance = component.instance();
  });
  it('should render', () => {
    expect(component).toMatchSnapshot();
  });
  describe('Counter handlers:', () => {
    it('handleClick should add 1 to counter', () => {
      expect(component.state().count).toBe(0);
      instance.handleClick();
      expect(component.state().count).toBe(1);
    });
    it('handleReset should reset counter to 42', () => {
      expect(component.state().count).toBe(0);
      instance.handleReset(42);
      expect(component.state().count).toBe(42);
    });
    it('click to resetBtn should set counter to default', () => {
      const btn = component.find('.resetBtn');
      btn.simulate('click');
      expect(component.state().count).toBe(10);
    });
    it('click to plusOneBtn should add 1 to counter', () => {
      const btn = component.find('.plusOneBtn');
      btn.simulate('click');
      expect(component.state().count).toBe(1);
    });
  });
});
