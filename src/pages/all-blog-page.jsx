import useQuery from "@/hooks/useQuery";
import React from "react";
import { articleService } from "@/services/article.service";
import BlogCard from "@/components/BlogCard";

const AllBlogsPage = () => {
  const { data: { articles = [], articlesCount } = {}, loading, fetchData: getAllArticlesService } = useQuery({
    queryFn: () => articleService.getAllArticles(),
  });
  if (articles.length === 0) {
    return (
      <div
        className="m-5 flex justify-start items-center"
        style={{
          backgroundColor: "rgb(255, 255, 251)",
          border: "1px solid rgb(253, 216, 53)",
        }}
      >
        <h1 className="text-xl text-left">Hiện tại chưa có bài viết</h1>
      </div>
    );
  }
  return (
    <div className="p-5">
      <h1 className="text-center">Tất cả bài viết</h1>
      {articlesCount && (
        <span className="text-xl font-bold inline-block mb-3">
          Hiện đang có {articlesCount} bài viết
        </span>
      )}
      <div className="max-w-[500px] mx-auto">
        {articles?.length > 0 &&
          articles.map((e) => <BlogCard {...e} key={e?.id} reFetchArticle={getAllArticlesService} />)}
      </div>
    </div>
  );
};

export default AllBlogsPage;
