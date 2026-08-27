import { useInfiniteQuery } from "@/hooks/useMarketQuery";
import { getAdminProducts } from "../services";

function useAdminProducts() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite", "products"],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getAdminProducts({ pageParams: pageParam }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.last) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },
    });

  const products = data?.pages.flatMap((page) => page.data.content) ?? [];

  return {
    products,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
}

export default useAdminProducts;
