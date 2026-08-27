"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/features/category/services";
import { getOffers } from "@/features/offers/services";
import { useQuery } from "@/hooks/useMarketQuery";
import { useProductsFilter } from "@/stores/useProductsFilter";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

function ProductFilters() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data,
  });
  const { data: offers = [] } = useQuery({
    queryKey: [ "offers"],
    queryFn: getOffers,
    select: (data) => data.data,
  });
  const {
    filters,
    setSearchTerm: setStoreSearchTerm,
    toggleCategoryFilter,
    toggleOfferFilter,
    resetFilters,
  } = useProductsFilter();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  useEffect(() => {
    setSearchTerm(filters.searchTerm);
  }, [filters.searchTerm]);

  /**
   * Debounce search updates.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchTerm.trim();

      if (value !== filters.searchTerm) {
        setStoreSearchTerm(value);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters.searchTerm, setStoreSearchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    resetFilters();
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">التصفية</h3>

          <SlidersHorizontal className="text-muted-foreground h-5 w-5" />
        </div>

        <Separator className="mb-6" />

        {/* Search */}
        <div className="mb-6">
          <Label htmlFor="product-search" className="mb-2 block text-right">
            بحث
          </Label>

          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />

            <Input
              id="product-search"
              type="search"
              placeholder="ابحث عن منتج..."
              className="pr-10"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Categories */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">التصنيف</Label>

          {categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map((category) => {
                const categoryId = Number(category.id);

                return (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(categoryId)}
                      onCheckedChange={() => toggleCategoryFilter(categoryId)}
                    />

                    <Label
                      htmlFor={`category-${category.id}`}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              لا توجد تصنيفات متاحة
            </p>
          )}
        </div>

        {/* Offers */}
        {offers.length > 0 && (
          <>
            <Separator className="mb-6" />

            <div className="mb-6">
              <Label className="mb-4 block text-right">العروض</Label>

              <div className="space-y-3">
                {offers.map((offer) => (
                  <div key={offer.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`offer-${offer.id}`}
                      checked={filters.offers.includes(offer.id)}
                      onCheckedChange={() => toggleOfferFilter(offer.id)}
                    />

                    <Label
                      htmlFor={`offer-${offer.id}`}
                      className="cursor-pointer"
                    >
                      {offer.title}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator className="mb-6" />

        {/* Reset */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleReset}
        >
          إعادة تعيين الفلاتر
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductFilters;
