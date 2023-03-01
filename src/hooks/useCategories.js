import { productService } from "@/services/product.service";
import useQuery from "./useQuery";

export const useCategories = (dependencyList = [], enabled = true) => {
  const { data: { data: categoryList = [] } = {}, loading: loadingCategory } =
    useQuery({
      queryFn: ({ signal }) => productService.getCategories(signal),
      queryKey: "categories",
      storage: "redux",
      enabled: enabled,
      dependencyList: dependencyList,
      keepPreviousData: true,
    });

  return { categoryList, loadingCategory };
};

export const useCategory = (id, ...rest) => {
  // ==== rest gồm dependencyList và enabled ====
  const { categoryList } = useCategories(...rest);

  return categoryList.find((e) => e?.id === id);
};
