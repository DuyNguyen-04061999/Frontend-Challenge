import useEffectDidMount from "@/hooks/useEffectDidMount";
import { cn } from "@/utils";
import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

const Context = createContext();

const Tab = ({ children, callApiOnActive, queryList, keySearch }) => {
  const titleIndexRef = useRef(-1);
  const contentIndexRef = useRef(-1);
  const [search] = useSearchParams();
  const defaultIndex = search.get(keySearch)
    ? queryList?.indexOf(search.get(keySearch))
    : 0;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffectDidMount(() => {
    if (!search.get(keySearch)) {
      setActiveIndex(defaultIndex);
    }
  }, [defaultIndex]);

  const onActive = (index) => {
    setActiveIndex(index);
  };
  return (
    <Context.Provider
      value={{
        titleIndexRef,
        contentIndexRef,
        onActive,
        activeIndex,
        callApiOnActive,
        queryList,
        keySearch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Tab.Title = ({ children, className = "" }) => {
  const { titleIndexRef, onActive, activeIndex, queryList, keySearch } =
    useContext(Context);
  const indexTitle = useMemo(() => ++titleIndexRef.current, []);
  const [search, setSearch] = useSearchParams();
  const _onClick = (e) => {
    e.preventDefault();
    onActive(indexTitle);
    if (queryList && keySearch) {
      // const _search = new URLSearchParams(search);
      // _search.set(keySearch, queryList[indexTitle]);
      setSearch({ [keySearch]: queryList[indexTitle] });
    }
  };
  const active = activeIndex === indexTitle;
  return (
    <a href="#" className={cn(className, { active })} onClick={_onClick}>
      {children}
    </a>
  );
};

Tab.Content = ({ children, className, index }) => {
  // const firstRender = useRef(false);
  const { contentIndexRef, activeIndex, callApiOnActive } = useContext(Context);
  const indexContent = index ?? useMemo(() => ++contentIndexRef.current, []);
  const active = indexContent === activeIndex;

  // useEffect(() => {
  //   if (active) {
  //     firstRender.current = true;
  //   }
  // }, [active]);

  // if (callApiOnActive && !active) {
  //   if (!firstRender.current) {
  //     return null;
  //   }
  // }

  if (callApiOnActive && !active) return null;

  return (
    <div className={cn(className, { "active show": active })}>{children}</div>
  );
};
export default Tab;
