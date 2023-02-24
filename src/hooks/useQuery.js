import {
  localStorageCache,
  reduxStorageCache,
  sessionStorageCache,
} from "@/utils";
import { CanceledError } from "axios";
import { useEffect, useReducer, useRef } from "react";
import { delayDuration } from "@/utils";

const initialState = {
  data: {},
  loading: false,
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

const _asyncFunction = {
  // key: Promise
};

const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  dependencyList = [],
  storage,
  limitDuration,
  enabled = true,
  keepPreviousData = false,
}) => {
  const [{ data, loading, error, status }, dispatch] = useReducer(
    queryReducer,
    initialState
  );

  const reFetchRef = useRef(); //call api
  const _cache = cache[storage]; //storage
  const dataRef = useRef({}); //keepPreviousData
  const controllerRef = useRef(new AbortController()); //cancelRequest axios

  const _queryKey = Array.isArray(queryKey)
    ? queryKey?.[0]
    : typeof queryKey === "string"
    ? queryKey
    : undefined;

  useEffect(() => {
    // cancel when out the page
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (typeof reFetchRef.current === "boolean") {
      reFetchRef.current = true;
    }
  }, [...dependencyList]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled].concat(_queryKey, dependencyList));

  const getCacheDataOrPreviousData = () => {
    if (reFetchRef.current) return;
    //======= keep old data =======
    if (keepPreviousData && dataRef.current[_queryKey] && _queryKey) {
      return dataRef.current[_queryKey];
    }
    // ===== tránh call lại api khi trùng queryKey ====
    if (_asyncFunction[_queryKey]) {
      return _asyncFunction[_queryKey];
    }

    if (_cache) {
      return _cache.get(_queryKey);
    }
    return;
  };

  const setCacheDataOrPreviousData = (data) => {
    if (_queryKey && data) {
      if (keepPreviousData && dataRef.current) {
        dataRef.current[_queryKey] = data;
      }

      _asyncFunction[_queryKey] = data;

      if (_cache) {
        const expire = cacheTime || 0 + Date.now();
        _cache.set(_queryKey, data, expire);
      }
    }
  };

  const fetchData = async () => {
    //hủy api cũ
    controllerRef.current.abort();
    //tạo signal api mới
    controllerRef.current = new AbortController();
    const startTime = Date.now();

    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_STATUS, payload: "pending" });
      let res;

      res = getCacheDataOrPreviousData();

      if (!res) {
        // call api
        res = queryFn({ signal: controllerRef.current.signal });
      }

      if (res instanceof Promise) {
        res = await res;
      }
      await delayDuration(startTime, limitDuration);
      if (res) {
        dispatch({ type: SET_DATA, payload: res });
        dispatch({ type: SET_STATUS, payload: "success" });
        setCacheDataOrPreviousData(res);
        reFetchRef.current = false;
        dispatch({ type: SET_LOADING, payload: false });
        return res;
      }
    } catch (err) {
      // error = err;
      await delayDuration(startTime, limitDuration);
      if (err instanceof CanceledError) {
      } else {
        dispatch({ type: SET_ERROR, payload: new Error(err?.message) });
        dispatch({ type: SET_STATUS, payload: "error" });
        dispatch({ type: SET_LOADING, payload: false });
        console.log(
          "%cerror useQuery.js line:153 ",
          "color: red; display: block; width: 100%;",
          err
        );
        throw err?.response?.data;
      }
    }
  };

  return {
    data,
    loading,
    error,
    status,
    fetchData,
  };
};
export default useQuery;
