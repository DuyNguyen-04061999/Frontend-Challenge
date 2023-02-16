import { PATH } from "@/config";
import { cn } from "@/utils";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderNavs = [
  {
    to: PATH.home,
    nav: "Trang chủ",
  },
  {
    to: PATH.products,
    nav: "Sản phẩm",
  },
  {
    to: "/laptop-thiet-bi-it/1846",
    nav: "Laptop",
  },
  {
    to: "/nha-cua-doi-song/1883",
    nav: "Máy tính",
  },
  {
    to: "/deal-hot?page=1&sort=discount_rate.desc",
    nav: "Sản phẩm khuyến mãi",
  },
];

const Header = () => {
  return (
    <>
      <div>
        {/* NAVBAR */}
        <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
          <div className="container">
            {/* Promo */}
            <div className="mr-xl-8">
              <i className="fe fe-truck mr-2" />{" "}
              <span className="heading-xxxs">Free shipping worldwide</span>
            </div>
            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#topbarCollapse"
              aria-controls="topbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapse */}
            <div className="navbar-collapse" id="topbarCollapse">
              {/* Nav */}
              <ul className="nav nav-divided navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  {/* Toggle */}
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <img
                      className="mb-1 mr-1"
                      src="/img/flags/usa.svg"
                      alt="..."
                    />{" "}
                    United States
                  </a>
                  {/* Menu */}
                  <div className="dropdown-menu minw-0">
                    <a className="dropdown-item" href="#!">
                      <img
                        className="mb-1 mr-2"
                        src="/img/flags/usa.svg"
                        alt="USA"
                      />
                      United States
                    </a>
                    <a className="dropdown-item" href="#!">
                      <img
                        className="mb-1 mr-2"
                        src="/img/flags/canada.svg"
                        alt="Canada"
                      />
                      Canada
                    </a>
                    <a className="dropdown-item" href="#!">
                      <img
                        className="mb-1 mr-2"
                        src="/img/flags/germany.svg"
                        alt="Germany"
                      />
                      Germany
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  {/* Toggle */}
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    USD
                  </a>
                  {/* Menu */}
                  <div className="dropdown-menu minw-0">
                    <a className="dropdown-item" href="#!">
                      USD
                    </a>
                    <a className="dropdown-item" href="#!">
                      EUR
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  {/* Toggle */}
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    English
                  </a>
                  {/* Menu */}
                  <div className="dropdown-menu minw-0">
                    <a className="dropdown-item" href="#">
                      English
                    </a>
                    <a className="dropdown-item" href="#">
                      French
                    </a>
                    <a className="dropdown-item" href="#">
                      German
                    </a>
                  </div>
                </li>
              </ul>
              {/* Nav */}
              <ul className="nav navbar-nav mr-8">
                <li className="nav-item">
                  <Link className="nav-link" to={PATH.shipping}>
                    Shipping
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={PATH.faq}>
                    FAQ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={PATH.contact}>
                    Contact
                  </Link>
                </li>
              </ul>
              {/* Nav */}
              <ul className="nav navbar-nav flex-row">
                <li className="nav-item">
                  <a className="nav-link text-gray-350" href="#!">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="nav-item ml-xl-n4">
                  <a className="nav-link text-gray-350" href="#!">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="nav-item ml-xl-n4">
                  <a className="nav-link text-gray-350" href="#!">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className="nav-item ml-xl-n4">
                  <a className="nav-link text-gray-350" href="#!">
                    <i className="fab fa-medium" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            {/* Brand */}
            <Link className="navbar-brand" to={PATH.home}>
              <img style={{ width: 50 }} src="/img/logo.svg" />
              Shopper.
            </Link>
            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapse */}
            <div className="navbar-collapse" id="navbarCollapse">
              {/* Nav */}
              <ul className="navbar-nav mx-auto">
                {HeaderNavs.map((e, id) => (
                  <li className="nav-item" key={e.nav}>
                    <NavLink
                      className={({ isActive }) =>
                        cn("nav-link", { "!text-[#ff6f61]": isActive })
                      }
                      to={e.to}
                    >
                      {e.nav}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Nav */}
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="modal"
                    href="#modalSearch"
                  >
                    <i className="fe fe-search" />
                  </a>
                </li>
                <li className="nav-item ml-lg-n4">
                  <Link className="nav-link" to={PATH.profile.index}>
                    <i className="fe fe-user" />
                  </Link>
                </li>
                <li className="nav-item ml-lg-n4">
                  <Link className="nav-link" to={PATH.profile.wishList}>
                    <i className="fe fe-heart" />
                  </Link>
                </li>
                <li className="nav-item ml-lg-n4">
                  <a
                    className="nav-link"
                    data-toggle="modal"
                    href="#modalShoppingCart"
                  >
                    <span data-cart-items={2}>
                      <i className="fe fe-shopping-cart" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* PROMO */}
        <div className="py-3 bg-dark bg-pattern mb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Text */}
                <div className="text-center text-white">
                  <span className="heading-xxs letter-spacing-xl">
                    ⚡️ Happy Holiday Deals on Everything ⚡️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
