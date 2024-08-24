import { useState } from "react";
import Button from "./button";

interface user {
  email: string;
  password: string;
}

export default function Signup({ registerType }: { registerType: string }) {
  const [formData, setFormData] = useState<user>({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (registerType === "login") {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
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
