"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { Fetch } from "@/lib/fetch";

import { Button } from "@/components/ui/button";

import { PriceRange } from "@/components/prize-range";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


// Filters
export const FilterComp = ({ filters, setFilters }) => {
  const [showBrands, setShowBrands] = useState(false);
  const [brands, setBrands] = useState([]);

  // Handle check brand
  const handleCheckBrand = (isChecked, value) => {
    var tempBrands = [...filters.selectedBrands];
    if (isChecked) {
      tempBrands.push(value);
    } else {
      tempBrands = tempBrands.filter((b) => b !== value);
    }
    setFilters((prev) => ({
      ...prev,
      selectedBrands: tempBrands,
    }));
  };

  useEffect(() => {
    const temp = Object.keys(filters?.brands).sort() || [];
    if (showBrands) {
      setBrands(temp);
    } else {
      setBrands(temp.splice(0, 2));
    }
  }, [showBrands]);

  return (
    <div>
      {/* Price Range */}
      <PriceRange filters={filters} setFilters={setFilters} />

      {/* Rating */}
      <div className="space-y-2 border-b py-4">
        <h3 className="font-medium text-primary/80">Rating</h3>
        <div className="flex items-center gap-4">
          <span className="text-yellow-500 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={20}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: i + 1,
                  }))
                }
                fill={i < (filters.rating || 1) ? "currentColor" : "none"}
                className="stroke-current cursor-pointer"
              />
            ))}
          </span>
          <span className="font-medium text-primary/80">{`(${filters.rating})`}</span>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2 border-b py-4">
        <div className="mb-4">
          <h3 className="font-medium text-primary/80">Brands</h3>
          <p className="text-sm text-primary/70">Select the brands</p>
        </div>
        {brands.map((key, i) => (
          <ul key={key + i} className="text-primary/90 ml-4 space-y-2">
            <p className="uppercase text-lg mt-4">{key}</p>
            {filters.brands[key]?.map((brand, i) => (
              <li key={brand + i} className="flex items-center gap-2">
                <Checkbox
                  id={brand + i}
                  checked={filters.selectedBrands.includes(brand)}
                  onCheckedChange={(value) => {
                    handleCheckBrand(value, brand);
                  }}
                />
                <Label htmlFor={brand + i}>{brand}</Label>
              </li>
            ))}
          </ul>
        ))}
        <div className="flex justify-end mr-4">
          <Button
            onClick={() => setShowBrands((prev) => !prev)}
            variant="link"
            size="sm"
            className="p-0 underline hover:scale-105 transition-all"
          >
            {showBrands ? "Show less brands" : "Show more brands"}
          </Button>
        </div>
      </div>
    </div>
  );
};
