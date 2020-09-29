import React from "react";
import Posts from "./posts";

const shallowPosts = (props) => shallow(<Posts {...props} />);

describe("Posts component", () => {
  const DEFAULT_PAGE = 10;
  let component, instance;

  beforeEach(() => {
    component = shallowPosts();
    instance = component.instance();
  });

  it("should render Post component", () => {
    expect(component).toMatchSnapshot();
  });
  describe("Post handlers", () => {
    it("should handle search input value", () => {
      expect(component.state().searchQuery).toBe("");
      instance.handleInputChange({ target: { value: "test" } });
      expect(component.state().searchQuery).toBe("test");
    });
    it("should handle change of hits per page", () => {
      expect(component.state().hitsPerPage).toBe(20);
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } }); // обёртка String преобразует число к строке (иммитация получения значения из input)
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
    });
    it("should handle change page if 'Enter' clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: "Enter" });
      expect(component.state().page).toBe(0);
    });

    it("should not change page if 'a' button clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: "a" });
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });
  });
});
