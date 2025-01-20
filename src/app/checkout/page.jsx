"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutItemsSummary } from "@/components/checkout-items-summary";
import { AddressForm } from "@/components/address-form";

import { calculateOriginalPrice, formatIndianRupee } from "@/lib/utils";
import useCart from "@/lib/use-cart";

const CheckoutPage = () => {
  const { clearCart } = useCart((state) => state);

  const [items, setItems] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);

  const searchParams = useSearchParams();
  const btnRef = useRef(null);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGrossTotal = () => {
    return items.reduce((total, item) => {
      const originalPrice = calculateOriginalPrice(
        item.price,
        item.discount || 0
      );
      return total + originalPrice * item.quantity;
    }, 0);
  };

  const [paymentMethod, setPaymentMethod] = useState("upi");

  const handleOrder = (address) => {
    setIsOrdering(true);
    const order = {
      orderId: "OD" + Date.now(),
      address,
      items,
      grossTotal: calculateGrossTotal(),
      discount: calculateGrossTotal() - calculateTotal(),
      total: calculateTotal(),
      deliveryCharge: "Free",
      paymentMethod,
      expectedDelivery: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 4
      ).toString(),
      orderAt: new Date().toString(),
    };

    const prevOrders = JSON.parse(localStorage.getItem("orders"));
    if (!prevOrders) {
      localStorage.setItem("orders", JSON.stringify([order]));
    } else {
      localStorage.setItem("orders", JSON.stringify([...prevOrders, order]));
    }

    if (searchParams.get("source") === "cart") {
      clearCart();
    } else if (searchParams.get("source") === "direct") {
      localStorage.removeItem("single-item");
    }

    redirect("/order-event/success?orderId=" + order.orderId);
  };

  useEffect(() => {
    const source = searchParams.get("source");

    if (source === "cart") {
      const cartItems = JSON.parse(localStorage.getItem("cart")).state.cart;
      if (!cartItems) {
        redirect("/");
      }
      return setItems(cartItems);
    } else if (source === "direct") {
      const cartItems = JSON.parse(localStorage.getItem("single-item"));
      if (!cartItems) {
        redirect("/");
      }
      return setItems(cartItems);
    } else {
      redirect("/");
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-primary/80">
          Provide accurate details for smooth ordering.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="mb-5 border p-8 pb-12 rounded-lg">
            <h2 className="text-lg font-semibold text-primary/80 mb-4">
              Address
            </h2>
            <AddressForm onSubmit={handleOrder} ref={btnRef} />
          </div>
          <div className="mt-8 bg-secondary/20 px-8 py-6 rounded-lg">
            <h2 className="text-lg font-semibold text-primary/80 mb-8">
              Payment methods
            </h2>
            <div className="mb-4">
              <RadioGroup
                defaultValue={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="font-medium">
                    UPI - PhonePe, Google Pay, Paytm
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="font-medium">
                    Debit or Credit Card
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="font-medium">
                    Net Banking
                  </Label>
                </div>
                <div className="flex items-center gap-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="font-medium">
                    Cash on Delivery {"(COD)"}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="relative">
          <div className="sticky top-16 ">
            <div className="mb-5 border-2 px-4 rounded-lg">
              <CheckoutItemsSummary items={items} />
            </div>
            <div className="p-6 bg-secondary/20 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-4">Price Details:</h2>
              <div className="flex justify-between mb-2">
                <span>
                  Price ({items.length} {items.length > 1 ? "items" : "item"})
                </span>
                <span>{formatIndianRupee(calculateGrossTotal())}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-500 font-medium">
                  -{" "}
                  {formatIndianRupee(calculateGrossTotal() - calculateTotal())}
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
              <div className="flex flex-col items-end mt-4 gap-5">
                <Button
                  onClick={() => btnRef.current.click()}
                  disabled={isOrdering}
                  size="lg"
                  type="button"
                  className="uppercase text-primary bg-rose/90 hover:bg-rose"
                >
                  Confirm order
                </Button>
                <p className="w-full text-yellow-500 text-center text-xs">
                  Orders on this store will not be fulfilled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
