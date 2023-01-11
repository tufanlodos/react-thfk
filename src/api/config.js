export const BASE_URL = "https://reqres.in/api/";

export function buildQuery(path, queryObject) {
  const query = [];
  for (var key in queryObject) {
    if (queryObject[key] !== undefined && queryObject[key] !== null) {
      query.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(queryObject[key])
      );
    }
  }
  const builtPath = `${path}${query.length ? "?" + query.join("&") : ""}`;
  return builtPath;
}

export async function get(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { success: true, data: await response.json() };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.log(`Error on get ${path}`, error);
    return { success: false, data: null };
  }
}
