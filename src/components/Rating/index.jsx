import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
const Context = createContext();

const Rating = ({ children, rating }) => {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="custom-control custom-checkbox flex"
      onClick={() => onChange(rating)}
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
  const [value, setValue] = useState(defaultValue); //=== dùng để checked ====
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
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
Rating.propTypes = {
  children: PropTypes.node.isRequired,
  rating: PropTypes.number.isRequired,
};

Rating.Group.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValue: PropTypes.number,
  toggle: PropTypes.bool,
  onSetFilter: PropTypes.func,
};
export default Rating;
