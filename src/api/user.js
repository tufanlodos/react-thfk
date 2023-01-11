import { buildQuery, get } from "./config";

export function getUsers(page = 1, per_page = 6) {
  return get(buildQuery("users", { page, per_page }));
}
