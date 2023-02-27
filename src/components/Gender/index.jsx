import { cn } from "@/utils";
import React, { useState } from "react";

const Gender = ({ options, onChange, genderActive }) => {
  const [activeIndex, setActiveIndex] = useState(() =>
    options.findIndex((e) => e.value === genderActive)
  );
  const onClick = (index) => () => {
    setActiveIndex(index);
    onChange(options[index].value);
  };
  return (
    <div className="btn-group-toggle" data-toggle="buttons">
      {options?.map((e, id) => (
        <label
          className={cn("btn btn-sm btn-outline-border", {
            active: activeIndex === id,
          })}
          key={e.id}
          onClick={onClick(id)}
        >
          <input type="radio" name="gender" /> {e.value}
        </label>
      ))}
    </div>
  );
};

export default Gender;
