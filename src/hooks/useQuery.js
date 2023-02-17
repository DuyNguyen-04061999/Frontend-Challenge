import {
  localStorageCache,
  reduxStorageCache,
  sessionStorageCache,
} from "@/utils";
import { useEffect, useReducer, useRef } from "react";

const initialState = {
  data: {},
  loading: true,
  error: new Error(""),
  status: "idle",
};

const SET_DATA = "setData";
const SET_LOADING = "setLoading";
const SET_ERROR = "setError";
const SET_STATUS = "setStatus";

const queryReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_DATA: {
      return { ...state, data: payload };
    }
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    case SET_ERROR: {
      return { ...state, error: payload };
    }
    case SET_STATUS: {
      return { ...state, status: payload };
    }

    default:
      return state;
  }
};

const cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
  redux: reduxStorageCache,
};

const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  dependencyList = [],
  storage,
  enabled = true,
  keepPreviousData = false,
}) => {
  const [{ data, loading, error, status }, dispatch] = useReducer(
    queryReducer,
    initialState
  );
  const reFetchRef = useRef();
  const _cache = cache[storage];
  const dataRef = useRef({});
  useEffect(() => {
    if (typeof reFetchRef.current === "boolean") {
      reFetchRef.current = true;
    }
  }, [...dependencyList]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [queryKey, enabled, ...dependencyList]);

  const getCacheDataOrPreviousData = () => {
    if (keepPreviousData && dataRef.current[queryKey] && queryKey) {
      return dataRef.current[queryKey];
    }

    if (queryKey && !reFetchRef.current && _cache) {
      return _cache.get(queryKey);
    }
  };

  const setCacheDataOrPreviousData = (data) => {
    if (keepPreviousData && dataRef.current) {
      dataRef.current[queryKey] = data;
    }
    if (queryKey && _cache) {
      const expire = cacheTime + Date.now() || undefined;
      _cache.set(queryKey, res, expire);
    }
  };

  const fetchData = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_STATUS, payload: "pending" });
      let res = getCacheDataOrPreviousData();

      if (!res) {
        // call api
        res = await queryFn();
      }
      dispatch({ type: SET_DATA, payload: res });
      dispatch({ type: SET_STATUS, payload: "success" });
      setCacheDataOrPreviousData(res);

      reFetchRef.current = false;
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: new Error(error?.message) });
      dispatch({ type: SET_STATUS, payload: "error" });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return {
    data,
    loading,
    error,
    status,
  };
};
export default useQuery;
