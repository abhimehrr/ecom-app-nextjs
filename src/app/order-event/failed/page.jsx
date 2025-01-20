import Link from "next/link";

const OrderFailure = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed!</h1>
      <p className="mb-4">Something went wrong. Please try again.</p>
      <Link href="/checkout" className="text-blue-600 underline">
        Retry Checkout
      </Link>
    </div>
  );
};
export default OrderFailure;
