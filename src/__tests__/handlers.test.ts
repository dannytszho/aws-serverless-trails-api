import { createTrail, getTrailsList } from "../handlers";

test("Response is an object", () => {
  expect(typeof getTrailsList).toBe("object");
});
