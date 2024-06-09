import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Header from "./Header";
import { useState } from "react";

interface EmailProps {
  session: any;
  emails: any[];
  refreshEmails: () => void;
  classifyEmails: () => void;
}

export default function Email({
  session,
  emails,
  refreshEmails,
  classifyEmails,
}: EmailProps) {
  const [emailsToShow, setEmailsToShow] = useState<number>(10);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categoriesString =
    typeof window !== "undefined" ? localStorage.getItem("categories") : null;
  const categoriesObject = categoriesString
    ? JSON.parse(categoriesString)
    : null;
  const categories = categoriesObject?.data
    .split("\n")
    .map((category: string) => category.split(":")[1].trim());

  const handleEmailsToShowChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmailsToShow(parseInt(event.target.value, 10));
  };

  const getCategoryClass = (category: string | undefined): string => {
    switch (category?.toLowerCase()) {
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
                className="flex items-center gap-1 bg-white px-2 rounded hover:bg-gray-300 hover:cursor-pointer mr-3"
                onClick={() => refreshEmails()}
              >
                <Button className="text-gray-700" size="icon" variant="ghost">
                  <RefreshCwIcon className="h-5 w-5" />
                </Button>
                Refresh
              </div>
              <div className="flex items-center gap-1 bg-white px-1 md:px-2 rounded md:ml-8">
                <label htmlFor="emailsToShow" className="text-gray-700">
                  Show:
                </label>
                <select
                  id="emailsToShow"
                  value={emailsToShow}
                  onChange={handleEmailsToShowChange}
                  className="border border-gray-300 rounded p-1"
                >
                  {[10, 20, 30, 40, 50].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className="flex items-center gap-2 bg-white px-1 md:px-2 rounded hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => classifyEmails()}
            >
              <Button className="text-gray-700" size="icon" variant="ghost">
                <RefreshCwIcon className="h-4 w-4" />
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
                      <AvatarImage
                        alt="@username"
                        src="/placeholder-user.jpg"
                      />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col md:hidden text-sm text-gray-500 dark:text-gray-400 text-center">
                      {categories && (
                        <div
                          className={`text-sm p-2 shadow rounded my-2 text-center ${getCategoryClass(
                            categories[index]
                          )}`}
                        >
                          {categories[index]}
                        </div>
                      )}
                      {formatDate(
                        (
                          email.payload.headers.find(
                            (header: any) => header.name === "Date"
                          ) as any
                        ).value
                      )}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium text-blue-800">
                      {
                        email.payload.headers.find(
                          (header: any) => header.name === "From"
                        )?.value
                      }
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-400">
                      Subject:{" "}
                      {
                        email.payload.headers.find(
                          (header: any) => header.name === "Subject"
                        )?.value
                      }
                    </div>
                    <div className="text-[12px] md:text-sm text-gray-500 dark:text-gray-400">
                      Content: {email.snippet}
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {categories && (
                        <div
                          className={`text-sm p-2 shadow rounded my-2 text-center ${getCategoryClass(
                            categories[index]
                          )}`}
                        >
                          {categories[index]}
                        </div>
                      )}
                    </div>
                    {formatDate(
                      email.payload.headers.find(
                        (header: any) => header.name === "Date"
                      ).value
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
