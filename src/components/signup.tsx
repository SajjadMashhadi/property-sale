import { useEffect, useState } from "react";
import Button from "./button";
import { login, signup } from "../api/useFetch";
import { useNavigate, Link } from "react-router-dom";
import Input from "./input";
import { useLocalStorage } from "usehooks-ts";

interface user {
  email: string;
  password: string;
}

export default function Signup({ registerType }: { registerType: string }) {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState<user>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [, setToken] = useLocalStorage("token", null);
  const [, setUserId] = useLocalStorage("userId", null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //login
    if (registerType === "login") {
      login(formData)
        .then((res) => {
          setToken(res.data.accessToken);
          setUserId(res.data.user.id);
          navigateTo("/app");
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
        });
    } else {
      //signup
      signup(formData)
        .then((res) => {
          setToken(res.data.accessToken);
          setUserId(res.data.user.id);
          navigateTo("/app/Houses");
          console.log(res);
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
        });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  useEffect(() => {
    setErrorMessage(null);
    setFormData({
      email: "",
      password: "",
    });
  }, [registerType]);

  return (
    <div className="w-full h-screen flex flex-col justify-center justify-items-center items-center dark:bg-gray-700">
      <div className=" 0 w-[350px] sm:w-[500px] md:w-[600px] flex flex-col gap-[50px] bg-gray-50 dark:bg-[#202c3c] text-gray-600 dark:text-gray-200 p-[40px]  border-none rounded-[10px]">
        <h1 className="text-4xl  font-bold text-center capitalize">
          {registerType}
        </h1>

        <div className="text-red-600 text-[12px] leading-[0] text-center">
          {errorMessage ? errorMessage + "!" : ""}
        </div>

        <form
          className="flex flex-col gap-[30px] lg:px-[50px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            type="text"
            label="email"
            value={formData.email}
            handleChange={handleChange}
          />
          <Input
            type="text"
            label="password"
            value={formData.password}
            handleChange={handleChange}
          />

          <div className="flex flex-row justify-center mt-[20px]">
            <Button text={registerType} />
          </div>
          <div className="w-full text-xs flex justify-center">
            {registerType === "signup"
              ? "already have an account? "
              : "don't have an account? "}
            <Link to={registerType === "signup" ? "/login" : "/signup"}>
              {" "}
              <span className="font-bold mx-[2px] text-[16px]">
                {registerType === "signup" ? " login" : " signup"}
              </span>{" "}
              here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
