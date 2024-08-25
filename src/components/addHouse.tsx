import { useMemo, useRef, useState } from "react";
import Button from "./button";
import Input from "./input";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { addHouse, editHouse } from "../api/useFetch";

interface house {
  address: string;
  description: string;
  phone: string;
  position: { lat: number; lng: number };
  id?: number;
}

//a component for both add and edit house
export default function AddHouse({
  house,
  handleClose,
}: {
  house?: house;
  handleClose?: () => void;
}) {
  const navigateTo = useNavigate();

  //set the location of the marker by clicking on the map
  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        setFormData((formData) => ({
          ...formData,
          position: { lat: e.latlng.lat, lng: e.latlng.lng },
        }));
      },
    });
    return null;
  };

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

  //set the location by dragging the marker
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
    if (house) {
      editHouse(house.id, formData)
        .then(() => navigateTo("/"))
        .catch((err) => console.log(err));
    } else {
      addHouse(formData)
        .then(() => navigateTo("/"))
        .catch((err) => console.log(err));
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
          "min-w-[300px] lg:w-full h-fit px-[10px] dark:bg-gray-800 dark:text-gray-400 md:p-0 overflow-y-auto":
            house,
        }
      )}
    >
      <div className="w-full lg:w-[800px] flex flex-col gap-[20px]">
        {!house && (
          <h1 className="font-bold text-xl w-full text-center">Add House</h1>
        )}
        <form
          className="flex flex-col gap-[30px] items-center py-[20px] sm:p-[50px]"
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
            className="h-[300px] w-full  rounded-[5px]"
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
