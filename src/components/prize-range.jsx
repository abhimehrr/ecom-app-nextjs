import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PriceRange = ({ filters, setFilters }) => {
  return (
    <div className="space-y-2 border-b pb-4">
      <h3 className="font-medium text-primary/80">Price range</h3>
      <div className="space-y-2">
        <div className="mx-1 flex items-center justify-between gap-4">
          <Label htmlFor="price-range-min">Min</Label>
          <Label htmlFor="price-range-max">Max</Label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            id="price-range-min"
            name="min"
            value={filters.price.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: {
                  max: prev.price.max,
                  min: Number(e.target.value),
                },
              }))
            }
          />
          <span className="font-semibold">to</span>
          <Input
            type="number"
            id="price-range-max"
            name="max"
            value={filters.price.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: {
                  min: prev.price.min,
                  max: Number(e.target.value),
                },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
