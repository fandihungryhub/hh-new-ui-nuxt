import { expect, test } from "vitest";
import { isContainHttp, isContainQueryString } from "../url";

test("check contain http", () => {
  expect(isContainHttp("null")).toBe(false);
  expect(isContainHttp("hungryhub.com")).toBe(false);
  expect(isContainHttp("www.hungryhub.com")).toBe(false);
  expect(isContainHttp("www.hungryhub.com/http")).toBe(false);
  expect(isContainHttp("www.hungryhub.com/https")).toBe(false);
  expect(isContainHttp("http://www.hungryhub.com")).toBe(true);
  expect(isContainHttp("https://www.hungryhub.com")).toBe(true);
  expect(isContainHttp("https://www.hungryhub.com/http")).toBe(true);
});

test("check contain query string", () => {
  expect(isContainQueryString("")).toBe(false);
  expect(isContainQueryString("hungryhub.com")).toBe(false);
  expect(isContainQueryString("hungryhub.com/restaurant/bangkok")).toBe(false);
  expect(isContainQueryString("hungryhub.com/restaurant?lang=en")).toBe(true);
});
