import { lazy } from "react";
import ProfileLayout from "@/layouts/ProfileLayout";
import { PATH } from "@/config";

const ProfilePage = lazy(() => import("@/pages/profile"));
const AddressPage = lazy(() => import("@/pages/profile/address"));
const AddressEditPage = lazy(() => import("@/pages/profile/addressEdit"));
const OrderPage = lazy(() => import("@/pages/profile/order"));
const OrderDetailPage = lazy(() => import("@/pages/profile/orderDetail"));
const PaymentPage = lazy(() => import("@/pages/profile/payment"));
const PaymentEditPage = lazy(() => import("@/pages/profile/paymentEdit"));
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
      element: <AddressEditPage />,
      path: PATH.profile.editAddress,
    },
    {
      element: <PaymentPage />,
      path: PATH.profile.payment,
    },
    {
      element: <PaymentEditPage />,
      path: PATH.profile.editPayment,
    },
  ],
};
export default profile;
