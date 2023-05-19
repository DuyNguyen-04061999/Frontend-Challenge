import withListLoading from "@/utils/withListLoading";
import React from "react";
import Skeleton from "../Skeleton";

const Author = ({ username, bio, image }) => {
  return (
    <div className="w-full">
      <div className="h-[200px] w-[200px] rounded-full overflow-hidden mx-auto">
        <img src={image} alt="" />
      </div>
      <span className="text-gray-500 font-bold text-center block">
        {username}
      </span>
      <p className="text-center">{bio}</p>
    </div>
  );
};

export const AuthorLoading = () => {
  return (
    <div className="w-full">
      <div className="h-[200px] w-[200px] rounded-full overflow-hidden mx-auto">
        <Skeleton />
      </div>
      <div className="flex justify-center">
        <Skeleton width={100} height={20} className="m-5" />
      </div>
      {/* bio */}
      <Skeleton height={50} />
    </div>
  );
};

export const ListAuthorItem = withListLoading(Author, AuthorLoading);
export default Author;
