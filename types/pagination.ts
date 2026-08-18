export interface IPagination<T> {
  content: (T & { id: string })[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
export type TPaginationParams = {
  page: number;
};
