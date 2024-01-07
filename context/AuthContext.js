"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const pathName = usePathname();

  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data;
      console.log("===>", data.user);
      setUser(data.user);
    } catch (error) {
      toast.error(error.message);
      router.push("/login");
    }
  };

  const LogoutHandler = async () => {
    try {
      const response = await axios.post("/api/logout");
      const data = await response.data;
      toast.success(data.msg);
      setUser(null)
      router.push("/login");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    const isPrivatePath = ["/", "/update-profile"];
    if (isPrivatePath.includes(pathName)) {
      fetchData();
    } else {
      setUser(null);
    }
  }, [pathName]);

  return (
    <AuthContext.Provider value={{ user , LogoutHandler}}>{children}</AuthContext.Provider>
  );
};
