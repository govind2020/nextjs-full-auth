"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  // const [user, setUser] = React.useState(null)
  // const router = useRouter()

  const { user } = useAuth();

  if (!user) {
    return <div>....loading</div>;
  }

  return (
    <>
      <div className="min-h-[92vh] flex justify-center items-center">
        <div className="border border-black w-1/2 min-h-[10vh] rounded-lg p-4">
          <div className="mb-3">
            <p className="font-semi-bold text-2xl">Name: {user?.name}</p>
          </div>
          <div className="mb-3">
            <p className="font-semi-bold text-2xl">Email: {user?.email}</p>
          </div>
          <div className="mb-3">
            <Link href={"/update-profile"}>Update Profil</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
