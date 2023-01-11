import { buildQuery } from "../config";

it("should return correct query when parameters provided", () => {
  expect(buildQuery("")).toBe("");
  expect(buildQuery("test")).toBe("test");
  expect(buildQuery("test", { page: 1, per_page: undefined })).toBe(
    "test?page=1"
  );
  expect(buildQuery("test", { page: 1, per_page: null })).toBe("test?page=1");
  expect(buildQuery("test", { page: 1, per_page: 6 })).toBe(
    "test?page=1&per_page=6"
  );
});
