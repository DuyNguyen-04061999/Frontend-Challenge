import { useEffect, useRef } from "react";

const useEffectDidMount = (defaultFn = () => {}, dependencyList = []) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      return defaultFn();
    }

    didMountRef.current = true;
  }, dependencyList);
};

export default useEffectDidMount;
