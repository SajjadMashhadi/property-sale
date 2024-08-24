import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <button
        className="h-[50px] w-full flex justify-center items-center text-center"
        onClick={() => handleToggle()}
      >
        {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}
