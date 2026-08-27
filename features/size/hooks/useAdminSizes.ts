import { useQuery } from "@/hooks/useMarketQuery";
import { getAdminSizes } from "../services";

export function useAdminSizes() {
  const query = useQuery({
    queryKey: ["query", "admin", "sizes"],
    queryFn: () => getAdminSizes(),
    select: (data) => data.data,
  });
  return query;
}
