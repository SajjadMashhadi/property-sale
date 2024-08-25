import ThemeSwitch from "../components/themeSwitch";
import { NavLink } from "react-router-dom";
import Button from "./button";
import { useState } from "react";
import clsx from "clsx";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const logout = () => {};
  return (
    <>
      <button
        onClick={() => setShowSidebar(true)}
        className="block md:hidden absolute left-[20px] top-[20px]"
      >
        show menu
      </button>
      <div
        className={clsx(
          "w-[300px] absolute  md:left-0   md:relative md:w-1/4 h-full flex flex-col gap-[10px] bg-gray-50 dark:bg-gray-700 p-[10px] pt-[30px]",
          { "left-0 z-[1000]": showSidebar, "left-[-300px]": !showSidebar }
        )}
      >
        <h1 className="text-[24px] text-center dark:text-white">
          Property Sale
        </h1>
        <div className="flex flex-col gap-[10px] mt-[20px] ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                "h-[50px] rounded-[5px] flex pl-[10px] items-center ",
                isActive
                  ? "dark:bg-gray-800 bg-gray-700 dark:text-white text-white"
                  : "dark:hover:bg-gray-600 hover:bg-gray-200",
              ].join(" ")
            }
          >
            houses
          </NavLink>

          <NavLink
            to="/addHouse"
            className={({ isActive }) =>
              [
                "h-[50px] rounded-[5px] flex pl-[10px] items-center ",
                isActive
                  ? "dark:bg-gray-800 bg-gray-700 dark:text-white text-white"
                  : "dark:hover:bg-gray-600 hover:bg-gray-200",
              ].join(" ")
            }
          >
            add house
          </NavLink>
        </div>
        <hr className="border-gray-300 dark:border-gray-500 my-[20px]" />
        <div className="flex flex-col gap-[20px] items-center mt-[20px]">
          <ThemeSwitch />
          <Button text="log out" onClick={logout} />
        </div>
      </div>
      <div
        onClick={() => setShowSidebar(false)}
        className={clsx("md:none", {
          "w-full min-h-screen absolute ": showSidebar,
          none: !showSidebar,
        })}
      ></div>
    </>
  );
}
