import React from "react";
import Image from "next/image";
import Link from "next/link";

import { calculateOriginalPrice, formatIndianRupee } from "@/lib/utils";

import { Heart, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProductCard = ({ data }) => {

  return (
    <Link href={`/product/${data?.id}`} className="group">
      <div className="border rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative overflow-hidden h-[180px] bg-white w-full">
          <Image
            src={data?.image || "/product-placeholder.svg"}
            alt={data?.title || "Product Image"}
            width={250}
            height={250}
            priority={false}
            className="transition-all object-cover duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 group rounded-full p-2 bg-primary"
          >
            <Heart size={18} className="text-secondary group-hover:text-rose" />
          </Button>
          {data?.popular && (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
              <TrendingUp size={16} className="mr-1" /> Popular
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-primary/80 uppercase">{data?.brand}</p>
          <h3 className="text-sm font-semibold line-clamp-2 text-primary">
            {data?.title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < (data?.rating || 0) ? "currentColor" : "none"}
                  className="stroke-current"
                />
              ))}
            </span>
            <span className="text-xs text-zinc-500">
              ({data?.rating || 0})
            </span>
          </div>
          <div className="space-y-1 mt-2">
            <p className={`text-xs text-green-500 font-medium`}>
              {data?.discount
                ? "Special Price"
                : data?.popular
                ? "Top Choice"
                : "Best Quality"}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                {formatIndianRupee(data?.price)}
              </span>
              {data?.discount && (
                <span className="text-xs line-through">
                  {formatIndianRupee(
                    calculateOriginalPrice(data?.price, data?.discount || 0)
                  )}
                </span>
              )}
              {data?.discount && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-green-600 px-1"
                >
                  {data?.discount}% off
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="link"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

/*


import React from "react";
import Image from "next/image";
import Link from "next/link";

import { calculateOriginalPrice, formatIndianRupee } from "@/lib/utils";

import { Heart, MoveRight, TrendingUp } from "lucide-react";

const ProductCard = ({ data }) => {
  return (
    <Link href={`/product/${data?.id}`}>
      <div className="border min-w-[180px] min-h-[240px] max-h-[300px] max-w-[200px] bg-secondary overflow-hidden rounded-md">
        <div className="p-2">
          <div className="relative rounded-md overflow-hidden h-[130px] max-h-[150px] w-full">
            <Image
              src={data?.image}
              width={500}
              height={500}
              alt={data?.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Heart size={20} className="text-secondary" />
            </div>
            {data?.popular && (
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <div className="bg-green-700 px-2 py-0.5 rounded">
                  <TrendingUp size={20} />
                </div>
                {data?.onSale && (
                  <span className="bg-green-700 text-xs font-medium px-3 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mt-2">
            <p className="capitalize font-medium text-xs text-primary/80">
              {data?.brand}
            </p>
            <h3 className="tracking-tight truncate">{data?.title}</h3>
            <div className="space-y-2">
              {data?.discount && (
                <p className="text-green-500 font-medium text-xs mt-1">
                  Special price
                </p>
              )}
              <div className="flex flex-wrap items-center my-1 gap-x-2 gap-y-1">
                <span className="font-semibold text-lg">
                  {formatIndianRupee(data?.price)}
                </span>
                <span className="  space-x-2">
                  <span className="text-primary/70">
                    {data?.discount && (
                      <span className="line-through">
                        {formatIndianRupee(
                          calculateOriginalPrice(
                            data?.price,
                            data?.discount || 0
                          )
                        )}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-green-500">
                    {data?.discount && data?.discount + "% off"}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 group">
              <span className="group-hover:underline group-hover:text-primary/80 text-xs">
                View
              </span>
              <MoveRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


*/
