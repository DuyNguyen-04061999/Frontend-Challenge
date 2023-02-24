import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";
import ResetPasswordPage from "@/pages/reset-password";

import { lazy } from "react";
import profile from "./profile";

const Home = lazy(() => import("@/pages"));
const Page404 = lazy(() => import("@/pages/404"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const ProductDetailPage = lazy(() => import("@/pages/[slug]"));
const AuthPage = lazy(() => import("@/pages/auth"));
const ContactPage = lazy(() => import("@/pages/contact"));
const FaqPage = lazy(() => import("@/pages/faq"));

const ShippingPage = lazy(() => import("@/pages/shipping"));

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
        children: [profile],
      },
      {
        element: <GuestRoute redirect={PATH.profile.index} />,
        children: [
          {
            element: <AuthPage />,
            path: PATH.auth,
          },
          {
            element: <ResetPasswordPage />,
            path: PATH.resetPassword,
          },
        ],
      },
      {
        element: <ProductPage />,
        path: PATH.products,
      },
      {
        element: <ProductPage />,
        path: PATH.category,
      },
      {
        element: <ProductDetailPage />,
        path: PATH.productDetail,
      },
      {
        element: <ShippingPage />,
        path: PATH.shipping,
      },
      {
        element: <FaqPage />,
        path: PATH.faq,
      },
      {
        element: <ContactPage />,
        path: PATH.contact,
      },
    ],
  },
  {
    element: <Page404 />,
    path: "*",
  },
];
