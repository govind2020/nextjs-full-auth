"use client";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUnlockAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function Nav() {
  const router = useRouter();
  const { user } = useAuth();

  const LogoutHandler = async () => {
    try {
      const response = await axios.post("/api/logout");
      const data = await response.data;
      toast.success(data.msg);
      router.push("/login");
    } catch (error) {
      toast.error(error.response);
    }
  };

  return (
    <div>
      <Toaster />
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={user ? "/" : "/login"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <FaUnlockAlt size={35} />
            <span className="ml-3 text-xl">Authentaction</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {user && (
              <Link href={"/"} className="mr-5 hover:text-gray-900">
                Home
              </Link>
            )}
            {!user && (
              <>
                <Link href={"/login"} className="mr-5 hover:text-gray-900">
                  Login
                </Link>
                <Link href={"/register"} className="mr-5 hover:text-gray-900">
                  Register
                </Link>
              </>
            )}
          </nav>
          {user && (
            <button
              onClick={LogoutHandler}
              className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-black rounded  mt-4 md:mt-0 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Nav;
