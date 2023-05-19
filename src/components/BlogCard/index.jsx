import { PATH } from "@/config";
import useQuery from "@/hooks/useQuery";
import { articleService } from "@/services/article.service";
import handleError from "@/utils/handleError";
import { timeFormat } from "@/utils/timeFormat";
import React from "react";
import { Link, generatePath } from "react-router-dom";

const BlogCard = ({ author, title, tagList, body, created, slug, reFetchArticle }) => {
  const timeCreate = timeFormat(created);

  const linkDetail = generatePath(PATH.blogDetail, {
    slug,
  });

  const { fetchData: deleteArticleService, loading } = useQuery({
    enabled: false,
    queryFn: ({ params }) => articleService.deleteArticle(...params),
    limitDuration: 1000,
    onSuccess: async () => await reFetchArticle()
  })

  const onDelete = async () => {
    try {
      const res = await deleteArticleService(slug)
      console.log('res :>> ', res);
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div
      className="bg-white shadow-xl p-5 rounded-md mt-5"
      style={{ border: "2px solid #e8e8e8" }}
    >
      <div className="flex items-center justify-between gap-2 mr-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img src={author.image} alt="img" className="object-cover" />
          </div>
          <span>{author.username}</span>
        </div>
        <div className="cursor-pointer" title="Xóa bài viết" onClick={onDelete}>
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
        </div>
      </div>

      <div className="content mt-4">
        <Link className="text-xl font-bold" to={linkDetail}>
          {title}
        </Link>
        <p className="line-clamp-5">{body}</p>
      </div>

      <div className="flex items-center gap-5 justify-between">
        {tagList.length > 0 &&
          tagList.map((e, id) => (
            <span
              key={id}
              className="px-[10px] py-1 bg-gray-500 text-white rounded-[100px]"
            >
              {e}
            </span>
          ))}
        {timeCreate && (
          <div className="">
            <span>Được viết vào </span>
            <strong className="font-bold">{timeCreate}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
