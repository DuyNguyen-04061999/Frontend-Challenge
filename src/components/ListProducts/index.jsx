import { PATH } from "@/config";
import { useCategory } from "@/hooks/useCategories";
import useQuery from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useQueryParams";
import { productService } from "@/services/product.service";
import { toSlug } from "@/utils";
import queryString from "query-string";
import React from "react";
import { useMemo } from "react";
import { generatePath, Link } from "react-router-dom";
import EmptyText from "../EmptyText";
import ProductCard from "../ProductCard";

const ListProducts = ({ id }) => {
  const [params] = useQueryParams();
  const _qs = queryString.stringify({
    fields:
      "images,thumbnail_url,discount_rate,categories,name,rating_average,real_price,price,slug,id,review_count",
    categories: id,
    limit: 12,
    ...(params.tab === "san-pham-khuyen-mai" && { sort: "discount_rate.desc" }),
  });
  const categoryItem = useCategory(id);

  const linkMore = useMemo(() => {
    if (categoryItem) {
      return generatePath(PATH.category, {
        id,
        slug: toSlug(categoryItem?.title),
      });
    } else {
      return `${PATH.products}?sort=discount_rate.desc`;
    }
  }, [categoryItem]);

  const { data: { data: productList = [] } = {}, loading } = useQuery({
    queryKey: `${_qs}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      productService.getProducts(_qs ? `?${_qs}` : "", signal),
  });

  return (
    <div className="row">
      <ProductCard
        data={productList}
        loading={loading}
        loadingCount={12}
        empty={
          <EmptyText className="w-full">
            Hiện tại không có sản phẩm này
          </EmptyText>
        }
        className="col-lg-3"
      />
      <div className="row w-full">
        <div className="col-12">
          <div className="mt-7 text-center">
            <Link className="link-underline" to={linkMore}>
              Discover more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
