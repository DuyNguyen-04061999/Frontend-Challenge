import { cn } from "@/utils";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Button = ({ children, className = "", style = {}, loading = false }) => {
  return (
    <button
      className={cn(
        `btn btn-sm btn-dark flex items-center justify-center w-[90px] ${className}`,
        { "cursor-not-allowed": loading }
      )}
      type="submit"
      style={style}
      disabled={loading}
    >
      {loading ? (
        <LoadingOutlined style={{ marginRight: 10, fontSize: 30 }} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
