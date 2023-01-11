import { useEffect, useState } from "react";
import { getEmployees } from "../api";
import usePrevious from "./usePrevious";

export function useUserAPI(page, perPage) {
  const prevPage = usePrevious(page);
  const prevPerPage = usePrevious(perPage);
  const [response, setResponse] = useState({
    loading: true,
    success: true,
    data: null,
  });

  useEffect(() => {
    if (prevPage !== page || prevPerPage !== perPage) {
      (async () => {
        setResponse({ loading: true, success: true, data: null });
        const { data, success } = await getEmployees(page, perPage);
        setResponse({ loading: false, data, success });
      })();
    }
  }, [prevPage, prevPerPage, page, perPage]);

  return {
    loading: response.loading,
    success: response.success,
    data: response.data,
  };
}
