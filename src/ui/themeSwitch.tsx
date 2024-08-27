import { useEffect, FC } from "react";
import { useLocalStorage } from "usehooks-ts";
import Button from "./button";

const ThemeSwitch: FC = () => {
  const [theme, setTheme] = useLocalStorage<string>("theme", "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const handleToggle = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="absolute top-[20px] right-[10px] md:right-[40px]">
      <Button
        text={`${theme === "light" ? "dark" : "light"} mode`}
        onClick={handleToggle}
      >
        <img className="w-[20px]" src="/moon.svg" />
      </Button>
    </div>
  );
};

export default ThemeSwitch;
