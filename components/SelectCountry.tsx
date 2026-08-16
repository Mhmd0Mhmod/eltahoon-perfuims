"use client";
import { useMarket } from "@/app/providers";
import { markets } from "@/config/markets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SelectCountry() {
  const items = Object.entries(markets).map(([key, value]) => ({
    value: value.code,
    label: `${value.name} ${value.flag}`,
  }));
  const { market, setMarket } = useMarket();

  const handleChange = (newValue: string | null) => {
    if (!newValue) return;
    setMarket(newValue);
  };

  return (
    <Select items={items} value={market} onValueChange={handleChange}>
      <SelectTrigger>
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
