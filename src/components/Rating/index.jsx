import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const Rating = ({ children, rating }) => {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="custom-control custom-checkbox flex"
      onClick={() => onChange(+rating)}
    >
      <input
        className="custom-control-input"
        type="radio"
        name="rating"
        checked={value === rating}
        onChange={() => onChange(rating)}
      />
      <label className="custom-control-label">{children}</label>
    </div>
  );
};

Rating.Group = ({ children, defaultValue, toggle, onSetFilter }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (_value) => {
    if (toggle && _value === value) {
      setValue();
      onSetFilter?.();

      return;
    }
    setValue(_value);
    onSetFilter?.(_value);
  };

  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};

export default Rating;
