import { avatarDefault } from "@/utils";
import createArray from "@/utils/createArray";
import withListLoading from "@/utils/withListLoading";
import moment from "moment";
import React from "react";
import Skeleton from "../Skeleton";
import useQuery from "@/hooks/useQuery";
import { articleService } from "@/services/article.service";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";
import useAction from "@/hooks/useAction";



const BlogCmtCard = ({ author, created, body, id, reGetCmt, slug }) => {

  const { loading, fetchData: deleteCmtService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => articleService.deleteArticleComment(...params),
    limitDuration: 1000,
    onSuccess: () => reGetCmt(),
  })

  // const onDeleteCmt = async () => {
  //   try {

  //   } catch (error) {
  //     handleError(error)
  //   }
  // }
  const onDeleteCmt = useAction({
    promise: deleteCmtService,
    pendingMessage: "Đang xóa bình luận",
    successMessage: "Đã xóa bình luận",
    errorMessage: "Lỗi",
  });
  return (
    <div className="review">
      <div className="review-body">
        <div className="row">
          <div className="col-12 col-md-auto">
            {/* Avatar */}
            <div className="avatar avatar-xxl mb-6 mb-md-0">
              <span className="avatar-title rounded-circle overflow-hidden">
                <img
                  src={author?.image || avatarDefault}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
            </div>
          </div>
          <div className="col-12 col-md">
            {/* Header */}
            <div className="row mb-6">
              <div className="col-12">
                {/* Time */}
                <span className="font-size-xs text-muted">
                  {author?.username},{" "}
                  <time>
                    {moment(created).format("DD MMM, YYYY")}
                  </time>
                </span>
              </div>
            </div>
            {/* Text */}
            <p className="text-gray-500">{body}</p>
            <div className=" flex items-center gap-4 cursor-pointer w-max" onClick={() => onDeleteCmt(slug, id)}>
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>

              <span>Xóa bình luận</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCmtCardLoading = () => {
  return (
    <div className="review">
      <div className="review-body">
        <div className="row">
          <div className="col-12 col-md-auto">
            <div className="avatar avatar-xxl mb-6 mb-md-0">
              <span className="avatar-title rounded-circle overflow-hidden">
                <Skeleton />
              </span>
            </div>
          </div>
          <div className="col-12 col-md">
            <div className="row mb-6">
              <div className="col-12">
                <Skeleton width={84} height={23} />
              </div>
              <div className="col-12">
                <span className="font-size-xs text-muted">
                  <Skeleton width={116} height={18} />
                </span>
              </div>
            </div>
            {/* Text */}
            <Skeleton width={200} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCmtCardList = withListLoading(BlogCmtCard, BlogCmtCardLoading);
export default BlogCmtCard;
