import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/product.service";
import { getCategoryAction } from "@/stores/cateReducer";
import createArray from "@/utils/createArray";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import qs from "query-string";

const ProductLoadingStyled = styled.div`
  .skeleton {
    border-radius: 4px;
  }
`;
const ProductPage = () => {
  const [searchParam] = useSearchParams();

  const currentPage = Number(searchParam.get("page") || 1);

  const {
    data: { data: products = [], paginate: { totalPage } = {} } = {},
    loading,
  } = useQuery({
    dependencyList: [currentPage],
    queryFn: () =>
      productService.getProduct(
        `?fields=images,thumbnail_url,discount_rate,categories,name,rating_average,real_price,price,slug,id,review_count${
          currentPage ? "&page=" + currentPage : ""
        }`
      ),
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);
  return (
    <section className="py-11">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            {/* Filters */}
            <form className="mb-10 mb-md-0">
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
                        <li className="list-styled-item">
                          <a className="list-styled-link" href="#">
                            All Products
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a
                            className="list-styled-link"
                            href="#blousesCollapse"
                          >
                            Blouses and Shirts
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a className="list-styled-link" href="#coatsCollapse">
                            Coats and Jackets
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a
                            className="list-styled-link"
                            href="#dressesCollapse"
                            aria-expanded="true"
                          >
                            Dresses
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a
                            className="list-styled-link"
                            href="#hoodiesCollapse"
                          >
                            Hoodies and Sweats
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a className="list-styled-link" href="#denimCollapse">
                            Denim
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a className="list-styled-link" href="#jeansCollapse">
                            Jeans
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a
                            className="list-styled-link"
                            href="#jumpersCollapse"
                          >
                            Jumpers and Cardigans
                          </a>
                        </li>
                        <li className="list-styled-item">
                          {/* Toggle */}
                          <a
                            className="list-styled-link"
                            href="#legginsCollapse"
                          >
                            Leggings
                          </a>
                        </li>
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
                  <div>
                    <div
                      className="form-group form-group-overflow mb-6"
                      id="seasonGroup"
                    >
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="seasonOne"
                          type="checkbox"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="seasonOne"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-small">from 5 star</span>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          className="custom-control-input"
                          id="seasonTwo"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="seasonOne"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            className="star-icon"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#b8b8b8"
                                transform="matrix(-1 0 0 1 11 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                              <path
                                fill="#b8b8b8"
                                transform="translate(1 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                            </g>
                          </svg>
                          <span className="text-small">from 4 star</span>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="seasonThree"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="seasonOne"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            viewBox="0 0 24 24"
                            size={14}
                            color="#fdd836"
                            height={14}
                            width={14}
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: "rgb(253, 216, 54)" }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            className="star-icon"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#b8b8b8"
                                transform="matrix(-1 0 0 1 11 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                              <path
                                fill="#b8b8b8"
                                transform="translate(1 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                            </g>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            className="star-icon"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                fill="#b8b8b8"
                                transform="matrix(-1 0 0 1 11 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                              <path
                                fill="#b8b8b8"
                                transform="translate(1 1)"
                                d="M5 0v8.476L1.91 10l.424-3.562L0 3.821l3.353-.678L5 0z"
                              />
                            </g>
                          </svg>
                          <span className="text-small">from 3 star</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  {/* Toggle */}
                  <a
                    className="nav-link font-size-lg text-reset border-bottom mb-6"
                    data-toggle="collapse"
                    href="#priceCollapse"
                  >
                    Price
                  </a>
                  {/* Collapse */}
                  <div>
                    {/* Range */}
                    <div className="d-flex align-items-center">
                      {/* Input */}
                      <input
                        type="number"
                        className="form-control form-control-xs"
                        placeholder="$10.00"
                        min={10}
                      />
                      {/* Divider */}
                      <div className="text-gray-350 mx-2">‒</div>
                      {/* Input */}
                      <input
                        type="number"
                        className="form-control form-control-xs"
                        placeholder="$350.00"
                        max={350}
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
                    backgroundImage: "url(./img/covers/cover-24.jpg)",
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
                        backgroundImage: "url(./img/covers/cover-16.jpg)",
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
                    backgroundImage: "url(./img/covers/cover-29.jpg)",
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
                    backgroundImage: "url(./img/covers/cover-30.jpg)",
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
                <h3 className="mb-1">Womens' Clothing</h3>
                {/* Breadcrumb */}
                <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
                  <li className="breadcrumb-item">
                    <a className="text-gray-400" href="index.html">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Women's Clothing</li>
                </ol>
              </div>
              <div className="col-12 col-md-auto">
                {/* Select */}
                <select className="custom-select custom-select-xs">
                  <option>Giá giảm</option>
                  <option>Giá tăng</option>
                  <option>Mới nhất</option>
                  <option>Giảm giá nhiều nhất</option>
                </select>
              </div>
            </div>
            <h4 className="mb-5">Searching for `Clothing`</h4>
            {/* Products */}
            <div className="row">
              {loading
                ? createArray(15).map((_, id) => (
                    <ProductCardLoading key={id} />
                  ))
                : products?.map((e) => <ProductCard key={e?.id} {...e} />)}
            </div>
            {/* Pagination */}
            <Pagination totalPage={totalPage} />
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
