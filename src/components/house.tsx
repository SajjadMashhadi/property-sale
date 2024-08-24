import { useParams } from "react-router-dom";
import useFetch from "../api/useFetch";
import DetailFiels from "./detailField";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function House() {
  const { id } = useParams();
  const {
    data: house,
    error,
    isPending,
  } = useFetch("http://localhost:3000/houses/" + id);

  if (error) {
    return <div>error</div>;
  }

  if (isPending) {
    return <div>is loading...</div>;
  }

  if (house) {
    return (
      <div className="w-3/4 p-[50px]">
        <h1 className="font-bold text-xl w-full pl-[20px]">House Details</h1>
        <DetailFiels title="Address" content={house.address} />
        <DetailFiels title="Description" content={house.description} />
        <MapContainer
          style={{ height: "300px", width: "700px", borderRadius: "5px" }}
          center={[house.position.lat, house.position.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable={false} position={house.position}></Marker>
        </MapContainer>
      </div>
    );
  }
}
