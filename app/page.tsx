"use client";
import { Signin } from "@/components/signin";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Header  from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
  
      <Header session={session}/>
    </>
  );
}
