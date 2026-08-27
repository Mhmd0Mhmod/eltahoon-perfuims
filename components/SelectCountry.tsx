"use client";

import { useMarket } from "@/app/providers";
import { MarketKey, markets } from "@/config/markets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectCountryProps = {
  size?: "sm" | "default";
};

function SelectCountry({ size = "default" }: SelectCountryProps) {
  const items = Object.entries(markets).map(([key, value]) => ({
    value: value.key as MarketKey,
    label: `${value.name} ${value.flag}`,
  }));
  const { market, changeMarket } = useMarket();

  const handleChange = (newValue: MarketKey | null) => {
    if (!newValue) return;
    changeMarket(newValue);
  };

  return (
    <Select
      items={items}
      value={market?.key || null}
      onValueChange={handleChange}
    >
      <SelectTrigger size={size}>
        <SelectValue placeholder="🌐 إختار الدولة" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCountry;
