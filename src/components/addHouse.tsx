import { useState } from "react";
import Button from "./button";
import Input from "./input";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

interface house {
  address: string;
  description: string;
  phone: string;
}

export default function AddHouse() {
  const [formData, setFormData] = useState<house>({
    address: "",
    description: "",
    phone: "",
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
    <div className="overflow-auto w-3/4 flex flex-col gap-[20px] p-[50px]">
      <h1 className="font-bold text-xl w-full text-center">Add House</h1>
      <form
        className="flex flex-col gap-[30px] items-center  p-[50px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          type="text"
          label="phone"
          value={formData.phone}
          handleChange={handleChange}
        />
        <Input
          type="text"
          label="address"
          value={formData.address}
          handleChange={handleChange}
        />
        <Input
          type="text"
          label="description"
          value={formData.description}
          handleChange={handleChange}
        />

        <MapContainer
          style={{ height: "300px", width: "500px" }}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>

        <Button text="Add" />
      </form>
    </div>
  );
}
