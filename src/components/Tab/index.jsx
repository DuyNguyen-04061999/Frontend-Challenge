import { Children, createContext } from "react";

const Context = createContext();

const Tab = ({ children }) => {
  return <li className="list-styled-item">{children}</li>;
};

Tab.Group = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return <Context.Provider>{children}</Context.Provider>;
};
