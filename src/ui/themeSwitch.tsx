import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import Button from "./button";

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
    <div className="absolute top-[20px] right-[10px] md:right-[40px]">
      <Button
        text={`${theme === "light" ? "dark" : "light"} mode`}
        onClick={handleToggle}
      >
        <img className="w-[20px]" src="../public/moon.svg" />
      </Button>
    </div>
  );
}
