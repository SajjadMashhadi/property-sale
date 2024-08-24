import { Outlet } from "react-router-dom";
import ThemeSwitch from "./components/themeSwitch";

function App() {
  return (
    <div className="w-full h-[100vh] dark:bg-black dark:text-gray-400">
      <div className="">home</div>
      <ThemeSwitch />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
