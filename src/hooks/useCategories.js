import { productService } from "@/services/product.service";
import useQuery from "./useQuery";

export const useCategories = () => {
  const { data: { data: categoryList = [] } = {}, loading: loadingCategory } =
    useQuery({
      queryFn: () => productService.getCategories(),
      queryKey: "categories",
      keepPreviousData: true,
    });

  return { categoryList, loadingCategory };
};

export const useCategory = (id) => {
  const { categoryList } = useCategories();

  return categoryList.find((e) => e?.id === id);
};
