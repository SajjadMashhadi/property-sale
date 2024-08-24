import { useState } from "react";
import Button from "./button";

interface house {
  address: string;
  description: string;
  phone: number | undefined;
}

export default function AddHouse() {
  const [formData, setFormData] = useState<house>({
    address: "",
    description: "",
    phone: undefined,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:3000/houses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <div className="w-3/4 flex flex-col gap-[20px] p-[50px]">
      <h1 className="font-bold text-xl w-full text-center">Add House</h1>
      <form
        className="flex flex-col gap-[30px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label htmlFor="address">Address: </label>
          <input
            onChange={(e) => handleChange(e)}
            value={formData.address}
            className="w-[300px] h-[30px] p-[10px] bg-inherit border-b-gray-200 focus:border-none focus-within:border-none"
            type="text"
            name="address"
            placeholder="address"
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            value={formData.description}
            onChange={(e) => handleChange(e)}
            className="w-[300px] h-[30px] p-[10px] bg-inherit border-b-gray-200 focus:border-none focus-within:border-none"
            type="text"
            name="description"
            placeholder="description"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            value={formData.phone}
            onChange={(e) => handleChange(e)}
            className="w-[300px] h-[30px] p-[10px] bg-inherit border-b-gray-200 focus:border-none focus-within:border-none"
            type="text"
            name="phone"
            placeholder="phone"
          />
        </div>
        <Button text="Add" />
      </form>
    </div>
  );
}
