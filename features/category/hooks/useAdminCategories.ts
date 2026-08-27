import { useQuery } from "@/hooks/useMarketQuery";
import { getAdminCategories } from "../services";
export function useAdminCategories() {
  const query = useQuery({
    queryKey: ["query", "categories"],
    queryFn: getAdminCategories,
    select: (data) => data.data,
  });
  return query;
}
