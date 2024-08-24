import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="w-full h-[100vh] dark:bg-gray-800 dark:text-gray-400 flex flex-row justify-start">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
