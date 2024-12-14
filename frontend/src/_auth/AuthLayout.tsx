import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex-1 flex justify-center items-center flex-col lg:flex-row py-10">
            <div className="flex gap-2 ">
              <div>
                <img
                  src="/assets/icons/logo.svg"
                  alt="logo"
                  className="
              lg:absolute lg:top-[20px] lg:left-[20px] 
              lg:mr-0 lg:mb-0 
              mb-6 lg:h-auto"
                />
              </div>
            </div>

            <Outlet />
          </section>

          {/* Right Section (Image) */}
          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-3/2 bg-no-repeat"
          />
        </>
      )}
    </>
  );
}
