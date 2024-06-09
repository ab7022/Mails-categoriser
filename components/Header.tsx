import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import {  signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Header({session}: {session: any}){
    return(
        <>
        <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md dark:bg-gray-950 min-w-full sticky top-0 z-50">

        <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 border  border-gray-700 dark:border-gray-800">
        <AvatarImage alt="@username" src={session?.user.image} />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
          <div className="relative w-full max-w-md">
        <h4>{session?.user.name} </h4>
      
          </div>
        </div>
        <div className="flex items-center gap-4">
        {session ? (
            <button
              className="flex items-center justify-center space-x-2 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
              onClick={() => {
                signOut();
                redirect("/");
              }}
            >
              <span>Logout</span>
            </button>
          ) : (
            <button
              className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                signIn(); // Specify 'google' or the appropriate provider
              }}
            >
              <span>Sign in</span>
            </button>
          )}
        </div>
      </header>
        </>
    )
}
