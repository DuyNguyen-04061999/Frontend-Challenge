import Button from "@/components/Button";
import EmptyText from "@/components/EmptyText";
import Pagination from "@/components/Pagination";
import PortalTitle from "@/components/PortalTitle";
import ProductCard from "@/components/ProductCard";
import ProductCardLoading from "@/components/ProductCardLoading";
import Skeleton from "@/components/Skeleton";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import useQuery from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useQueryParams";
import useScrollTop from "@/hooks/useScrollTop";
import { productService } from "@/services/product.service";
import createArray from "@/utils/createArray";
import queryString from "query-string";
import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [queryParams] = useQueryParams({
    page: 1,
  });
  const navigate = useNavigate();
  const _qs = queryString.stringify({
    page: queryParams.page,
  });

  const {
    data: { data: wishList = [], paginate: { totalPage } = {} } = {},
    loading,
    fetchData: refetchWishListService,
  } = useQuery({
    queryKey: [_qs],
    queryFn: () => productService.getWishlist(`?${_qs}`),
    keepStorage: false,
  });
  useScrollTop(
    [queryParams.page],
    document.querySelector(PROFILE_TITLE_ID)?.getBoundingClientRect().top +
      window.scrollY
  );
  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</PortalTitle>
      {/* Products */}
      <div className="row">
        {loading ? (
          createArray(9).map((_, id) => <ProductCardLoading key={id} />)
        ) : wishList.length > 0 ? (
          wishList?.map((e) => (
            <ProductCard
              key={e?.id}
              {...e}
              showWishList={false}
              fetchWishList={refetchWishListService}
            />
          ))
        ) : (
          <div className="w-full">
            <EmptyText>Hiện tại bạn chưa có sản phẩm yêu thích</EmptyText>
            <Button
              onClick={() => navigate(PATH.products)}
              className="mt-5 !mx-auto block"
            >
              Đến trang sản phẩm
            </Button>
          </div>
        )}
      </div>

      {!loading && <Pagination totalPage={totalPage} />}
    </>
  );
};

export default WishlistPage;
