import { PATH } from "@/config";
import { useCategories } from "@/hooks/useCategories";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/product.service";
import { onCloseDrawer } from "@/stores/drawerReducer";
import { toSlug } from "@/utils";
import createArray from "@/utils/createArray";
import queryString from "query-string";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import styled from "styled-components";
import EmptyText from "../EmptyText";
import Portal from "../Portal";
import ProductCart from "../ProductCart";
import Skeleton from "../Skeleton";

const ContentStyle = styled.div`
  height: ${({ height }) => `${height}px`} !important;
  overflow: hidden !important;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
`;

const BodyStyled = styled.div`
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
  .product-cart-item {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;
const SearchDrawer = () => {
  const { open } = useSelector((state) => state.drawer.search);
  const [size, setSize] = useState([0, 0]);
  const dispatch = useDispatch();
  const onClose = () => dispatch(onCloseDrawer({ name: "search" }));
  const [id, setID] = useState();
  const [search, setSearch] = useState();
  const searchDebounce = useDebounce(search, 500);
  const [heightBody, setHeightBody] = useState();
  const { categoryList = [] } = useCategories([], open);

  const topRef = useRef();
  const buttonRef = useRef();

  const slug = useMemo(() => {
    const { title } = categoryList?.find((e) => e.id === +id) || {};
    if (title) {
      return toSlug(title);
    }
    return;
  }, [id]);
  const _qs = queryString.stringify({
    fields:
      "images,thumbnail_url,discount_rate,categories,name,rating_average,real_price,price,slug,id,review_count",
    name: searchDebounce,
    page: 1,
    limit: 15,
    categories: id || undefined,
  });

  const { data: { data: products = [] } = {}, loading } = useQuery({
    enabled: open,
    queryKey: `product-page-${_qs}`,
    keepPreviousData: true,
    queryFn: ({ signal }) => productService.getProducts(`?${_qs}`, signal),
  });

  const viewAllLink = useMemo(() => {
    return slug
      ? generatePath(PATH.category, {
          slug,
          id,
        }) + `${searchDebounce ? `?search=${searchDebounce}` : ""}`
      : generatePath(PATH.products) +
          `${searchDebounce ? `?search=${searchDebounce}` : ""}`;
  }, [slug, searchDebounce]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide");
    } else {
      document.body.classList.remove("hide");
    }
  }, [open]);

  useEffect(() => {
    const topHeight = topRef.current?.scrollHeight;
    const buttonHeight = buttonRef.current?.scrollHeight;
    const bodyHeight = size[1] - topHeight - buttonHeight;

    setHeightBody(bodyHeight);
  }, [size]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    //cleanup Fn
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Portal
      open={open}
      containerClassName={`fixed top-0 left-0 right-0 bottom-0 z-[9999]  ${
        open ? "visible" : "invisible"
      }`}
      overlay
      onClose={onClose}
      containerStyled={{ transition: "all 0.2s ease-in-out" }}
      contentClassName={`modal-dialog modal-dialog-vertical w-full absolute right-0 top-0 bottom-0 h-max ${
        open ? "opacity-100" : "opacity-0"
      }`}
      contentStyle={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "all 0.3s ease-out",
      }}
    >
      <ContentStyle className="modal-content" height={size[1]}>
        <div>
          {/* Close */}
          <button
            type="button"
            className="close !outline-none !border-0"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fe fe-x" aria-hidden="true" />
          </button>
          <div ref={topRef}>
            {/* Header*/}
            <div className="modal-header line-height-fixed font-size-lg">
              <strong className="mx-auto">Search Products</strong>
            </div>
            {/* Body: Form */}
            <div className="modal-body">
              <div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="modalSearchCategories">
                    Categories:
                  </label>
                  <select
                    className="custom-select"
                    id="modalSearchCategories"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categoryList.map((e) => (
                      <option key={e?.id} value={e.id}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group input-group-merge">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-border" type="submit">
                      <i className="fe fe-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body: Results (add `.d-none` to disable it) */}

          <BodyStyled
            className="modal-body border-top font-size-sm"
            style={{ height: heightBody, overflowY: "auto" }}
          >
            {loading ? (
              createArray(6).map((_, id) => <ProductCardLoading key={id} />)
            ) : products.length === 0 ? (
              <EmptyText />
            ) : (
              products?.map((e) => <ProductCart key={e?.id} {...e} />)
            )}
          </BodyStyled>

          {/* Button */}
          <div className="py-4" ref={buttonRef}>
            <Link
              className="btn btn-link px-0 text-reset w-[150px] !p-0 flex justify-center items-center mx-auto bg-black !text-white rounded"
              to={viewAllLink}
              onClick={onClose}
            >
              View All <i className="fe fe-arrow-right ml-2" />
            </Link>
          </div>
        </div>
      </ContentStyle>
    </Portal>
  );
};

const ProductCardLoading = () => {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3 img-cate">
        {/* Image */}
        <Skeleton />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={20} marginTop={20} width={80} />
        </p>
      </div>
    </div>
  );
};

export default SearchDrawer;
