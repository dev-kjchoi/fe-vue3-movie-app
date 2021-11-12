import { shallowMount } from "@vue/test-utils";
import Search from "~/components/Search";

describe("components/Search.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallowMount(Search);
  });

  test("선택 가능한 연도의 개수가 일치합니다", () => {
    const year = wrapper.vm.filters.find((f) => f.name === "year");
    const yearLength = new Date().getFullYear() - 1901 + 1;
    expect(year.items.length).toBe(yearLength);
  });
});
