import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";
import { delayFallback } from "@/utils";

import { lazy } from "react";
import profile from "./profile";
const Home = lazy(() => delayFallback(import("@/pages")));
const Page404 = lazy(() => delayFallback(import("@/pages/404")));
const ProductPage = lazy(() => delayFallback(import("@/pages/ProductPage")));
const ProductDetailPage = lazy(() => delayFallback(import("@/pages/[slug]")));
const AuthPage = lazy(() => delayFallback(import("@/pages/auth")));
const ContactPage = lazy(() => delayFallback(import("@/pages/contact")));
const FaqPage = lazy(() => delayFallback(import("@/pages/faq")));
const ResetPasswordPage = lazy(() =>
  delayFallback(import("@/pages/reset-password"))
);
const ShippingPage = lazy(() => delayFallback(import("@/pages/shipping")));

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
