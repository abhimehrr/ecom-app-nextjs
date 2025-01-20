"use client";

import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const searchParams = Object.fromEntries(useSearchParams().entries());

  if (!searchParams) redirect("/");

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4 text-green-500">
        Order Placed Successfully!
      </h1>
      <div className="my-4">
        <p className="text-xl text-primary/80 font-medium">
          Order ID : {searchParams.orderId}
        </p>
      </div>
      <p className="mb-4">Thank you for shopping with us.</p>

      <div className="flex items-center">
        <Button variant="link" className="text-blue-500" asChild>
          <Link href="/">Continue shopping</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/u/orders">My orders</Link>
        </Button>
      </div>
    </div>
  );
};
export default OrderSuccess;
