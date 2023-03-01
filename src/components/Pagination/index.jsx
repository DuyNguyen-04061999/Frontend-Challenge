import { cn } from "@/utils";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ totalPage, page = "page", style = {} }) => {
  const [searchParam] = useSearchParams();
  const currentPage = Number(searchParam.get(page) || 1);
  const { pathname } = useLocation();
  const fakeParam = new URLSearchParams(searchParam);

  const renderPaginate = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;
    const list = [];

    if (startPage < 1) {
      startPage = 1;
      endPage = startPage + 4;
    }

    if (endPage >= totalPage) {
      endPage = totalPage;
      startPage = endPage - 6 > 0 ? endPage - 6 : 1;
    }
    for (let i = startPage; i <= endPage; i++) {
      fakeParam.set(page, i);
      const link = `${pathname}?${fakeParam.toString()}`;
      list.push(
        <li className={cn("page-item", { active: currentPage === i })} key={i}>
          <Link className="page-link cursor-pointer" to={link}>
            {i}
          </Link>
        </li>
      );
    }

    return list;
  };
  fakeParam.set(page, currentPage - 1);
  const prevLink = `${pathname}?${fakeParam.toString()}`;

  fakeParam.set(page, currentPage + 1);
  const nextLink = `${pathname}?${fakeParam.toString()}`;

  fakeParam.set(page, 1);
  const firstLink = `${pathname}?${fakeParam.toString()}`;

  fakeParam.set(page, totalPage);
  const lastLink = `${pathname}?${fakeParam.toString()}`;

  if (totalPage <= 1) return null;
  return (
    <nav
      className="d-flex justify-content-center justify-content-md-end mb-5 select-none mx-auto w-max"
      style={style}
    >
      <ul className="pagination pagination-sm text-gray-400">
        <li
          className="page-item"
          style={{ visibility: currentPage <= 1 ? "hidden" : "visible" }}
        >
          <Link className="page-link page-link-arrow" to={firstLink}>
            <i className="fa fa-caret-left" />
            <i className="fa fa-caret-left" />
          </Link>
        </li>
        <li
          className="page-item"
          style={{ visibility: currentPage <= 1 ? "hidden" : "visible" }}
        >
          <Link className="page-link page-link-arrow" to={prevLink}>
            <i className="fa fa-caret-left" />
          </Link>
        </li>
        {renderPaginate()}
        <li
          className="page-item"
          style={{
            visibility: currentPage >= totalPage ? "hidden" : "visible",
          }}
        >
          <Link className="page-link page-link-arrow" to={nextLink}>
            <i className="fa fa-caret-right" />
          </Link>
        </li>
        <li
          className="page-item"
          style={{
            visibility: currentPage >= totalPage ? "hidden" : "visible",
          }}
        >
          <Link className="page-link page-link-arrow" to={lastLink}>
            <i className="fa fa-caret-right" />
            <i className="fa fa-caret-right" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
