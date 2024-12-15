import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../apiUrl";
import { Loader } from "lucide-react";

export default function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/auth/check`, {
          withCredentials: true,
        }); // Include cookies
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <Loader className="animate-spin mx-auto" size={25}></Loader>;
  }

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <section className="flex-1 flex justify-center items-center flex-col lg:flex-row py-10">
          <div className="flex gap-2">
            <div>
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="lg:absolute lg:top-[20px] lg:left-[20px] lg:mr-0 lg:mb-0 mb-6 lg:h-auto"
              />
            </div>
          </div>
          <Outlet />
        </section>
      )}
      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-3/2 bg-no-repeat"
      />
    </>
  );
}
