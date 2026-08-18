import FormatCurrency from "@/components/FormatCurrency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Check, Package, X } from "lucide-react";
import { IProductVariant } from "../types";
function VariantsPopover({ variants }: { variants: IProductVariant[] }) {
  const availableCount = variants.filter((v) => v.isAvailable).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-2"
            disabled={variants.length === 0}
          />
        }
      >
        <Package className="h-3 w-3" />
        {variants.length} أحجام
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">الأحجام المتوفرة</h4>
            <p className="text-muted-foreground text-xs">
              {availableCount} من {variants.length} متوفر
            </p>
          </div>
          <Separator />
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between rounded-md border p-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {variant.size} {variant.unit}
                  </span>
                  {variant.isAvailable ? (
                    <Badge
                      variant="outline"
                      className="h-5 gap-1 bg-green-50 text-green-700"
                    >
                      <Check className="h-3 w-3" />
                      متوفر
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="h-5 gap-1 bg-red-50 text-red-700"
                    >
                      <X className="h-3 w-3" />
                      غير متوفر
                    </Badge>
                  )}
                </div>
                <span className="font-semibold">
                  <FormatCurrency value={variant.newPrice} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default VariantsPopover;
