import ThemeSwitch from "../components/themeSwitch";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className=" w-[300px] h-full flex flex-col gap-[20px] bg-gray-50 dark:bg-gray-700 p-[10px] pt-[30px]">
      <h1 className="text-[24px] text-center dark:text-white">Property Sale</h1>
      <div className="flex flex-col gap-[10px] mt-[20px] ">
        <NavLink
          to="/houses"
          className={({ isActive }) =>
            [
              "h-[50px] flex justify-center items-center",
              isActive ? "bg-gray-500 rounded-[5px]" : "",
            ].join(" ")
          }
        >
          houses
        </NavLink>
        <NavLink
          to="/addHouse"
          className={({ isActive }) =>
            [
              "h-[50px] flex justify-center items-center",
              isActive ? "bg-gray-500 rounded-[5px]" : "",
            ].join(" ")
          }
        >
          add house
        </NavLink>
      </div>
      <ThemeSwitch />
    </div>
  );
}
