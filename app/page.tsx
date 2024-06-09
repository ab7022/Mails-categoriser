"use client";
import { Signin } from "@/components/signin";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Link
        className="inline-flex h-9 items-center justify-center rounded-md bg-[#2563eb] px-4 text-sm font-medium mr-4 text-gray-50 shadow transition-colors hover:bg-[#1e40af]"
        href="#"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </Link>{" "}
    </>
  );
}
