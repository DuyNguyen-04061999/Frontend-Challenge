import { cn } from "@/utils";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Button = ({ children, className = "", style = {}, loading = false }) => {
  return (
    <button
      className={cn(`btn btn-sm btn-dark relative ${className}`, {
        "cursor-not-allowed": loading,
      })}
      type="submit"
      style={style}
      disabled={loading}
    >
      <LoadingOutlined
        style={{ fontSize: 30 }}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          { visible: loading },
          { invisible: !loading }
        )}
      />
      <span className={cn({ visible: !loading }, { invisible: loading })}>
        {children}
      </span>
    </button>
  );
};

export default Button;
