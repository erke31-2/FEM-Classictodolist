import { useEffect, useState } from "react";
import FormTodo from "./FormTodo";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [mode, setMode] = useState("dark");
  const { user, logoutWithProvider } = useAuth();
  const [showInfo, setShowInfo] = useState(false);

  const handleLogout = () => {
    logoutWithProvider();
  };

  const d: HTMLElement = document.documentElement;
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("theme", "light");
    } else {
      setMode("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  useEffect(() => {
    switch (mode) {
      case "dark":
        d.classList.add("dark");
        break;
      case "light":
        d.classList.remove("dark");
        break;
      default:
        break;
    }
  }, [mode, d.classList]);

  return (
    <header
      className={`max-w-full h-[230px] bg-cover  flex flex-col justify-evenly items-center relative  ${
        mode === "light"
          ? "bg-[url('/images/bg-mobile-light.jpg')] md:bg-[url('/images/bg-desktop-light.jpg')]"
          : "bg-[url('/images/bg-mobile-dark.jpg')] md:bg-[url('/images/bg-desktop-dark.jpg')]"
      }`}
    >
      <nav className="w-[370px] mx-auto flex justify-between items-center md:w-[600px]">
        <h1 className="text-3xl tracking-[1rem] font-bold text-LightGrayishBlue">
          TODO
        </h1>
        <button className="w-5 h-5" onClick={toggleMode}>
          <img
            src={
              mode === "light"
                ? "/images/icon-moon.svg"
                : "/images/icon-sun.svg"
            }
            alt="light-dark-mode-icon"
            className="w-full h-full object-contain"
          />
        </button>
      </nav>
      <FormTodo />
      <article className="absolute top-2 right-2 flex flex-col items-end justify-center">
        <button
          className="hover:border-2 border-VeryDarkGrayishBlueDark1 w-8 h-8 rounded-full"
          onClick={() => setShowInfo(!showInfo)}
        >
          <img
            src={user?.user_metadata["avatar_url"]}
            alt="user-avatar"
            className="w-full h-full object-contain rounded-full"
          />
        </button>
        <div
          className={`${
            showInfo
              ? "flex }dark:bg-VeryDarkBlueDark z-10 rounded-md flex-col items-center justify-center p-4 bg-VeryLightGray dark:text-VeryDarkGrayishBlueDark1 text-VeryDarkGrayishBlue"
              : "hidden"
          }`}
        >
          <img
            src={user?.user_metadata["avatar_url"]}
            alt="user-avatar"
            className="w-12 h-12 rounded-full"
          />
          <h3 className="text-md">{user?.user_metadata["full_name"]}</h3>
          <p className="text-sm">{user?.user_metadata["email"]}</p>
          <button
            className="py-2 px-6 tracking-wide rounded-md mt-3 bg-VeryDarkDesaturatedBlueDark text-DarkGrayishBlue hover:scale-95"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </article>
    </header>
  );
};
export default Header;
