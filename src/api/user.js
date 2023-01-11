import { buildQuery, get } from "./config";

export function getEmployees(page = 1, perPage = 6) {
  return get(buildQuery("users", { page, per_page: perPage }));
}
