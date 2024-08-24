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
    <Button
      text={`${theme === "light" ? "dark" : "light"} mode`}
      onClick={handleToggle}
    />
  );
}
