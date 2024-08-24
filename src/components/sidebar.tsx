import ThemeSwitch from "../components/themeSwitch";
import { NavLink } from "react-router-dom";
import Button from "./button";

export default function Sidebar() {
  const logout = () => {};
  return (
    <div className=" w-1/4 h-full flex flex-col gap-[10px] bg-gray-50 dark:bg-gray-700 p-[10px] pt-[30px]">
      <h1 className="text-[24px] text-center dark:text-white">Property Sale</h1>
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
  );
}
