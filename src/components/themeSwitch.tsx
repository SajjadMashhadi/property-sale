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
      <button className="" onClick={() => handleToggle()}>
        {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
}
