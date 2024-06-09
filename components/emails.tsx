import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Header from "./Header";
import { useState } from "react";

export default function Email({ session, emails, refreshEmails, classifyEmails }) {
  const [emailsToShow, setEmailsToShow] = useState(10);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const categoriesString = localStorage.getItem("categories");
  const categoriesObject = JSON.parse(categoriesString);
  const categories = categoriesObject?.data.split("\n").map(category => category.split(":")[1].trim());
  const handleEmailsToShowChange = (event) => {
    setEmailsToShow(parseInt(event.target.value));
  };

  const getCategoryClass = (category) => {
    switch (category.toLowerCase()) {
      case "spam":
        return "bg-red-500 text-white";
      case "important":
        return "bg-green-500 text-white";
      case "promotions":
        return "bg-blue-500 text-white";
      case "general":
        return "bg-gray-500 text-white";
      case "social":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };
  return (
    <div className="flex h-screen min-w-full flex-col">
      <Header session={session} />
      <div className="flex-1 bg-gray-100 p-0 dark:bg-gray-950">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-2 ml-2">
          <div className="flex flex-row">
            <div
              className="flex items-center gap-2 bg-white px-2 rounded hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => refreshEmails()}
            >
              <Button className="text-gray-700" size="icon" variant="ghost">
                <RefreshCwIcon className="h-5 w-5" />
              </Button>
              Refresh
            </div>
              <div className="flex items-center gap-2 bg-white px-2 rounded ml-8">
              <label htmlFor="emailsToShow" className="text-gray-700">Show:</label>
              <select id="emailsToShow" value={emailsToShow} onChange={handleEmailsToShowChange} className="border border-gray-300 rounded p-1">
                {[10, 20, 30, 40, 50].map((number) => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </select>
            </div>
            </div>
           
              <div
                className="flex items-center gap-2 bg-white px-2 rounded hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => classifyEmails()}
              >
                <Button className="text-gray-700" size="icon" variant="ghost">
                  <RefreshCwIcon className="h-5 w-5" />
                </Button>
                Categorise
              </div>
            
          </div>
          <div className="grid gap-2 min-w-sm">
          {emails.slice(0, emailsToShow).length > 0 ? (
            emails.slice(0, emailsToShow).map((email, index) => (
                <div
                  key={email.id}
                  className="grid md:grid-cols-[40px_1fr_100px] items-center gap-4 rounded-md bg-white p-3 shadow-sm transition-colors hover:bg-gray-100"
                >
                  <div className="flex justify-between flex-row">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage alt="@username" src="/placeholder-user.jpg" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col md:hidden text-sm text-gray-500 dark:text-gray-400 text-center">
                    {categories && (
                      <div className={`text-sm p-2 shadow rounded my-2 text-center ${getCategoryClass(categories[index])}`}>
                        {categories[index]}
                      </div>
                    )}
                  
                      {formatDate(email.payload.headers.find((header) => header.name === "Date").value)}
                     
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium text-blue-800 ">
                 
                      {email.payload.headers.find((header) => header.name === "From").value}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-400">
                      Subject: {email.payload.headers.find((header) => header.name === "Subject").value}
                    </div>
                    <div className="text-[12px] md:text-sm text-gray-500 dark:text-gray-400">
                      Content: {email.snippet}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                    {categories && (
                      <div className={`text-sm p-2 shadow rounded my-2 text-center ${getCategoryClass(categories[index])}`}>
                        {categories[index]}
                      </div>
                    )}
                    
                    </div>
                    {formatDate(email.payload.headers.find((header) => header.name === "Date").value)}
                  </div>
                  
                </div>
              ))
            ) : (
              <p className="text-center flex justify-center items-center">No emails found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ExpandIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
