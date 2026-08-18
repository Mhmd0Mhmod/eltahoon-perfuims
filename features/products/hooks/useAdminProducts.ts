import useCookies from "@/hooks/useCookies";
import { getAdminProducts } from "../services";
import { useInfiniteQuery } from "@tanstack/react-query";

function useAdminProducts() {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite", countryCode, "products"],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getAdminProducts({ pageParams: pageParam }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.data.last) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },
      enabled: !!countryCode,
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
