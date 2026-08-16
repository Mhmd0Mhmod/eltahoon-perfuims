"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useProductsFilter } from "@/stores/useProductsFilter";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number | string;
  name: string;
}

interface Offer {
  id: number | string;
  title: string;
}

interface ProductFiltersProps {
  categories?: Category[];
  offers?: Offer[];
}

function ProductFilters({ categories = [], offers = [] }: ProductFiltersProps) {
  const {
    filters,
    setSearchTerm: setStoreSearchTerm,
    toggleCategoryFilter,
    toggleOfferFilter,
    resetFilters,
  } = useProductsFilter((state) => state);

  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

  // Debounce search term update to Zustand store
  useEffect(() => {
    const timer = setTimeout(() => {
      setStoreSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setStoreSearchTerm]);

  const handleCategoryToggle = (categoryId: number) => {
    toggleCategoryFilter(categoryId);
  };

  const handleOfferToggle = (offerId: string | number) => {
    toggleOfferFilter(offerId);
  };

  const handleReset = () => {
    setSearchTerm("");
    resetFilters();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">التصفية</h3>
          <SlidersHorizontal className="text-muted-foreground h-5 w-5" />
        </div>

        <Separator className="mb-6" />

        {/* Search */}
        <div className="mb-6">
          <Label className="mb-2 block text-right">بحث</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="ابحث عن منتج..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Categories */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">التصنيف</Label>
          <div className="space-y-3">
            {categories?.map((category) => {
              const catId = Number(category.id);
              return (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={category.id.toString()}
                    checked={filters.categories.includes(catId)}
                    onCheckedChange={() => handleCategoryToggle(catId)}
                  />
                  <Label
                    htmlFor={category.id.toString()}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Offers */}
        {offers && offers.length > 0 && (
          <>
            <Separator className="mb-6" />

            <div className="mb-6">
              <Label className="mb-4 block text-right">العروض</Label>
              <div className="space-y-3">
                {offers?.map((offer) => (
                  <div key={offer.id} className="flex items-center gap-2">
                    <Checkbox
                      id={offer.id.toString()}
                      checked={filters.offers.includes(offer.id)}
                      onCheckedChange={() => handleOfferToggle(offer.id)}
                    />
                    <Label
                      htmlFor={offer.id.toString()}
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

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          إعادة تعيين الفلاتر
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductFilters;
