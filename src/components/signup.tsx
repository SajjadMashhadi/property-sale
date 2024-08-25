import { useState } from "react";
import Button from "./button";
import { login, signup } from "../api/useFetch";
import { useNavigate, Link } from "react-router-dom";
import Input from "./input";

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //login
    if (registerType === "login") {
      login(formData)
        .then((res) => {
          navigateTo("/");
        })
        .catch((err) => console.log(err));
    } else {
      //signup
      signup(formData)
        .then((res) => {
          navigateTo("/");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center justify-items-center items-center dark:bg-gray-700">
      <div className=" 0 w-[400px] sm:w-[500px] md:w-[700px] flex flex-col gap-[50px] bg-gray-50 p-[40px] border-none rounded-[5px]">
        <h1 className="text-4xl  font-bold text-center">{registerType}</h1>
        <form
          className="flex flex-col gap-[30px]"
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

          <div className="flex flex-row justify-center">
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
