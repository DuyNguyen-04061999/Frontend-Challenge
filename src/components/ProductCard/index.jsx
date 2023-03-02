import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useCategory } from "@/hooks/useCategories";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/product.service";
import { clearWaititngQueue, cn, toFixed, toSlug } from "@/utils";
import createArray from "@/utils/createArray";
import currency from "@/utils/currency";
import handleError from "@/utils/handleError";
import withListLoading from "@/utils/withListLoading";
import { message, Popconfirm } from "antd";
import React, { useMemo } from "react";
import { generatePath, Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HalfStar from "../HalfStar";
import PopConfirm from "../PopConfirm";
import ProductCardLoading from "../ProductCardLoading";
import Star from "../Star";

const ProductCard = ({
  showWishList = true,
  images,
  thumbnail_url,
  discount_rate,
  categories,
  name,
  rating_average,
  real_price,
  review_count,
  price,
  slug,
  id,
  fetchWishList,
}) => {
  const img1 =
    images?.[0]?.large_url || thumbnail_url || images?.[1]?.large_url;
  const img2 = images?.[1]?.large_url || thumbnail_url;

  const categoryItem = useCategory(categories);
  const linkDetail = generatePath(PATH.productDetail, {
    slug,
  });
  const linkCategory = useMemo(() => {
    if (categoryItem) {
      return generatePath(PATH.category, {
        slug: toSlug(categoryItem?.title),
        id: categories,
      });
    }
  }, [categoryItem]);

  //====add wishlist====
  const { fetchData: addWishlistService, loading } = useQuery({
    enabled: false,
    queryFn: ({ params }) => productService.addWishlist(...params),
    limitDuration: 1000,
  });

  const { fetchData: removeWishlistService, loadingRemove } = useQuery({
    enabled: false,
    queryFn: ({ params }) => productService.removeWishlist(...params),
  });
  const onAddWishList = async () => {
    clearWaititngQueue();
    toast.dismiss();
    toast.promise(addWishlistService(id), {
      pending: {
        render() {
          return (
            <p>
              Đang thêm sản phẩm
              <span className="font-semibold italic">{`"${name}"`}</span> vào
              danh sách yêu thích
            </p>
          );
        },
      },
      success: {
        render() {
          return (
            <p>
              Đã thêm sản phẩm
              <span className="font-semibold italic">{`"${name}"`}</span> vào
              danh sách yêu thích
            </p>
          );
        },
      },
      error: {
        render() {
          // When the promise reject, data will contains the error
          return (
            <p className="text-red-500">
              <span className="font-semibold italic">{name}</span> đã được thêm
              vào danh sách yêu thích trước đó
            </p>
          );
        },
      },
    });
  };

  const onRemoveWishList = async () => {
    clearWaititngQueue();
    toast.dismiss();
    await toast.promise(removeWishlistService(id), {
      pending: {
        render() {
          return (
            <p>
              Đang xóa
              <span className="font-semibold italic">{`"${name}"`}</span> khỏi
              danh sách yêu thích
            </p>
          );
        },
      },
      success: {
        render() {
          return (
            <p>
              Đã xóa
              <span className="font-semibold italic">{`"${name}"`}</span> khỏi
              danh sách yêu thích
            </p>
          );
        },
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return (
            <p className="text-red-500">{data?.response?.data?.message}</p>
          );
        },
      },
    });
    await fetchWishList();
  };
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="card mb-7">
        {/* Badge */}
        {discount_rate ? (
          <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
            - {discount_rate}%
          </div>
        ) : null}

        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Link className="card-img-hover" to={linkDetail}>
            <img className="card-img-top card-img-back" src={img2} alt="..." />
            <img className="card-img-top card-img-front" src={img1} alt="..." />
          </Link>
          {/* Actions */}
          <div className="card-actions">
            <span className="card-action"></span>
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
            {showWishList ? (
              <PopConfirm
                placement="top"
                title="Thông báo"
                description="Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích"
                disabled={!!user}
                okText="Đăng nhập"
                onConfirm={() =>
                  navigate(PATH.auth, { state: { redirect: pathname } })
                }
              >
                <span className="card-action">
                  <button
                    className={cn("btn btn-xs btn-circle btn-white-primary", {
                      "!cursor-not-allowed": loading,
                    })}
                    data-toggle="button"
                    disabled={loading}
                    onClick={user && onAddWishList}
                  >
                    <i className="fe fe-heart" />
                  </button>
                </span>
              </PopConfirm>
            ) : (
              <span className="card-action">
                <button
                  className={cn("btn btn-xs btn-circle btn-white-primary", {
                    "!cursor-not-allowed": loadingRemove,
                  })}
                  data-toggle="button"
                  disabled={loadingRemove}
                  onClick={onRemoveWishList}
                >
                  <i className="fe fe-trash" />
                </button>
              </span>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0 max-h-[207px]">
          {/* Category */}
          <div className="font-size-xs min-h-[20px]">
            {categoryItem && (
              <Link className="text-muted" to={linkCategory}>
                {categoryItem?.title}
              </Link>
            )}
          </div>
          {/* Title */}
          <div className="font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              {name}
            </a>
          </div>
          <div className="card-product-rating !items-baseline">
            <span className="mr-2">
              {+rating_average ? toFixed(+rating_average) : ""}
            </span>
            {rating_average
              ? createArray(Math.floor(rating_average)).map((_, id) => (
                  <Star key={id} />
                ))
              : ""}
            {rating_average < 5 &&
            toFixed(+rating_average) - Math.floor(toFixed(+rating_average)) >
              0 ? (
              <HalfStar />
            ) : (
              ""
            )}
            {review_count ? (
              <span className="ml-2">{`(${review_count} reviews)`}</span>
            ) : (
              ""
            )}
          </div>
          {/* Price */}
          <div className="card-product-price">
            {real_price !== price ? (
              <>
                <span className="text-primary sale !text-[20px] mr-[4px]">
                  {currency(real_price)}
                </span>
                <span className="font-size-xs text-gray-350 text-decoration-line-through">
                  {currency(price)}
                </span>
              </>
            ) : (
              <span className="text-primary sale">{currency(real_price)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withListLoading(ProductCard, ProductCardLoading);
