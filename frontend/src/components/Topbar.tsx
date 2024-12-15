import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../apiUrl";

const Topbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/signin");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
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
