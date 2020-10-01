import React from 'react';
import Button from './button';

const shallowButton = (props) => shallow(<Button {...props} />);

describe('Button component:', () => {
  it('should render', () => {
    const component = shallow(<Button onClick={() => {}} />);
    expect(component).toMatchSnapshot();
  });
  it('handleClick should call onClick in props', () => {
    const mockHandler = jest.fn();
    const component = shallowButton({ onClick: mockHandler });
    expect(mockHandler.mock.calls.length).toBe(0);
    component.find('.btn').simulate('click');
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
