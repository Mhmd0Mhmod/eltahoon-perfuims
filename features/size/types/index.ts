import { SIZES_UNITS } from "@/enums/sizes";

interface ISize {
  id: string;
  size: number;
  unit: SIZES_UNITS;
  createdAt: string;
}
export type { ISize };
