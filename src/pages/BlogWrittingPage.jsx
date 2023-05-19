import Button from "@/components/Button";
import Field from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { articleService } from "@/services/article.service";
import { cn, object, required } from "@/utils";
import handleError from "@/utils/handleError";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogWrittingPage = () => {
  const { slug } = useParams();
  const { fetchData: interactArticleService, loading } = useQuery({
    enabled: false,
    queryFn: ({ params }) => {
      return slug
        ? articleService.updateArticle(...params)
        : articleService.createArticle(...params);
    },
    limitDuration: 1000,
  });

  const { data } = useQuery({
    enabled: !!slug,
    queryFn: () => articleService.getArticleBySlug(slug),
  });
  console.log("data :>> ", data);
  const { formRef, register, form, validate, reset } = useForm(
    {
      title: [required({ message: "Vui lòng ghi tiêu đề bài viết" })],
      tagList: [required({ message: "Vui lòng cho biết tag liên quan" })],
      description: [required({ message: "Vui lòng điền mô tả bài viết" })],
      body: [required({ message: "Vui lòng điền nội dung bài viết" })],
    },

    {
      initialValue: slug
        ? {
            title: data?.article?.title,
            tagList: data?.article?.tagList[0],
            description: data?.article?.description,
            body: data?.article?.body,
          }
        : {},
    }
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let res;
        if (slug) {
          const checkSubmit = object.isEqual(
            {
              title: data?.article?.title,
              tagList: data?.article?.tagList[0],
              description: data?.article?.description,
              body: data?.article?.body,
            },
            form
          );
          if (checkSubmit) {
            return toast.warn("Vui lòng thêm thông tin mới để chỉnh sửa");
          }
          res = await interactArticleService(slug, {
            ...form,
            tagList: [form.tagList],
          });
        } else {
          res = await interactArticleService({
            ...form,
            tagList: [form.tagList],
          });
        }
        if (res) {
          slug
            ? toast.success("Bạn đã cập nhật viết thành công")
            : toast.success("Bạn đã tạo viết thành công");
          reset?.();
        }
      } catch (error) {
        handleError(error);
      }
    }
  };
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      ref={formRef}
      className="max-w-[500px] mx-auto my-10"
    >
      <h1 className="text-3xl font-bold text-center">
        Viết blog theo phong cách của bạn
      </h1>
      <Field
        {...register("title")}
        className="form-control form-control-sm"
        placeholder="Tiêu đề"
      />
      <Field
        {...register("tagList")}
        className="form-control form-control-sm"
        placeholder="Thẻ tag, VD: lập trình, thanh xuân,...*"
      />
      <Field
        {...register("description")}
        className="form-control form-control-sm"
        placeholder="Mô tả *"
      />

      <Field
        {...register("body")}
        rows={5}
        placeholder="Nội dung bài viết *"
        classNameGroup="mb-7"
        renderInput={({ error, _onChange, ...props }) => (
          <textarea
            {...props}
            onChange={_onChange}
            className={cn("form-control form-control-sm", {
              "border-red-500 placeholder:text-red-500": error,
            })}
          />
        )}
      />
      <Button className="normal-case" loading={loading}>
        {slug ? "Cập nhật" : "Tạo bài viết mới"}
      </Button>
    </form>
  );
};

export default BlogWrittingPage;
