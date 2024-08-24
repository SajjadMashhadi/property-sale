import ThemeSwitch from "../components/themeSwitch";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const logout = () => {};
  return (
    <div className=" w-1/4 h-full flex flex-col gap-[20px] bg-gray-50 dark:bg-gray-700 p-[10px] pt-[30px]">
      <h1 className="text-[24px] text-center dark:text-white">Property Sale</h1>
      <div className="flex flex-col gap-[10px] mt-[20px] ">
        <NavLink
          to="/houses"
          className={({ isActive }) =>
            [
              "h-[50px] rounded-[5px] flex justify-center items-center ",
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
              "h-[50px] rounded-[5px] flex justify-center items-center ",
              isActive
                ? "dark:bg-gray-800 bg-gray-700 dark:text-white text-white"
                : "dark:hover:bg-gray-600 hover:bg-gray-200",
            ].join(" ")
          }
        >
          add house
        </NavLink>
      </div>
      <ThemeSwitch />
      <button
        className="h-[50px] rounded-[5px] flex justify-center items-center dark:hover:bg-gray-600 hover:bg-gray-200"
        onClick={() => logout()}
      >
        Log out
      </button>
    </div>
  );
}
