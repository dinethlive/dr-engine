"use client";

import Link from "next/link";
import { Github, HelpCircle } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ProfileLinks() {
  return (
    <>
      <DropdownMenuItem asChild>
        <a
          href="https://github.com/dinethlive/dr-engine"
          target="_blank"
          rel="noreferrer"
          className="flex items-center w-full cursor-pointer"
        >
          <Github className="mr-2 h-4 w-4" />
          View on Github
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          href="/how-to-use"
          className="flex items-center w-full cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          How to Use?
        </Link>
      </DropdownMenuItem>
    </>
  );
}
