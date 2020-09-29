// ПОДГОТОВКА К ТЕСТИРОВАНИЮ С ПОМОЩЬЮ enzyme (ЧЕРЕЗ src/config/setupTest.js)

// в pacage.json настраиваем jest
"jest": {
  "verbose": true,
  "clearMocks": true,
  "collectCoverage": true,
  "setupFilesAfterEnv": [
    "./config/setupTest.js"
  ],
  "snapshotSerializers": [
    "./node_modules/enzyme-to-json/serializer"
  ],
  "transform": {
    "^.+\\.js$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy"
  }
}
// в setupTest.js импортируем нужные утилиты из enzyme

import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};


// ИСПОЛЬЗОВАНИЕ JEST
import React from 'react';
import { Component } from './Component'; // тестируемый компонент

const renderComponent = (props) => {
  return shallow(<Component {...props} />); // разметка только корневого компонента. Самый быстрый.
  return mount(<Component {...props} />); // монтирование в DOM корневого и дочерних компонентов. Самый долгий.
  return render(<Component {...props} />); // разметка корневого и дочерних компонентов. Самый средний.
}
describe("Описание группы тестов", () => {
  let component, instance;
	beforeEach(() => { // выполнится перед каждым тестом
    component = renderComponent();
    instance = component.instance();
   });
  it("Описание теста", () => {
    const wrapper = component.find(".post"); // находит у компонента дочерние элементы по CSS селектору
    const state = component.state(); // возвращает текущий state компонента
    const result = Component.defaultProps.handleChange(); // можно напрямую получить доступ к defaultProps и другим свойствам Component

    instance.handleHitsChange(args); // вызов метода handleHitsChange у созданного компонента
    instance.setState(state); // вызов метода setState компонента

    expect(wrapper.length).toBe(1); // сравнивает на эквивалентность
    expect(wrapper).toHaveLength(1); // проверяет длину коллекции
    expect(component).toMatchSnapshot(); // создаёт Snapshot компонента.
  });
});
