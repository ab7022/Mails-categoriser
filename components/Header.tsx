import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import {  signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Header({session}){
    return(
        <>
        <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md dark:bg-gray-950 min-w-full sticky top-0 z-50">

        <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 border border-gray-200 border-gray-700 dark:border-gray-800">
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
function MailIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
