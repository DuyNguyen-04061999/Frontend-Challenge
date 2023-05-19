import useQuery from "@/hooks/useQuery";
import React, { useMemo } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { articleService } from "@/services/article.service";
import { timeFormat } from "@/utils/timeFormat";
import { PATH } from "@/config";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import { required } from "@/utils";
import { useRef } from "react";
import { useState } from "react";
import handleError from "@/utils/handleError";
import BlogCmtCard from "@/components/BlogCmtCart";
import useAction from "@/hooks/useAction";

const BlogDetail = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);

  const { data: { articles = [] } = {} } = useQuery({
    queryFn: () => articleService.getAllArticles(),
  });

  const {
    data: { article },
  } = useQuery({
    enabled: !!articles,
    queryFn: () => articleService.getArticleBySlug(slug),
    limitDuration: 1000,
  });


  const articleDetail = useMemo(() => {
    if (articles?.length > 0 && article) {
      setLike(!!article.favoriteCount)
      return articles.find((e) => e.id === article.id);
    }
  }, [articles, article]);
  const editLink = generatePath(PATH.blogEdit, {
    slug,
  });


  // comment
  const { data: { comments = [] } = {}, loading, fetchData: getCommentService } = useQuery({
    enabled: !!slug,
    queryFn: () => articleService.getArticleComment(slug)

  })

  const { fetchData: postCommentService, loading: loadingPostComment } = useQuery({
    enabled: false,
    queryFn: ({ params }) => articleService.createArticleComment(...params),
    limitDuration: 1000,

  })


  const { register, form, validate, reset } = useForm({
    body: [required({ message: 'Vui lòng để lại bình luận của bạn' })]
  })

  const cmtRef = useRef(0);
  const cmtRefHeight = cmtRef.current.scrollHeight;

  const onPostCmt = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await postCommentService(slug, form.body)
        await getCommentService()
        reset?.()
      } catch (error) {
        handleError(error)
      }
    }
  }

  // like
  const { fetchData: statusArticleService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => { like ? articleService.deleteFavoriteArticle(...params) : articleService.createFavoriteArticle(...params) },
    limitDuration: 1000,
  })

  const onStatusArticle = useAction({
    promise: statusArticleService,
    pendingMessage: like ? "Đang bỏ thích bài viết" : "Đang thích bài viết",
    successMessage: like ? "Đã bỏ thích bài viết" : "Đã thích bài viết",
    errorMessage: "Lỗi"
  })


  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-left">{articleDetail?.title}</h1>
        <Link to={editLink}>
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M13.498.795l.149-.149a1.207 1.207 0 111.707 1.708l-.149.148a1.5 1.5 0 01-.059 2.059L4.854 14.854a.5.5 0 01-.233.131l-4 1a.5.5 0 01-.606-.606l1-4a.5.5 0 01.131-.232l9.642-9.642a.5.5 0 00-.642.056L6.854 4.854a.5.5 0 11-.708-.708L9.44.854A1.5 1.5 0 0111.5.796a1.5 1.5 0 011.998-.001zm-.644.766a.5.5 0 00-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 000-.708l-1.585-1.585z" />
          </svg>
        </Link>
      </div>
      <div className="content">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-5">
            <div className="author w-14 h-14 rounded-full overflow-hidden">
              <img src={articleDetail?.author?.image} alt="img" />
            </div>
            <span>{articleDetail?.author?.username}</span>
          </div>
          <div className="">
            <span>Được viết vào </span>
            <strong className="font-bold">
              {timeFormat(articleDetail?.created)}
            </strong>
          </div>
        </div>
        <p className="mt-5">{articleDetail?.body}</p>
      </div>

      {/* like */}
      <div className="cursor-pointer w-max" onClick={() => {
        setLike(!like)
        onStatusArticle(slug)
      }}>
        <svg
          color={`${like ? 'red' : '#000'}`}
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="30px"
          width="30px"
        >
          <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
        </svg>
      </div>

      <div className="comment my-10">
        <Button onClick={() => setOpen(!open)}>Bình luận</Button>


        <form className="transition-all overflow-hidden my-5" style={{ height: open ? cmtRefHeight : 0 }} onSubmit={onPostCmt}>
          <div ref={cmtRef}>
            <Field
              {...register("body")}
              className="form-control form-control-sm"
              placeholder="Bình luận của bạn về bài viết*"
            />
            <Button className="rounded-lg mx-auto w-max block bg-slate-400 border-none" loading={loadingPostComment}>Đăng bình luận</Button>
          </div>

        </form>

        {comments?.map(e => <BlogCmtCard {...e} key={e.id} reGetCmt={getCommentService} slug={slug} />)}
      </div>


    </div>
  );
};

export default BlogDetail;
