import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes, { string } from "prop-types";
import { cn } from "@/utils";
import useEffectDidMount from "@/hooks/useEffectDidMount";
const Context = createContext();

const Radio = ({ children, rating }) => {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="custom-control custom-checkbox flex"
      onClick={() => onChange(rating)}
    >
      <input
        className="custom-control-input"
        type="radio"
        name={rating}
        checked={value === rating}
        onChange={() => onChange(rating)}
      />
      <label className="custom-control-label">{children}</label>
    </div>
  );
};

Radio.Gender = ({ children, gender }) => {
  const { value, onChange } = useContext(Context);

  return (
    <label
      className={cn("btn btn-sm btn-outline-border", {
        active: value === gender,
      })}
    >
      <input
        type="radio"
        name="gender"
        checked={value === gender}
        onChange={() => onChange(gender)}
      />
      {children}
    </label>
  );
};

Radio.Payment = ({ children, imgSrc, type }) => {
  const { value, onChange } = useContext(Context);

  return (
    <div className="form-group card card-sm border">
      <div className="card-body">
        {/* Radio */}
        <div className="custom-control custom-radio">
          {/* Input */}
          <input
            className="custom-control-input collapsed"
            id={type}
            name="payment"
            type="radio"
            checked={value === type}
            onChange={() => onChange(type)}
          />
          {/* Label */}
          <label
            className="custom-control-label d-flex justify-content-between font-size-sm text-body text-nowrap"
            htmlFor={type}
          >
            {children}
            <img className="ml-2" src={imgSrc} alt="..." />
          </label>
        </div>
      </div>
    </div>
  );
};

Radio.Group = ({ children, defaultValue, toggle, onSetFilter }) => {
  const [value, setValue] = useState(defaultValue); //=== dùng để checked ====

  useEffectDidMount(() => setValue(defaultValue), [defaultValue]); //=== khi defaultValue bên ngoài thay đổi ====

  const onChange = (_value) => {
    if (toggle && _value === value) {
      setValue();
      onSetFilter?.();

      return;
    }
    if (_value !== value) {
      setValue(_value);
      onSetFilter?.(_value); //khi click input cần làm cái gì đó ở bên ngoài
    }
  };

  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
Radio.propTypes = {
  children: PropTypes.node.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Radio.Group.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.bool,
  onSetFilter: PropTypes.func,
};
export default Radio;
