import axios from "axios";
import { useCallback, useEffect, useRef } from "react";

const useRequest = () => {
  const abortController = useRef(new AbortController());
  useEffect(() => () => abortController.current.abort(), []);

  return useCallback((options) => axios({ signal: abortController.current.signal, ...options }), []);
};

export default useRequest;
