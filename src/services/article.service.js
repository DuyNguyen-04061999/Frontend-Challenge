import { ARTICLES_API } from "@/config";
import { http } from "@/utils";

export const articleService = {
  getAllArticles: () => http.get(`${ARTICLES_API}`),

  createArticle: (data) => http.post(`${ARTICLES_API}`, data),

  getArticleBySlug: (slug) => http.get(`${ARTICLES_API}/${slug}`),

  updateArticle: (slug, data) => http.put(`${ARTICLES_API}/${slug}`, data),

  deleteArticle: (slug) => http.delete(`${ARTICLES_API}/${slug}`),

  getArticleComment: (slug) => http.get(`${ARTICLES_API}/${slug}/comments`),

  createArticleComment: (slug, body) =>
    http.post(`${ARTICLES_API}/${slug}/comments`, { body }),

  deleteArticleComment: (slug, id) =>
    http.delete(`${ARTICLES_API}/${slug}/comments/${id}`),

  createFavoriteArticle: (slug) =>
    http.post(`${ARTICLES_API}/${slug}/favorite`),

  deleteFavoriteArticle: (slug) =>
    http.delete(`${ARTICLES_API}/${slug}/favorite`),
};
