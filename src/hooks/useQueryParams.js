import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

const useQueryParams = (defaultParams = {}) => {
  const params = { ...defaultParams };
  const [searchParam, setSearchParam] = useSearchParams();

  for (const [key, val] of searchParam.entries()) {
    try {
      params[key] = JSON.parse(val || defaultParams[key]);
    } catch (error) {
      params[key] = val || defaultParams[key];
    }
  }

  const setParams = (paramsObj = {}) => {
    const qs = queryString.stringify({ ...params, ...paramsObj });

    setSearchParam(qs);
  };

  return [params, setParams];
};

export default useQueryParams;
