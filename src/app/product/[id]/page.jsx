"use client";

import { Fragment, use, useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import ProductCard from "@/components/product-card";
import { ProductPageSkeleton } from "@/components/ui/product-page-skeleton";

import { calculateOriginalPrice, formatIndianRupee } from "@/lib/utils";
import { Fetch } from "@/lib/fetch";
import useCart from "@/lib/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ProductSection } from "@/components/product-section";

const ProductPage = ({ params }) => {
  params = use(params);
  const { addToCart } = useCart((s) => s);
  const router = useRouter();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Handle Buy Now
  const handleBuyNow = () => {
    localStorage.setItem(
      "single-item",
      JSON.stringify([{ ...product, quantity: 1 }])
    );
    router.push(
      "/checkout?source=direct&product=" + product.title.replaceAll(" ", "-")
    );
  };

  useEffect(() => {
    (async () => {
      const main = await Fetch(`/${params.id}`);

      if (main.status === "SUCCESS") {
        var rating = Math.round(Math.random() * 5);
        rating = rating > 5 ? 5 : rating;
        main.product.rating = rating;
        setProduct(main.product);
      }
    })();
  }, []);

  return !product ? (
    <ProductPageSkeleton />
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <div className="sticky top-10">
            <div className="rounded-lg bg-white overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.title.replaceAll(" ", "-")}
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 right-4">
                <Heart
                  size={24}
                  className="text-secondary hover:text-rose cursor-pointer"
                />
              </div>
            </div>

            {product?.popular && (
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-xs font-semibold px-3 py-1 rounded">
                  TRENDING
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          {/* Product Title */}
          <h1 className="text-2xl font-bold text-primary">{product?.title}</h1>

          {/* Product Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {product?.discount && (
                <Fragment>
                  <p className="text-green-500 font-semibold text-lg">
                    Special price
                  </p>
                  {product?.onSale && (
                    <span className="bg-green-700 text-xs font-semibold px-3 py-1 rounded">
                      Sale
                    </span>
                  )}
                </Fragment>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold text-primary">
                {formatIndianRupee(product?.price)}
              </span>
              {product?.discount && (
                <div className="flex items-center space-x-2">
                  <span className="line-through text-gray-500">
                    {formatIndianRupee(
                      calculateOriginalPrice(
                        product?.price,
                        product?.discount || 0
                      )
                    )}
                  </span>
                  <span className="text-sm text-green-500">
                    {product?.discount}% off
                  </span>
                </div>
              )}
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < (product?.rating || 0) ? "currentColor" : "none"
                      }
                      className="stroke-current"
                    />
                  ))}
                </span>
                <span className="text-xs text-zinc-500">
                  ({product?.rating || 0})
                </span>
              </div>
              <div>
                <Button
                  variant="link"
                  className="p-0 text-blue-500 hover:text-blue-600"
                >
                  Ratings and review
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Product Details */}
          <div className="mt-4">
            <h3 className="text-lg font-medium">Product Details:</h3>
            <ul className="list-disc list-inside text-primary/80 space-y-2 pt-2">
              <li className="capitalize">Brand: {product?.brand}</li>
              <li className="capitalize">Model: {product?.model}</li>
              <li className="capitalize">Color: {product?.color}</li>
            </ul>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Product Description:</h3>
            <div
              className={`space-y-1 text-justify ${
                !showFullDescription && "line-clamp-5"
              }`}
            >
              {console.log(product?.description.split("."))}
              {product?.description.split(".").map((desc, i) => (
                <p key={i} className="text-primary/80 leading-relaxed">
                  {desc.length > 0 && desc + "."}
                </p>
              ))}
            </div>
            <Button
              variant="link"
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="p-0 underline text-rose/75 hover:text-rose"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </Button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => {
                addToCart({ ...product, description: null, quantity: 1 });

                toast({
                  variant: "success",
                  title: "Product added to the cart.",
                });
              }}
            >
              <ShoppingCart size={20} />
              Add to cart
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="uppercase">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Latest Collection */}
      <section className="bg-secondary/50 p-4 py-8 rounded-lg my-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Related products
        </h2>

        {product && (
          <ProductSection
            baseUrl={`/category?sort=desc&type=${product.category}&limit=`}
            showBtn={false}
          />
        )}
      </section>
    </div>
  );
};

export default ProductPage;
