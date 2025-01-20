"use client";

import Link from "next/link";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import useCart from "@/lib/use-cart";
import { calculateOriginalPrice, formatIndianRupee } from "@/lib/utils";

const CartPage = () => {
  const { cart, addToCart, removeSingleFromCart, removeFromCart, clearCart } =
    useCart((state) => state);
  const { toast } = useToast();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateGrossTotal = () => {
    return cart.reduce((total, item) => {
      const originalPrice = calculateOriginalPrice(
        item.price,
        item.discount || 0
      );
      return total + originalPrice * item.quantity;
    }, 0);
  };

  return cart.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <Button variant="link" className="text-blue-500" asChild>
        <Link href="/">Continue shopping</Link>
      </Button>
    </div>
  ) : (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 border px-8 py-4 rounded-lg">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center ${
                i !== cart.length - 1 && " border-b"
              } py-4`}
            >
              {/* Product Image */}
              <div className="size-24 flex-shrink-0">
                <Image
                  src={item?.image || "/product-placeholder.svg"}
                  alt={item?.title?.replaceAll(" ", "-") || "product-image"}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              {/* Product Details */}
              <div className="ml-4 flex-grow">
                <Link
                  href={`/product/${item.id}`}
                  className="hover:text-primary/80"
                >
                  <h3 className="text-lg font-semibold text-wrap">
                    {item.title.length > 50
                      ? item.title.substr(0, 45) + "..."
                      : item.title}{" "}
                  </h3>
                </Link>
                <div className="flex items-center gap-4 my-2">
                  <div className="flex items-center text-primary/80 gap-3">
                    <button
                      onClick={() => {
                        removeSingleFromCart(item.id);
                        toast({
                          title: "Item removed",
                          variant: "error",
                        });
                      }}
                      className="group"
                    >
                      <MinusCircle
                        size={20}
                        className="group-hover:text-primary"
                      />
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          quantity: 1,
                        });
                        toast({
                          title: "Item added",
                          variant: "success",
                        });
                      }}
                      className="group"
                    >
                      <PlusCircle
                        size={20}
                        className="group-hover:text-primary"
                      />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast({
                        title: "Current item removed",
                        variant: "error",
                      });
                    }}
                    className="font-medium text-rose/90 hover:text-rose ml-4"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap items-center my-1 gap-x-2 gap-y-1">
                  <span className="font-semibold text-lg">
                    {formatIndianRupee(item?.price * item?.quantity)}
                  </span>
                  <span className="  space-x-2">
                    <span className="text-primary/70">
                      {item?.discount && (
                        <span className="line-through">
                          {formatIndianRupee(
                            calculateOriginalPrice(
                              item?.price,
                              item?.discount || 0
                            )
                          )}
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-green-500">
                      {item?.discount && item?.discount + "% off"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="relative">
          <div className="p-6 bg-secondary/20 sticky top-16 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Price Details:</h2>
            <div className="flex justify-between mb-2">
              <span>Price ({cart.length} items)</span>
              <span>{formatIndianRupee(calculateGrossTotal())}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span className="text-green-500 font-medium">
                - {formatIndianRupee(calculateGrossTotal() - calculateTotal())}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Delivery Charges</span>
              <span className="space-x-2">
                <span className="line-through">{formatIndianRupee(99)}</span>
                <span className="text-green-500 font-medium">Free</span>
              </span>
            </div>
            <hr />
            <div className="flex justify-between my-4 text-lg font-semibold">
              <span>Total Amount</span>
              <span>{formatIndianRupee(calculateTotal())}</span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <Button
                size="lg"
                onClick={() => {
                  clearCart();
                  toast({
                    title: "Items removed",
                    description: "All items are removed from the cart",
                    variant: "error",
                  });
                }}
                className="w-full"
              >
                Clear cart
              </Button>
              <Button
                size="lg"
                className="w-full uppercase text-primary bg-rose/90 hover:bg-rose"
                asChild
              >
                <Link href={"/checkout?source=cart"}>Proceed to buy</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
