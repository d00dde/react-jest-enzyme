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

const componentDidMountSpy = jest.spyOn(Component.prototype, "componentDidMount"); // так можно добавить обёртку к методу класса (в т.ч. и к методам lifecycle)
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise); // подменяет реализацию нативной (любой) функции
jest.fn().mockReturnValue("1"); // возвращает функцию, которая при вызове вернёт 1.



const renderComponent = (props) => {
  return shallow(<Component {...props} />); // разметка только корневого компонента. Самый быстрый.
  return mount(<Component {...props} />); // монтирование в DOM корневого и дочерних компонентов. Самый долгий.
  return render(<Component {...props} />); // разметка корневого и дочерних компонентов. Самый средний.
}
describe("Описание группы тестов", () => {
  let component, instance;
  beforeEach(() => { // выполнится перед каждым тестом
    jest.spyOn(window, "addEventListener"); // добавляет к функции "обёртку-шпион". У такой функции появляются методы jest
    component = renderComponent();
    instance = component.instance();
   });
   afterEach(() => { // выполнится после каждого теста
    window.addEventListener.mockRestore(); // удаляет jest-обертку перед очередным тестом
    window.addEventListener.mockClear(); // очищает данные о предидущих вызовах jest-обертки (можно в конфиге указать "clearMocks": true)
  });
  it("Описание теста", () => {
    const wrapper = component.find(".post"); // находит у компонента дочерние элементы по CSS селектору
    const state = component.state(); // возвращает текущий state компонента
    component.unmount(); // размонтирует компонент
    component.setProps(); // позволяет вызвать компонент с новыми props
    const result = Component.defaultProps.handleChange(); // можно напрямую получить доступ к defaultProps и другим свойствам Component


    instance.handleHitsChange(args); // вызов метода handleHitsChange у созданного компонента
    instance.setState(state); // вызов метода setState компонента
    instance.handleChangeTitle = jest.fn(); // инстансу можно подменить метод моковой функцией на время теста
    instance.componentDidUpdate(); // у инстанса можно напрямую вызвать методы lifecycle

    expect(wrapper.length).toBe(1); // сравнивает на эквивалентность примитивы
    expect({}).toEqual({}); // сравнивает на эквивалентность сложные структуры данных
    expect(removeObjPropImmutably()).toMatchObject({}); // сравнивает на эквивалентность объекты
    expect(trimString()).toBeNull(); // проверяет значение на равенство null
    expect(trimString()).toBeUndefined(); // проверяет значение на равенство undefined
    expect(getIsValidNumber()).toBeTruthy(); // проверяет значение на истинность
    expect(getIsValidNumber()).toBeFalsy(); // проверяет значение на ложность
    expect(wrapper).toHaveLength(1); // проверяет длину коллекции
    expect(component).toMatchSnapshot(); // создаёт Snapshot компонента.

    const mockHandler = jest.fn(); // создаёт моковую "функцию-шпион"
    expect(mockHandler.mock.calls.length).toBe(1); // проверяет, сколько раз была вызвана моковая функция
    expect(mockHandler.toHaveBeenCalledTimes(1)); // проверяет, сколько раз была вызвана моковая функция
    expect(mockHandler.toHaveBeenCalled()); // проверяет, была ли вообще вызвана моковая функция

    window.dispatchEvent(new Event("resize")); // способ иммитации события, не связаного с компонентом
  });
});
