import React from "react";
import Info from "./info";

const shallowInfo = (props) => shallow(<Info {...props} />);

const componentDidMountSpy = jest.spyOn(Info.prototype, "componentDidMount");
const componentDidUpdateSpy = jest.spyOn(Info.prototype, "componentDidUpdate");
const componentWillUnmountSpy = jest.spyOn(
  Info.prototype,
  "componentWillUnmount"
);

describe("Info component:", () => {
  let component;
  beforeEach(() => {
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
    component = shallowInfo();
  });
  afterEach(() => {
    window.addEventListener.mockRestore();
    window.removeEventListener.mockRestore();
  });
  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
  describe("Lifecycle methods:", () => {
    it("should componentDidMount called once", () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });
    it("should componentWillUnmount not called when component mount", () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
    });
    it("should componentDidUpdate called when receive props", () => {
      component.setProps();
      expect(componentDidUpdateSpy).toHaveBeenCalledTimes(1);
    });
    it("should componentWillUnmount called when component unmounted", () => {
      component.unmount();
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe("Info handlers:", () => {
    it("should addEventListener called once when component mount", () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    });
    it("should removeEventListener called once when component unmount", () => {
      component.unmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    });
    it("should handleChangeTitle called once when component updated", () => {
      const instance = component.instance();
      instance.handleChangeTitle = jest.fn();
      instance.componentDidUpdate();
      expect(instance.handleChangeTitle).toHaveBeenCalledTimes(1);
    });
    it("should handleWidth called during window resize", () => {
      expect(component.state().width).toBe(0);
      window.dispatchEvent(new Event("resize"));
      expect(component.state().width).toBe(window.innerWidth);
    });
  });
});
