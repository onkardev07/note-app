const Topbar = () => {
  return (
    <div className="h-[50px] flex justify-between py-8 px-10 w-full items-center">
      <div className="flex justify-between gap-4 items-center">
        <div>
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="
              "
          />
        </div>
        <div className="font-bold">Dashboard</div>
      </div>

      <div>
        <a
          href="/signin"
          className="text-blue-500 underline hover:text-blue-700 font-sans font-medium"
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default Topbar;
