import React from "react";

const StarRating = ({ color = "#fdd836" }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 24 24"
      size={14}
      height={14}
      width={14}
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color }}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default StarRating;
