import { useMemo, useRef, useState } from "react";
import Button from "./button";
import Input from "./input";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { addHouse } from "../api/useFetch";

interface house {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
}

export default function AddHouse() {
  const [formData, setFormData] = useState<house>({
    address: "",
    description: "",
    phone: "",
    position: { lat: 51.505, lng: -0.09 },
  });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setFormData((formData) => ({
            ...formData,
            position: marker.getLatLng(),
          }));
        }
      },
    }),
    []
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // fetch("http://localhost:3000/houses", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    addHouse(formData);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <div className="overflow-auto w-3/4 flex flex-row justify-center  p-[50px]">
      <div className="w-[800px] flex flex-col gap-[20px]">
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
            style={{ height: "300px", width: "700px", borderRadius: "5px" }}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={formData.position}
              ref={markerRef}
            >
              <Popup>
                <span>drag the marker</span>
              </Popup>
            </Marker>
          </MapContainer>

          <Button text="Add" />
        </form>
      </div>
    </div>
  );
}
