import { getCategoryAction } from "@/stores/cateReducer";
import createArray from "@/utils/createArray";
import currency from "@/utils/currency";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import HalfStar from "../HalfStar";
import Star from "../Star";
const ProductCard = ({
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
}) => {
  const { categoryList } = useSelector((state) => state.categoryList);

  const img1 = images?.[0]?.large_url || thumbnail_url;
  const img2 = images?.[1]?.large_url || thumbnail_url;
  const cate = useMemo(
    () =>
      Array.isArray(categoryList) &&
      categoryList.length > 0 &&
      categoryList?.find((e) => {
        return e?.id === categories ? e?.title : "";
      }),
    [categoryList.length]
  );

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
          <a className="card-img-hover" href="product.html">
            <img className="card-img-top card-img-back" src={img2} alt="..." />
            <img className="card-img-top card-img-front" src={img1} alt="..." />
          </a>
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
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-heart" />
              </button>
            </span>
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0 max-h-[207px]">
          {/* Category */}
          <div className="font-size-xs min-h-[20px]">
            <a className="text-muted" href="shop.html">
              {cate?.title}
            </a>
          </div>
          {/* Title */}
          <div className="font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              {name}
            </a>
          </div>
          <div className="card-product-rating !items-baseline">
            <span className="mr-2">
              {+rating_average ? rating_average : ""}
            </span>
            {rating_average
              ? createArray(Math.floor(rating_average)).map((_, id) => (
                  <Star key={id} />
                ))
              : ""}
            {rating_average < 5 && rating_average - 4 > 0 ? <HalfStar /> : ""}
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

export default ProductCard;
