import { cn } from "@/utils";
import React from "react";

const Field = ({
  type = "text",
  label,
  error,
  renderInput,
  onChange,
  ...props
}) => {
  const _onChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="form-group relative">
      <label className="sr-only" htmlFor={props.id}>
        {label}
      </label>
      {renderInput ? (
        renderInput({ onChange, ...props })
      ) : (
        <input
          type={type}
          {...props}
          onChange={_onChange}
          style={{ border: error ? "1px solid red" : "" }}
          className={cn(props.className, { "placeholder-red-500": !!error })}
        />
      )}

      <div className="absolute left-0 top-full italic">
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default Field;
