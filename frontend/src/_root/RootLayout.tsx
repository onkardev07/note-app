import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />

      <Outlet />
    </div>
  );
};

export default RootLayout;
