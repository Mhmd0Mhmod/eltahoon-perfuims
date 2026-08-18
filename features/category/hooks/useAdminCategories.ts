import useCookies from "@/hooks/useCookies";
import { useQuery } from "@tanstack/react-query";
import { getAdminCategories } from "../services";
export function useAdminCategories() {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const query = useQuery({
    queryKey: ["query", countryCode, "categories"],
    queryFn: getAdminCategories,
    select: (data) => data.data,
  });
  return query;
}
