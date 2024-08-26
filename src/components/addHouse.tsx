import { useState } from "react";
import Button from "./button";
import Input from "./input";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { addHouse, editHouse, getAddress } from "../api/useFetch";

interface house {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
  id?: number;
  userId?: number;
}

//a component for both add and edit house
export default function AddHouse({
  house,
  handleClose,
}: {
  house?: house;
  handleClose?: () => void;
}) {
  const [userId] = useLocalStorage("userId", null);

  const [formData, setFormData] = useState<house>(
    house
      ? house
      : {
          address: "",
          description: "",
          phone: "",
          position: { lat: 51.505, lng: -0.09 },
        }
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigateTo = useNavigate();

  //get the address from location (lat,lng)
  const setAddress = (lat: number, lng: number) => {
    getAddress(lat, lng)
      .then((res) => {
        // const address = res.data.display_name;
        setFormData((formData) => ({
          ...formData,
          address: res.data.display_name,
        }));
      })
      .catch((err) => console.log(err));
  };

  //set the location of the marker by clicking on the map
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        setAddress(e.latlng.lat, e.latlng.lng);
        setFormData((formData) => ({
          ...formData,
          position: { lat: e.latlng.lat, lng: e.latlng.lng },
        }));
      },
    });
    return null;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.address || !formData.description || !formData.phone) {
      setErrorMessage("Please fill all the inputs");
    } else {
      if (house) {
        editHouse(house.id, formData)
          .then(() => navigateTo("/"))
          .catch((err) => console.log(err));
      } else {
        addHouse({ ...formData, userId })
          .then(() => navigateTo("/"))
          .catch((err) => console.log(err));
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  }

  return (
    <div
      className={clsx(
        "overflow-auto w-full lg:w-3/4 flex flex-row justify-center px-[20px] md:p-[50px]",
        {
          "min-w-[300px] lg:w-full py-[10px] h-fit px-[10px] dark:bg-gray-800 dark:text-gray-400 md:p-0 overflow-y-auto":
            house,
        }
      )}
    >
      <div className="w-full lg:w-[800px] flex flex-col gap-[20px] p-0">
        {!house && (
          <h1 className="font-bold text-xl w-full text-center">Add House</h1>
        )}
        <div className="text-red-600 text-[12px] leading-[0] text-center">
          {errorMessage ? errorMessage + "!" : ""}
        </div>
        <form
          className="flex flex-col gap-[10px] sm:gap-[20px] md:gap-[30px] items-center py-[10px] sm:p-[10px]"
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
            center={
              house ? [house.position.lat, house.position.lng] : [51.505, -0.09]
            }
            className="h-[300px] w-full  rounded-[5px] z-0"
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker draggable={false} position={formData.position}></Marker>
            <LocationFinderDummy />
          </MapContainer>
          {house ? (
            <div className=" w-full flex flex-col sm:flex-row justify-start gap-[20px]">
              <Button text="close" onClick={() => handleClose()} />
              <Button text="edit" />
            </div>
          ) : (
            <Button text="add" />
          )}
        </form>
      </div>
    </div>
  );
}
