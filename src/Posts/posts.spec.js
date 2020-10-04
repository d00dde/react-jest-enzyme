import React from "react";
import Posts from "./posts";
import {
  NEWS,
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
} from "./constants";

const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

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
  it("should called fetch when component mounted", () => {
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${0}`
    );
  });
  describe("updatePage method:", () => {
    it("should update 'page' value in state", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });
    it("should call fetch with updated data", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${""}&${PAGE_HITS}${20}&${PAGE_PARAM}${DEFAULT_PAGE}`
      );
    });
  });
  describe("handlePageChange method:", () => {
    it("should call 'updatePage' with given argument", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("1") },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(1);
    });

    it("should call 'updatePage' with increased value", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("prev") },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1);
    });

    it("should call 'updatePage' with decreased value", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue("next") },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1);
    });
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
