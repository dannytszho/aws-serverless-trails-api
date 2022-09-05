import { getGreeting } from "../greeting";

test("testing function", () => {
  const test = getGreeting("Danny");
  expect(test).toBe("Hi! My name is Danny");
});
