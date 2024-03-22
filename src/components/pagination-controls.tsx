import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

const btnStyles =
  "flex items-center gap-x-2 bg-white/5 py-3 px-5 rounded-md opacity-75 hover:opacity-100 transition text-sm";

export default function PaginationControls({ previousPath, nextPath } : PaginationControlsProps) {
  return (
    <section className="flex justify-between w-full">
      {
        previousPath ? (
          <Link href={previousPath} className={btnStyles}>
            <ArrowLeftIcon />
            previous
          </Link>) : <div/>
        
      }

      {
        nextPath && (
      <Link href={nextPath} className={btnStyles}>
        next
        <ArrowRightIcon />
      </Link>)
          
      }

    </section>
  );
}
