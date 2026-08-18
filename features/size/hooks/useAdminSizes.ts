import useCookies from "@/hooks/useCookies";
import { useQuery } from "@tanstack/react-query";
import { getAdminSizes } from "../services";

export function useAdminSizes() {
  const { getCookie } = useCookies();
  const countryCode = getCookie("country_code");
  const query = useQuery({
    queryKey: ["query", countryCode, "sizes"],
    queryFn: () => getAdminSizes(),
    select: (data) => data.data,
  });
  return query;
}
