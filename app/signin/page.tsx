"use client"
import Header from "@/components/Header";
import { Signin } from "@/components/signin";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
    <Header session={session}/>

    <Signin/>
    </>
  );
}
