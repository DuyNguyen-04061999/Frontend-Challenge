import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";

import { delayFallback } from "@/utils";

import { lazy } from "react";
import profile from "./profile";
import AuthorsPage from "@/pages/AuthorsPage";
import BlogWrittingPage from "@/pages/BlogWrittingPage";
import AllBlogsPage from "@/pages/all-blog-page";
import BlogDetail from "@/pages/blogDetail";
const Home = lazy(() => delayFallback(import("@/pages")));
const Page404 = lazy(() => delayFallback(import("@/pages/404")));
const AuthPage = lazy(() => delayFallback(import("@/pages/AuthPage")));

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <PrivateRoute redirect={PATH.auth} />,
        children: [
          profile,
          {
            element: <AuthorsPage />,
            path: PATH.authors,
          },
          {
            element: <BlogWrittingPage />,
            path: PATH.blogCreate,
          },
          {
            element: <BlogWrittingPage />,
            path: PATH.blogEdit,
          },
          {
            element: <AllBlogsPage />,
            path: PATH.allBlogs,
          },
          {
            element: <BlogDetail />,
            path: PATH.blogDetail,
          },
        ],
      },
      {
        element: <GuestRoute redirect={PATH.profile.index} />,
        children: [
          {
            element: <AuthPage />,
            path: PATH.auth,
          },
        ],
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];
