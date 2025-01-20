"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full bg-secondary fixed top-0 left-0">
      <div className="w-full h-full flex items-center justify-center">
        This page is not reachable.
        <Button variant="link" className='text-rose' asChild>
          <Link href={"/"}>go home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
