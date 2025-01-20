import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";

import { logout } from "@/actions/authActions";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const UserButton = ({ user }) => {
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="p-0 cursor-pointer hover:!bg-transparent focus:!bg-transparent">
          <div className="mr-4 text-xl tracking-tight font-medium max-md:hidden">
            {user?.name?.split(" ")[0]}
          </div>

          <div className="size-8 group border-2 border-primary/50 rounded-full overflow-hidden">
            {user ? (
              <Image
                src={user?.image}
                alt={user?.name?.replaceAll(" ", "-")}
                width={100}
                height={100}
                className="object-cover group-hover:scale-110 transition-all"
              />
            ) : (
              user?.name.substr(0, 2).toUpperCase()
            )}
          </div>
        </MenubarTrigger>
        <MenubarContent className="space-y-2">
          <MenubarItem asChild>
            <Link href={"/u/orders"} className="w-full">
              My orders
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={"#"} className="w-full">
              Payment methods
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href={"/u/my-account"} className="w-full">
              Manage account
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="text-red-500 hover:!bg-destructive hover:!text-foreground">
            <button
              type="button"
              className="w-full flex items-center gap-2"
              onClick={logout}
            >
              <LogOut size={18} />
              <span className="font-bold">Logout</span>
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserButton;
