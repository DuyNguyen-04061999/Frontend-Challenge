import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/product.service";
import createArray from "@/utils/createArray";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import styled from "styled-components";
import useScrollTop from "@/hooks/useScrollTop";
import { useCategories } from "@/hooks/useCategories";
import queryString from "query-string";
import CategoryLink from "@/components/CategoryLink";
import { cn } from "@/utils";
import { PATH } from "@/config";
import EmptyText from "@/components/EmptyText";
import useQueryParams from "@/hooks/useQueryParams";
import useEffectDidMount from "@/hooks/useEffectDidMount";
import StarRating from "@/components/StarRating";
import Rating from "@/components/Rating";
const ProductLoadingStyled = styled.div`
  .skeleton {
    border-radius: 4px;
  }
`;

const options = [
  {
    value: "real_price.desc",
    title: "Giá giảm",
  },
  {
    value: "real_price.asc",
    title: "Giá tăng",
  },
  {
    value: "discount_rate.desc",
    title: "Giảm giá nhiều nhất",
  },
  {
    value: "rating_average.desc",
    title: "Được đánh giá cao",
  },
  {
    value: "top_seller",
    title: "Mua nhiều nhất",
  },
  {
    value: "newest",
    title: "Sản phẩm mới nhất",
  },
];
const ProductPage = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    page: 1,
    sort: "newest",
  });
  const topRef = useRef();

  const [minPrice, setMinPrice] = useState(queryParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(queryParams.maxPrice || "");
  const match = useMatch(PATH.category);

  useEffectDidMount(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [match?.params.id]);

  useEffect(() => {
    setMinPrice(queryParams.minPrice || "");
    setMaxPrice(queryParams.maxPrice || "");
  }, [match?.params.id]);

  useScrollTop(
    [
      queryParams.page,
      match?.params.id,
      queryParams.minPrice,
      queryParams.maxPrice,
      queryParams.filterRating,
    ],
    topRef?.current?.getBoundingClientRect().top + window.scrollY
  );

  const _qs = queryString.stringify({
    fields:
      "images,thumbnail_url,discount_rate,categories,name,rating_average,real_price,price,slug,id,review_count",
    name: queryParams.search,
    categories: match?.params.id,
    page: queryParams.page,
    sort: queryParams.sort,
    minPrice: queryParams.minPrice,
    maxPrice: queryParams.maxPrice,
    filterRating: queryParams.filterRating,
  });

  const {
    data: { data: products = [], paginate: { totalPage } = {} } = {},
    loading,
  } = useQuery({
    queryKey: `product-page-${_qs}`,
    keepPreviousData: true,
    queryFn: ({ signal }) => productService.getProducts(`?${_qs}`, signal),
  });

  const { categoryList, loadingCategory } = useCategories();

  const categoryTitle = useMemo(() => {
    const { title } =
      categoryList?.find((e) => e.id === +match?.params.id) || {};
    return title || "Tất cả sản phẩm";
  }, [match?.params.id, categoryList.length]);

  const onSubmitPrice = (e) => {
    e.preventDefault();

    setQueryParams({
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };
  return (
    <section className="py-11">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 sticky top-0 self-start">
            {/* Filters */}
            <form className="mb-10 mb-md-0" onSubmit={onSubmitPrice}>
              <ul className="nav nav-vertical" id="filterNav">
                <li className="nav-item">
                  {/* Toggle */}
                  <a
                    className="nav-link font-size-lg text-reset border-bottom mb-6"
                    href="#categoryCollapse"
                  >
                    Category
                  </a>
                  {/* Collapse */}
                  <div>
                    <div className="form-group">
                      <ul className="list-styled mb-0" id="productsNav">
                        {loadingCategory ? (
                          createArray(16).map((_, id) => (
                            <Skeleton key={id} height={24} />
                          ))
                        ) : (
                          <>
                            {" "}
                            <li className="list-styled-item">
                              <NavLink
                                className={cn(
                                  "list-styled-link",
                                  ({ isActive }) => ({ active: isActive })
                                )}
                                to={PATH.products}
                              >
                                Tất cả sản phẩm
                              </NavLink>
                            </li>
                            {categoryList.map((e) => (
                              <li className="list-styled-item" key={e?.id}>
                                <CategoryLink
                                  {...e}
                                  className={cn({
                                    active: e?.id === +match?.params.id,
                                  })}
                                />
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  {/* Toggle */}
                  <a
                    className="nav-link font-size-lg text-reset border-bottom mb-6"
                    href="#seasonCollapse"
                  >
                    Rating
                  </a>
                  {/* Collapse */}
                  <div
                    className="form-group form-group-overflow mb-6 select-none form-rating"
                    id="seasonGroup"
                  >
                    <Rating.Group
                      defaultValue={queryParams.filterRating}
                      toggle
                      onSetFilter={(value) => {
                        setQueryParams({
                          filterRating: value,
                          page: undefined,
                        });
                      }}
                    >
                      <Rating rating={5}>
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <span className="text-small ml-2">from 5 star</span>
                      </Rating>
                      <Rating rating={4}>
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <StarRating color="#b8b8b8" />
                        <span className="text-small ml-2">from 4 star</span>
                      </Rating>
                      <Rating rating={3}>
                        <StarRating />
                        <StarRating />
                        <StarRating />
                        <StarRating color="#b8b8b8" />
                        <StarRating color="#b8b8b8" />
                        <span className="text-small ml-2">from 3 star</span>
                      </Rating>
                    </Rating.Group>
                  </div>
                </li>

                <li className="nav-item">
                  {/* Toggle */}
                  <span className="nav-link font-size-lg text-reset border-bottom mb-6">
                    Price
                  </span>
                  {/* Collapse */}
                  <div>
                    {/* Range */}
                    <div className="d-flex align-items-center">
                      {/* Input */}
                      <input
                        type="number"
                        min="0"
                        className="form-control form-control-xs"
                        placeholder="Thấp nhất"
                        pattern="[1-9]*"
                        value={minPrice}
                        onChange={(e) =>
                          +e.target.value > 0
                            ? setMinPrice(e.target.value)
                            : setMinPrice("")
                        }
                      />
                      {/* Divider */}
                      <div className="text-gray-350 mx-2">‒</div>
                      {/* Input */}
                      <input
                        type="number"
                        className="form-control form-control-xs"
                        placeholder="Cao nhất"
                        value={maxPrice}
                        pattern="[1-9]*"
                        onChange={(e) =>
                          setMaxPrice(+e.target.value > 0 ? e.target.value : "")
                        }
                      />
                    </div>
                    <button className="btn btn-outline-dark btn-block mt-5">
                      Apply
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            {/* Slider */}

            <Slider
              className="select-none mb-9"
              slidesPerView={1}
              spaceBetween={0}
              speed={600}
              pagination={{
                clickable: true,
              }}
              loop
              grabCursor
            >
              <div className="w-100">
                <div
                  className="card bg-h-100 bg-left"
                  style={{
                    backgroundImage: "url(/img/covers/cover-24.jpg)",
                  }}
                >
                  <div className="row" style={{ minHeight: 400 }}>
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 align-self-center">
                      <div className="card-body px-md-10 py-11">
                        {/* Heading */}
                        <h4>2019 Summer Collection</h4>
                        {/* Button */}
                        <a
                          className="btn btn-link px-0 text-body"
                          href="shop.html"
                        >
                          View Collection
                          <i className="fe fe-arrow-right ml-2" />
                        </a>
                      </div>
                    </div>
                    <div
                      className="col-12 col-md-2 col-lg-4 col-xl-6 d-none d-md-block bg-cover"
                      style={{
                        backgroundImage: "url(/img/covers/cover-16.jpg)",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Item */}
              <div className="w-100">
                <div
                  className="card bg-cover"
                  style={{
                    backgroundImage: "url(/img/covers/cover-29.jpg)",
                  }}
                >
                  <div
                    className="row align-items-center"
                    style={{ minHeight: 400 }}
                  >
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                      <div className="card-body px-md-10 py-11">
                        {/* Heading */}
                        <h4 className="mb-5">
                          Get -50% from Summer Collection
                        </h4>
                        {/* Text */}
                        <p className="mb-7">
                          Appear, dry there darkness they're seas. <br />
                          <strong className="text-primary">
                            Use code 4GF5SD
                          </strong>
                        </p>
                        {/* Button */}
                        <a className="btn btn-outline-dark" href="shop.html">
                          Shop Now <i className="fe fe-arrow-right ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item */}
              <div className="w-100">
                <div
                  className="card bg-cover"
                  style={{
                    backgroundImage: "url(/img/covers/cover-30.jpg)",
                  }}
                >
                  <div
                    className="row align-items-center"
                    style={{ minHeight: 400 }}
                  >
                    <div className="col-12">
                      <div className="card-body px-md-10 py-11 text-center text-white">
                        {/* Preheading */}
                        <p className="text-uppercase">Enjoy an extra</p>
                        {/* Heading */}
                        <h1 className="display-4 text-uppercase">50% off</h1>
                        {/* Link */}
                        <a
                          className="link-underline text-reset"
                          href="shop.html"
                        >
                          Shop Collection
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
            {/* Item */}
            {/* Header */}
            <div className="row align-items-center mb-7">
              <div className="col-12 col-md">
                {/* Heading */}
                <h3 ref={topRef} className="mb-1">
                  {categoryTitle}
                </h3>
                {/* Breadcrumb */}
                <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                  <li className="breadcrumb-item">
                    <Link className="text-gray-400" to={PATH.home}>
                      Trang chủ
                    </Link>
                  </li>

                  <li className="breadcrumb-item active">{categoryTitle}</li>
                </ol>
              </div>
              <div className="col-12 col-md-auto">
                {/* Select */}
                <select
                  className="custom-select custom-select-xs"
                  value={queryParams.sort}
                  onChange={(e) => {
                    setQueryParams({
                      sort: e.target.value,
                      page: undefined,
                    });
                  }}
                >
                  {options.map((e) => (
                    <option value={e?.value} key={e.value}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {queryParams.search ? (
              <h4 className="mb-5">Tìm kiếm `{queryParams.search}`</h4>
            ) : (
              ""
            )}
            {/* Products */}
            {products.length > 0 && (
              <Pagination totalPage={totalPage} style={{ marginBottom: 30 }} />
            )}
            <div className="row">
              {loading ? (
                createArray(15).map((_, id) => <ProductCardLoading key={id} />)
              ) : products.length === 0 ? (
                <EmptyText />
              ) : (
                products?.map((e) => <ProductCard key={e?.id} {...e} />)
              )}
            </div>
            {/* Pagination */}
            {products.length > 0 && <Pagination totalPage={totalPage} />}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCardLoading = () => {
  return (
    <ProductLoadingStyled className="col-6 col-md-4 product-loading">
      <div className="card mb-7">
        <div className="card-img">
          <Skeleton className="absolute left-0 top-0" />
        </div>
        <div className="card-body px-0 max-h-[207px] h-full overflow-hidden">
          <div className="font-size-xs">
            <Skeleton width={175} height={20} />
          </div>
          <Skeleton className="card-product-name" height={60} />
          <div className="card-product-rating gap-x-2 max-w-[80%] h-6">
            <Skeleton width="15%" />
            <Skeleton width="30%" />
            <Skeleton width="15%" />
          </div>
          <div className="card-product-price flex gap-x-2">
            <Skeleton width="60%" />
            <Skeleton width="40%" height={20} className="mt-auto" />
          </div>
        </div>
      </div>
    </ProductLoadingStyled>
  );
};

export default ProductPage;
