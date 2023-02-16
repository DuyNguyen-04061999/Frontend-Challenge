import { PATH } from "@/config";
import React from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
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
            <div
              className="flickity-page-dots-inner mb-9"
              data-flickity='{"pageDots": true}'
            >
              {/* Item */}
              <div className="w-100">
                <div
                  className="card bg-h-100 bg-left"
                  style={{ backgroundImage: "url(./img/covers/cover-24.jpg)" }}
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
                          View Collection{" "}
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
                  style={{ backgroundImage: "url(./img/covers/cover-29.jpg)" }}
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
                  style={{ backgroundImage: "url(./img/covers/cover-30.jpg)" }}
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
            </div>
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
                  <option selected>Giá giảm</option>
                  <option selected>Giá tăng</option>
                  <option selected>Mới nhất</option>
                  <option selected>Giảm giá nhiều nhất</option>
                </select>
              </div>
            </div>
            <h4 className="mb-5">Searching for `Clothing`</h4>
            {/* Products */}
            <div className="row">
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Badge */}
                  <div className="badge badge-white card-badge card-badge-left text-uppercase">
                    New
                  </div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <Link className="card-img-hover" to={PATH.productDetail}>
                      <img
                        className="card-img-top card-img-back"
                        src="/img/products/product-120.jpg"
                        alt="..."
                      />
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-5.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Shoes
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Leather mid-heel Sandals
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$129.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img
                        className="card-img-top card-img-back"
                        src="/img/products/product-121.jpg"
                        alt="..."
                      />
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-6.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Dresses
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a
                        className="text-body card-product-name"
                        href="product.html"
                      >
                        Cotton floral print Dress
                      </a>
                    </div>
                    {/* Price */}
                    <div className="card-product-price">$40.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Badge */}
                  <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
                    - 50%
                  </div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img
                        className="card-img-top card-img-back"
                        src="/img/products/product-122.jpg"
                        alt="..."
                      />
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-7.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Shoes
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a
                        className="text-body card-product-name"
                        href="product.html"
                      >
                        Leather Sneakers
                      </a>
                    </div>
                    <div className="card-product-rating">
                      5
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
                    </div>
                    {/* Price */}
                    <div className="card-product-price">
                      <span className="text-primary sale">$40.00</span>
                      <span className="font-size-xs text-gray-350 text-decoration-line-through">
                        $85.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a href="#!">
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-8.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Tops
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Cropped cotton Top
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$29.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a href="#!">
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-9.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Dresses
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Floral print midi Dress
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$50.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Badge */}
                  <div className="badge badge-dark card-badge card-badge-left text-uppercase">
                    Sale
                  </div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img
                        className="card-img-top card-img-back"
                        src="/img/products/product-123.jpg"
                        alt="..."
                      />
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-10.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Bags
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Suede cross body Bag
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold">
                      <span className="font-size-xs text-gray-350 text-decoration-line-through">
                        $79.00
                      </span>
                      <span className="text-primary">$49.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a className="card-img-hover" href="product.html">
                      <img
                        className="card-img-top card-img-back"
                        src="/img/products/product-124.jpg"
                        alt="..."
                      />
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-11.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Skirts
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Printed A-line Skirt
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$79.00</div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                {/* Card */}
                <div className="card mb-7">
                  {/* Badge */}
                  <div className="badge badge-white card-badge card-badge text-uppercase">
                    New
                  </div>
                  {/* Image */}
                  <div className="card-img">
                    {/* Image */}
                    <a href="#!">
                      <img
                        className="card-img-top card-img-front"
                        src="/img/products/product-12.jpg"
                        alt="..."
                      />
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
                  <div className="card-body px-0">
                    {/* Category */}
                    <div className="font-size-xs">
                      <a className="text-muted" href="shop.html">
                        Shoes
                      </a>
                    </div>
                    {/* Title */}
                    <div className="font-weight-bold">
                      <a className="text-body" href="product.html">
                        Heel strappy Sandals
                      </a>
                    </div>
                    {/* Price */}
                    <div className="font-weight-bold text-muted">$90.00</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <nav className="d-flex justify-content-center justify-content-md-end">
              <ul className="pagination pagination-sm text-gray-400">
                <li className="page-item">
                  <a className="page-link page-link-arrow" href="#">
                    <i className="fa fa-caret-left" />
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    6
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link page-link-arrow" href="#">
                    <i className="fa fa-caret-right" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
