import React, { Children, cloneElement, Fragment } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ children }) => {
  return (
    <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
      {children}
    </ol>
  );
};

Breadcrumb.Item = ({ children, to }) => {
  const Component = to ? Link : Fragment;
  return (
    <li className="breadcrumb-item">
      {to ? (
        <Component className="text-gray-400" to={to}>
          {children}
        </Component>
      ) : (
        <Component>{children}</Component>
      )}
    </li>
  );
};

export default Breadcrumb;
