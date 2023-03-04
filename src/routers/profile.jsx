import { lazy } from "react";
import ProfileLayout from "@/layouts/ProfileLayout";
import { PATH } from "@/config";

const ProfilePage = lazy(() => import("@/pages/profile"));
const AddressPage = lazy(() => import("@/pages/profile/so-dia-chi"));
const AddressActionPage = lazy(() =>
  import("@/pages/profile/so-dia-chi/action")
);
const OrderPage = lazy(() => import("@/pages/profile/order"));
const OrderDetailPage = lazy(() => import("@/pages/profile/orderDetail"));
const PaymentPage = lazy(() => import("@/pages/profile/so-thanh-toan"));
const PaymentActionPage = lazy(() =>
  import("@/pages/profile/so-thanh-toan/action")
);
const WishlistPage = lazy(() => import("@/pages/profile/wishlist"));

const profile = {
  element: <ProfileLayout />,
  path: PATH.profile.index,
  children: [
    {
      element: <ProfilePage />,
      index: true,
    },
    {
      element: <OrderPage />,
      path: PATH.profile.order,
    },
    {
      element: <OrderDetailPage />,
      path: PATH.profile.orderDetail,
    },
    {
      element: <WishlistPage />,
      path: PATH.profile.wishList,
    },
    {
      element: <AddressPage />,
      path: PATH.profile.address,
    },
    {
      element: <AddressActionPage />,
      path: PATH.profile.newAddress,
    },
    {
      element: <AddressActionPage />,
      path: PATH.profile.editAddress,
    },

    {
      element: <PaymentPage />,
      path: PATH.profile.payment,
    },
    {
      element: <PaymentActionPage />,
      path: PATH.profile.newPayment,
    },
    {
      element: <PaymentActionPage />,
      path: PATH.profile.editPayment,
    },
  ],
};
export default profile;
