import { useState } from "react";
import Button from "./button";
import { login, signup } from "../api/useFetch";
import { useNavigate } from "react-router-dom";

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
          console.log(res);
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
      <div className=" 0 w-[700px] flex flex-col gap-[50px] bg-gray-50 p-[40px] border-none rounded-[5px]">
        <h1 className="text-4xl  font-bold text-center">{registerType}</h1>
        <form
          className="flex flex-col gap-[30px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="email">Email:</label>
            <input
              className="w-[300px] h-[40px] p-[10px]"
              type="text"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="password">Password:</label>
            <input
              className="w-[300px] h-[40px] p-[10px]"
              type="text"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="flex flex-row justify-center">
            <Button text={registerType} />
          </div>
        </form>
      </div>
    </div>
  );
}
