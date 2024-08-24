import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [dark, setDark] = useState(false);

  const handleClick = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div>
      <div className="text-blue-500 dark:text-red-500">home</div>
      <button onClick={() => handleClick()}>toggle</button>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
