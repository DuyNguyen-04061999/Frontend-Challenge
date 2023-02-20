import { PATH } from "@/config";
import { cn, toSlug } from "@/utils";
import React from "react";
import { generatePath, NavLink } from "react-router-dom";

const CategoryLink = ({ title, id, className = "" }) => {
  const slug = toSlug(title);
  const link = generatePath(PATH.category, {
    slug,
    id,
  });

  return (
    <NavLink className={cn(`list-styled-link ${className}`)} to={link}>
      {title}
    </NavLink>
  );
};

export default CategoryLink;
