import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    localStorage.removeItem("authToken");

    navigate("/signin");
  };

  return (
    <div className="h-[50px] flex justify-between py-8 px-10 w-full items-center">
      <div className="flex justify-between gap-4 items-center">
        <div>
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="h-[30px] w-auto"
          />
        </div>
        <div className="font-bold">Dashboard</div>
      </div>

      <div>
        <a
          href="/signin"
          onClick={handleSignOut}
          className="text-blue-500 underline hover:text-blue-700 font-sans font-medium cursor-pointer"
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default Topbar;
