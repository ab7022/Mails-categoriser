"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Email from "@/components/emails";
import Header from "@/components/Header";
import { signOut, signIn } from "next-auth/react";

const Emails = () => {
  const { data: session } = useSession();
  const [emails, setEmails] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      if (session) {
        try {
          const response = await axios.get("/api/fetchEmails");
          setEmails(response.data);
          const snippets = response.data.map((email: any) => email.snippet);
          localStorage.setItem("emails", JSON.stringify(snippets));
        } catch (error) {
          console.error("Error fetching emails:", error);
        }
      }
    };
    fetchEmails();
  }, [session]);
  const classifyEmails = async () => {
    if (session) {
      try {
        const response = await axios.post("/api/classify", {
          email: localStorage.getItem("emails"),
        });
        setCategory(response.data);
        localStorage.setItem("categories", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    }
  };
  const refreshEmails = async () => {
    try {
      const response = await axios.get("/api/fetchEmails");
      setEmails(response.data);
    } catch (error) {
      console.error("Error refreshing emails:", error);
    }
  };
  if (!session) {
    return (
      <>
        {" "}
        <Header session={session} />
        <div className="flex justify-center h-screen items-center">
          Please Signin First
        </div>{" "}
      </>
    );
  }

  return (
    <div className="bg-black h-screen">
      <Email
        session={session}
        emails={emails}
        refreshEmails={refreshEmails}
        classifyEmails={classifyEmails}
      />
    </div>
  );
};

export default Emails;
