"use client";
import React, { useEffect, useState } from "react";

import { Fetch } from "@/lib/fetch";

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProductSection = ({
  baseUrl,
  showBtn = true,
  limit = 12,
  containerClass = "",
}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [nomoreProducts, setNomoreProducts] = useState(false);
  const [products, setProducts] = useState([]);

  const handleFetch = async (url) => {
    setLoading(true);

    if (nomoreProducts) return;

    const p = await Fetch(url);
    if (p.status === "SUCCESS") {
      if (p.products.length < limit) {
        setNomoreProducts(true);
      }
      p.products.forEach((p) => {
        var rating = Math.round(Math.random() * 5);
        rating = rating > 5 ? 5 : rating;
        p.rating = rating;
      });
      setProducts((prev) => [...prev, ...p.products]);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFetch(`${baseUrl}${limit}`);
  }, []);

  return (
    <div className="mt-8">
      <div className="container mx-auto">
        <div
          className={cn(
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1",
            containerClass
          )}
        >
          {products?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {showBtn && (
          <Button
            onClick={() => {
              handleFetch(`${baseUrl}${limit}&page=${page}`);
              setPage((prev) => prev + 1);
            }}
            variant="link"
            disabled={loading || nomoreProducts}
          >
            {loading
              ? "Please wait..."
              : nomoreProducts
              ? "No more products"
              : "View more"}
          </Button>
        )}
      </div>
    </div>
  );
};
