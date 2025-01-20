"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FullPageLoader } from "@/components/loader/loaders";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  calculateOriginalPrice,
  formatDate,
  formatIndianRupee,
} from "@/lib/utils";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders"))?.reverse() || 0);
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-primary/80">View all your past orders here.</p>
      </div>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderAccordian key={order.orderId} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-primary/80 mb-4">No orders found!</p>
          <Button
            variant="link"
            className="text-blue-500 hover:text-blue-600"
            asChild
          >
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

const Order = ({ order }) => {
  const findSubtotal = (items) => {
    return items.reduce((t, i) => {
      const op = calculateOriginalPrice(i.price, i.discount || 0);
      return t + op * i.quantity;
    }, 0);
  };

  return (
    <div className="border-t mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">#</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="">QTY.</TableHead>
            <TableHead className="">Rate</TableHead>
            <TableHead className="">Discount</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium align-top">{i + 1}</TableCell>
              <TableCell className="align-top">
                <Link href={"/product/" + item.id}>{item.title}</Link>
              </TableCell>
              <TableCell className="align-top">{item.quantity}</TableCell>
              <TableCell className="align-top">
                {parseFloat(
                  calculateOriginalPrice(item.price, item.discount || 0)
                ).toFixed(2)}
              </TableCell>
              <TableCell className="align-top">{item.discount || 0}%</TableCell>
              <TableCell className="align-top text-right">
                {parseFloat(item.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 pt-4 border-t mr-2 space-y-2">
        <div className="grid grid-cols-4 place-items-end">
          <span className="col-span-3">Subtotal</span>
          <span className="col-span-1">{formatIndianRupee(findSubtotal(order.items))}</span>
        </div>
        <div className="grid grid-cols-4 place-items-end">
          <span className="col-span-3">Discount</span>
          <span className="col-span-1 text-green-500">
            {formatIndianRupee(findSubtotal(order.items) - order.total)}
          </span>
        </div>
        <div className="grid grid-cols-4 place-items-end pb-2">
          <span className="col-span-3">Delivery Charges</span>
          <span className="col-span-1 text-green-500">
            {order.deliveryCharge}
          </span>
        </div>
        <hr />
        <div className="grid grid-cols-4 place-items-end text-lg font-semibold">
          <span className="col-span-3">Total Amount</span>
          <span className="col-span-1">
            {formatIndianRupee(order.total)}
          </span>
        </div>
        <div className="flexjustify-end gap-4 mt-6 hidden">
          <Button variant="outline" asChild>
            <Link href={`/order/${order.orderId}`}>View Details</Link>
          </Button>
          <Button>Reorder</Button>
        </div>
      </div>
    </div>
  );
};

const OrderAccordian = ({ order }) => (
  <Accordion
    type="single"
    collapsible
    className="w-full border-2 px-4 rounded-lg"
  >
    <AccordionItem className="border-none" value="order-summary">
      <AccordionTrigger className="hover:no-underline items-start">
        <div className="flex gap-8">
          <div className="text-primary/90 space-y-1">
            <div className="flex max-sm:flex-col gap-2">
              <p>Order ID :</p>
              <p className="font-semibold text-rose tracking-wide">
                {order.orderId}
              </p>
            </div>
            <div className="flex gap-2">
              <p>Total Quantity :</p>
              <p className="font-semibold">
                {order.items.reduce((t, i) => t + i.quantity, 0)}
              </p>
            </div>
            <div className="flex gap-2">
              <p>Order Value :</p>
              <p className="font-semibold">{formatIndianRupee((order.total))}</p>
            </div>
          </div>

          <div className="text-primary/90 space-y-1">
            <div className="flex max-sm:flex-col gap-2">
              <p>Order At :</p>
              <p>{formatDate(order.orderAt)}</p>
            </div>
            <div className="flex max-sm:flex-col gap-2">
              <p>Expected Delivery :</p>
              <p>{formatDate(order.expectedDelivery)}</p>
            </div>
            <div className="flex gap-2">
              <p>Payment Method :</p>
              <p className="uppercase">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="max-md:hidden">
            <div className="space-y-1">
              <div className="flex gap-4">
                <p className="text-primary/80 font-semibold">Address:</p>
                <p className="text-rose/70 font-medium">{order.address.name}</p>
              </div>
              <p className="text-primary/90 flex gap-2 flex-wrap">
                <span>{order.address.address},</span>
                {order.address.landmark && (
                  <span>{order.address.landmark},</span>
                )}
                <span>{order.address.city},</span>
              </p>
              <p className="text-primary/90 flex gap-2 flex-wrap">
                <span>{order.address.state},</span>
                <span>{order.address.country}</span>
                <span>- {order.address.pincode}</span>
              </p>
              <p className="font-medium">
                Mobile number: <span>{order.address.mobile}</span>
              </p>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="py-4 border-t md:hidden flex gap-4">
          <div className="flex gap-8">
            <p className="text-primary/80 font-semibold">Address:</p>
            <div className="space-y-1">
              <p className="text-rose/70 font-medium">{order.address.name}</p>
              <p className="text-primary/90 flex gap-2 flex-wrap">
                <span>{order.address.address},</span>
                {order.address.landmark && (
                  <span>{order.address.landmark},</span>
                )}
                <span>{order.address.city},</span>
              </p>
              <p className="text-primary/90 flex gap-2 flex-wrap">
                <span>{order.address.state},</span>
                <span>{order.address.country}</span>
                <span>- {order.address.pincode}</span>
              </p>
              <p className="font-medium">
                Mobile number: <span>{order.address.mobile}</span>
              </p>
            </div>
          </div>
        </div>
        <Order order={order} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
