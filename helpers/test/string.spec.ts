import { expect, test } from "vitest";
import { toSlug, isValidJsonString, convertToNumber } from "../string";

test("to slug", () => {
  expect(toSlug("111 11")).toBe("111-11");
  expect(toSlug(111)).toBe("");
  expect(toSlug("restaurant name")).toBe("restaurant-name");
  expect(toSlug("restaurant name bangkok")).toBe("restaurant-name-bangkok");
});

test("is valid json string", () => {
  expect(isValidJsonString(null)).toBe(false);
  expect(isValidJsonString(undefined)).toBe(false);
  expect(isValidJsonString(111)).toBe(false);
  expect(isValidJsonString(["a", "b", "c"])).toBe(false);
  expect(isValidJsonString("11111")).toBe(true);
  expect(isValidJsonString("{ name: 'Bangkok Restaurant }")).toBe(false);
  expect(isValidJsonString('{ "name": "Bangkok Restaurant" }')).toBe(true);
  expect(
    isValidJsonString(
      '[{ "name": "Bangkok Restaurant" }, { "name": "Indonesia Restaurant" }]'
    )
  ).toBe(true);
});

test("convert to number", () => {
  expect(convertToNumber("Rp. 5000")).toBe(5000);
  expect(convertToNumber("Rp. 5000,00")).toBe(500000);
});
