import ThemeSwitch from "../components/themeSwitch";
import { NavLink } from "react-router-dom";
import Button from "./button";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    padding: "0",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadious: "5px",
  },
};

export default function Sidebar() {
  //state for toggling side bar menu in mobile screens
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigateTo = useNavigate();

  //log out
  const logout = () => {
    navigateTo("/login");
  };
  return (
    <>
      <button
        onClick={() => setShowSidebar(true)}
        className="block lg:hidden absolute left-[20px] top-[20px]"
      >
        show menu
      </button>
      <div
        className={clsx(
          "w-[300px] absolute  lg:left-0   lg:relative lg:w-1/4 h-full flex flex-col gap-[10px] bg-gray-50 dark:bg-gray-700 p-[10px] pt-[30px]",
          {
            "left-0 z-[1000] transition-all duration-[0.7s]": showSidebar,
            "left-[-300px] transition-all duration-[0.7s]": !showSidebar,
          }
        )}
      >
        <h1 className="text-[24px] text-center dark:text-white">
          Property Sale
        </h1>
        <div className="flex flex-col gap-[10px] mt-[20px] ">
          <NavLink
            onClick={() => setShowSidebar(false)}
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
            onClick={() => setShowSidebar(false)}
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
          <Button
            text="log out"
            onClick={() => {
              setShowModal(true);
              setShowSidebar(false);
            }}
          />
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={showModal}
        onAfterOpen={() => setShowModal(true)}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
      >
        <div className="dark:bg-gray-800 dark:text-gray-400 z-2000 w-[300px] sm:w-[400px] p-[20px]  flex flex-col gap-[20px] items-center">
          <p>Do you want to remove this item?</p>
          <div className="flex flex-row justify-start gap-[20px]">
            <Button text="no" onClick={() => setShowModal(false)} />
            <Button text="yes" onClick={() => logout()} />
          </div>
        </div>
      </Modal>
      <div
        onClick={() => setShowSidebar(false)}
        className={clsx("lg:none", {
          "w-full min-h-screen absolute z-[500]  ": showSidebar,
          none: !showSidebar,
        })}
      ></div>
    </>
  );
}
