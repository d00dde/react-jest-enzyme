import React from "react";
import Posts from "./posts";

describe("Posts component", () => {
  it("should render Post component", () => {
    // const component = shallow(<Posts />); // разметка только корневого компонента. Самый быстрый.
    // const component = mount(<Posts />); // монтирование в DOM корневого и дочерних компонентов. Самый долгий.
    const component = render(<Posts />); // разметка корневого и дочерних компонентов. Самый средний.
    expect(component).toMatchSnapshot();
  });
});
