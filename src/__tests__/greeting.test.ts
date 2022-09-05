import { getGreeting } from "../greeting";

test("testing function", () => {
  const test = getGreeting("Danny");
  console.log(test);
  expect(test).toBe("My name is Danny");
});
