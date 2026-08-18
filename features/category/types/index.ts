export interface ICategory {
  id: number;
  name: string;
  description: string;
  countryName: string;
  parentId: number | null;
  parentName: string | null;
  isActive: boolean;
  isAtHomePage: boolean;
  createdAt: string;
  updatedAt: string;
  children: ICategory[];
}
