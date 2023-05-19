import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { avatarDefault, cn, createItem } from "@/utils";
import { Dropdown } from "antd";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/stores/auth/authReducer";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";
import { useTranslate } from "../TranslateProvider";

const HeaderNavs = [
  {
    to: PATH.home,
    nav: "Trang chủ",
  },
  {
    to: PATH.authors,
    nav: "Tác giả",
  },
  {
    to: PATH.blogCreate,
    nav: "Tạo bài viết",
  },
  {
    to: PATH.allBlogs,
    nav: "Tất cả bài viết",
  },
];
const LANG = {
  vi: "Tiếng Việt",
  eng: "English",
  chi: "China",
};
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, open } = useCart();
  const { t, setLang, lang } = useTranslate();
  return (
    <>
      <div>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            {/* Brand */}
            <Link className="navbar-brand" to={PATH.home}>
              Blog Writters
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
                  <li className="nav-item" key={id}>
                    <NavLink
                      className={({ isActive }) =>
                        cn("nav-link", { "!text-[#ff6f61]": isActive })
                      }
                      to={e.to}
                    >
                      {t(e.nav)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Nav */}
              <ul className="navbar-nav flex-row items-center">
                <li className="nav-item ml-lg-n4">
                  {user ? (
                    <Dropdown
                      placement="bottomRight"
                      arrow
                      trigger="click"
                      menu={createItem(
                        {
                          key: "1",
                          label: (
                            <Link
                              className="user-link block"
                              to={PATH.profile.index}
                            >
                              Thông tin cá nhân
                            </Link>
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <Link
                              className="user-link block"
                              to={PATH.blogCreate}
                            >
                              Tạo bài viết
                            </Link>
                          ),
                        },
                        {
                          key: "3",
                          label: (
                            <span
                              className="user-link block cursor-pointer"
                              onClick={() => {
                                toast.dismiss();
                                dispatch(logoutAction());
                                toast.warn("Bạn đã đăng xuất khỏi tài khoản");
                              }}
                            >
                              Đăng xuất
                            </span>
                          ),
                        }
                      )}
                    >
                      <span className="nav-link cursor-pointer">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-400">
                          <img
                            src={user?.image || avatarDefault}
                            alt="ava"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </span>
                    </Dropdown>
                  ) : (
                    <Link className="nav-link" to={PATH.auth}>
                      <i className="fe fe-user" />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/* promo */}
      <div className="py-3 bg-dark bg-pattern mb-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Text */}
              <div className="text-center text-white">
                <span className="heading-xxs letter-spacing-xl">
                  ⚡️ Welcome to Blog Writters ⚡️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
