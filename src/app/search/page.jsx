"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Fetch } from "@/lib/fetch";

import { FilterComp } from "@/components/filters";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ProductCard from "@/components/product-card";

const SearchPage = () => {
  const query = useSearchParams().get("q");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter value
  const defaultFilters = {
    price: {
      min: 0,
      max: 0,
    },
    rating: 1,
    brands: {},
    selectedBrands: [],
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilterBtn, setShowFilterBtn] = useState(false);

  // Search
  const searchProducts = async (query) => {
    const PRODUCTS_PER_PAGE = 50;
    const MAX_PRODUCTS = 149;

    setLoading(true);

    // Normalize and deduplicate keywords
    const keywords = [...new Set(query.toLowerCase().trim().split("-"))];

    // Check session storage for cached products
    let allProducts = JSON.parse(sessionStorage.getItem("allProducts")) || [];

    // Fetch products if not already cached
    if (allProducts.length === 0) {
      const totalPages = Math.ceil(MAX_PRODUCTS / PRODUCTS_PER_PAGE);
      for (let page = 1; page <= totalPages; page++) {
        const data = await Fetch(`?page=${page}`);

        if (data.status === "SUCCESS") {
          data.products.forEach((p) => {
            var rating = Math.round(Math.random() * 5);
            rating = rating > 5 ? 5 : rating;
            p.rating = rating;
          });
          allProducts = [...allProducts, ...data.products];
        } else {
          console.error("Error fetching products:", data.message);
          break;
        }
      }
      // Save fetched products to session storage
      sessionStorage.setItem("allProducts", JSON.stringify(allProducts));
    }

    // Filter and score products based on search keywords
    const productMap = new Map();
    for (const product of allProducts) {
      let matchCount = 0;

      // Count the number of keywords matching this product
      keywords.forEach((keyword) => {
        if (product.title.toLowerCase().includes(keyword)) {
          matchCount++;
        }
      });

      // If there's a match, add the product to the map with its score
      if (matchCount > 0) {
        productMap.set(product.id, { ...product, matchScore: matchCount });
      }
    }

    // Convert map values to an array and sort by matchScore
    const sortedProducts = Array.from(productMap.values()).sort(
      (a, b) => b.matchScore - a.matchScore
    );

    // Set min and max price
    const t = [...sortedProducts].sort((a, b) => a.price - b.price);
    const brands = [...sortedProducts].map((p) => p.brand);
    const tempBrands = Array.from(new Set(brands)).reduce((obj, i) => {
      var key = i[0].toLowerCase();
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(i);
      return obj;
    }, {});

    setFilters((prev) => ({
      ...prev,
      price: {
        min: t[0].price,
        max: t[t.length - 1].price,
      },
      rating: 1,
      brands: tempBrands,
    }));

    setProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
    setLoading(false);
    return sortedProducts;
  };

  // Handle sorting
  const handleSorting = (value) => {
    let temp = [];

    if (value === "price-asc") {
      temp = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      temp = [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(temp);
  };

  // Handle filter
  const applyFilters = () => {
    const { price, rating, selectedBrands } = filters;
    var temp = [...products].filter(
      (p) => p.price >= price.min && p.price <= price.max && p.rating >= rating
    );

    // Get products by brands if selected
    if (selectedBrands.length > 0) {
      var t = [];
      selectedBrands.forEach((sb) => {
        temp.forEach((p) => {
          if (p.brand === sb) {
            t.push(p);
          }
        });
      });
      temp = t;
    }

    setFilteredProducts(temp);
    setShowFilterBtn(false);
    setIsDrawerOpen(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters(defaultFilters);
    searchProducts(query);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setFilters(defaultFilters);
    searchProducts(query);
  }, [query]);

  useEffect(() => {
    setShowFilterBtn(true);
    // console.log(filters);
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-[80vh] grid place-items-center">
        <div className="space-y-4 text-center">
          <p className="text-primary/90">Loading...</p>
        </div>
      </div>
    );
  }

  return !query || products.length === 0 ? (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="space-y-4 text-center">
        <h2 className="text-xl md:text-4xl font-bold tracking-tight text-primary/70">
          {products.length === 0 ? "No results found" : "Search something..."}
        </h2>
        <p className="text-primary/90">
          {products.length === 0
            ? "Hmm, looks like your search came up empty. Expand your horizons and try again!"
            : "Don't be shy! The search bar is waiting for your magical words."}
        </p>
      </div>
    </div>
  ) : (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold">Search Results</h1>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleSorting}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="lg:hidden bg-primary/80"
            onClick={() => setIsDrawerOpen(true)}
          >
            Filters
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-2">
        {/* Sidebar Filters for large screens */}
        <div className="relative">
          <aside
            style={{
              minHeight: "calc(100vh - 50px)",
            }}
            className="sticky top-5 justify-between flex-col hidden lg:flex bg-secondary/30 rounded-lg px-3 pt-6 pb-4"
          >
            <div className="mb-4 text-primary/80">Filters</div>
            <div className="max-h-[60vh] overflow-y-scroll pr-2">
              <FilterComp filters={filters} setFilters={setFilters} />
            </div>

            <FilterBtns
              applyFilters={applyFilters}
              showFilterBtn={showFilterBtn}
              clearFilters={clearFilters}
            />
          </aside>
        </div>

        {/* Main Content */}
        <section className="w-full bg-secondary/20 rounded-lg px-4 lg:col-span-4">
          <div className="mt-6 text-primary/80">
            Showing {filteredProducts.length} result for "
            <span className="font-semibold">{query.split("-").join(" ")}</span>"
          </div>
          <div className="my-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product?.id} data={product} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Drawer for small screens */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent className="w-96">
          <DrawerHeader className="pb-0">
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription className="sr-only">
              Set the filters
            </DrawerDescription>
          </DrawerHeader>
          {/* <h2 className="text-lg font-semibold my-4">Filters</h2> */}
          <div className="m-4 max-h-[60vh] overflow-y-scroll">
            <FilterComp filters={filters} setFilters={setFilters} />
          </div>
          <DrawerFooter className="space-y-2 pt-0">
            <FilterBtns
              applyFilters={applyFilters}
              showFilterBtn={showFilterBtn}
              clearFilters={clearFilters}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const FilterBtns = ({ showFilterBtn, applyFilters, clearFilters }) => {
  return (
    <div className="space-y-2">
      <Button
        disabled={!showFilterBtn}
        onClick={applyFilters}
        className="w-full bg-primary/80"
      >
        Apply Filters
      </Button>
      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All
      </Button>
    </div>
  );
};

export default SearchPage;
