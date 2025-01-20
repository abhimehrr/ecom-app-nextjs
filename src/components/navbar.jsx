"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import UserButton from "@/components/user-button";
import { Button } from "@/components/ui/button";

import useCart from "@/lib/use-cart";

const Navbar = ({ user }) => {
  const { cart } = useCart((s) => s);
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input) return;
    router.push(`/search?q=${input.trim().replaceAll(" ", "-")}`);
  };

  return (
    <nav className="pt-4">
      <div className="container mx-auto px-2 sm:px-4 pb-4">
        <div className="w-full flex items-center gap-8 justify-between">
          <div className="flex items-center gap-6 flex-auto">
            <Button
              variant="link"
              className="text-rose text-2xl font-bold p-0 !no-underline"
              asChild
            >
              <Link href={"/"}>eCom</Link>
            </Button>
            <div className="w-full sm:w-1/2">
              <form onSubmit={handleSearch}>
                <div className="flex items-center pl-4 py-0.5 rounded-full bg-secondary/50 border">
                  <Search />
                  <Input
                    type="text"
                    className="border-none focus:!border-none focus:!outline-none focus:!ring-0"
                    placeholder="Search anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  {input && (
                    <X
                      className="mr-3 cursor-pointer"
                      onClick={() => setInput("")}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-5 relative">
              {user ? (
                <UserButton user={user} />
              ) : (
                <div className="size-8 group border-2 border-primary/50 rounded-full overflow-hidden">
                  <Link
                    href={"/login"}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <User className="border-primary/75 object-cover" />
                  </Link>
                </div>
              )}
              <div className="relative mr-2">
                <Link href="/cart">
                  <ShoppingCart
                    className="hover:scale-110 transition-all"
                    size={25}
                  />
                  {cart?.length > 0 && (
                    <p className="absolute -top-2 -right-2 bg-rose text-xs px-1.5 rounded-full">
                      {cart.length}
                    </p>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-4" />
    </nav>
  );
};

export default Navbar;
