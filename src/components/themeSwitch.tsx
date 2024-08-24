import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="h-[50px] rounded-[5px] flex justify-center items-center dark:hover:bg-gray-600 hover:bg-gray-200"
      onClick={() => handleToggle()}
    >
      {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
